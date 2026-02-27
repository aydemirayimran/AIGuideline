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

});
