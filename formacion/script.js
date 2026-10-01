"use strict";

/* =========================================================
   HEBE STUDIO — FORMACIÓN
   ========================================================= */


/* =========================================================
   1. MODO CLARO / OSCURO
   ========================================================= */

(function () {

  const root = document.documentElement;
  const button = document.getElementById("theme-toggle");
  const themeColor = document.getElementById("theme-color");

  function applyTheme(theme, save = true) {

    root.setAttribute("data-theme", theme);

    if (save) {
      localStorage.setItem("hebe-theme", theme);
    }

    if (themeColor) {
      themeColor.setAttribute(
        "content",
        theme === "dark" ? "#0d0d0d" : "#ffffff"
      );
    }

    if (button) {

      const isDark = theme === "dark";

      button.setAttribute(
        "aria-pressed",
        isDark ? "true" : "false"
      );

      button.setAttribute(
        "aria-label",
        isDark
          ? "Cambiar a modo claro"
          : "Cambiar a modo oscuro"
      );

    }

  }

  const savedTheme =
    localStorage.getItem("hebe-theme");

  const systemDark =
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

  const initialTheme =
    savedTheme ||
    (systemDark ? "dark" : "light");

  applyTheme(initialTheme, false);

  if (!button) {
    return;
  }

  button.addEventListener(
    "click",
    function () {

      const currentTheme =
        root.getAttribute("data-theme");

      const newTheme =
        currentTheme === "dark"
          ? "light"
          : "dark";

      applyTheme(newTheme);

    }
  );

})();


/* =========================================================
   2. MENÚ RESPONSIVE
   ========================================================= */

(function () {

  const menuButton =
    document.getElementById("menu-button");

  const navigation =
    document.getElementById("main-navigation");

  if (!menuButton || !navigation) {
    return;
  }

  function openMenu() {

    navigation.classList.add("open");
    menuButton.classList.add("active");

    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );

    menuButton.setAttribute(
      "aria-label",
      "Cerrar menú"
    );

    document.body.classList.add(
      "menu-open"
    );

  }

  function closeMenu() {

    navigation.classList.remove("open");
    menuButton.classList.remove("active");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Abrir menú"
    );

    document.body.classList.remove(
      "menu-open"
    );

  }

  menuButton.addEventListener(
    "click",
    function () {

      const isOpen =
        navigation.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    }
  );

  navigation
    .querySelectorAll("a")
    .forEach(function (link) {

      link.addEventListener(
        "click",
        closeMenu
      );

    });

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        navigation.classList.contains("open")
      ) {

        closeMenu();
        menuButton.focus();

      }

    }
  );

  window.addEventListener(
    "resize",
    function () {

      if (
        window.innerWidth > 850 &&
        navigation.classList.contains("open")
      ) {

        closeMenu();

      }

    }
  );

})();


/* =========================================================
   3. ANIMACIONES AL HACER SCROLL
   ========================================================= */

(function () {

  const elements =
    document.querySelectorAll(".reveal");

  if (!elements.length) {
    return;
  }

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (
    reducedMotion ||
    !("IntersectionObserver" in window)
  ) {

    elements.forEach(function (element) {
      element.classList.add("in-view");
    });

    return;

  }

  const observer =
    new IntersectionObserver(

      function (entries) {

        entries.forEach(
          function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "in-view"
              );

              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },

      {
        threshold: 0.12,
        rootMargin: "0px 0px -6% 0px"
      }

    );

  elements.forEach(
    function (element) {
      observer.observe(element);
    }
  );

})();


/* =========================================================
   4. LIGHTBOX DE CERTIFICADOS
   ========================================================= */

(function () {

  const lightbox =
    document.getElementById(
      "formation-lightbox"
    );

  const lightboxImage =
    document.getElementById(
      "formation-lightbox-image"
    );

  const closeButton =
    document.getElementById(
      "formation-lightbox-close"
    );

  const triggers =
    document.querySelectorAll(
      ".formation-lightbox-trigger"
    );

  if (
    !lightbox ||
    !lightboxImage ||
    !closeButton
  ) {
    return;
  }

  let lastFocusedElement = null;

  function openLightbox(
    src,
    alt,
    trigger
  ) {

    lastFocusedElement = trigger;

    lightboxImage.setAttribute(
      "src",
      src
    );

    lightboxImage.setAttribute(
      "alt",
      alt || "Certificado"
    );

    lightbox.classList.add(
      "open"
    );

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "formation-modal-open"
    );

    closeButton.focus();

  }

  function closeLightbox() {

    lightbox.classList.remove(
      "open"
    );

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "formation-modal-open"
    );

    lightboxImage.setAttribute(
      "src",
      ""
    );

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }

  }

  triggers.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const certificate =
            button.querySelector("img");

          if (!certificate) {
            return;
          }

          openLightbox(

            certificate.getAttribute(
              "src"
            ),

            certificate.getAttribute(
              "alt"
            ),

            button

          );

        }
      );

    }
  );

  closeButton.addEventListener(
    "click",
    closeLightbox
  );

  lightbox.addEventListener(
    "click",
    function (event) {

      if (event.target === lightbox) {
        closeLightbox();
      }

    }
  );

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        lightbox.classList.contains("open")
      ) {

        closeLightbox();

      }

    }
  );

})();


/* =========================================================
   5. AÑO AUTOMÁTICO
   ========================================================= */

(function () {

  const year =
    document.getElementById(
      "current-year"
    );

  if (!year) {
    return;
  }

  year.textContent =
    new Date().getFullYear();

})();