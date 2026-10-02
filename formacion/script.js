"use strict";


/* =========================================================
   HEBE STUDIO — FORMACIÓN
   ========================================================= */


/* =========================================================
   1. MODO CLARO / OSCURO
   ========================================================= */

(function () {

  const root =
    document.documentElement;

  const button =
    document.getElementById(
      "theme-toggle"
    );

  const themeColor =
    document.getElementById(
      "theme-color"
    );


  function applyTheme(
    theme,
    save = true
  ) {

    root.setAttribute(
      "data-theme",
      theme
    );


    if (save) {

      localStorage.setItem(
        "hebe-theme",
        theme
      );

    }


    if (themeColor) {

      themeColor.setAttribute(

        "content",

        theme === "dark"
          ? "#0d0d0d"
          : "#ffffff"

      );

    }


    if (button) {

      const isDark =
        theme === "dark";


      button.setAttribute(
        "aria-pressed",
        isDark
          ? "true"
          : "false"
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
    localStorage.getItem(
      "hebe-theme"
    );


  const systemDark =
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;


  const initialTheme =
    savedTheme ||
    (
      systemDark
        ? "dark"
        : "light"
    );


  applyTheme(
    initialTheme,
    false
  );


  if (!button) {
    return;
  }


  button.addEventListener(
    "click",
    function () {

      const currentTheme =
        root.getAttribute(
          "data-theme"
        );


      const newTheme =
        currentTheme === "dark"
          ? "light"
          : "dark";


      applyTheme(
        newTheme
      );

    }
  );

})();


/* =========================================================
   2. SCROLL SUAVE PARA NAVEGACIÓN INTERNA
   ========================================================= */

(function () {

  const links =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  links.forEach(
    function (link) {

      link.addEventListener(
        "click",
        function (event) {

          const href =
            link.getAttribute("href");


          if (
            !href ||
            href === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              href
            );


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    }
  );

})();


/* =========================================================
   3. ANIMACIONES AL HACER SCROLL
   ========================================================= */

(function () {

  const elements =
    document.querySelectorAll(
      ".reveal"
    );


  if (!elements.length) {
    return;
  }


  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    reducedMotion ||
    !(
      "IntersectionObserver"
      in window
    )
  ) {

    elements.forEach(
      function (element) {

        element.classList.add(
          "in-view"
        );

      }
    );

    return;

  }


  const observer =
    new IntersectionObserver(

      function (entries) {

        entries.forEach(
          function (entry) {

            if (
              entry.isIntersecting
            ) {

              entry.target
                .classList
                .add(
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
        rootMargin:
          "0px 0px -6% 0px"
      }

    );


  elements.forEach(
    function (element) {

      observer.observe(
        element
      );

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


  let lastFocusedElement =
    null;


  function openLightbox(
    src,
    alt,
    trigger
  ) {

    lastFocusedElement =
      trigger;


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


    lightboxImage.setAttribute(
      "alt",
      ""
    );


    if (
      lastFocusedElement &&
      typeof lastFocusedElement.focus
        === "function"
    ) {

      lastFocusedElement.focus();

    }

  }


  triggers.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const certificate =
            button.querySelector(
              "img"
            );


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

      if (
        event.target ===
        lightbox
      ) {

        closeLightbox();

      }

    }
  );


  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key ===
          "Escape" &&
        lightbox.classList
          .contains("open")
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


/* =========================================================
   6. FLECHA VOLVER ARRIBA
   ========================================================= */

(function () {

  const button =
    document.getElementById(
      "back-to-top"
    );


  if (!button) {
    return;
  }


  function updateButton() {

    if (
      window.scrollY > 500
    ) {

      button.classList.add(
        "visible"
      );

    } else {

      button.classList.remove(
        "visible"
      );

    }

  }


  window.addEventListener(
    "scroll",
    updateButton,
    {
      passive: true
    }
  );


  updateButton();


  button.addEventListener(
    "click",
    function () {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

})();


/* =========================================================
   7. NAVEGACIÓN ACTIVA SEGÚN LA SECCIÓN
   ========================================================= */

(function () {

  const sections =
    document.querySelectorAll(
      "#formacion, #trayectoria, #enfoque, #contacto"
    );


  const desktopLinks =
    document.querySelectorAll(
      '.main-nav a[href^="#"]'
    );


  const mobileLinks =
    document.querySelectorAll(
      ".mobile-nav-item[data-section]"
    );


  if (!sections.length) {
    return;
  }


  function setActiveSection(
    sectionId
  ) {


    desktopLinks.forEach(
      function (link) {

        const href =
          link.getAttribute(
            "href"
          );


        link.classList.toggle(
          "active",
          href ===
            "#" + sectionId
        );

      }
    );


    mobileLinks.forEach(
      function (link) {

        link.classList.toggle(

          "active",

          link.dataset.section ===
            sectionId

        );

      }
    );

  }


  const observer =
    new IntersectionObserver(

      function (entries) {

        const visibleEntries =
          entries
            .filter(
              function (entry) {
                return entry.isIntersecting;
              }
            )
            .sort(
              function (a, b) {
                return (
                  b.intersectionRatio -
                  a.intersectionRatio
                );
              }
            );


        if (
          !visibleEntries.length
        ) {
          return;
        }


        const activeSection =
          visibleEntries[0]
            .target
            .id;


        setActiveSection(
          activeSection
        );

      },

      {
        root: null,

        rootMargin:
          "-20% 0px -55% 0px",

        threshold: [
          0,
          0.1,
          0.25,
          0.5
        ]
      }

    );


  sections.forEach(
    function (section) {

      observer.observe(
        section
      );

    }
  );


  setActiveSection(
    "formacion"
  );

})();