document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  // Toggle mobile nav menu
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    navbar.classList.toggle('open');
  });

  // Close mobile menu on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbar.classList.contains('open')) {
        navbar.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      }
    });
  });

  // Navbar background on scroll
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('solid');
    } else {
      navbar.classList.remove('solid');
    }
    updateActiveNavLink();
  }
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  // Highlight active nav link based on scroll position
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  function updateActiveNavLink() {
    const scrollPos = window.scrollY + navbar.offsetHeight + 10;
    let currentId = sections[0].id;
    for (const section of sections) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    }
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        e.preventDefault();
        targetSection.focus({ preventScroll: true });
        window.scrollTo({
          top: targetSection.offsetTop - navbar.offsetHeight,
          behavior: 'smooth',
        });
      }
    });
  });

  // Dark mode toggle
  function setDarkMode(enabled) {
    if (enabled) {
      body.classList.add('dark');
      darkModeToggle.textContent = '☀️';
      darkModeToggle.setAttribute('aria-label', 'Toggle light mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      body.classList.remove('dark');
      darkModeToggle.textContent = '🌙';
      darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
      localStorage.setItem('darkMode', 'false');
    }
  }

  // Initialize dark mode based on saved preference or system preference
  const savedDarkMode = localStorage.getItem('darkMode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedDarkMode === 'true' || (!savedDarkMode && prefersDark)) {
    setDarkMode(true);
  } else {
    setDarkMode(false);
  }

  darkModeToggle.addEventListener('click', () => {
    setDarkMode(!body.classList.contains('dark'));
  });

  // Contact form validation and submission
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const nameInput = contactForm.name;
  const emailInput = contactForm.email;
  const messageInput = contactForm.message;
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    // Reset errors
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    formStatus.textContent = '';
    formStatus.className = '';

    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      valid = false;
    }
    if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      valid = false;
    }
    if (!messageInput.value.trim()) {
      messageError.textContent = 'Please enter your message.';
      valid = false;
    }

    if (!valid) {
      formStatus.textContent = 'Please fix errors before submitting.';
      formStatus.classList.add('error');
      return;
    }

    // Simulate sending
    formStatus.textContent = 'Sending...';
    formStatus.classList.remove('error');
    formStatus.classList.add('info');

    setTimeout(() => {
      formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
      formStatus.classList.remove('info');
      formStatus.classList.add('success');
      contactForm.reset();
    }, 1500);
  });
});
