/*
 * SITE CONFIGURATION — language-independent settings.
 *
 * Contact details live here once and are used on every page and in every language.
 * Replace each "[TO BE FILLED IN]" value with the real one.
 *
 * To add a language (e.g. French):
 *   1. Copy content/en.js to content/fr.js and change SITE_CONTENT.en to SITE_CONTENT.fr
 *   2. Translate the text values (keep the keys and the "id" / "category" / "url" values unchanged)
 *   3. Add { code: "fr", label: "FR", name: "Français" } to the languages list below
 *   4. Add <script src="content/fr.js"></script> to index.html, project.html and case-study.html
 */
window.SITE_CONFIG = {
  defaultLanguage: "en",

  languages: [
    { code: "en", label: "EN", name: "English" },
    { code: "de", label: "DE", name: "Deutsch" }
  ],

  person: {
    brand: "Olberg Consulting",         // brand name (footer, page titles); the header logo is images/logo-olberg.svg
    name: "[TO BE FILLED IN: Full name]",
    email: "[TO BE FILLED IN]",          // e.g. "name@example.com"
    phone: "[TO BE FILLED IN]",          // e.g. "+49 123 456789" (international format)
    linkedin: "[TO BE FILLED IN]"        // e.g. "https://www.linkedin.com/in/your-profile"
  },

  // Contact form. Leave empty: "Send" opens the visitor's email program with the message filled in,
  // addressed to person.email (no third-party service involved).
  // Optional: paste a form-service endpoint (e.g. "https://formspree.io/f/xxxxxxx") to receive messages
  // without the visitor's email program — then also mention that service in the privacy policy.
  formEndpoint: "",

  // Shown on the "Legal notice & privacy" page (legal.html)
  legal: {
    address: "[TO BE FILLED IN: Street and number, postcode, city, country]",
    businessId: "[TO BE FILLED IN: business registration number, e.g. IČO or trade register entry]",
    vatId: "[TO BE FILLED IN: VAT ID, or delete this line's value if you have none]",
    authority: "[TO BE FILLED IN: data protection authority of your country, with website]",
    updated: "[TO BE FILLED IN: date of last update]"
  }
};
