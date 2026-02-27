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

  // 2. Rollevelger
  const roleButtons = document.querySelectorAll('.role-btn');
  if (roleButtons.length > 0) {
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
      card.style.display = cardRoles.includes(role) ? 'block' : 'none';
    });
  }

  // 3. Lukk mobilmeny når man klikker på et menypunkt
  const menuLinks = document.querySelectorAll('.nav a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (menu && menu.classList.contains('open')) {
        menu.classList.remove('open');
      }
    });
  });

});
