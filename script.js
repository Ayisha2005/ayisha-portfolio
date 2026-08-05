// High-Performance Interactive Logic for Ayisha Parveen A Portfolio

// Global Mobile Menu Helpers
function openMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const openIcon = document.getElementById('mobile-menu-icon-open');
  const closeIcon = document.getElementById('mobile-menu-icon-close');

  if (!mobileMenu) return;
  mobileMenu.classList.remove('hidden');
  setTimeout(() => {
    mobileMenu.classList.remove('-translate-y-4', 'opacity-0', 'scale-95');
    mobileMenu.classList.add('translate-y-0', 'opacity-100', 'scale-100');
  }, 10);

  if (openIcon) openIcon.classList.add('hidden');
  if (closeIcon) closeIcon.classList.remove('hidden');
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const openIcon = document.getElementById('mobile-menu-icon-open');
  const closeIcon = document.getElementById('mobile-menu-icon-close');

  if (!mobileMenu) return;
  mobileMenu.classList.remove('translate-y-0', 'opacity-100', 'scale-100');
  mobileMenu.classList.add('-translate-y-4', 'opacity-0', 'scale-95');
  setTimeout(() => {
    mobileMenu.classList.add('hidden');
  }, 200);

  if (openIcon) openIcon.classList.remove('hidden');
  if (closeIcon) closeIcon.classList.add('hidden');
}

function toggleMobileMenu(e) {
  if (e) {
    e.stopPropagation();
  }
  const mobileMenu = document.getElementById('mobile-menu');
  if (!mobileMenu) return;

  if (mobileMenu.classList.contains('hidden') || mobileMenu.classList.contains('opacity-0')) {
    openMobileMenu();
  } else {
    closeMobileMenu();
  }
}

document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    try {
      emailjs.init("0zFsSwyaOaKfKshHO");
    } catch (e) {
      console.error("EmailJS Init Error:", e);
    }
  }

  // 3. Dynamic Typing Animation
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

  // 4. Lightweight Passive Scroll Progress & ScrollSpy
  const scrollProgress = document.getElementById('scroll-progress');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let isTicking = false;
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
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

        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  // 5. Theme Toggle Switch
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

  // 6. Outside Click Safety for Mobile Menu
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        if (!mobileMenu.classList.contains('hidden')) {
          closeMobileMenu();
        }
      }
    });
  }

});

// Global Helpers
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Download PDF Resume Helper
function downloadResume() {
  if (typeof confetti === 'function') {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
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
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
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

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'glass-panel rounded-2xl px-5 py-3.5 border border-indigo-500/40 bg-slate-900/95 text-white text-xs font-semibold shadow-md flex items-center gap-2.5 pointer-events-auto transition-all duration-200 transform translate-y-2 opacity-0';
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
    }, 200);
  }, 3500);
}
