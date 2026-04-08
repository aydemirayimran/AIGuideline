console.log("app.js loaded");

// ─── i18next Initialisering ───
i18next
  .use(i18nextHttpBackend)
  .init({
    lng: 'no',
    fallbackLng: 'no',
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    returnObjects: true,
  })
  .then(() => {
    updateContent();
  });

// Oppdater innholdet basert på valgt språk
function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (key.startsWith('[placeholder]')) {
      const placeholderKey = key.replace('[placeholder]', '');
      element.setAttribute('placeholder', i18next.t(placeholderKey));
    } else {
      element.textContent = i18next.t(key);
    }
  });
}

// Bytt språk
function changeLanguage(lng) {
  i18next.changeLanguage(lng, (err, t) => {
    if (err) return console.log('something went wrong loading', err);
    updateContent();
  });
}

// ─── 1. Slide-in mobilmeny ───
document.addEventListener("DOMContentLoaded", () => {

  const toggle   = document.getElementById("menuToggle");
  const sideMenu = document.getElementById("sideMenu");
  const overlay  = document.getElementById("navOverlay");
  const closeBtn = document.getElementById("menuClose");

  function openMenu() {
    sideMenu?.classList.add("open");
    overlay?.classList.add("active");
    toggle?.classList.add("open");
    sideMenu?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    sideMenu?.classList.remove("open");
    overlay?.classList.remove("active");
    toggle?.classList.remove("open");
    sideMenu?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  toggle?.addEventListener("click", () => {
    sideMenu?.classList.contains("open") ? closeMenu() : openMenu();
  });

  closeBtn?.addEventListener("click", closeMenu);
  overlay?.addEventListener("click", closeMenu);

  // Lukk med Escape-tasten
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Lukk når en menylenke klikkes
  document.querySelectorAll(".side-menu a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // ─── 2. Rollevelger ───
  const roleButtons = document.querySelectorAll(".role-btn");
  if (roleButtons.length > 0) {
    roleButtons.forEach(button => {
      button.addEventListener("click", function () {
        roleButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        filterContentByRole(this.getAttribute("data-role"));
      });
    });
  }

  function filterContentByRole(role) {
    document.querySelectorAll(".card[data-role]").forEach(card => {
      const cardRoles = card.getAttribute("data-role").split(" ");
      card.style.display = cardRoles.includes(role) ? "block" : "none";
    });
  }

});

// ─── SITE_PAGES og søkefunksjon ───
const SITE_PAGES = [
  {
    title: "Hjem – AI Guidebook",
    url: "index.html",
    description: "Forside med veiviser, rollevelger og introduksjon til ansvarlig bruk av KI.",
    keywords: ["hjem", "veiviser", "student", "fagpersonale", "ansvarlig bruk", "AI", "KI", "intro"]
  },
  {
    title: "FAQ – Vanlige spørsmål om KI",
    url: "faq.html",
    description: "Spørsmål og svar om hva KI er, når du må oppgi KI-bruk, hallusinasjoner, kildekritikk og prompt engineering.",
    keywords: ["FAQ", "vanlige spørsmål", "hallusinasjoner", "prompt engineering", "kildekritikk", "akademisk integritet"]
  },
  {
    title: "Praktiske tips – Bruk av KI i studier",
    url: "tips.html",
    description: "Konkrete tips om oppgaveskriving, kildebruk, etikk, personvern og prompt engineering.",
    keywords: ["tips", "oppgaveskriving", "kilder", "personvern", "plagiat", "prompt", "prompt engineering"]
  },
  {
    title: "Test deg selv – Quiz om ansvarlig KI-bruk",
    url: "quiz.html",
    description: "Quiz som tester kunnskap om etikk, personvern, KI-hallusinasjoner og akademisk integritet.",
    keywords: ["quiz", "test deg selv", "etikk", "personvern", "hallusinasjoner", "regler", "fusk"]
  },
  {
    title: "Nyttige lenker – Ressurser om KI",
    url: "links.html",
    description: "Lenker til KI-verktøy, akademisk integritet, offisielle retningslinjer og læringsressurser.",
    keywords: ["lenker", "ressurser", "OpenAI", "Søk & Skriv", "plagiarism", "USN", "regjeringen"]
  },
  {
    title: "Kontakt oss – AI Guidebook",
    url: "contact.html",
    description: "Kontaktinformasjon, e-post, telefon, kontaktskjema og besøk hos AI Guidebook.",
    keywords: ["kontakt", "e-post", "telefon", "kontaktskjema", "campus", "USN"]
  },
  {
    title: "Undervisningstips – For fagpersonale",
    url: "teaching-tips.html",
    description: "Undervisningstips for fagpersonale om å integrere KI i emner, oppgaver og gruppearbeid.",
    keywords: ["undervisning", "fagpersonale", "lærere", "emner", "oppgaver", "gruppearbeid"]
  },
  {
    title: "Vurderingsretningslinjer – AI i vurdering",
    url: "vurderingsretningslinjer.html",
    description: "Retningslinjer for AI-bruk i oppgaver, eksamen, deteksjon og håndtering av brudd.",
    keywords: ["vurdering", "eksamen", "retningslinjer", "fusk", "AI-deteksjon", "policy"]
  },
  {
    title: "Policy og maler – Institusjon, oppgaver, eksamen, etikk",
    url: "PolicyMaler.html",
    description: "Maler for institusjonspolicy, oppgaver, eksamen, dokumentasjon av AI-bruk og etiske retningslinjer.",
    keywords: ["policy", "maler", "institusjon", "eksamen", "oppgaver", "etikk", "dokumentasjon"]
  }
];

// GLOBAL SØKEFUNKSJON – søker i SITE_PAGES og viser treff som lenker
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('globalSearch');
  const resultsList = document.getElementById('searchResults');

  if (!searchInput || !resultsList || typeof SITE_PAGES === 'undefined') {
    return;
  }

  let lastMatches = [];

  function runSearch() {
    const query = searchInput.value.trim().toLowerCase();
    resultsList.innerHTML = '';
    lastMatches = [];

    if (query.length === 0) {
      return;
    }

    // Finn treff i indeksen
    const matches = SITE_PAGES.filter(page => {
      const inTitle = page.title.toLowerCase().includes(query);
      const inDesc = page.description.toLowerCase().includes(query);
      const inKeywords = page.keywords.some(keyword =>
        keyword.toLowerCase().includes(query)
      );
      return inTitle || inDesc || inKeywords;
    });

    lastMatches = matches;

    if (matches.length === 0) {
      const li = document.createElement('li');
      li.textContent = i18next.t('no_search_results', { query: query });
      resultsList.appendChild(li);
      return;
    }

    // Vis treff som klikkbare lenker
    matches.forEach(page => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = page.url;

      const titleSpan = document.createElement('span');
      titleSpan.className = 'result-title';
      titleSpan.textContent = page.title;

      const descP = document.createElement('p');
      descP.className = 'result-description';
      descP.textContent = page.description;

      a.appendChild(titleSpan);
      a.appendChild(descP);
      li.appendChild(a);
      resultsList.appendChild(li);
    });
  }

  // Søk mens du skriver
  searchInput.addEventListener('input', runSearch);

  // Hopp til første treff med Enter
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (lastMatches.length === 0 && searchInput.value.trim() !== '') {
        runSearch();
      }

      if (lastMatches.length > 0) {
        window.location.href = lastMatches[0].url;
      }
    }
  });
});
