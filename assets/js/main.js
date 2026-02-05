// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const body = document.body;
  const header = document.querySelector('.sticky-header');
  
  // Check for saved theme preference or default to dark mode
  const currentTheme = localStorage.getItem('theme') || 'dark';
  body.classList.add(currentTheme + '-mode');
  if (currentTheme === 'light') {
    header.classList.add('light-mode');
  }
  
  // Toggle theme when button is clicked
  themeToggleBtn.addEventListener('click', function() {
    if (body.classList.contains('dark-mode')) {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      header.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      header.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  });
  
  // Hamburger menu functionality
  const chapterMenuToggle = document.getElementById('chapter-menu-toggle');
  const chapterDropdown = document.getElementById('chapter-dropdown');
  const siteMenuToggle = document.getElementById('site-menu-toggle');
  const siteDropdown = document.getElementById('site-dropdown');
  
  chapterMenuToggle.addEventListener('click', function() {
    chapterDropdown.style.display = chapterDropdown.style.display === 'block' ? 'none' : 'block';
    siteDropdown.style.display = 'none';
  });
  
  siteMenuToggle.addEventListener('click', function() {
    siteDropdown.style.display = siteDropdown.style.display === 'block' ? 'none' : 'block';
    chapterDropdown.style.display = 'none';
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(event) {
    if (!chapterMenuToggle.contains(event.target) && !chapterDropdown.contains(event.target)) {
      chapterDropdown.style.display = 'none';
    }
    if (!siteMenuToggle.contains(event.target) && !siteDropdown.contains(event.target)) {
      siteDropdown.style.display = 'none';
    }
  });
});