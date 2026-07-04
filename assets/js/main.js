/* =========================================================
   AROGYA CITA INDONESIA — main.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Mobile menu open / close ---------- */
  var toggleBtn = document.querySelector("[data-menu-toggle]");
  var closeBtn = document.querySelector("[data-menu-close]");
  var menu = document.querySelector("[data-mobile-menu]");

  function openMenu() {
    menu.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    menu.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  if (toggleBtn && menu) toggleBtn.addEventListener("click", openMenu);
  if (closeBtn && menu) closeBtn.addEventListener("click", closeMenu);
  if (menu)
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

  /* ---------- Highlight current page in every nav ---------- */
  var current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("a[data-nav]").forEach(function (link) {
    var target = link.getAttribute("href");
    if (target === current || (current === "" && target === "index.html"))
      link.classList.add("active");
  });

  /* =========================================================
     CATALOG CAROUSEL (catalog.html only)
     ========================================================= */
  var slides = document.querySelectorAll("[data-carousel-slide]");
  var strips = document.querySelectorAll("[data-carousel-strip]");
  if (slides.length) {
    var current_i = 0;
    var autoTimer;

    function showSlide(i) {
      slides.forEach(function (s, idx) {
        s.classList.toggle("is-active", idx === i);
      });
      strips.forEach(function (s, idx) {
        s.classList.toggle("is-active", idx === i);
      });
      current_i = i;
    }
    function nextSlide() {
      showSlide((current_i + 1) % slides.length);
    }
    function startAuto() {
      autoTimer = setInterval(nextSlide, 5000);
    }
    function stopAuto() {
      clearInterval(autoTimer);
    }

    strips.forEach(function (strip, idx) {
      strip.addEventListener("click", function () {
        stopAuto();
        showSlide(idx);
        startAuto();
      });
    });

    showSlide(0);
    startAuto();
  }

  /* =========================================================
     BOOKING FORM (consult.html only)
     ========================================================= */
  var form = document.querySelector("[data-booking-form]");
  if (!form) return;

  var budgetButtons = form.querySelectorAll("[data-budget]");
  var budgetInput = form.querySelector("#estimated_budget");
  budgetButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      budgetButtons.forEach(function (b) {
        b.classList.remove("is-selected");
      });
      btn.classList.add("is-selected");
      budgetInput.value = btn.getAttribute("data-budget");
    });
  });

  /* ============================================================
     WHERE THE SUBMISSION GOES — read me!
     ------------------------------------------------------------
     1) WHATSAPP — works immediately, no setup needed.
     2) EMAIL via Formspree — free, no backend needed. Sign up at
        https://formspree.io, create a form, and paste the endpoint
        URL below. Until you do, only WhatsApp will fire.
     ============================================================ */

  var WHATSAPP_NUMBER = "6288996585497"; // from the footer
  var FORMSPREE_ENDPOINT = ""; // e.g. 'https://formspree.io/f/abcdwxyz'

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var data = {
      name: form.full_name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      business: form.business_type.value.trim(),
      needs: form.equipment_needs.value.trim(),
      budget: budgetInput.value,
    };

    if (!data.name || !data.email || !data.phone) {
      alert("Mohon lengkapi Nama, Email, dan Nomor Telepon ya.");
      return;
    }

    var successBox = form.querySelector("[data-form-success]");
    if (successBox) successBox.classList.add("is-visible");

    /* 1) WhatsApp, pre-filled message in a new tab */
    var waText =
      "Halo Arogya Cita Indonesia, saya ingin konsultasi:\n" +
      "*Nama:* " +
      data.name +
      "\n" +
      "*Email:* " +
      data.email +
      "\n" +
      "*No. Telepon:* " +
      data.phone +
      "\n" +
      "*Tipe Bisnis:* " +
      (data.business || "-") +
      "\n" +
      "*Kebutuhan Alat:* " +
      (data.needs || "-") +
      "\n" +
      "*Estimasi Budget:* " +
      (data.budget || "-");
    window.open(
      "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(waText),
      "_blank",
    );

    /* 2) Email via Formspree, only if the endpoint has been configured */
    if (FORMSPREE_ENDPOINT) {
      fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }).catch(function (err) {
        console.error("Formspree error:", err);
      });
    }

    form.reset();
    budgetButtons.forEach(function (b) {
      b.classList.remove("is-selected");
    });
  });
});
