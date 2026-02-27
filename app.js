console.log("app.js loaded");

function byId(id) {
  return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", () => {
  // Mobilmeny
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
  }

  // Kontakt + feedback (det du allerede har)
  const contactForm = document.getElementById("contactForm");
  const contactStatus = document.getElementById("contactStatus");
  if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      contactStatus.textContent = "Takk! Meldingen er registrert (DB kobles på senere).";
      contactForm.reset();
    });
  }

  const feedbackForm = document.getElementById("feedbackForm");
  const feedbackStatus = document.getElementById("feedbackStatus");
  if (feedbackForm && feedbackStatus) {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      feedbackStatus.textContent = "Takk for feedback! (DB kobles på senere).";
      feedbackForm.reset();
    });
  }
});
