/**
 * components.js
 * Injects shared Navbar + Footer into every page.
 * Each HTML page must have:
 *   <div id="navbar"></div>   (inside <body>, first element)
 *   <div id="footer"></div>   (last element before </body>)
 */

(function () {
  'use strict';

  /* ── Helpers ─────────────────────────────────────────── */
  const $ = (sel) => document.querySelector(sel);

  /* ── Navbar HTML ─────────────────────────────────────── */
  function navbarHTML() {
    const links = [
      { href: '/index.html',    label: 'Home'     },
      { href: '/skills.html',   label: 'Skills'   },
      { href: '/projects.html', label: 'Projects' },
      { href: '/contact.html',  label: 'Contact'  },
    ];

    const currentPath = window.location.pathname;

    // Normalize: /index.html and / both count as home
    const isActive = (href) => {
      const normalized = currentPath === '/' ? '/index.html' : currentPath;
      return normalized.endsWith(href.replace(/^\//, '')) ? 'active' : '';
    };

    const linksHTML = links
      .map(l => `<a href="${l.href}" class="${isActive(l.href)}" aria-label="${l.label}">${l.label}</a>`)
      .join('');

    return `
    <nav class="container nav-inner" role="navigation" aria-label="Main navigation">
      <a href="/index.html" class="nav-brand" aria-label="Home">
        <span>NP</span><span class="brand-dot"></span>
      </a>

      <div class="nav-links" id="navLinks" role="list">
        ${linksHTML}
      </div>

      <div class="nav-cta" id="navCta">
        <a href="/contact.html" class="btn btn-primary btn-sm">
          Hire Me
        </a>
      </div>

      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </nav>`;
  }

  /* ── Footer HTML ─────────────────────────────────────── */
  function footerHTML() {
    const year = new Date().getFullYear();
    return `
    <div class="container">
      <div class="footer-grid">

        <div class="footer-brand">
          <span class="footer-brand-name">NP<span style="color:var(--clr-red)">.</span></span>
          <p>
            IT student passionate about system administration,
            server management, and Linux infrastructure.
            Open to opportunities and collaborations.
          </p>
          <div class="footer-social" style="margin-top:1.25rem">
            <a href="#" aria-label="GitHub">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.58 2 12.21c0 4.49 2.87 8.3 6.84 9.65.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.17-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 2.5-.34c.85 0 1.7.11 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.22 10.22 0 0 0 22 12.21C22 6.58 17.52 2 12 2z"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.23 0z"/>
              </svg>
            </a>
            <a href="#" aria-label="Email">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <p class="footer-heading">Navigation</p>
          <ul class="footer-links">
            <li><a href="/index.html">Home</a></li>
            <li><a href="/skills.html">Skills</a></li>
            <li><a href="/projects.html">Projects</a></li>
            <li><a href="/contact.html">Contact</a></li>
          </ul>
        </div>

        <div>
          <p class="footer-heading">Expertise</p>
          <ul class="footer-links">
            <li><a href="/skills.html">System Administration</a></li>
            <li><a href="/skills.html">Server Management</a></li>
            <li><a href="/skills.html">Linux</a></li>
            <li><a href="/skills.html">Microsoft Office</a></li>
          </ul>
        </div>

      </div>

      <div class="footer-bottom">
        <span>© ${year} NP Portfolio. All rights reserved.</span>
        <span>Built with ❤️ — Deployed on Cloudflare Pages</span>
      </div>
    </div>`;
  }

  /* ── Inject components ───────────────────────────────── */
  function inject() {
    const navEl  = document.getElementById('navbar');
    const footEl = document.getElementById('footer');
    if (navEl)  navEl.innerHTML  = navbarHTML();
    if (footEl) footEl.innerHTML = footerHTML();
  }

  /* ── Mobile menu toggle ──────────────────────────────── */
  function initMobileMenu() {
    const toggle   = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navCta   = document.getElementById('navCta');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      navLinks.classList.toggle('mobile-open', isOpen);
      navCta.classList.toggle('mobile-open', isOpen);
    });

    // Close on nav-link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
        navLinks.classList.remove('mobile-open');
        navCta.classList.remove('mobile-open');
      });
    });
  }

  /* ── Scroll shadow ───────────────────────────────────── */
  function initScrollShadow() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    const update = () => nav.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── Scroll-reveal ───────────────────────────────────── */
  function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    elements.forEach(el => observer.observe(el));
  }

  /* ── Progress bar animations (skills page) ───────────── */
  function initProgressBars() {
    const bars = document.querySelectorAll('.progress-fill[data-width]');
    if (!bars.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width + '%';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    bars.forEach(bar => observer.observe(bar));
  }

  /* ── Filter bar (projects page) ──────────────────────── */
  function initFilterBar() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards      = document.querySelectorAll('.project-card[data-category]');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;

        cards.forEach(card => {
          const show = cat === 'all' || card.dataset.category === cat;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ── Contact form (contact page) ─────────────────────── */
  function initContactForm() {
    const form    = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulate async submission
      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending…';

      setTimeout(() => {
        form.style.display = 'none';
        if (success) success.style.display = 'block';
      }, 1200);
    });
  }

  /* ── Boot ────────────────────────────────────────────── */
  function boot() {
    inject();
    initMobileMenu();
    initScrollShadow();
    initReveal();
    initProgressBars();
    initFilterBar();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
