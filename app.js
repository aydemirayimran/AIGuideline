console.log("app.js loaded");

function byId(id) {
  return document.getElementById(id);
}

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = byId("contactForm");
  const contactStatus = byId("contactStatus");

  if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      contactStatus.textContent = "Takk! Meldingen er registrert (DB kobles på senere).";
      contactForm.reset();
    });
  }

  const feedbackForm = byId("feedbackForm");
  const feedbackStatus = byId("feedbackStatus");

  if (feedbackForm && feedbackStatus) {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      feedbackStatus.textContent = "Takk for feedback! (DB kobles på senere).";
      feedbackForm.reset();
    });
  }
});
