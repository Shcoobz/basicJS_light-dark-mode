/**
 * Theme Switcher for Web Application
 *
 * This script allows for dynamic theme switching between 'light' and 'dark' modes within a web application.
 * It utilizes local storage to remember the user's theme preference across sessions.
 */

/**
 * Selectors for DOM elements that will change based on the theme.
 * @type {Object}
 */
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const elementsToTheme = {
  nav: document.getElementById('nav'),
  toggleIcon: document.getElementById('toggle-icon'),
  images: [
    document.getElementById('image1'),
    document.getElementById('image2'),
    document.getElementById('image3'),
  ],
  textBox: document.getElementById('text-box'),
};

/**
 * Sets the theme attributes on the document element and in local storage.
 *
 * @param {string} theme - The theme to set ('dark' or 'light').
 */
function setThemeAttributes(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

/**
 * Updates the UI elements to reflect the current theme.
 *
 * @param {boolean} isDark - Indicates whether the dark mode is enabled.
 */
function updateUIForTheme(isDark) {
  const theme = isDark ? 'dark' : 'light';
  const color = isDark ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
  const textColor = isDark ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';

  elementsToTheme.nav.style.backgroundColor = color;
  elementsToTheme.textBox.style.backgroundColor = textColor;
  elementsToTheme.toggleIcon.children[0].textContent = isDark
    ? 'Dark Mode'
    : 'Light Mode';
  elementsToTheme.toggleIcon.children[1].classList.replace(
    isDark ? 'fa-sun' : 'fa-moon',
    isDark ? 'fa-moon' : 'fa-sun'
  );

  elementsToTheme.images.forEach((img) => {
    const themePart = img.dataset.theme;
    img.src = `img/${themePart}_${theme}.svg`;
  });
}

/**
 * Handles the theme switch when the toggle switch changes state.
 */
function onThemeSwitch() {
  const isDark = toggleSwitch.checked;
  setThemeAttributes(isDark ? 'dark' : 'light');
  updateUIForTheme(isDark);
}

/**
 * Initializes the theme based on the user's previous selection stored in local storage,
 * or defaults to light theme if no selection is stored.
 */
function initializeTheme() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const isDark = currentTheme === 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);
  toggleSwitch.checked = isDark;
  updateUIForTheme(isDark);
}

// Adding an event listener to theme toggle switch to handle theme changes.
toggleSwitch.addEventListener('change', onThemeSwitch);

// Initial setup call to apply theme based on local storage or default to light theme.
initializeTheme();
