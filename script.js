document.getElementById("year").textContent = new Date().getFullYear();

const revealElements = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("main section[id]");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

const closeMenu = () => {
  if (!menuToggle || !primaryNavigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  primaryNavigation.classList.remove("is-open");
};

if (menuToggle && primaryNavigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    primaryNavigation.classList.toggle("is-open", !isOpen);
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) closeMenu();
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("is-visible"));
}

const setActiveNav = () => {
  const headerOffset = 120;
  const currentSection = Array.from(sections).reduce((current, section) => {
    return section.offsetTop - headerOffset <= window.scrollY ? section : current;
  }, sections[0]);

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${currentSection.id}`);
  });
};

if (sections.length) {
  setActiveNav();
  window.addEventListener("scroll", setActiveNav, { passive: true });
  window.addEventListener("resize", setActiveNav);
}
