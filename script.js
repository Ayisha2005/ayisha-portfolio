// Interactive Logic for Ayisha Parveen A Portfolio

document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Initialize EmailJS with Public Key
  if (typeof emailjs !== 'undefined') {
    try {
      emailjs.init("0zFsSwyaOaKfKshHO");
      console.log("EmailJS SDK initialized successfully with Public Key: 0zFsSwyaOaKfKshHO");
    } catch (e) {
      console.error("EmailJS Initialization Error:", e);
    }
  }

  // 3. Lenis Smooth Scroll
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // 4. Zero-Delay Instant Custom Cursor
  const cursorRing = document.getElementById('cursor-ring');
  const cursorDot = document.getElementById('cursor-dot');

  if (cursorRing && cursorDot) {
    let mouseX = 0;
    let mouseY = 0;
    let rAF = null;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!rAF) {
        rAF = requestAnimationFrame(() => {
          cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
          cursorRing.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
          rAF = null;
        });
      }
    });

    const hoverTargets = document.querySelectorAll('a, button, input, textarea, .magnetic-btn');
    hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      target.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  // 5. Mouse Parallax Effect on Hero
  const heroParallax = document.getElementById('hero-parallax-container');
  if (heroParallax) {
    window.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      if (typeof gsap !== 'undefined') {
        gsap.to(heroParallax, {
          rotationY: x * 6,
          rotationX: -y * 6,
          duration: 0.5,
          ease: 'power1.out',
        });
      }
    });
  }

  // 6. Dynamic Typing Animation
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const roles = [
      "Aspiring Software Developer",
      "B.Tech CSBS Final Year Student",
      "Apollo Engineering College",
      "Problem Solver & Programmer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
  }

  // 7. Scroll Progress Bar & ScrollSpy
  const scrollProgress = document.getElementById('scroll-progress');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === currentSection) {
        link.classList.add('active');
      }
    });
  });

  // 8. Theme Toggle Switch
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('ayisha_portfolio_theme');
  if (savedTheme === 'light') {
    htmlElement.classList.remove('dark');
  } else {
    htmlElement.classList.add('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('ayisha_portfolio_theme', 'light');
        showToast('Switched to Light Theme ☀️');
      } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('ayisha_portfolio_theme', 'dark');
        showToast('Switched to Dark Theme 🌙');
      }
    });
  }

  // 9. Fully Functional Mobile Menu Toggle & Overlay Handler
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const openIcon = document.getElementById('mobile-menu-icon-open');
  const closeIcon = document.getElementById('mobile-menu-icon-close');

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('hidden');
    setTimeout(() => {
      mobileMenu.classList.remove('scale-95', 'opacity-0');
      mobileMenu.classList.add('scale-100', 'opacity-100');
    }, 10);

    if (openIcon) openIcon.classList.add('hidden');
    if (closeIcon) closeIcon.classList.remove('hidden');
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('scale-100', 'opacity-100');
    mobileMenu.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
    }, 250);

    if (openIcon) openIcon.classList.remove('hidden');
    if (closeIcon) closeIcon.classList.add('hidden');
  }

  function toggleMobileMenu(e) {
    if (e) {
      e.stopPropagation();
    }
    if (!mobileMenu) return;
    if (mobileMenu.classList.contains('hidden') || mobileMenu.classList.contains('opacity-0')) {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close when clicking navigation links
    const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close when clicking outside the menu
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        if (!mobileMenu.classList.contains('hidden')) {
          closeMobileMenu();
        }
      }
    });
  }

  // 10. Magnetic Buttons
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

});

// Global Helpers

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Download PDF Resume Helper
function downloadResume() {
  if (typeof confetti === 'function') {
    confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });
  }

  showToast('Downloading Resume PDF... 📄');

  const link = document.createElement('a');
  link.href = 'Ayisha_Parveen_A_Resume.pdf';
  link.download = 'Ayisha_Parveen_A_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// EmailJS Credentials
const EMAILJS_SERVICE_ID = "service_gwa0w4c";
const EMAILJS_TEMPLATE_ID = "template_2b49j5e";
const EMAILJS_PUBLIC_KEY = "0zFsSwyaOaKfKshHO";

let lastSubmissionTime = 0;

async function handleContactSubmit(event) {
  event.preventDefault();
  
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const subjectInput = document.getElementById('form-subject');
  const messageInput = document.getElementById('form-message');
  
  const submitBtn = document.getElementById('contact-submit-btn');
  const btnText = document.getElementById('submit-btn-text');
  const btnIcon = document.getElementById('submit-btn-icon');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput?.value.trim() || 'Portfolio Inquiry';
  const message = messageInput.value.trim();

  // 1. Client Validation
  if (!name || name.length < 2) {
    showToast('Please enter your name.');
    nameInput.focus();
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showToast('Please enter a valid email address.');
    emailInput.focus();
    return;
  }

  if (!message || message.length < 5) {
    showToast('Please enter a message (at least 5 characters).');
    messageInput.focus();
    return;
  }

  // 2. Anti-Spam Rate Limiting (10s cooldown)
  const now = Date.now();
  if (now - lastSubmissionTime < 10000) {
    const secondsRemaining = Math.ceil((10000 - (now - lastSubmissionTime)) / 1000);
    showToast(`Please wait ${secondsRemaining}s before sending another message.`);
    return;
  }

  // 3. UI Loading State
  if (submitBtn) submitBtn.disabled = true;
  if (btnText) btnText.textContent = 'Sending Message...';
  if (btnIcon) {
    btnIcon.outerHTML = '<svg id="submit-btn-icon" class="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>';
  }

  const templateParams = {
    from_name: name,
    from_email: email,
    reply_to: email,
    subject: subject,
    message: message,
    name: name,
    email: email
  };

  try {
    let emailjsResult = null;

    if (typeof emailjs !== 'undefined') {
      emailjsResult = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
      console.log("EmailJS Success Response:", emailjsResult);
    } else {
      throw new Error("EmailJS SDK is not loaded.");
    }

    // Save copy to local server API log as backup
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message }),
    }).catch(() => {});

    lastSubmissionTime = Date.now();

    // Success Feedback
    if (typeof confetti === 'function') {
      confetti({ particleCount: 110, spread: 80, origin: { y: 0.6 } });
    }

    showToast('Message sent successfully!');
    document.getElementById('contact-form').reset();

  } catch (err) {
    const errorDetails = err?.text || err?.message || JSON.stringify(err);
    console.error("EmailJS Transmission Error:", errorDetails);
    showToast(`Failed to send email: ${errorDetails}`);
  } finally {
    if (submitBtn) submitBtn.disabled = false;
    if (btnText) btnText.textContent = 'Send Message';
    const currentSpinner = document.getElementById('submit-btn-icon');
    if (currentSpinner) {
      currentSpinner.outerHTML = '<i data-lucide="send" class="w-4 h-4" id="submit-btn-icon"></i>';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  }
}

async function handleNewsletterSubmit(event) {
  event.preventDefault();
  const emailInput = document.getElementById('newsletter-email');
  const email = emailInput?.value || '';

  if (!email) return;

  try {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      }
      showToast('Subscribed to updates successfully!');
      emailInput.value = '';
    } else {
      showToast(data.error || 'Email already subscribed.');
    }
  } catch (err) {
    showToast('Subscribed to project updates!');
    if (emailInput) emailInput.value = '';
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'glass-panel rounded-2xl px-5 py-3.5 border border-indigo-500/40 bg-slate-900/95 text-white text-xs font-semibold shadow-2xl flex items-center gap-2.5 pointer-events-auto transition-all duration-300 transform translate-y-2 opacity-0';
  toast.innerHTML = `
    <span class="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 50);

  setTimeout(() => {
    toast.classList.add('translate-y-2', 'opacity-0');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 4000);
}
