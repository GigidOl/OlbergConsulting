/*
 * Site script — language switching, page rendering and interactions.
 *
 * Every page is a thin HTML shell (<body data-page="...">). This script renders
 * the shared header, the page content and the title-block footer from:
 *   content/config.js  — contact details, languages
 *   content/<lang>.js  — all text, per language
 */
(function () {
  'use strict';

  var CONFIG = window.SITE_CONFIG;
  var CONTENT = window.SITE_CONTENT || {};
  var DEFAULT_LANG = CONFIG.defaultLanguage;
  var STORAGE_KEY = 'site-language';
  var MARK = '[TO BE FILLED IN]';
  var MARK_RE = /\[TO BE FILLED IN[^\]]*\]/g;
  // Keys whose values are identifiers, not text — never translated or marked.
  // case study storyline: the problem, the obvious answer, what the analysis showed, the recommendation, the outcome
  var CASE_STEPS = ['problem', 'standard', 'analysis', 'solution', 'result'];
  var NON_TEXT = { id: 1, category: 1, caseStudy: 1, icon: 1, url: 1, code: 1, type: 1, service: 1 };

  // Menu pages, in menu order. Keys match the nav.* labels in the content files.
  var PAGES = {
    home: 'index.html',
    about: 'about.html',
    services: 'services.html',
    projects: 'experience.html',
    cases: 'case-studies.html',
    news: 'insights.html',
    legal: 'legal.html'           // footer link only, not in the menu
  };
  var NAV = ['about', 'services', 'projects', 'cases', 'news'];

  var page = document.body.getAttribute('data-page');
  // Detail pages highlight their parent menu item.
  var navPage = { project: 'projects', 'case': 'cases' }[page] || page;
  var state = { lang: initialLang(), projectFilter: 'all', newsFilter: 'all', ready: false };
  var dictCache = {};

  /* ---------- i18n ---------- */

  function initialLang() {
    var fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (isLang(fromUrl)) return fromUrl;
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (isLang(stored)) return stored;
    } catch (e) { /* storage unavailable */ }
    return DEFAULT_LANG;
  }

  function isLang(code) {
    return CONFIG.languages.some(function (l) { return l.code === code; });
  }

  // Missing translations fall back to the default language, prefixed with the placeholder mark.
  function markAll(value, key) {
    if (typeof value === 'string') {
      if (NON_TEXT[key] || !/[A-Za-z]/.test(value) || value.indexOf(MARK.slice(0, -1)) === 0) return value;
      return MARK + ' ' + value;
    }
    if (Array.isArray(value)) return value.map(function (v) { return markAll(v, key); });
    if (value && typeof value === 'object') {
      var out = {};
      Object.keys(value).forEach(function (k) { out[k] = markAll(value[k], k); });
      return out;
    }
    return value;
  }

  function merge(base, over) {
    if (over === undefined || over === null || over === '') return base;
    if (Array.isArray(base)) {
      return base.map(function (b, i) { return merge(b, Array.isArray(over) ? over[i] : undefined); });
    }
    if (base && typeof base === 'object') {
      var out = {};
      Object.keys(base).forEach(function (k) { out[k] = merge(base[k], over[k]); });
      return out;
    }
    return over;
  }

  function dict(lang) {
    if (!dictCache[lang]) {
      var base = CONTENT[DEFAULT_LANG];
      dictCache[lang] = lang === DEFAULT_LANG ? base : merge(markAll(base), CONTENT[lang] || {});
    }
    return dictCache[lang];
  }

  function t(path) {
    return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, dict(state.lang));
  }

  /* ---------- formatting helpers ---------- */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Escapes text, turns *word* into <em>, and highlights placeholders.
  function fmt(s) {
    return esc(s)
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(MARK_RE, function (m) { return '<mark class="tbf">' + m + '</mark>'; });
  }

  function plain(s) {
    return String(s == null ? '' : s).replace(/\*/g, '');
  }

  function isPlaceholder(v) {
    return !v || v.indexOf(MARK.slice(0, -1)) === 0;
  }

  function langParam(sep) {
    return state.lang === DEFAULT_LANG ? '' : sep + 'lang=' + state.lang;
  }

  function pageHref(key, hash) {
    return PAGES[key] + langParam('?') + (hash ? '#' + hash : '');
  }

  function projectHref(id) { return 'project.html?id=' + encodeURIComponent(id) + langParam('&'); }
  function caseHref(id) { return 'case-study.html?id=' + encodeURIComponent(id) + langParam('&'); }

  // The contact section lives on the homepage.
  function contactHref() {
    return page === 'home' ? '#contact' : pageHref('home', 'contact');
  }

  function list(items, cls) {
    return '<ul' + (cls ? ' class="' + cls + '"' : '') + '>' +
      items.map(function (i) { return '<li>' + fmt(i) + '</li>'; }).join('') + '</ul>';
  }

  function paras(items) {
    return items.map(function (p) { return '<p>' + fmt(p) + '</p>'; }).join('');
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function arrow() {
    return '<svg class="arrow" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
  function backArrow() {
    return '<svg class="arrow arrow-back" viewBox="0 0 20 20" aria-hidden="true"><path d="M16 10H5M9 5l-5 5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
  function langIndex(code) {
    return Math.max(0, CONFIG.languages.map(function (l) { return l.code; }).indexOf(code));
  }

  /* ---------- shared building blocks ---------- */

  // Section heading on the homepage (numbered) or inside a page.
  function sectionHead(label, title, intro, num) {
    return '<header class="section-head">' +
      '<p class="section-label">' + (num ? num + ' — ' : '') + fmt(label) + '</p>' +
      '<h2>' + fmt(title) + '</h2>' +
      (intro ? '<p class="section-intro">' + fmt(intro) + '</p>' : '') +
      '</header>';
  }

  // Dark title band at the top of every sub-page.
  function pageHero(label, title, intro) {
    return '<section class="page-hero"><div class="container">' +
      '<p class="eyebrow">' + fmt(label) + '</p>' +
      '<h1>' + fmt(title) + '</h1>' +
      (intro ? '<p class="hero-sub">' + fmt(intro) + '</p>' : '') +
      '</div></section>';
  }

  function photo(withFacts) {
    return '<div class="about-photo reveal">' +
      '<div class="photo-frame"><img src="images/headshot.jpg" width="449" height="449" alt="' + esc(plain(t('a11y.photo'))) + '"></div>' +
      '<p class="photo-caption"><strong>' + fmt(CONFIG.person.name) + '</strong><span>' + fmt(t('about.role')) + '</span></p>' +
      (withFacts ? list(t('about.facts'), 'check-list') : '') +
      '</div>';
  }

  function serviceCard(s, full) {
    var inner =
      '<span class="service-icon"><img src="' + s.icon + '" alt="" width="34" height="34"></span>' +
      '<h3>' + fmt(s.title) + '</h3>' +
      '<p class="service-summary">' + fmt(s.summary) + '</p>';
    if (!full) {
      return '<a class="service-card reveal" href="' + pageHref('services', 'service-' + s.id) + '">' + inner + '</a>';
    }
    return '<article class="service-card reveal" id="service-' + s.id + '">' + inner +
      '<p class="mini-label">' + fmt(t('services.includes')) + '</p>' +
      list(s.points, 'dash-list') +
      (s.tools ? '<p class="service-tools"><span class="mini-label">' + fmt(t('services.tools')) + '</span>' + fmt(s.tools) + '</p>' : '') +
      '</article>';
  }

  function contactSection(num) {
    var p = CONFIG.person, L = t('contact.labels'), F = t('contact.form');
    function row(label, value, href) {
      var v = isPlaceholder(value) || !href
        ? fmt(value)
        : '<a href="' + esc(href) + '"' + (href.indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '') + '>' + esc(value.replace(/^https?:\/\/(www\.)?/, '')) + '</a>';
      return '<div><dt>' + fmt(label) + '</dt><dd>' + v + '</dd></div>';
    }
    function field(name, type, label, extra) {
      var id = 'cf-' + name;
      var input = type === 'textarea'
        ? '<textarea id="' + id + '" name="' + name + '" rows="5" required></textarea>'
        : '<input id="' + id + '" name="' + name + '" type="' + type + '" required' + (extra || '') + '>';
      return '<div class="field"><label for="' + id + '">' + fmt(label) + '</label>' + input + '</div>';
    }
    return '<section class="section contact" id="contact"><div class="container contact-grid">' +
      '<div class="contact-copy">' +
        '<p class="section-label">' + (num ? num + ' — ' : '') + fmt(t('contact.label')) + '</p>' +
        '<h2>' + fmt(t('contact.title')) + '</h2>' +
        '<p class="contact-text">' + fmt(t('contact.text')) + '</p>' +
        '<dl class="contact-details">' +
          row(L.name, p.name, '') +
          row(L.email, p.email, 'mailto:' + p.email) +
          row(L.phone, p.phone, 'tel:' + String(p.phone).replace(/[^\d+]/g, '')) +
          row(L.linkedin, p.linkedin, p.linkedin) +
        '</dl>' +
      '</div>' +
      '<form class="contact-form" data-contact-form aria-label="' + esc(plain(F.label)) + '">' +
        '<div class="form-fields">' +
          field('name', 'text', F.name, ' autocomplete="name"') +
          field('email', 'email', F.email, ' autocomplete="email"') +
          field('message', 'textarea', F.message) +
          '<button class="btn btn-lime btn-lg" type="submit">' + fmt(F.send) + arrow() + '</button>' +
          '<p class="form-status" role="status" aria-live="polite"></p>' +
        '</div>' +
        // confirmation: the mark fills with water, then a short thank-you
        '<div class="form-done" role="status" aria-live="polite" hidden>' + doneMark() +
          '<h3 class="form-done-title"></h3><p class="form-done-text"></p>' +
          '<button class="text-link" type="button" data-form-again>' + fmt(F.again) + arrow() + '</button>' +
        '</div>' +
      '</form>' +
      '</div></section>';
  }

  // The stand-alone mark drawn inline so its water level can rise (light colours for the dark contact section).
  function doneMark() {
    return '<svg class="done-mark" viewBox="0 0 88 88" aria-hidden="true">' +
      '<defs><clipPath id="done-clip"><circle cx="44" cy="44" r="36.5"/></clipPath></defs>' +
      '<g clip-path="url(#done-clip)"><g class="done-water">' +
        '<rect x="0" y="52" width="88" height="40" fill="#3CCBCB"/>' +
        '<line x1="0" y1="52" x2="88" y2="52" stroke="#84CC16" stroke-width="1.6"/>' +
      '</g></g>' +
      '<circle cx="44" cy="44" r="40" fill="none" stroke="#FFFFFF" stroke-width="7"/>' +
      '<polygon class="done-level" points="38.5,41 49.5,41 44,49.5" fill="#84CC16"/>' +
      '</svg>';
  }

  function showDone(form, title, text) {
    form.querySelector('.form-done-title').textContent = plain(title);
    form.querySelector('.form-done-text').textContent = plain(text);
    form.querySelector('.form-fields').hidden = true;
    form.querySelector('.form-done').hidden = false;
  }

  // Contact form: posts to config.formEndpoint if set, otherwise opens the visitor's email program.
  function submitContact(form) {
    var F = t('contact.form'), status = form.querySelector('.form-status');
    var data = { name: form.elements.name.value.trim(), email: form.elements.email.value.trim(), message: form.elements.message.value.trim() };
    if (CONFIG.formEndpoint) {
      status.textContent = plain(F.sending);
      fetch(CONFIG.formEndpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.reset();
          status.textContent = '';
          showDone(form, F.doneTitleSent, F.sent);
        })
        .catch(function () { status.textContent = plain(F.error); });
      return;
    }
    var email = CONFIG.person.email;
    window.location.href = 'mailto:' + (isPlaceholder(email) ? '' : email) +
      '?subject=' + encodeURIComponent(plain(F.subject) + ' — ' + data.name) +
      '&body=' + encodeURIComponent(data.message + '\n\n' + data.name + '\n' + data.email);
    // the typed message is kept, so "Write another message" brings it back if the email program didn't open
    showDone(form, F.doneTitleMail, F.mailtoNote);
  }

  /* ---------- list renderers (re-rendered by the filters) ---------- */

  var parts = {
    projectFilters: function () {
      var cats = t('projects.categories');
      var used = [];
      t('projects.items').forEach(function (p) { if (used.indexOf(p.category) < 0) used.push(p.category); });
      return ['all'].concat(used).map(function (c) {
        var label = c === 'all' ? t('projects.all') : cats[c];
        return '<button type="button" class="filter-btn" data-filter="' + c + '" aria-pressed="' + (state.projectFilter === c) + '">' + fmt(label) + '</button>';
      }).join('');
    },

    projects: function () {
      var L = t('projects.labels'), cats = t('projects.categories');
      return t('projects.items').map(function (p, i) {
        var hidden = state.projectFilter !== 'all' && state.projectFilter !== p.category;
        return '<article class="project-card" data-category="' + p.category + '"' + (hidden ? ' hidden' : '') + '>' +
          '<div class="project-head">' +
            '<span class="project-index">P-' + pad(i + 1) + '</span>' +
            '<span class="type-tag type-' + p.category + '"><span class="sr-only">' + fmt(L.projectType) + ': </span>' + fmt(cats[p.category]) + '</span>' +
          '</div>' +
          '<h3><a href="' + projectHref(p.id) + '">' + fmt(p.title) + '</a></h3>' +
          '<p class="project-meta">' + fmt(p.location) + ' · ' + fmt(p.role) + '</p>' +
          '<dl class="project-facts">' +
            '<div><dt>' + fmt(L.challenge) + '</dt><dd>' + fmt(p.challenge) + '</dd></div>' +
            '<div><dt>' + fmt(L.contribution) + '</dt><dd>' + fmt(p.contributionSummary) + '</dd></div>' +
            '<div><dt>' + fmt(L.outcome) + '</dt><dd>' + fmt(p.outcome) + '</dd></div>' +
          '</dl>' +
          '<a class="text-link" href="' + projectHref(p.id) + '">' + fmt(L.details) + arrow() + '</a>' +
          '</article>';
      }).join('');
    },

    newsFilters: function () {
      var types = t('news.types');
      return ['all', 'article', 'insight'].map(function (k) {
        return '<button type="button" class="filter-btn" data-news="' + k + '" aria-pressed="' + (state.newsFilter === k) + '">' + fmt(types[k]) + '</button>';
      }).join('');
    },

    news: function () {
      return t('news.items').map(function (n) {
        var hidden = state.newsFilter !== 'all' && state.newsFilter !== n.type;
        var link = n.url ? '<a class="text-link" href="' + esc(n.url) + '" target="_blank" rel="noopener">' + fmt(t('news.read')) + arrow() + '</a>' : '';
        return '<article class="news-card news-' + n.type + '"' + (hidden ? ' hidden' : '') + '>' +
          '<div class="news-top"><span class="news-type">' + fmt(t('news.typeLabel.' + n.type)) + '</span><span class="news-date">' + fmt(n.date) + '</span></div>' +
          '<h3>' + fmt(n.title) + '</h3><p>' + fmt(n.excerpt) + '</p>' + link + '</article>';
      }).join('');
    }
  };

  function part(name, tag, attrs) {
    return '<' + tag + ' data-part="' + name + '"' + (attrs || '') + '>' + parts[name]() + '</' + tag + '>';
  }

  /* ---------- pages ---------- */

  var pages = {
    home: function () {
      var a = 'about.', s = 'services.';
      return '' +
        // Hero
        '<section class="hero">' +
        '<div class="hero-bg" aria-hidden="true"><img src="images/hero-flow.svg" alt=""></div>' +
        '<div class="container hero-inner">' +
          '<div class="hero-copy">' +
            '<p class="eyebrow">' + fmt(t('hero.eyebrow')) + '</p>' +
            '<h1 class="hero-title">' + fmt(t('hero.title')) + '</h1>' +
            '<p class="hero-sub">' + fmt(t('hero.subtitle')) + '</p>' +
            '<div class="hero-actions">' +
              '<a class="btn btn-lime btn-lg" href="#contact">' + fmt(t('hero.cta')) + arrow() + '</a>' +
              '<a class="btn btn-ghost-light" href="' + pageHref('projects') + '">' + fmt(t('hero.secondary')) + '</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<figure class="hero-figure"><img src="images/hero-pipeline.svg" alt="' + esc(plain(t('a11y.heroFigure'))) + '"></figure>' +
        '</section>' +

        // 01 About (short)
        '<section class="section" id="about"><div class="container">' +
          sectionHead(t(a + 'label'), t(a + 'title'), null, '01') +
          '<div class="about-grid">' + photo(false) +
            '<div class="about-body">' +
              '<p class="lead">' + fmt(t(a + 'lead')) + '</p>' +
              '<div class="prose">' + paras(t(a + 'body').slice(0, 1)) + '</div>' +
              '<blockquote class="pull-quote">' + fmt(t(a + 'quote')) + '</blockquote>' +
              '<a class="text-link more-link" href="' + pageHref('about') + '">' + fmt(t(a + 'more')) + arrow() + '</a>' +
            '</div>' +
          '</div>' +
        '</div></section>' +

        // 02 Services (cards link to the full services page)
        '<section class="section section-tint" id="services"><div class="container">' +
          sectionHead(t(s + 'label'), t(s + 'title'), t(s + 'intro'), '02') +
          '<div class="service-grid">' + t(s + 'items').map(function (x) { return serviceCard(x, false); }).join('') + '</div>' +
          '<a class="text-link more-link" href="' + pageHref('services') + '">' + fmt(t(s + 'all')) + arrow() + '</a>' +
        '</div></section>' +

        // 03 Contact
        contactSection('03');
    },

    about: function () {
      var a = 'about.';
      var services = t('services.items');
      var expertise = t(a + 'expertise.items').map(function (e) {
        var s = services.filter(function (x) { return x.id === e.service; })[0];
        var icon = s ? '<span class="expertise-icon"><img src="' + s.icon + '" alt="" width="26" height="26"></span>' : '';
        var inner = icon + '<span>' + fmt(e.label) + '</span>';
        return '<li>' + (s ? '<a href="' + pageHref('services', 'service-' + s.id) + '">' + inner + '</a>' : '<span class="expertise-item">' + inner + '</span>') + '</li>';
      }).join('');
      var regions = t(a + 'international.items').map(function (i) {
        return '<li><span class="region">' + fmt(i.region) + '</span><p>' + fmt(i.detail) + '</p></li>';
      }).join('');
      var languages = '<div class="lang-badges">' + t(a + 'languages.items').map(function (l) {
        return '<span class="lang-badge"><b>' + esc(l.code) + '</b>' + fmt(l.name) + '</span>';
      }).join('') + '</div><p class="muted">' + fmt(t(a + 'languages.note')) + '</p>';

      var facts =
        '<div class="about-facts reveal">' +
          '<div class="facts-block">' +
            '<h2 class="facts-title">' + fmt(t(a + 'expertise.title')) + '</h2>' +
            '<ul class="expertise-grid">' + expertise + '</ul>' +
          '</div>' +
          '<div class="facts-row">' +
            '<div class="facts-block">' +
              '<h2 class="facts-title">' + fmt(t(a + 'international.title')) + '</h2>' +
              '<ol class="region-strip">' + regions + '</ol>' +
            '</div>' +
            '<div class="facts-block facts-languages">' +
              '<h2 class="facts-title">' + fmt(t(a + 'languages.title')) + '</h2>' + languages +
            '</div>' +
          '</div>' +
        '</div>';

      return pageHero(t(a + 'label'), t(a + 'title')) +
        '<section class="section"><div class="container">' +
          '<div class="about-grid">' + photo(true) +
            '<div class="about-body">' +
              '<p class="lead">' + fmt(t(a + 'lead')) + '</p>' +
              '<div class="prose">' + paras(t(a + 'body')) + '</div>' +
              '<blockquote class="pull-quote">' + fmt(t(a + 'quote')) + '</blockquote>' +
            '</div>' +
          '</div>' +
          facts +
        '</div></section>';
    },

    services: function () {
      var s = 'services.';
      return pageHero(t(s + 'label'), t(s + 'title'), t(s + 'intro')) +
        '<section class="section section-tint"><div class="container">' +
          '<div class="service-grid">' + t(s + 'items').map(function (x) { return serviceCard(x, true); }).join('') + '</div>' +
          '<div class="challenges"><h2 class="h3">' + fmt(t(s + 'challenges.title')) + '</h2>' + list(t(s + 'challenges.items'), 'chip-list') + '</div>' +
        '</div></section>';
    },

    projects: function () {
      return pageHero(t('projects.label'), t('projects.title'), t('projects.intro')) +
        '<section class="section section-tint"><div class="container">' +
          part('projectFilters', 'div', ' class="filters" role="group" aria-label="' + esc(plain(t('projects.filterLabel'))) + '"') +
          part('projects', 'div', ' class="project-grid" aria-live="polite"') +
        '</div></section>';
    },

    cases: function () {
      var L = t('cases.labels');
      var steps = CASE_STEPS;
      var cards = t('cases.items').map(function (c) {
        return '<article class="case-card reveal">' +
          '<div class="case-intro">' +
            '<p class="mini-label">' + fmt(L.caseLabel) + ' · ' + fmt(c.location) + '</p>' +
            '<h2 class="case-title">' + fmt(c.title) + '</h2>' +
            '<p class="case-sub">' + fmt(c.subtitle) + '</p>' +
            '<div class="metric"><span class="metric-value">' + fmt(c.metric.value) + '</span><span class="metric-label">' + fmt(c.metric.label) + '</span></div>' +
            '<a class="btn btn-primary" href="' + caseHref(c.id) + '">' + fmt(L.read) + arrow() + '</a>' +
          '</div>' +
          '<ol class="case-steps">' + steps.map(function (s, i) {
            return '<li class="case-step step-' + s + '"><span class="step-num">' + pad(i + 1) + '</span><h3>' + fmt(L[s]) + '</h3><p>' + fmt(c.summary[s]) + '</p></li>';
          }).join('') + '</ol>' +
          '</article>';
      }).join('');
      var ph = t('cases.placeholder');
      return pageHero(t('cases.label'), t('cases.title'), t('cases.intro')) +
        '<section class="section section-tint"><div class="container case-list">' + cards +
          '<article class="case-card case-placeholder reveal"><p class="mini-label">' + fmt(L.caseLabel) + '</p><h2 class="case-title">' + fmt(ph.title) + '</h2><p>' + fmt(ph.text) + '</p></article>' +
        '</div></section>';
    },

    news: function () {
      return pageHero(t('news.label'), t('news.title'), t('news.intro')) +
        '<section class="section section-tint"><div class="container">' +
          part('newsFilters', 'div', ' class="filters" role="group" aria-label="' + esc(plain(t('news.title'))) + '"') +
          part('news', 'div', ' class="news-grid" aria-live="polite"') +
        '</div></section>';
    },

    // 404 — GitHub Pages shows 404.html for any address that doesn't exist
    notfound: function () {
      return '<section class="section notfound"><div class="container notfound-inner">' +
        '<img class="notfound-mark" src="images/olberg-mark.svg" alt="" width="160" height="160">' +
        '<div>' +
          '<p class="section-label">' + fmt(t('notFound.label')) + '</p>' +
          '<h1>' + fmt(t('notFound.title')) + '</h1>' +
          '<p class="notfound-text">' + fmt(t('notFound.text')) + '</p>' +
          '<a class="btn btn-lime btn-lg" href="' + pageHref('home') + '">' + fmt(t('notFound.button')) + arrow() + '</a>' +
          '<ul class="notfound-links">' + NAV.map(function (k) {
            return '<li><a class="text-link" href="' + pageHref(k) + '">' + fmt(t('nav.' + k)) + '</a></li>';
          }).join('') + '</ul>' +
        '</div>' +
        '</div></section>';
    },

    legal: function () {
      var p = CONFIG.person, g = CONFIG.legal, L = t('legal.labels');
      function row(label, value, href) {
        if (!value) return '';
        var v = href && !isPlaceholder(value) ? '<a href="' + esc(href) + '">' + esc(value) + '</a>' : fmt(value);
        return '<div><dt>' + fmt(label) + '</dt><dd>' + v + '</dd></div>';
      }
      return pageHero(t('legal.label'), t('legal.title')) +
        '<section class="section"><div class="container legal">' +
          '<h2>' + fmt(t('legal.noticeTitle')) + '</h2>' +
          '<p class="muted">' + fmt(t('legal.noticeIntro')) + '</p>' +
          '<dl class="legal-details">' +
            row(L.name, p.name) +
            row(L.address, g.address) +
            row(L.email, p.email, 'mailto:' + p.email) +
            row(L.phone, p.phone, 'tel:' + String(p.phone).replace(/[^\d+]/g, '')) +
            row(L.businessId, g.businessId) +
            row(L.vatId, g.vatId) +
            row(L.responsible, p.name) +
          '</dl>' +
          '<h2>' + fmt(t('legal.privacyTitle')) + '</h2>' +
          t('legal.privacy').map(function (s) {
            return '<h3>' + fmt(s.title) + '</h3>' + paras(s.text);
          }).join('') +
          '<dl class="legal-details">' +
            row(t('legal.authorityLabel'), g.authority) +
            row(t('legal.updatedLabel'), g.updated) +
          '</dl>' +
        '</div></section>';
    },

    project: function () { return renderProjectDetail(); },
    'case': function () { return renderCaseDetail(); }
  };

  /* ---------- detail pages ---------- */

  function currentId() {
    return new URLSearchParams(window.location.search).get('id');
  }

  function notFound(backHref, backLabel) {
    document.title = plain(t('detail.notFound'));
    return '<section class="page-hero"><div class="container"><h1>' + fmt(t('detail.notFound')) + '</h1>' +
      '<a class="btn btn-lime" href="' + backHref + '">' + fmt(backLabel) + '</a></div></section>';
  }

  function ctaBand() {
    return '<section class="cta-band"><div class="container cta-band-inner">' +
      '<div><h2>' + fmt(t('detail.ctaTitle')) + '</h2><p>' + fmt(t('detail.ctaText')) + '</p></div>' +
      '<a class="btn btn-lime btn-lg" href="' + contactHref() + '">' + fmt(t('detail.cta')) + arrow() + '</a>' +
      '</div></section>';
  }

  function renderProjectDetail() {
    var items = t('projects.items');
    var idx = items.map(function (p) { return p.id; }).indexOf(currentId());
    if (idx < 0) return notFound(pageHref('projects'), t('detail.backProjects'));
    var p = items[idx], L = t('projects.labels'), cats = t('projects.categories');
    var service = t('services.items').filter(function (s) { return s.id === p.category; })[0];
    var related = t('cases.items').filter(function (c) { return c.id === p.caseStudy; })[0];
    document.title = plain(p.title) + ' | ' + plain(CONFIG.person.brand);

    var others = items.filter(function (_, i) { return i !== idx; }).slice(0, 3);
    var facts = [['location', p.location], ['client', p.client], ['role', p.role], ['value', p.value]];

    return '<section class="page-hero"><div class="container">' +
        '<a class="back-link" href="' + pageHref('projects') + '">' + backArrow() + fmt(t('detail.backProjects')) + '</a>' +
        '<p class="eyebrow">P-' + pad(idx + 1) + ' · ' + fmt(cats[p.category]) + '</p>' +
        '<h1>' + fmt(p.title) + '</h1>' +
        '<dl class="fact-row">' + facts.map(function (f) {
          return '<div><dt>' + fmt(L[f[0]]) + '</dt><dd>' + fmt(f[1]) + '</dd></div>';
        }).join('') + '</dl>' +
      '</div></section>' +
      '<section class="section detail-body"><div class="container detail-grid">' +
        '<div class="detail-main">' +
          '<div class="detail-block"><p class="section-label">' + fmt(L.challenge) + '</p><p class="detail-lead">' + fmt(p.challenge) + '</p></div>' +
          '<div class="detail-block"><p class="section-label">' + fmt(L.contribution) + '</p>' + list(p.contribution, 'check-list') + '</div>' +
          '<div class="detail-block"><p class="section-label">' + fmt(L.outcome) + '</p><p class="detail-lead">' + fmt(p.outcome) + '</p></div>' +
        '</div>' +
        '<aside class="detail-aside">' +
          (service ? '<div class="aside-card"><p class="mini-label">' + fmt(t('detail.relatedService')) + '</p>' +
            '<img src="' + service.icon + '" alt="" width="40" height="40"><h3>' + fmt(service.title) + '</h3><p>' + fmt(service.summary) + '</p>' +
            '<a class="text-link" href="' + pageHref('services', 'service-' + service.id) + '">' + fmt(t('nav.services')) + arrow() + '</a></div>' : '') +
          (related ? '<div class="aside-card aside-accent"><p class="mini-label">' + fmt(t('cases.labels.caseLabel')) + '</p>' +
            '<h3>' + fmt(related.title) + '</h3><p>' + fmt(related.subtitle) + '</p>' +
            '<a class="text-link" href="' + caseHref(related.id) + '">' + fmt(L.readCase) + arrow() + '</a></div>' : '') +
        '</aside>' +
      '</div></section>' +
      '<section class="section section-tint"><div class="container">' +
        '<h2 class="h3">' + fmt(t('detail.otherProjects')) + '</h2>' +
        '<div class="mini-project-grid">' + others.map(function (o) {
          return '<a class="mini-project" href="' + projectHref(o.id) + '"><span class="type-tag type-' + o.category + '">' + fmt(cats[o.category]) + '</span>' +
            '<strong>' + fmt(o.title) + '</strong><span class="muted">' + fmt(o.location) + '</span></a>';
        }).join('') + '</div>' +
      '</div></section>' +
      ctaBand();
  }

  function renderCaseDetail() {
    var c = t('cases.items').filter(function (x) { return x.id === currentId(); })[0];
    if (!c) return notFound(pageHref('cases'), t('detail.backCases'));
    var L = t('cases.labels');
    document.title = plain(c.title) + ' | ' + plain(CONFIG.person.brand);
    var steps = CASE_STEPS;
    // the matching Experience entry carries the full role list and contributions — link to it instead of repeating them
    var project = t('projects.items').filter(function (p) { return p.caseStudy === c.id; })[0];
    var facts = ['client', 'role', 'scale', 'period'].map(function (k) {
      return '<div><dt>' + fmt(k === 'role' ? t('projects.labels.role') : L[k]) + '</dt><dd>' + fmt(c.facts[k]) + '</dd></div>';
    }).join('');

    return '<section class="page-hero"><div class="container">' +
        '<a class="back-link" href="' + pageHref('cases') + '">' + backArrow() + fmt(t('detail.backCases')) + '</a>' +
        '<p class="eyebrow">' + fmt(L.caseLabel) + ' · ' + fmt(c.location) + '</p>' +
        '<h1>' + fmt(c.title) + '</h1>' +
        '<p class="hero-sub">' + fmt(c.subtitle) + '</p>' +
        '<div class="metric metric-light"><span class="metric-value">' + fmt(c.metric.value) + '</span><span class="metric-label">' + fmt(c.metric.label) + '</span></div>' +
        '<nav class="step-nav" aria-label="' + esc(plain(L.caseLabel)) + '">' + steps.map(function (s, i) {
          return '<a href="#step-' + s + '"><span>' + pad(i + 1) + '</span>' + fmt(L[s]) + '</a>';
        }).join('') + '</nav>' +
      '</div></section>' +
      '<section class="section detail-body"><div class="container detail-grid">' +
        '<div class="detail-main">' +
          '<div class="detail-block"><p class="section-label">' + fmt(L.background) + '</p>' + paras(c.background) + '</div>' +
        '</div>' +
        '<aside class="detail-aside"><div class="aside-card"><p class="mini-label">' + fmt(L.role) + '</p><p>' + fmt(c.role) + '</p>' +
          '<dl class="case-facts">' + facts + '</dl>' +
          (project ? '<a class="text-link" href="' + projectHref(project.id) + '">' + fmt(L.overview) + arrow() + '</a>' : '') +
        '</div></aside>' +
      '</div></section>' +
      '<section class="section section-tint"><div class="container">' +
        '<ol class="step-blocks">' + steps.map(function (s, i) {
          var figure = s === 'problem'
            ? '<figure class="step-figure"><img src="images/case-network.svg" alt="' + esc(plain(t('a11y.caseFigure'))) + '" width="600" height="340"></figure>'
            : '';
          return '<li class="step-block step-' + s + '" id="step-' + s + '"><div class="step-head"><span class="step-num">' + pad(i + 1) + '</span><h2>' + fmt(L[s]) + '</h2></div><div class="step-body">' + paras(c[s]) + figure + '</div></li>';
        }).join('') + '</ol>' +
        '<aside class="case-insight"><p class="section-label">' + fmt(L.insight) + '</p><p class="case-insight-text">' + fmt(c.insight) + '</p></aside>' +
      '</div></section>' +
      '<section class="section"><div class="container"><p class="section-label">' + fmt(L.services) + '</p>' + list(c.services, 'chip-list') + '</div></section>' +
      ctaBand();
  }

  /* ---------- header & footer ---------- */

  function renderHeader() {
    return '<div class="container header-inner">' +
      '<a class="brand" href="' + pageHref('home') + '">' +
        // dark versions for the white bar, light versions while the bar sits over the dark hero (see style.css);
        // narrow phones show only the stand-alone mark
        '<img class="brand-logo is-dark" src="images/logo-olberg.svg" width="372" height="108" alt="' + esc(CONFIG.person.brand) + '">' +
        '<img class="brand-logo is-light" src="images/logo-olberg-light.svg" width="372" height="108" alt="' + esc(CONFIG.person.brand) + '">' +
        '<img class="brand-mark is-dark" src="images/olberg-mark.svg" width="88" height="88" alt="' + esc(CONFIG.person.brand) + '">' +
        '<img class="brand-mark is-light" src="images/olberg-mark-light.svg" width="88" height="88" alt="' + esc(CONFIG.person.brand) + '">' +
      '</a>' +
      '<div class="header-tools">' +
        '<div class="lang-switch" role="group" aria-label="' + esc(plain(t('a11y.langSwitch'))) + '" style="--n:' + CONFIG.languages.length + ';--i:' + langIndex(state.thumbFrom || state.lang) + '">' +
          '<span class="lang-thumb" aria-hidden="true"></span>' +
          CONFIG.languages.map(function (l) {
            return '<button type="button" lang="' + l.code + '" data-lang="' + l.code + '" aria-pressed="' + (l.code === state.lang) + '" title="' + esc(l.name) + '">' + esc(l.label) + '</button>';
          }).join('') +
        '</div>' +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="' + esc(plain(t('a11y.menuOpen'))) + '"><span></span></button>' +
      '</div>' +
      '<nav class="site-nav" id="site-nav" aria-label="Main"><ul>' +
        NAV.map(function (k) {
          var active = k === navPage;
          return '<li><a href="' + pageHref(k) + '"' + (active ? ' class="is-active" aria-current="page"' : '') + '>' + fmt(t('nav.' + k)) + '</a></li>';
        }).join('') +
      '</ul>' +
      '<a class="btn btn-lime btn-sm nav-cta" href="' + contactHref() + '">' + fmt(t('nav.cta')) + '</a>' +
      '</nav>' +
      '</div>';
  }

  function renderFooter() {
    var F = t('footer'), year = String(new Date().getFullYear());
    return '<div class="container">' +
      '<div class="footer-brand">' +
        '<img src="images/logo-olberg-light.svg" width="372" height="108" alt="' + esc(CONFIG.person.brand) + '">' +
        '<span>' + fmt(t('brand.tagline')) + '</span>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>© ' + year + ' ' + fmt(CONFIG.person.name) + '. ' + fmt(F.rights) + '</span>' +
        '<span class="footer-links">' +
          '<a class="text-link" href="' + pageHref('legal') + '">' + fmt(F.legal) + '</a>' +
          '<a class="text-link" href="#main">' + fmt(F.top) + '</a>' +
        '</span>' +
      '</div>' +
      '</div>' +
      // floating "back to top" button with the mark; shown once the visitor has scrolled down
      '<a class="to-top" href="#main" aria-label="' + esc(plain(t('a11y.toTop'))) + '">' +
        '<img src="images/olberg-mark.svg" alt="" width="30" height="30">' +
        '<span class="to-top-arrow" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M6 10V2.5M2.5 6 6 2.5 9.5 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
      '</a>';
  }

  /* ---------- apply language ---------- */

  function applyLanguage() {
    document.documentElement.lang = state.lang;
    toggleMenu(false);

    // Keep anything typed into the contact form across a language switch.
    var typed = {};
    document.querySelectorAll('[data-contact-form] [name]').forEach(function (f) { typed[f.name] = f.value; });

    var regions = { header: renderHeader, main: pages[page], footer: renderFooter };
    Object.keys(regions).forEach(function (r) {
      var el = document.querySelector('[data-render="' + r + '"]');
      if (el && regions[r]) el.innerHTML = regions[r]();
    });

    document.querySelectorAll('[data-contact-form] [name]').forEach(function (f) {
      if (typed[f.name]) f.value = typed[f.name];
    });
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.innerHTML = fmt(t(el.getAttribute('data-i18n')));
    });

    if (page !== 'project' && page !== 'case') {
      var pageName = page === 'notfound' ? t('notFound.title') : t('nav.' + page);
      document.title = page === 'home'
        ? plain(t('meta.title'))
        : plain(pageName) + ' | ' + plain(CONFIG.person.brand);
    }
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', plain(t('meta.description')));

    observeReveals();
  }

  function setLanguage(code) {
    if (!isLang(code) || code === state.lang) return;
    state.thumbFrom = state.lang;   // render the switch at the old position, then slide it
    state.lang = code;
    try { localStorage.setItem(STORAGE_KEY, code); } catch (e) { /* storage unavailable */ }
    try {
      var url = new URL(window.location.href);
      if (code === DEFAULT_LANG) url.searchParams.delete('lang'); else url.searchParams.set('lang', code);
      history.replaceState(null, '', url.pathname + url.search + url.hash);
    } catch (e) { /* file:// may block history updates */ }
    applyLanguage();
    state.thumbFrom = null;
    var sw = document.querySelector('.lang-switch');
    if (sw) requestAnimationFrame(function () {
      requestAnimationFrame(function () { sw.style.setProperty('--i', langIndex(code)); });
    });
  }

  /* ---------- interactions ---------- */

  function setupEvents() {
    document.addEventListener('click', function (e) {
      var langBtn = e.target.closest('[data-lang]');
      if (langBtn) { setLanguage(langBtn.getAttribute('data-lang')); return; }

      if (e.target.closest('.nav-toggle')) {
        toggleMenu(!document.body.classList.contains('menu-open'));
        return;
      }

      var filterBtn = e.target.closest('[data-filter]');
      if (filterBtn) {
        state.projectFilter = filterBtn.getAttribute('data-filter');
        rerender(['projectFilters', 'projects']);
        return;
      }

      var newsBtn = e.target.closest('[data-news]');
      if (newsBtn) {
        state.newsFilter = newsBtn.getAttribute('data-news');
        rerender(['newsFilters', 'news']);
        return;
      }

      // contact form confirmation → back to the form (the typed message is still there)
      var again = e.target.closest('[data-form-again]');
      if (again) {
        var form = again.closest('[data-contact-form]');
        form.querySelector('.form-done').hidden = true;
        form.querySelector('.form-fields').hidden = false;
        form.elements.name.focus();
        return;
      }

      if (e.target.closest('.site-nav a')) toggleMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') toggleMenu(false);
    });

    document.addEventListener('submit', function (e) {
      var form = e.target.closest('[data-contact-form]');
      if (!form) return;
      e.preventDefault();
      submitContact(form);
    });

    var header = document.querySelector('.site-header');
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      document.body.classList.toggle('show-to-top', window.scrollY > 700);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function rerender(names) {
    names.forEach(function (n) {
      var el = document.querySelector('[data-part="' + n + '"]');
      if (el) el.innerHTML = parts[n]();
    });
  }

  function toggleMenu(open) {
    var toggle = document.querySelector('.nav-toggle');
    document.body.classList.toggle('menu-open', open);
    if (!toggle) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', plain(t(open ? 'a11y.menuClose' : 'a11y.menuOpen')));
  }

  var revealObserver = null;
  function observeReveals() {
    var els = document.querySelectorAll('.reveal:not(.is-visible)');
    // After the first render (e.g. on a language switch) show content immediately — no re-animation.
    if (state.ready || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-visible'); revealObserver.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px' });
    }
    els.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- init ---------- */

  document.documentElement.classList.add('js');
  // Pages that open with a dark band carry class="dark-top" in their HTML: the header starts transparent
  // over it and turns white on scroll. Colour transitions are switched on only after the first paint.
  applyLanguage();
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { document.body.classList.add('header-anim'); });
  });
  setupEvents();
  state.ready = true;
  if (window.location.hash) {
    var target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: 'instant' });
  }
})();
