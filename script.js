"use strict";


/* =========================================================
   CONFIGURACIÓN
   ========================================================= */

const HEBE_CONFIG = {
  whatsapp: "523313999062",
  address: "Juan Valle Nte 23, La Cadena, 48570 Tenamaxtlán, Jalisco"
};


/* =========================================================
   LIGHT / DARK MODE
   ========================================================= */

(function () {

  const themeToggle = document.getElementById("theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');

  if (!themeToggle) return;

  function getTheme() {

    const savedTheme = localStorage.getItem("hebe-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  }


  function applyTheme(theme) {

    const isDark = theme === "dark";

    document.documentElement.setAttribute("data-theme", theme);

    themeToggle.setAttribute("aria-label", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    themeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");

    if (themeColor) {
      themeColor.setAttribute("content", isDark ? "#0b0b0b" : "#ffffff");
    }

  }


  applyTheme(getTheme());


  themeToggle.addEventListener("click", function () {

    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    localStorage.setItem("hebe-theme", newTheme);

    applyTheme(newTheme);

  });

})();


/* =========================================================
   MOBILE MENU
   ========================================================= */

(function () {

  const menuButton = document.getElementById("menu-button");
  const navigation = document.getElementById("main-navigation");

  if (!menuButton || !navigation) return;


  function openMenu() {

    navigation.classList.add("open");
    menuButton.classList.add("active");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Cerrar menú");

    document.body.classList.add("no-scroll");

  }


  function closeMenu() {

    navigation.classList.remove("open");
    menuButton.classList.remove("active");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");

    document.body.classList.remove("no-scroll");

  }


  menuButton.addEventListener("click", function () {

    if (navigation.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }

  });


  navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });


  window.addEventListener("resize", function () {

    if (window.innerWidth > 1000) {
      closeMenu();
    }

  });

})();


/* =========================================================
   SERVICE CATEGORY TABS
   ========================================================= */

(function () {

  const tabs = document.querySelectorAll(".service-tab");
  const categories = document.querySelectorAll(".service-category");


  tabs.forEach(function (tab) {

    tab.addEventListener("click", function () {

      const category = tab.dataset.category;


      tabs.forEach(function (item) {

        const active = item === tab;

        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", active ? "true" : "false");

      });


      categories.forEach(function (group) {

        const active = group.dataset.category === category;

        group.classList.toggle("active", active);


        if (!active) {

          group.querySelectorAll(".service-card.open").forEach(function (card) {
            closeServiceCard(card);
          });

        }

      });

    });

  });

})();


/* =========================================================
   SERVICE ACCORDIONS
   ========================================================= */

function closeServiceCard(card) {

  const button = card.querySelector(".service-header");
  const content = card.querySelector(".service-content");

  card.classList.remove("open");

  if (button) {
    button.setAttribute("aria-expanded", "false");
  }

  if (content) {
    content.style.maxHeight = null;
  }

}


(function () {

  const cards = document.querySelectorAll(".service-card");


  cards.forEach(function (card) {

    const button = card.querySelector(".service-header");
    const content = card.querySelector(".service-content");

    if (!button || !content) return;


    button.addEventListener("click", function () {

      const currentlyOpen = card.classList.contains("open");


      cards.forEach(function (otherCard) {

        if (otherCard !== card) {
          closeServiceCard(otherCard);
        }

      });


      if (currentlyOpen) {
        closeServiceCard(card);
        return;
      }


      card.classList.add("open");
      button.setAttribute("aria-expanded", "true");

      content.style.maxHeight = content.scrollHeight + "px";

    });

  });


  window.addEventListener("resize", function () {

    document.querySelectorAll(".service-card.open").forEach(function (card) {

      const content = card.querySelector(".service-content");

      if (content) {
        content.style.maxHeight = content.scrollHeight + "px";
      }

    });

  });

})();


/* =========================================================
   WHATSAPP
   ========================================================= */

(function () {

  const mainWhatsApp = document.getElementById("whatsapp-link");

  const defaultMessage = "Hola, vengo desde la página web de Hebe Studio y me gustaría solicitar información para agendar una valoración.";


  function createWhatsAppURL(message) {

    return "https://wa.me/" + HEBE_CONFIG.whatsapp + "?text=" + encodeURIComponent(message);

  }


  if (mainWhatsApp) {
    mainWhatsApp.href = createWhatsAppURL(defaultMessage);
  }


  document.querySelectorAll(".book-service").forEach(function (button) {

    const service = button.dataset.service;

    const message = "Hola, vengo desde la página web de Hebe Studio y me gustaría solicitar información para una valoración de " + service + ".";

    button.href = createWhatsAppURL(message);
    button.target = "_blank";
    button.rel = "noopener noreferrer";

  });

})();


/* =========================================================
   GOOGLE MAPS
   ========================================================= */

(function () {

  const mapLink = document.getElementById("maps-link");

  if (!mapLink) return;

  mapLink.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(HEBE_CONFIG.address);

})();


/* =========================================================
   SERVICE DETAILS
   ========================================================= */

const serviceDetails = {

  "hairstroke": {

    title: "Hairstroke",

    steps: [
      "Valoración inicial y conversación sobre el resultado que buscas.",
      "Diseño previo considerando la forma natural de tus cejas.",
      "Preparación de la zona de trabajo.",
      "Realización de los trazos siguiendo el diseño acordado.",
      "Revisión final e indicaciones de cuidados."
    ],

    materials: [
      "Pigmentos destinados al procedimiento.",
      "Cartuchos o agujas desechables de un solo uso.",
      "Material de protección e higiene.",
      "Productos necesarios para preparar y limpiar la zona."
    ]

  },


  "correccion": {

    title: "Corrección de trabajo previo",

    steps: [
      "Valoración del trabajo existente.",
      "Revisión de forma, color y pigmentación presente.",
      "Determinación de las opciones disponibles.",
      "Diseño previo cuando la corrección sea posible.",
      "Indicaciones específicas según el caso."
    ],

    materials: [
      "Material desechable correspondiente al procedimiento.",
      "Pigmentos seleccionados según la valoración.",
      "Material de higiene y protección."
    ]

  },


  "retoque": {

    title: "Retoque de Hairstroke",

    steps: [
      "Revisión del resultado anterior.",
      "Identificación de las áreas que requieren repaso.",
      "Preparación de la zona.",
      "Repaso de los trazos necesarios.",
      "Indicaciones posteriores."
    ],

    materials: [
      "Pigmentos correspondientes al procedimiento.",
      "Material desechable de un solo uso.",
      "Material de higiene y protección."
    ]

  },


  "tattoo-lips": {

    title: "Tattoo Lips",

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

    title: "Contorno de labios",

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

    title: "Retoque de Tattoo Lips",

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

  let lastFocusedElement = null;


  function openModal(modal) {

    if (!modal) return;

    lastFocusedElement = document.activeElement;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("no-scroll");

    const closeButton = modal.querySelector(".modal-close");

    if (closeButton) {

      window.setTimeout(function () {
        closeButton.focus();
      }, 50);

    }

  }


  function closeModal(modal) {

    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");


    if (!document.querySelector(".modal.open")) {
      document.body.classList.remove("no-scroll");
    }


    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }

  }


  document.querySelectorAll("[data-open-modal]").forEach(function (button) {

    button.addEventListener("click", function () {

      const modal = document.getElementById(button.dataset.openModal);

      openModal(modal);

    });

  });


  document.querySelectorAll("[data-close-modal]").forEach(function (button) {

    button.addEventListener("click", function () {
      closeModal(button.closest(".modal"));
    });

  });


  const detailModal = document.getElementById("detail-modal");
  const detailTitle = document.getElementById("detail-title");
  const detailSteps = document.getElementById("detail-steps");
  const detailMaterials = document.getElementById("detail-materials");


  document.querySelectorAll(".detail-button").forEach(function (button) {

    button.addEventListener("click", function () {

      const detail = serviceDetails[button.dataset.detail];

      if (!detail || !detailTitle || !detailSteps || !detailMaterials) return;


      detailTitle.textContent = detail.title;

      detailSteps.innerHTML = "";
      detailMaterials.innerHTML = "";


      detail.steps.forEach(function (step) {

        const item = document.createElement("li");

        item.textContent = step;

        detailSteps.appendChild(item);

      });


      detail.materials.forEach(function (material) {

        const item = document.createElement("li");

        item.textContent = material;

        detailMaterials.appendChild(item);

      });


      openModal(detailModal);

    });

  });


  document.addEventListener("keydown", function (event) {

    if (event.key !== "Escape") return;

    const openModalElement = document.querySelector(".modal.open");

    if (openModalElement) {
      closeModal(openModalElement);
    }

  });

})();


/* =========================================================
   IMAGE LIGHTBOX
   ========================================================= */

(function () {

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeButton = document.getElementById("lightbox-close");

  if (!lightbox || !lightboxImage || !closeButton) return;


  function openLightbox(image) {

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("no-scroll");

    closeButton.focus();

  }


  function closeLightbox() {

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("no-scroll");

    lightboxImage.src = "";
    lightboxImage.alt = "";

  }


  document.querySelectorAll(".lightbox-trigger").forEach(function (button) {

    button.addEventListener("click", function () {

      const image = button.querySelector("img");

      if (image) {
        openLightbox(image);
      }

    });

  });


  closeButton.addEventListener("click", closeLightbox);


  lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {
      closeLightbox();
    }

  });


  document.addEventListener("keydown", function (event) {

    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }

  });

})();


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

(function () {

  const elements = document.querySelectorAll(".reveal");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  if (reducedMotion || !("IntersectionObserver" in window)) {

    elements.forEach(function (element) {
      element.classList.add("visible");
    });

    return;

  }


  const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px"
  });


  elements.forEach(function (element) {
    observer.observe(element);
  });

})();


/* =========================================================
   CURRENT YEAR
   ========================================================= */

(function () {

  const year = document.getElementById("current-year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

})();