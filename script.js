 document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const contactForm = document.getElementById("contact-form");
  const reveals = document.querySelectorAll(".reveal");

  /* =========================
     MOBILE NAV
  ========================= */
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const isActive = navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
      hamburger.setAttribute("aria-expanded", isActive ? "true" : "false");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* =========================
     SAFE SMOOTH SCROLL
  ========================= */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  /* =========================
     CONTACT FORM
  ========================= */
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = contactForm.querySelector('input[name="name"]')?.value?.trim() || "";
      const email = contactForm.querySelector('input[name="email"]')?.value?.trim() || "";
      const projectType =
        contactForm.querySelector('input[name="project-type"]')?.value?.trim() || "";
      const message =
        contactForm.querySelector('textarea[name="message"]')?.value?.trim() || "";

      if (!name || !email || !projectType || !message) {
        alert("Please fill in all required fields before submitting.");
        return;
      }

      alert("Thank you. Your inquiry has been received. We will contact you within 24 hours.");
      contactForm.reset();
    });
  }

  /* =========================
     SCROLL REVEAL
  ========================= */
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  /* =========================
     CHATBOT
  ========================= */
  const WHATSAPP_NUMBER = "256771035887";

  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotClose = document.getElementById("chatbotClose");
  const chatbotBox = document.getElementById("chatbotBox");
  const chatbotBody = document.getElementById("chatbotBody");
  const chatbotOptions = document.getElementById("chatbotOptions");
  const chatbotForm = document.getElementById("chatbotForm");
  const chatbotFooter = document.getElementById("chatbotFooter");
  const chatbotWhatsAppLink = document.getElementById("chatbotWhatsAppLink");

  const chatName = document.getElementById("chatName");
  const chatBusiness = document.getElementById("chatBusiness");
  const chatEmail = document.getElementById("chatEmail");
  const chatPhone = document.getElementById("chatPhone");
  const chatProblem = document.getElementById("chatProblem");

  let selectedService = "";

  if (
    chatbotToggle &&
    chatbotClose &&
    chatbotBox &&
    chatbotBody &&
    chatbotOptions &&
    chatbotForm &&
    chatbotFooter &&
    chatbotWhatsAppLink
  ) {
    chatbotToggle.addEventListener("click", () => {
      chatbotBox.classList.toggle("active");
    });

    chatbotClose.addEventListener("click", () => {
      chatbotBox.classList.remove("active");
    });

    function appendUserMessage(text) {
      const msg = document.createElement("div");
      msg.className = "user-message";
      msg.textContent = text;
      chatbotBody.appendChild(msg);
      chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    function appendBotMessage(text) {
      const msg = document.createElement("div");
      msg.className = "bot-message";
      msg.textContent = text;
      chatbotBody.appendChild(msg);
      chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    document.querySelectorAll(".chat-option").forEach((btn) => {
      btn.addEventListener("click", function () {
        selectedService = this.dataset.service || this.textContent.trim();
        appendUserMessage(selectedService);

        if (selectedService === "Talk on WhatsApp") {
          const msg = encodeURIComponent(
            "Hello ALscartech Solutions, I would like to discuss my project."
          );
          chatbotWhatsAppLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
          chatbotFooter.classList.remove("hidden");
          chatbotOptions.classList.add("hidden");
          appendBotMessage(
            "Great. Continue on WhatsApp and we will discuss your project directly."
          );
          return;
        }

        chatbotOptions.classList.add("hidden");
        chatbotForm.classList.remove("hidden");
        appendBotMessage(
          "Great choice. Please fill in your details so we can guide you properly."
        );
      });
    });

    chatbotForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = chatName?.value.trim() || "";
      const business = chatBusiness?.value.trim() || "";
      const email = chatEmail?.value.trim() || "";
      const phone = chatPhone?.value.trim() || "";
      const problem = chatProblem?.value.trim() || "";

      if (!name || !phone || !problem) {
        alert("Please complete the required chatbot fields.");
        return;
      }

      const summary = `
Name: ${name}
Business: ${business || "Not provided"}
Service Needed: ${selectedService || "Not specified"}
Email: ${email || "Not provided"}
Phone: ${phone}
Need: ${problem}
      `.trim();

      appendUserMessage("I have filled in my details.");
      appendBotMessage(
        "Perfect. Continue on WhatsApp so we can review your needs and recommend the best solution."
      );

      const whatsappText = encodeURIComponent(
        `Hello ALscartech Solutions,\n\nI came from your website chatbot.\n\n${summary}`
      );

      chatbotWhatsAppLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;
      chatbotFooter.classList.remove("hidden");
      chatbotForm.classList.add("hidden");
    });
  }
});