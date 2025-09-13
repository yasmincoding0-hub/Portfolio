// ========================
// 🌐 DOM Elements
// ========================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const darkToggle = document.getElementById('dark-mode-toggle');
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// ========================
// 📱 Mobile Nav Toggle
// ========================
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !expanded);
});

// ========================
// 🌙 Dark Mode Toggle
// ========================
const setDarkMode = (enabled) => {
  document.body.classList.toggle('dark-mode', enabled);
  localStorage.setItem('darkMode', enabled);
};

darkToggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');
  setDarkMode(!isDark);
  darkToggle.textContent = isDark ? '🌙' : '☀️';
});

// On load: apply stored theme
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('darkMode') === 'true';
  setDarkMode(savedTheme);
  darkToggle.textContent = savedTheme ? '☀️' : '🌙';
});

// ========================
// 📬 Contact Form Validation
// ========================
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  let isValid = true;

  // Name validation
  if (!name) {
    showError('name-error', 'Please enter your name.');
    isValid = false;
  } else {
    clearError('name-error');
  }

  // Email validation
  if (!email || !validateEmail(email)) {
    showError('email-error', 'Please enter a valid email.');
    isValid = false;
  } else {
    clearError('email-error');
  }

  // Message validation
  if (!message) {
    showError('message-error', 'Please enter your message.');
    isValid = false;
  } else {
    clearError('message-error');
  }

  // If valid, simulate submission
  if (isValid) {
    formStatus.textContent = 'Sending...';

    setTimeout(() => {
      formStatus.textContent = 'Message sent successfully! 💌';
      form.reset();
    }, 1000);
  }
});

function validateEmail(email) {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
}

function showError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearError(id) {
  document.getElementById(id).textContent = '';
}
