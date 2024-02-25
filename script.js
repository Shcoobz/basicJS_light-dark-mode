// Selectors
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

// Helper function to set theme attributes
function setThemeAttributes(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Update UI Elements based on theme
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

// Theme Switch Handler
function onThemeSwitch() {
  const isDark = toggleSwitch.checked;
  setThemeAttributes(isDark ? 'dark' : 'light');
  updateUIForTheme(isDark);
}

// Initialize Theme Based on Local Storage or Default
function initializeTheme() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const isDark = currentTheme === 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);
  toggleSwitch.checked = isDark;
  updateUIForTheme(isDark);
}

// Event Listener
toggleSwitch.addEventListener('change', onThemeSwitch);

// Initial Setup
initializeTheme();
