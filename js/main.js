/* ============================================
   JUMABEEL CREATIONS — Global JavaScript
   main.js
============================================ */

// ---- Navbar: Hamburger Toggle ----
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
}

// ---- Scroll to Top Button ----
const scrollTopBtn = document.querySelector('.scroll-top');

if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---- Active Nav Link (highlight current page) ----
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ---- WhatsApp Float Button ----
// Pre-filled message for general inquiry
const waFloat = document.querySelector('.whatsapp-float');
if (waFloat) {
  waFloat.addEventListener('click', () => {
    const phone   = '+2349039368026'; // ← REPLACE with your actual WhatsApp number
    const message = encodeURIComponent("Hi! I visited your website and I'd like to make an order or inquiry. 😊");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  });
}

// ---- Smooth Scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Scroll Reveal Animation ----
// Adds a class when elements enter the viewport
const revealElements = document.querySelectorAll('[data-reveal]');

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));
}

// ---- WhatsApp Order Button (Product Cards) ----
// Used on crochet, henna, resin pages
function openWhatsAppOrder(productName, price) {
  const phone   = '+2349039368026'; // ← REPLACE with your actual WhatsApp number
  const message = encodeURIComponent(
    `Hi Jumabeel Creations! 👋\n\nI'm interested in ordering:\n*${productName}*${price ? ` (${price})` : ''}\n\nPlease let me know the availability and how to proceed. Thank you!`
  );
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

// Attach to all order buttons that have data-product
document.querySelectorAll('[data-order-btn]').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.getAttribute('data-product') || 'your product';
    const price   = btn.getAttribute('data-price') || '';
    openWhatsAppOrder(product, price);
  });
});

// ---- Current Year in Footer ----
const yearEl = document.querySelector('.footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();