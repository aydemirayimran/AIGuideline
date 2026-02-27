function byId(id) { return document.getElementById(id); }

const contactForm = byId("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    byId("contactStatus").textContent = "Takk! Meldingen er registrert (DB kobles på senere).";
    contactForm.reset();
  });
}

const feedbackForm = byId("feedbackForm");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", (e) => {
    e.preventDefault();
    byId("feedbackStatus").textContent = "Takk for feedback! (DB kobles på senere).";
    feedbackForm.reset();
  });
}
