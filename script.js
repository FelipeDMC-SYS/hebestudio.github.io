"use strict";


/* =========================================================
   CONFIGURACIÓN
   ========================================================= */

const HEBE_CONFIG = {

  whatsapp: "523313999062",

  address:
    "Juan Valle Nte 23, La Cadena, 48570 Tenamaxtlán, Jalisco"

};


/* =========================================================
   LIGHT / DARK MODE
   ========================================================= */

(function () {

  const themeToggle =
    document.getElementById(
      "theme-toggle"
    );

  const themeColor =
    document.querySelector(
      'meta[name="theme-color"]'
    );


  if (!themeToggle) {
    return;
  }


  function getTheme() {

    const savedTheme =
      localStorage.getItem(
        "hebe-theme"
      );


    if (
      savedTheme === "light" ||
      savedTheme === "dark"
    ) {

      return savedTheme;

    }


    return window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";

  }


  function applyTheme(theme) {

    const isDark =
      theme === "dark";


    document.documentElement
      .setAttribute(
        "data-theme",
        theme
      );


    themeToggle.setAttribute(
      "aria-label",
      isDark
        ? "Cambiar a modo claro"
        : "Cambiar a modo oscuro"
    );


    themeToggle.setAttribute(
      "aria-pressed",
      isDark
        ? "true"
        : "false"
    );


    if (themeColor) {

      themeColor.setAttribute(
        "content",
        isDark
          ? "#0b0b0b"
          : "#ffffff"
      );

    }

  }


  applyTheme(
    getTheme()
  );


  themeToggle.addEventListener(
    "click",
    function () {

      const currentTheme =
        document.documentElement
          .getAttribute(
            "data-theme"
          );


      const newTheme =
        currentTheme === "dark"
          ? "light"
          : "dark";


      localStorage.setItem(
        "hebe-theme",
        newTheme
      );


      applyTheme(
        newTheme
      );

    }
  );

})();


/* =========================================================
   SERVICE CATEGORY TABS — BROWS / LIPS / LASHES
   ========================================================= */

(function () {
  const tabs = Array.from(document.querySelectorAll(".service-tab"));
  const categories = Array.from(document.querySelectorAll(".service-category"));
  if (!tabs.length || !categories.length) return;

  function activateTab(selectedTab, focus = false) {
    const category = selectedTab.dataset.category;
    tabs.forEach(function (tab) {
      const isActive = tab === selectedTab;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    categories.forEach(function (panel) {
      const isActive = panel.dataset.category === category;
      panel.classList.toggle("active", isActive);
      panel.querySelectorAll(".service-card.open").forEach(function (card) {
        if (!isActive) closeServiceCard(card);
      });
    });

    if (focus) selectedTab.focus();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () { activateTab(tab); });
    tab.addEventListener("keydown", function (event) {
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      activateTab(tabs[next], true);
    });
  });
})();


/* =========================================================
   SERVICE ACCORDIONS
   ========================================================= */

function closeServiceCard(card) {

  const button =
    card.querySelector(
      ".service-header"
    );


  const content =
    card.querySelector(
      ".service-content"
    );


  card.classList.remove(
    "open"
  );


  if (button) {

    button.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  if (content) {

    content.style.maxHeight =
      null;

  }

}


(function () {

  const cards =
    document.querySelectorAll(
      ".service-card"
    );


  cards.forEach(
    function (card) {

      const button =
        card.querySelector(
          ".service-header"
        );


      const content =
        card.querySelector(
          ".service-content"
        );


      if (
        !button ||
        !content
      ) {
        return;
      }


      button.addEventListener(
        "click",
        function () {

          const currentlyOpen =
            card.classList.contains(
              "open"
            );


          cards.forEach(
            function (otherCard) {

              if (
                otherCard !== card
              ) {

                closeServiceCard(
                  otherCard
                );

              }

            }
          );


          if (currentlyOpen) {

            closeServiceCard(
              card
            );

            return;

          }


          card.classList.add(
            "open"
          );


          button.setAttribute(
            "aria-expanded",
            "true"
          );


          content.style.maxHeight =
            content.scrollHeight +
            "px";

        }
      );

    }
  );


  window.addEventListener(
    "resize",
    function () {

      document
        .querySelectorAll(
          ".service-card.open"
        )
        .forEach(
          function (card) {

            const content =
              card.querySelector(
                ".service-content"
              );


            if (content) {

              content.style.maxHeight =
                content.scrollHeight +
                "px";

            }

          }
        );

    }
  );

})();


/* =========================================================
   WHATSAPP
   ========================================================= */

(function () {

  const mainWhatsApp =
    document.getElementById(
      "whatsapp-link"
    );


  const defaultMessage =
    "Hola, vengo desde la página web de Hebe Studio y me gustaría solicitar información para agendar una valoración.";


  function createWhatsAppURL(
    message
  ) {

    return (
      "https://wa.me/" +
      HEBE_CONFIG.whatsapp +
      "?text=" +
      encodeURIComponent(
        message
      )
    );

  }


  if (mainWhatsApp) {

    mainWhatsApp.href =
      createWhatsAppURL(
        defaultMessage
      );

  }


  document
    .querySelectorAll(
      ".book-service"
    )
    .forEach(
      function (button) {

        const service =
          button.dataset.service;


        const message =
          "Hola, vengo desde la página web de Hebe Studio y me gustaría solicitar información para una valoración de " +
          service +
          ".";


        button.href =
          createWhatsAppURL(
            message
          );


        button.target =
          "_blank";


        button.rel =
          "noopener noreferrer";

      }
    );

})();


/* =========================================================
   GOOGLE MAPS
   ========================================================= */

(function () {

  const mapLink =
    document.getElementById(
      "maps-link"
    );


  if (!mapLink) {
    return;
  }


  mapLink.href =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      HEBE_CONFIG.address
    );

})();


/* =========================================================
   SERVICE DETAILS
   ========================================================= */

const serviceDetails = {

  "light-brows": {
    title: "Light Brows",
    steps: ["Valoración del estado y las características de tus cejas.", "Conversación sobre el diseño y efecto que buscas.", "Realización del servicio profesional según la técnica elegida.", "Indicaciones de cuidado posteriores."],
    materials: ["Productos y herramientas profesionales del servicio.", "Material de higiene y protección correspondiente."]
  },

  "makeup-henna": {
    title: "Makeup Henna",
    steps: ["Valoración del estado y las características de tus cejas.", "Conversación sobre el diseño y efecto que buscas.", "Realización del servicio profesional según la técnica elegida.", "Indicaciones de cuidado posteriores."],
    materials: ["Productos y herramientas profesionales del servicio.", "Material de higiene y protección correspondiente."]
  },

  "brow-lamination": {
    title: "Brow Lamination",
    steps: ["Valoración del estado y las características de tus cejas.", "Conversación sobre el diseño y efecto que buscas.", "Realización del servicio profesional según la técnica elegida.", "Indicaciones de cuidado posteriores."],
    materials: ["Productos y herramientas profesionales del servicio.", "Material de higiene y protección correspondiente."]
  },

  "natural-brows": {
    title: "Natural Brows",
    steps: ["Valoración previa y revisión de expectativas.", "Diseño de cejas adaptado a tus rasgos.", "Realización profesional del procedimiento acordado.", "Indicaciones de cuidado y seguimiento."],
    materials: ["Pigmentos y material profesional correspondientes al procedimiento.", "Material de higiene y protección de un solo uso, cuando corresponda."]
  },

  "makeup-effect": {
    title: "Makeup Effect",
    steps: ["Valoración previa y revisión de expectativas.", "Diseño de cejas adaptado a tus rasgos.", "Realización profesional del procedimiento acordado.", "Indicaciones de cuidado y seguimiento."],
    materials: ["Pigmentos y material profesional correspondientes al procedimiento.", "Material de higiene y protección de un solo uso, cuando corresponda."]
  },

  "hybrid-brows": {
    title: "Hybrid Brows",
    steps: ["Valoración previa y revisión de expectativas.", "Diseño de cejas adaptado a tus rasgos.", "Realización profesional del procedimiento acordado.", "Indicaciones de cuidado y seguimiento."],
    materials: ["Pigmentos y material profesional correspondientes al procedimiento.", "Material de higiene y protección de un solo uso, cuando corresponda."]
  },

  "tecnica-clasica": {
    title: "Técnica Clásica",
    steps: ["Valoración de tus pestañas naturales y preferencias.", "Elección del estilo y diseño que mejor se adapte a ti.", "Aplicación profesional de la técnica seleccionada.", "Recomendaciones de mantenimiento y cuidado."],
    materials: ["Fibras y materiales profesionales según la técnica.", "Material de higiene y protección correspondiente."]
  },

  "efecto-rimel": {
    title: "Efecto Rímel",
    steps: ["Valoración de tus pestañas naturales y preferencias.", "Elección del estilo y diseño que mejor se adapte a ti.", "Aplicación profesional de la técnica seleccionada.", "Recomendaciones de mantenimiento y cuidado."],
    materials: ["Fibras y materiales profesionales según la técnica.", "Material de higiene y protección correspondiente."]
  },

  "efecto-mojado": {
    title: "Efecto Mojado",
    steps: ["Valoración de tus pestañas naturales y preferencias.", "Elección del estilo y diseño que mejor se adapte a ti.", "Aplicación profesional de la técnica seleccionada.", "Recomendaciones de mantenimiento y cuidado."],
    materials: ["Fibras y materiales profesionales según la técnica.", "Material de higiene y protección correspondiente."]
  },

  "hawaiano": {
    title: "Hawaiano",
    steps: ["Valoración de tus pestañas naturales y preferencias.", "Elección del estilo y diseño que mejor se adapte a ti.", "Aplicación profesional de la técnica seleccionada.", "Recomendaciones de mantenimiento y cuidado."],
    materials: ["Fibras y materiales profesionales según la técnica.", "Material de higiene y protección correspondiente."]
  },

  "aurora": {
    title: "Aurora",
    steps: ["Valoración de tus pestañas naturales y preferencias.", "Elección del estilo y diseño que mejor se adapte a ti.", "Aplicación profesional de la técnica seleccionada.", "Recomendaciones de mantenimiento y cuidado."],
    materials: ["Fibras y materiales profesionales según la técnica.", "Material de higiene y protección correspondiente."]
  },

  "hibrido-tecnologico": {
    title: "Híbrido Tecnológico",
    steps: ["Valoración de tus pestañas naturales y preferencias.", "Elección del estilo y diseño que mejor se adapte a ti.", "Aplicación profesional de la técnica seleccionada.", "Recomendaciones de mantenimiento y cuidado."],
    materials: ["Fibras y materiales profesionales según la técnica.", "Material de higiene y protección correspondiente."]
  },

  "volumen-hawaiano": {
    title: "Volumen Hawaiano",
    steps: ["Valoración de tus pestañas naturales y preferencias.", "Elección del estilo y diseño que mejor se adapte a ti.", "Aplicación profesional de la técnica seleccionada.", "Recomendaciones de mantenimiento y cuidado."],
    materials: ["Fibras y materiales profesionales según la técnica.", "Material de higiene y protección correspondiente."]
  },

  "volumen-brasileno": {
    title: "Volumen Brasileño",
    steps: ["Valoración de tus pestañas naturales y preferencias.", "Elección del estilo y diseño que mejor se adapte a ti.", "Aplicación profesional de la técnica seleccionada.", "Recomendaciones de mantenimiento y cuidado."],
    materials: ["Fibras y materiales profesionales según la técnica.", "Material de higiene y protección correspondiente."]
  },

  "volumen-egipcio": {
    title: "Volumen Egipcio",
    steps: ["Valoración de tus pestañas naturales y preferencias.", "Elección del estilo y diseño que mejor se adapte a ti.", "Aplicación profesional de la técnica seleccionada.", "Recomendaciones de mantenimiento y cuidado."],
    materials: ["Fibras y materiales profesionales según la técnica.", "Material de higiene y protección correspondiente."]
  },

  "volumen-griego": {
    title: "Volumen Griego",
    steps: ["Valoración de tus pestañas naturales y preferencias.", "Elección del estilo y diseño que mejor se adapte a ti.", "Aplicación profesional de la técnica seleccionada.", "Recomendaciones de mantenimiento y cuidado."],
    materials: ["Fibras y materiales profesionales según la técnica.", "Material de higiene y protección correspondiente."]
  },

  "baby-volumen": {
    title: "Baby Volumen",
    steps: ["Valoración de tus pestañas naturales y preferencias.", "Elección del estilo y diseño que mejor se adapte a ti.", "Aplicación profesional de la técnica seleccionada.", "Recomendaciones de mantenimiento y cuidado."],
    materials: ["Fibras y materiales profesionales según la técnica.", "Material de higiene y protección correspondiente."]
  },

"tattoo-lips": {

    title:
      "Tattoo Lips",

    steps: [

      "Valoración inicial de los labios.",

      "Conversación sobre color y resultado deseado.",

      "Diseño previo del área a trabajar.",

      "Aplicación del pigmento siguiendo el diseño acordado.",

      "Indicaciones de cuidados posteriores."

    ],

    materials: [

      "Pigmentos destinados a procedimientos labiales.",

      "Cartuchos o agujas desechables de un solo uso.",

      "Material de higiene y protección.",

      "Productos necesarios para preparar la zona."

    ]

  },


  "contorno": {

    title:
      "Contorno de labios",

    steps: [

      "Valoración de la forma natural de los labios.",

      "Diseño previo del contorno.",

      "Revisión del diseño contigo.",

      "Realización del procedimiento.",

      "Indicaciones posteriores."

    ],

    materials: [

      "Pigmentos destinados al procedimiento.",

      "Material desechable de un solo uso.",

      "Material de higiene y protección."

    ]

  },


  "retoque-lips": {

    title:
      "Retoque de Tattoo Lips",

    steps: [

      "Revisión del pigmento existente.",

      "Identificación de las áreas que requieren repaso.",

      "Preparación del área.",

      "Repaso del pigmento cuando corresponda.",

      "Indicaciones posteriores."

    ],

    materials: [

      "Pigmentos correspondientes al procedimiento.",

      "Material desechable de un solo uso.",

      "Material de higiene y protección."

    ]

  }

};


/* =========================================================
   MODALS
   ========================================================= */

(function () {

  let lastFocusedElement =
    null;


  function openModal(
    modal
  ) {

    if (!modal) {
      return;
    }


    lastFocusedElement =
      document.activeElement;


    modal.classList.add(
      "open"
    );


    modal.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body
      .classList.add(
        "no-scroll"
      );


    const closeButton =
      modal.querySelector(
        ".modal-close"
      );


    if (closeButton) {

      window.setTimeout(
        function () {

          closeButton.focus();

        },
        50
      );

    }

  }


  function closeModal(
    modal
  ) {

    if (!modal) {
      return;
    }


    modal.classList.remove(
      "open"
    );


    modal.setAttribute(
      "aria-hidden",
      "true"
    );


    if (
      !document.querySelector(
        ".modal.open"
      )
    ) {

      document.body
        .classList.remove(
          "no-scroll"
        );

    }


    if (
      lastFocusedElement &&
      typeof lastFocusedElement.focus ===
        "function"
    ) {

      lastFocusedElement.focus();

    }

  }


  document
    .querySelectorAll(
      "[data-open-modal]"
    )
    .forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            const modal =
              document.getElementById(
                button.dataset.openModal
              );


            openModal(
              modal
            );

          }
        );

      }
    );


  document
    .querySelectorAll(
      "[data-close-modal]"
    )
    .forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            closeModal(
              button.closest(
                ".modal"
              )
            );

          }
        );

      }
    );


  const detailModal =
    document.getElementById(
      "detail-modal"
    );


  const detailTitle =
    document.getElementById(
      "detail-title"
    );


  const detailSteps =
    document.getElementById(
      "detail-steps"
    );


  const detailMaterials =
    document.getElementById(
      "detail-materials"
    );


  document
    .querySelectorAll(
      ".detail-button"
    )
    .forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            const detail =
              serviceDetails[
                button.dataset.detail
              ];


            if (
              !detail ||
              !detailTitle ||
              !detailSteps ||
              !detailMaterials
            ) {
              return;
            }


            detailTitle.textContent =
              detail.title;


            detailSteps.innerHTML =
              "";


            detailMaterials.innerHTML =
              "";


            detail.steps.forEach(
              function (step) {

                const item =
                  document.createElement(
                    "li"
                  );


                item.textContent =
                  step;


                detailSteps.appendChild(
                  item
                );

              }
            );


            detail.materials.forEach(
              function (material) {

                const item =
                  document.createElement(
                    "li"
                  );


                item.textContent =
                  material;


                detailMaterials.appendChild(
                  item
                );

              }
            );


            openModal(
              detailModal
            );

          }
        );

      }
    );


  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key !==
        "Escape"
      ) {
        return;
      }


      const openModalElement =
        document.querySelector(
          ".modal.open"
        );


      if (openModalElement) {

        closeModal(
          openModalElement
        );

      }

    }
  );

})();


/* =========================================================
   IMAGE LIGHTBOX
   ========================================================= */

(function () {

  const lightbox =
    document.getElementById(
      "lightbox"
    );


  const lightboxImage =
    document.getElementById(
      "lightbox-image"
    );


  const closeButton =
    document.getElementById(
      "lightbox-close"
    );


  if (
    !lightbox ||
    !lightboxImage ||
    !closeButton
  ) {
    return;
  }


  function openLightbox(
    image
  ) {

    lightboxImage.src =
      image.src;


    lightboxImage.alt =
      image.alt;


    lightbox.classList.add(
      "open"
    );


    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body
      .classList.add(
        "no-scroll"
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


    document.body
      .classList.remove(
        "no-scroll"
      );


    lightboxImage.src =
      "";


    lightboxImage.alt =
      "";

  }


  document
    .querySelectorAll(
      ".lightbox-trigger"
    )
    .forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            const image =
              button.querySelector(
                "img"
              );


            if (image) {

              openLightbox(
                image
              );

            }

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
        event.key === "Escape" &&
        lightbox.classList.contains(
          "open"
        )
      ) {

        closeLightbox();

      }

    }
  );

})();


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

(function () {

  const elements =
    document.querySelectorAll(
      ".reveal"
    );


  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    reducedMotion ||
    !("IntersectionObserver" in window)
  ) {

    elements.forEach(
      function (element) {

        element.classList.add(
          "visible"
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
                .classList.add(
                  "visible"
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
          "0px 0px -50px 0px"
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
   MOBILE BOTTOM NAVIGATION
   ========================================================= */

(function () {

  const navigation =
    document.getElementById(
      "mobile-bottom-nav"
    );


  if (!navigation) {
    return;
  }


  const navigationItems =
    navigation.querySelectorAll(
      ".mobile-nav-item[data-section]"
    );


  if (
    !navigationItems.length
  ) {
    return;
  }


  const sections = [];


  navigationItems.forEach(
    function (item) {

      const sectionId =
        item.dataset.section;


      const section =
        document.getElementById(
          sectionId
        );


      if (section) {

        sections.push({

          id:
            sectionId,

          element:
            section,

          navigationItem:
            item

        });

      }

    }
  );


  function setActiveSection(
    sectionId
  ) {

    navigationItems.forEach(
      function (item) {

        const active =
          item.dataset.section ===
          sectionId;


        item.classList.toggle(
          "active",
          active
        );


        if (active) {

          item.setAttribute(
            "aria-current",
            "page"
          );

        } else {

          item.removeAttribute(
            "aria-current"
          );

        }

      }
    );

  }


  /*
     Al tocar un botón cambiamos
     inmediatamente el estado activo.
  */

  navigationItems.forEach(
    function (item) {

      item.addEventListener(
        "click",
        function () {

          setActiveSection(
            item.dataset.section
          );

        }
      );

    }
  );


  /*
     Detecta automáticamente qué sección
     está viendo el usuario.
  */

  function updateActiveNavigation() {

    if (
      window.innerWidth >
      760
    ) {
      return;
    }


    const referencePoint =
      window.scrollY +
      (
        window.innerHeight *
        0.38
      );


    let currentSection =
      sections[0].id;


    sections.forEach(
      function (section) {

        const top =
          section.element.offsetTop;


        if (
          referencePoint >= top
        ) {

          currentSection =
            section.id;

        }

      }
    );


    /*
       Cuando llegamos prácticamente al
       final de la página activamos Contacto.
    */

    const nearBottom =
      window.innerHeight +
      window.scrollY >=
      document.documentElement.scrollHeight -
      120;


    if (nearBottom) {

      const contactExists =
        sections.find(
          function (section) {

            return (
              section.id ===
              "contacto"
            );

          }
        );


      if (contactExists) {

        currentSection =
          "contacto";

      }

    }


    setActiveSection(
      currentSection
    );

  }


  let ticking =
    false;


  window.addEventListener(
    "scroll",
    function () {

      if (!ticking) {

        window.requestAnimationFrame(
          function () {

            updateActiveNavigation();

            ticking =
              false;

          }
        );


        ticking =
          true;

      }

    },
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    updateActiveNavigation
  );


  window.addEventListener(
    "load",
    updateActiveNavigation
  );


  updateActiveNavigation();

})();


/* =========================================================
   BACK TO TOP
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

    const showButton =
      window.scrollY >
      500;


    button.classList.toggle(
      "visible",
      showButton
    );

  }


  window.addEventListener(
    "scroll",
    updateButton,
    {
      passive: true
    }
  );


  button.addEventListener(
    "click",
    function () {

      const reducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;


      window.scrollTo({

        top: 0,

        behavior:
          reducedMotion
            ? "auto"
            : "smooth"

      });

    }
  );


  updateButton();

})();


/* =========================================================
   CURRENT YEAR
   ========================================================= */

(function () {

  const year =
    document.getElementById(
      "current-year"
    );


  if (year) {

    year.textContent =
      new Date()
        .getFullYear();

  }

})();


