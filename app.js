console.log("app.js loaded");

// Hjelpefunksjoner
function byId(id) {
  return document.getElementById(id);
}

// Vent på at DOM er lastet
document.addEventListener("DOMContentLoaded", () => {

  // 1. Mobilmeny
  const toggle = byId("menuToggle");
  const menu = byId("menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
  }

  // 2. Søkefunksjon
  const searchInput = byId("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keyup", function() {
      const filter = this.value.toLowerCase();
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(filter) ? 'block' : 'none';
      });
    });
  }

  // 3. "Les mer"-funksjonalitet
  const readMoreButtons = document.querySelectorAll('.read-more');
  readMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const fullText = this.parentNode.querySelector('.full-text');
      const shortText = this.parentNode.querySelector('.short-text');
      if (fullText && shortText) {
        if (fullText.style.display === 'none' || fullText.style.display === '') {
          fullText.style.display = 'block';
          shortText.style.display = 'none';
          this.textContent = 'Les mindre';
        } else {
          fullText.style.display = 'none';
          shortText.style.display = 'block';
          this.textContent = 'Les mer';
        }
      }
    });
  });

  // 4. Mini-quiz
  const quizOptions = document.querySelectorAll('.quiz-option');
  quizOptions.forEach(option => {
    option.addEventListener('click', function() {
      const answer = this.getAttribute('data-answer');
      const result = byId('quiz-result');
      if (result) {
        if (answer === '1') {
          result.textContent = 'Du bør lese våre praktiske tips for å bli tryggere!';
        } else if (answer === '2') {
          result.textContent = 'Bra! Men sjekk gjerne våre eksempler for å bli enda tryggere.';
        } else {
          result.textContent = 'Flott! Kanskje du kan hjelpe andre studenter?';
        }
      }
    });
  });

  // 5. Interaktive kort (tiles)
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => {
    tile.addEventListener('click', function() {
      // Eksempel: Vis en alert eller navigér til lenke
      const link = this.getAttribute('href');
      if (link) {
        window.location.href = link;
      }
    });
  });

  // 6. Kontakt- og feedback-skjemahåndtering
  const contactForm = byId("contactForm");
  const contactStatus = byId("contactStatus");
  if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      contactStatus.textContent = "Takk! Meldingen er registrert (DB kobles på senere).";
      contactForm.reset();
      setTimeout(() => {
        contactStatus.textContent = "";
      }, 5000);
    });
  }

  const feedbackForm = byId("feedbackForm");
  const feedbackStatus = byId("feedbackStatus");
  if (feedbackForm && feedbackStatus) {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      feedbackStatus.textContent = "Takk for feedback! (DB kobles på senere).";
      feedbackForm.reset();
      setTimeout(() => {
        feedbackStatus.textContent = "";
      }, 5000);
    });
  }

  // 7. Lukk mobilmeny når man klikker på et menypunkt
  const menuLinks = document.querySelectorAll('.nav a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menu && menu.classList.contains('open')) {
        menu.classList.remove('open');
      }
    });
  });

});
