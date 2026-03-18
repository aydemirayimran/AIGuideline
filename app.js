console.log("app.js loaded");

document.addEventListener("DOMContentLoaded", () => {

  // ─── 1. Slide-in mobilmeny ───
  const toggle   = document.getElementById("menuToggle");
  const sideMenu = document.getElementById("sideMenu");
  const overlay  = document.getElementById("navOverlay");
  const closeBtn = document.getElementById("menuClose");

  function openMenu() {
    sideMenu?.classList.add("open");
    overlay?.classList.add("active");
    toggle?.classList.add("open");
    sideMenu?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // hindre scrolling bak menyen
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
