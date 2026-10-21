/*
 * ENGLISH CONTENT — default language and reference for all translations.
 *
 * Editing rules
 * - Change text values only; keep keys identical across languages.
 * - Do not translate "id", "category", "caseStudy", "icon" or "url" values.
 * - Wrap a word in *asterisks* to highlight it (used in the hero headline).
 * - Anything containing "[TO BE FILLED IN]" is highlighted on the page until replaced.
 */
window.SITE_CONTENT = window.SITE_CONTENT || {};
window.SITE_CONTENT.en = {

  meta: {
    title: "Independent Water Infrastructure Consultant | Hydraulics, Sewers, Drainage",
    description: "Independent engineering consultant for water and wastewater infrastructure, hydraulic analysis, sewer rehabilitation, drainage and environmental assessments. 24+ years across Europe, North America and the Middle East."
  },

  a11y: {
    skip: "Skip to content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    langSwitch: "Choose language",
    toTop: "Back to top",
    heroFigure: "Long section of a pipeline below ground level, with manholes and the hydraulic grade line.",
    photo: "Portrait of the consultant",
    caseFigure: "Diagram of an interconnected sewer network: upgrading one constraint shifts pressure to a downstream node."
  },

  brand: {
    tagline: "Independent Expertise for Complex Water Infrastructure"
  },

  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    projects: "Experience",
    cases: "Case Studies",
    news: "Insights",
    legal: "Legal notice & privacy",
    cta: "Contact Me"
  },

  hero: {
    eyebrow: "Independent engineering consultant · Water, wastewater & drainage",
    title: "What if the standard solution isn't the *right* solution?",
    subtitle: "Independent engineering advice for complex water, wastewater and drainage projects where conventional approaches fall short.",
    cta: "Let's Discuss Your Challenge",
    secondary: "See project experience"
  },

  about: {
    label: "Introduction",
    more: "More about me",
    title: "The specialist you bring in when the answer isn't obvious.",
    lead: "I've spent more than 20 years working on water, wastewater, drainage, and environmental infrastructure projects across Europe, North America, and the Middle East.",
    body: [
      "Throughout my career, I've worked on everything from hydraulic modelling and sewer rehabilitation to major infrastructure planning and environmental assessments. While the projects themselves have varied, the work I enjoy most has always been the same: tackling problems where the answer isn't immediately obvious.",
      "Standards, methodologies, and previous experience provide a valuable starting point, but every project has its own context. Understanding that context is often the difference between delivering a technically correct solution and delivering the right solution.",
      "I enjoy projects that sit in the grey area — competing constraints, conflicting objectives, limited data, or technical challenges that don't respond well to conventional thinking. What I bring is not just technical expertise, but a way of thinking: curiosity, experience and practical judgement that turn complex challenges into clear, actionable decisions."
    ],
    quote: "If your project already has an obvious answer, you may not need me. If it doesn't, that's where I can add the most value.",
    role: "Independent Engineering Consultant",
    facts: [
      "24+ years in infrastructure consulting",
      "From feasibility studies to project delivery",
      "Municipalities, utilities and engineering consultancies"
    ],
    expertise: {
      title: "Areas of expertise",
      // "service" links each item (and its icon) to a service id under services.items
      items: [
        { label: "Water & wastewater infrastructure", service: "water" },
        { label: "Hydraulic analysis & modelling", service: "hydraulics" },
        { label: "Sewer rehabilitation & asset renewal", service: "rehab" },
        { label: "Drainage & flood risk", service: "drainage" },
        { label: "Linear infrastructure & feasibility studies", service: "feasibility" },
        { label: "Municipal Class Environmental Assessments", service: "environment" }
      ]
    },
    international: {
      title: "International experience",
      items: [
        { region: "Europe", detail: "United Kingdom — Thames Water sewer infrastructure. Germany — regional wastewater strategies and industrial pipelines." },
        { region: "North America", detail: "Canada — City of Toronto flood protection, sewer rehabilitation and Class EAs. Built and led a dedicated hydraulic modelling team." },
        { region: "Middle East", detail: "Qatar — hydraulic modelling and drainage concept for the New Doha International Airport expansion." }
      ]
    },
    languages: {
      title: "Working languages",
      items: [
        { name: "English", code: "EN" },
        { name: "German", code: "DE" }
      ],
      note: "Projects delivered in English- and German-speaking markets."
    }
  },

  services: {
    label: "Services",
    all: "All services",
    title: "Specialist support where standard approaches fall short.",
    intro: "For engineering consultancies, utilities and municipalities — as an extension of your project team or as an independent reviewer.",
    includes: "Services include",
    tools: "Software",
    items: [
      {
        id: "feasibility",
        icon: "images/icon-feasibility.svg",
        title: "Linear Infrastructure Feasibility Studies",
        summary: "Technical support for sewer, pipeline, pressure main, utility and cable corridor projects — from concept development through design review.",
        points: [
          "Feasibility studies and option development",
          "Concept and detailed design",
          "Independent design review and quality assurance",
          "Technical due diligence",
          "Constructability and delivery support"
        ]
      },
      {
        id: "hydraulics",
        icon: "images/icon-hydraulics.svg",
        title: "Hydraulic Analysis & Modelling",
        summary: "Hydraulic modelling, system assessment and technical guidance for complex water, wastewater and drainage challenges.",
        points: [
          "System capacity assessments",
          "Flood risk and surcharge investigations",
          "Hydraulic modelling",
          "Infrastructure option evaluation",
          "Feasibility and servicing studies",
          "Independent model review and technical oversight"
        ]
      },
      {
        id: "rehab",
        icon: "images/icon-rehab.svg",
        title: "Sewer Rehabilitation Planning",
        summary: "Development and delivery of rehabilitation strategies for aging sewer infrastructure.",
        points: [
          "Rehabilitation strategy development",
          "Alternative evaluation",
          "Design and project management",
          "Hydraulic assessment",
          "Trenchless and conventional rehabilitation reviews",
          "Technical quality assurance"
        ]
      },
      {
        id: "drainage",
        icon: "images/icon-drainage.svg",
        title: "Drainage Engineering",
        summary: "Stormwater, combined sewer and drainage concepts that reduce flood risk within real-world constraints.",
        points: [
          "Drainage concept development",
          "Stormwater and combined sewer system assessment",
          "Basement flooding and surcharge mitigation",
          "Conveyance and storage options",
          "Development planning support"
        ]
      },
      {
        id: "water",
        icon: "images/icon-water.svg",
        title: "Water & Wastewater Engineering",
        summary: "Planning and design support for wastewater collection and treatment strategies, pumping stations, force mains and watermains.",
        points: [
          "Gravity sewers, force mains and pumping stations",
          "Storage facilities and tunnelled crossings",
          "Centralised vs. decentralised wastewater strategies",
          "Watermain and industrial pipeline design",
          "Servicing studies"
        ]
      },
      {
        id: "environment",
        icon: "images/icon-environment.svg",
        title: "Water-Related Environmental Assessments",
        summary: "Technical leadership, review and engineering support for infrastructure planning and Municipal Class Environmental Assessment studies.",
        points: [
          "Development and evaluation of alternatives",
          "Technical review of engineering concepts",
          "Hydraulic and servicing assessments",
          "Quality assurance and peer review",
          "Coordination of multidisciplinary teams"
        ]
      }
    ],
    challenges: {
      title: "Typical challenges I can help solve",
      items: [
        "Aging infrastructure",
        "System capacity constraints",
        "Basement flooding",
        "Rehabilitation vs. replacement decisions",
        "Trenchless method selection",
        "Utility conflicts",
        "Constructability",
        "Environmental constraints",
        "Evaluation of alternatives",
        "Regulatory compliance",
        "Stakeholder requirements",
        "Long-term infrastructure planning"
      ]
    }
  },

  projects: {
    label: "Experience",
    title: "Selected projects",
    intro: "Assignments for municipalities, utilities and industrial clients across Europe, North America and the Middle East.",
    filterLabel: "Filter by project type",
    all: "All",
    labels: {
      projectType: "Project type",
      challenge: "Challenge",
      contribution: "Contribution",
      outcome: "Outcome",
      location: "Location",
      client: "Client",
      role: "Role",
      value: "Scale",
      details: "Project details",
      readCase: "Read the case study"
    },
    categories: {
      feasibility: "Linear infrastructure",
      hydraulics: "Hydraulic analysis",
      rehab: "Sewer rehabilitation",
      drainage: "Drainage",
      water: "Water & wastewater",
      environment: "Environmental assessment"
    },
    items: [
      {
        id: "toronto-basement-flooding",
        category: "hydraulics",
        caseStudy: "toronto-basement-flooding",
        title: "Basement Flooding Protection Program",
        location: "Toronto, Canada",
        client: "City of Toronto",
        role: "Hydraulic lead",
        value: "approx. $600M program",
        challenge: "Recurring basement flooding caused by capacity limitations across an interconnected sewer network, where relieving one constraint often shifted pressure elsewhere.",
        contributionSummary: "Led the hydraulic analysis for several program components, from system assessment to the evaluation of alternative servicing strategies.",
        contribution: [
          "Hydraulic modelling and system assessment",
          "Identification of capacity constraints within the sewer network",
          "Development and evaluation of alternative servicing strategies",
          "Review of proposed infrastructure solutions",
          "Technical coordination with design and environmental teams",
          "Hydraulic modelling and design support for more than 130 flood protection and conveyance assignments throughout Toronto"
        ],
        outcome: "Provided the technical basis for assessing alternatives and prioritising investment in a flood mitigation program of approximately $600 million."
      },
      {
        id: "toronto-trunk-sewer-rehabilitation",
        category: "rehab",
        title: "Trunk Sewer Rehabilitation Programs",
        location: "Toronto, Canada",
        client: "City of Toronto",
        role: "Design Manager & Technical Lead",
        value: "$3M – $35M per program",
        challenge: "Aging trunk sewers up to 2.5 km long and up to 1200 mm in diameter, located in floodplains, ravines, industrial sites, railway corridors and environmentally sensitive areas.",
        contributionSummary: "Design management and technical leadership, with rehabilitation strategies based on hydraulic modelling and condition assessment data.",
        contribution: [
          "Design management and technical leadership",
          "Development and evaluation of rehabilitation strategies using hydraulic modelling and condition assessment data",
          "Planning of bypass pumping strategies and hydraulic mitigation measures during rehabilitation works",
          "Early adoption and assessment of innovative rehabilitation technologies and investigation methods"
        ],
        outcome: "[TO BE FILLED IN]"
      },
      {
        id: "new-doha-international-airport",
        category: "drainage",
        title: "New Doha International Airport Expansion",
        location: "Doha, Qatar",
        client: "[TO BE FILLED IN]",
        role: "Hydraulic modelling & drainage concept",
        value: "470-hectare expansion",
        challenge: "Drainage for a 470-hectare expansion of an international airport. [TO BE FILLED IN: project-specific constraints]",
        contributionSummary: "Hydraulic modelling and drainage concept development for the expansion area.",
        contribution: [
          "Hydraulic modelling of the drainage system",
          "Drainage concept development for the 470-hectare expansion"
        ],
        outcome: "[TO BE FILLED IN]"
      },
      {
        id: "thames-water-sewer-infrastructure",
        category: "water",
        title: "Sewer Infrastructure for Thames Water",
        location: "United Kingdom",
        client: "Thames Water Utilities",
        role: "Design & delivery",
        value: "[TO BE FILLED IN]",
        challenge: "Combining pumping stations, gravity sewers, force mains, storage and tunnelled crossings into deliverable schemes. [TO BE FILLED IN: project-specific challenge]",
        contributionSummary: "Design and delivery of sewer infrastructure projects including pumping stations, gravity sewers, force mains, storage facilities and tunnelled crossings.",
        contribution: [
          "Design of pumping stations, gravity sewers and force mains",
          "Storage facilities and tunnelled crossings",
          "Project delivery support",
          "Assessment of innovative sewer rehabilitation technologies in the UK"
        ],
        outcome: "[TO BE FILLED IN]"
      },
      {
        id: "regional-wastewater-strategy-germany",
        category: "feasibility",
        title: "Regional Wastewater Strategy",
        location: "Germany",
        client: "[TO BE FILLED IN]",
        role: "Feasibility assessment",
        value: "Multiple communities",
        challenge: "Choosing between centralised and decentralised wastewater treatment concepts for several communities.",
        contributionSummary: "Feasibility assessment of regional wastewater infrastructure strategies, comparing centralised and decentralised treatment.",
        contribution: [
          "Feasibility assessment of regional wastewater infrastructure strategies",
          "Evaluation of centralised versus decentralised treatment concepts"
        ],
        outcome: "[TO BE FILLED IN]"
      },
      {
        id: "portlands-masterplan-ea",
        category: "environment",
        title: "Portlands Masterplan Class EA",
        location: "Toronto, Canada",
        client: "[TO BE FILLED IN]",
        role: "Hydraulic lead · concept development",
        value: "$90M",
        challenge: "Long-term infrastructure planning for urban redevelopment, balancing flood mitigation, servicing and environmental constraints.",
        contributionSummary: "Concept development and environmental assessment support, alongside hydraulic leadership on further Ontario Class EA studies.",
        contribution: [
          "Concept development and environmental assessment support for the $90M Portlands Masterplan EA",
          "Hydraulic lead for further Class EA studies, including Area 39 EA and Black Creek EA",
          "Development and comparison of alternatives for flooding mitigation, wastewater servicing and urban redevelopment",
          "Technical review of environmental documentation, modelling outputs and engineering alternatives"
        ],
        outcome: "[TO BE FILLED IN]"
      },
      {
        id: "industrial-pipeline-infrastructure",
        category: "feasibility",
        title: "Industrial Pipeline & Utility Infrastructure",
        location: "[TO BE FILLED IN]",
        client: "Dow Chemical · Bitterfeld/Wolfen Industrial Park",
        role: "Detailed design",
        value: "[TO BE FILLED IN]",
        challenge: "Pipeline and utility routes for industrial facilities. [TO BE FILLED IN: project-specific challenge]",
        contributionSummary: "Detailed design of pipeline and utility infrastructure for industrial facilities.",
        contribution: [
          "Detailed design of pipeline and utility infrastructure",
          "Projects at Dow Chemical and Bitterfeld/Wolfen Industrial Park"
        ],
        outcome: "[TO BE FILLED IN]"
      }
    ]
  },

  cases: {
    label: "Case Studies",
    title: "How complex problems get solved",
    intro: "A closer look at the thinking behind the work — from the problem to the decision.",
    labels: {
      caseLabel: "Case study",
      background: "The programme",
      role: "My role",
      client: "Client",
      scale: "Scale",
      period: "Period",
      overview: "Project overview",
      problem: "The problem",
      standard: "The standard solution",
      analysis: "What the analysis showed",
      solution: "What I recommended",
      result: "Result",
      insight: "What made the difference",
      services: "Key services demonstrated",
      read: "Read the full case study"
    },
    placeholder: {
      title: "Next case study",
      text: "[TO BE FILLED IN]"
    },
    items: [
      {
        id: "toronto-basement-flooding",
        // One assignment told as a decision story. The project overview (role list, scale, contributions)
        // lives in projects.items; this page only adds what the overview cannot: the reasoning.
        title: "[TO BE FILLED IN: Short story title, e.g. 'Relieving basement flooding in (area) without (the obvious fix)']",
        subtitle: "Toronto Basement Flooding Protection Program",
        location: "Toronto, Canada",
        metric: { value: "[TO BE FILLED IN: Key figure, e.g. number of properties protected or cost saved]", label: "[TO BE FILLED IN: What the figure measures]" },
        summary: {
          problem: "[TO BE FILLED IN: One sentence: where, what flooded, how often]",
          standard: "[TO BE FILLED IN: One sentence: the obvious fix and why it fell short]",
          analysis: "[TO BE FILLED IN: One sentence: what the modelling revealed]",
          solution: "[TO BE FILLED IN: One sentence: what you recommended instead]",
          result: "[TO BE FILLED IN: One sentence: the outcome, with a number]"
        },
        background: [
          "Basement flooding has been a recurring issue in parts of Toronto for many years. As the city grew and rainfall patterns changed, parts of the sewer network reached their capacity limits, increasing the risk of flooding during major storm events.",
          "This case looks at one assignment within the City's Basement Flooding Protection Program: [TO BE FILLED IN: name of the area or study, catchment size, type of system (combined / separated), number of properties affected]."
        ],
        facts: {
          client: "City of Toronto",
          role: "Hydraulic lead",
          scale: "[TO BE FILLED IN: Scale of this assignment, e.g. catchment area or capital cost]",
          period: "[TO BE FILLED IN: Years]"
        },
        role: "[TO BE FILLED IN: One sentence on your responsibility in this assignment, e.g. 'I led the hydraulic assessment and the evaluation of alternatives.']",
        problem: [
          "[TO BE FILLED IN: What was happening on the ground: which streets or properties flooded, during which storms, and how often.]",
          "[TO BE FILLED IN: Why it was hard: several interacting constraints, relieving one shifted pressure elsewhere, limited space, existing utilities, construction impacts.]"
        ],
        standard: [
          "[TO BE FILLED IN: The solution that would normally be proposed, e.g. upsizing the local sewers or a new relief sewer.]",
          "[TO BE FILLED IN: Why it was not the right answer here: cost, disruption, moving the problem downstream, constructability, or it would not reach the required level of service.]"
        ],
        analysis: [
          "[TO BE FILLED IN: The modelling approach in plain words: model type, design storm or level of service, scenarios tested.]",
          "[TO BE FILLED IN: The key finding: what the model showed that was not obvious at first, e.g. where the real constraint was.]"
        ],
        solution: [
          "[TO BE FILLED IN: The alternatives compared (e.g. storage, inflow control, relief sewer, downstream upgrade) and how they performed.]",
          "[TO BE FILLED IN: What you recommended and why: the trade-off between flood-risk reduction, cost, buildability and long-term operation.]"
        ],
        result: [
          "[TO BE FILLED IN: What was decided or built, and the measurable outcome: properties protected, level of service reached, cost or disruption avoided.]"
        ],
        insight: "[TO BE FILLED IN: The one insight that changed the outcome, in one or two sentences. This is the part a future client remembers.]",
        services: [
          "Hydraulic Analysis",
          "Hydraulic Modelling",
          "Infrastructure Planning",
          "Alternative Evaluation",
          "Feasibility Studies",
          "Technical Review and Advisory Support"
        ]
      }
    ]
  },

  news: {
    label: "Industry News",
    title: "Articles & insights",
    intro: "Commentary on water infrastructure, hydraulic modelling and asset renewal.",
    types: {
      all: "All",
      article: "Articles",
      insight: "Insights"
    },
    typeLabel: {
      article: "Article",
      insight: "Insight"
    },
    read: "Read more",
    items: [
      { type: "article", date: "[TO BE FILLED IN]", title: "[TO BE FILLED IN: Article title]", excerpt: "[TO BE FILLED IN: Two-sentence summary of the article.]", url: "" },
      { type: "insight", date: "[TO BE FILLED IN]", title: "[TO BE FILLED IN: Insight title]", excerpt: "[TO BE FILLED IN: Short takeaway or commentary on an industry development.]", url: "" },
      { type: "article", date: "[TO BE FILLED IN]", title: "[TO BE FILLED IN: Article title]", excerpt: "[TO BE FILLED IN: Two-sentence summary of the article.]", url: "" }
    ]
  },

  contact: {
    label: "Contact",
    title: "Have a challenge that requires a fresh perspective?",
    text: "I'm just a message away.",
    labels: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      linkedin: "LinkedIn profile"
    },
    form: {
      label: "Contact form",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
      subject: "Enquiry via website",
      sending: "Sending…",
      mailtoNote: "Your email program has opened with your message — just press send.",
      sent: "Thank you — your message has been sent. I'll get back to you soon.",
      error: "Sorry, the message could not be sent. Please email me directly.",
      doneTitleMail: "Almost there",
      doneTitleSent: "Thank you",
      again: "Write another message"
    }
  },

  notFound: {
    label: "Error 404",
    title: "Page not found",
    text: "The page you're looking for doesn't exist or may have moved.",
    button: "Back to homepage"
  },

  // Legal notice (Impressum) & privacy policy — a template: have it checked for your country.
  legal: {
    label: "Legal",
    title: "Legal notice & privacy",
    noticeTitle: "Legal notice",
    noticeIntro: "Information about the provider of this website.",
    labels: {
      name: "Name",
      address: "Address",
      email: "Email",
      phone: "Phone",
      businessId: "Business registration",
      vatId: "VAT ID",
      responsible: "Responsible for content"
    },
    privacyTitle: "Privacy policy",
    privacy: [
      {
        title: "Who is responsible",
        text: ["The controller responsible for processing personal data on this website is the person named in the legal notice above."]
      },
      {
        title: "Hosting",
        text: [
          "This website is hosted on GitHub Pages, a service of GitHub, Inc., USA. When you visit the site, GitHub automatically processes technical data such as your IP address, the date and time of access and the pages requested, in order to deliver the website and keep it secure.",
          "The legal basis is Art. 6(1)(f) GDPR (legitimate interest in providing a secure, working website). For details, see GitHub's privacy statement."
        ]
      },
      {
        title: "When you contact me",
        text: [
          "If you contact me by email, phone, LinkedIn or the contact form on this website, I process the details you provide (such as your name, contact details and message) to answer your enquiry and, where relevant, to prepare a possible engagement.",
          "The legal basis is Art. 6(1)(b) GDPR (steps prior to entering into a contract) and Art. 6(1)(f) GDPR (legitimate interest in responding to enquiries). I delete this data once it is no longer needed, unless I am legally required to keep it."
        ]
      },
      {
        title: "No cookies, no tracking",
        text: [
          "This website does not use cookies, analytics or tracking tools.",
          "Your language choice (English or German) is stored only in your own browser so the site remembers it on your next visit. It is never sent to me or to anyone else."
        ]
      },
      {
        title: "Fonts",
        text: ["All fonts are stored on this website itself. No connection is made to external font services such as Google Fonts."]
      },
      {
        title: "Links to other websites",
        text: ["This website links to my LinkedIn profile. LinkedIn only receives data about you if you click the link, and its own privacy policy then applies."]
      },
      {
        title: "Your rights",
        text: [
          "You have the right to access, correct or delete your personal data, to restrict or object to its processing, and to data portability. To exercise these rights, contact me using the details above.",
          "You also have the right to lodge a complaint with a data protection supervisory authority."
        ]
      }
    ],
    authorityLabel: "Supervisory authority",
    updatedLabel: "Last updated"
  },

  detail: {
    backProjects: "All projects",
    backCases: "All case studies",
    otherProjects: "More projects",
    notFound: "This page could not be found.",
    ctaTitle: "Facing a similar challenge?",
    ctaText: "Let's talk about your project and whether an independent perspective can help.",
    cta: "Let's Discuss Your Challenge",
    relatedService: "Related service"
  },

  footer: {
    rights: "All rights reserved.",
    legal: "Legal notice & privacy",
    top: "Back to top"
  }
};
