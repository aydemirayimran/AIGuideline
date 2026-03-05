console.log("app.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobilmeny
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  if (!toggle || !menu) {
    console.warn("Mobilmeny-elementer ikke funnet!");
  } else {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
  }

  // 2. Rollevelger
  const roleButtons = document.querySelectorAll('.role-btn');
  if (roleButtons.length === 0) {
    console.warn("Ingen rollevelger-knapper funnet!");
  } else {
    roleButtons.forEach(button => {
      button.addEventListener('click', function() {
        roleButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const selectedRole = this.getAttribute('data-role');
        filterContentByRole(selectedRole);
      });
    });
  }

  function filterContentByRole(role) {
    const allCards = document.querySelectorAll('.card[data-role]');
    allCards.forEach(card => {
      const cardRoles = card.getAttribute('data-role').split(' ');
      if (cardRoles.includes('student') && cardRoles.includes('staff')) {
        card.style.display = 'block';
      } else {
        card.style.display = cardRoles.includes(role) ? 'block' : 'none';
      }
    });
  }

  // 3. Lukk mobilmeny ved klikk
  const menuLinks = document.querySelectorAll('.nav a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menu && menu.classList.contains('open')) {
        menu.classList.remove('open');
      }
    });
  });

  // 4. Lukk meny ved klikk utenfor (valgfritt)
  document.addEventListener('click', (event) => {
    if (menu && menu.classList.contains('open') && !event.target.closest('.nav')) {
      menu.classList.remove('open');
    }
  });
  // Markér aktiv lenke i menyen
const currentPath = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
  const linkPath = link.getAttribute('href');
  if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
    link.setAttribute('aria-current', 'page');
  } else {
    link.removeAttribute('aria-current');
  }
});
function nextStep(answer) {
  const currentStep = document.querySelector('.guide-step:not([style*="display: none"])');
  const currentStepId = currentStep.id;
  const resultText = document.getElementById("result-text");

  // Skjul gjeldende steg
  currentStep.style.display = "none";

  // Logikk for å bestemme neste steg eller resultat
  if (currentStepId === "step1") {
    if (answer === "no") {
      showResult("Du har valgt å ikke bruke AI. Bra! Husk å vurdere AI som støtte til læring.");
    } else {
      document.getElementById("step2").style.display = "block";
    }
  } else if (currentStepId === "step2") {
    if (answer === "no") {
      document.getElementById("step3").style.display = "block";
    } else {
      document.getElementById("step4").style.display = "block";
    }
  } else if (currentStepId === "step3") {
    if (answer === "allowed") {
      showResult("AI kan brukes som støtte til læring. Husk å følge lokale retningslinjer.");
    } else {
      showResult("Det er ikke tillatt å levere AI-generert innhold uten egen bearbeidelse.");
    }
  } else if (currentStepId === "step4") {
    if (answer === "no") {
      showResult("Sjekk emnebeskrivelse eller spør faglærer om AI-bruk er tillatt.");
    } else {
      document.getElementById("step5").style.display = "block";
    }
  } else if (currentStepId === "step5") {
    if (answer === "yes") {
      showResult("Ikke lever personopplysninger eller sensitiv informasjon til AI-verktøy.");
    } else {
      document.getElementById("step6").style.display = "block";
    }
  } else if (currentStepId === "step6") {
    if (answer === "yes") {
      showResult("Du har fulgt retningslinjene for ansvarlig AI-bruk. Bra jobbet!");
    } else {
      showResult("Husk å oppgi bruk av AI der det er påkrevd.");
    }
  }
}

function showResult(text) {
  const resultElement = document.getElementById("result");
  const resultText = document.getElementById("result-text");
  resultText.textContent = text;
  resultElement.style.display = "block";
}
function nextStep(answer) {
  const currentStep = document.querySelector('.guide-step:not([style*="display: none"])');
  const currentStepId = currentStep.id;
  const resultText = document.getElementById("result-text");

  // Skjul gjeldende steg
  currentStep.style.display = "none";

  // Logikk for å bestemme neste steg eller resultat
  if (currentStepId === "step1") {
    if (answer === "no") {
      showResult("Du har valgt å ikke bruke AI. Bra! Husk å vurdere AI som støtte til læring.");
    } else {
      document.getElementById("step2").style.display = "block";
    }
  } else if (currentStepId === "step2") {
    if (answer === "no") {
      document.getElementById("step3").style.display = "block";
    } else {
      document.getElementById("step4").style.display = "block";
    }
  } else if (currentStepId === "step3") {
    if (answer === "allowed") {
      showResult("AI kan brukes som støtte til læring. Husk å følge lokale retningslinjer.");
    } else {
      showResult("Det er ikke tillatt å levere AI-generert innhold uten egen bearbeidelse.");
    }
  } else if (currentStepId === "step4") {
    if (answer === "no") {
      showResult("Sjekk emnebeskrivelse eller spør faglærer om AI-bruk er tillatt.");
    } else {
      document.getElementById("step5").style.display = "block";
    }
  } else if (currentStepId === "step5") {
    if (answer === "yes") {
      showResult("Ikke lever personopplysninger eller sensitiv informasjon til AI-verktøy.");
    } else {
      document.getElementById("step6").style.display = "block";
    }
  } else if (currentStepId === "step6") {
    if (answer === "yes") {
      showResult("Du har fulgt retningslinjene for ansvarlig AI-bruk. Bra jobbet!");
    } else {
      showResult("Husk å oppgi bruk av AI der det er påkrevd.");
    }
  }
}

function showResult(text) {
  const resultElement = document.getElementById("result");
  const resultText = document.getElementById("result-text");
  resultText.textContent = text;
  resultElement.style.display = "block";
}

});
