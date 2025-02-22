function initializeGenie() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Get the tab to show
      const tabToShow = button.getAttribute('data-tab');
      switchTab(tabToShow);
    });
  });
}

function switchTab(tabId) {
  // Get all tabs and buttons
  const allTabs = document.querySelectorAll('.tab-content');
  const allButtons = document.querySelectorAll('.tab-btn');
  
  // Hide all tabs and deactivate all buttons
  allTabs.forEach(tab => {
    tab.classList.remove('active');
    tab.style.display = 'none';
  });
  allButtons.forEach(btn => btn.classList.remove('active'));
  
  // Show selected tab and activate its button
  const selectedTab = document.getElementById(tabId);
  const selectedButton = document.querySelector(`[data-tab="${tabId}"]`);
  
  if (selectedTab && selectedButton) {
    selectedTab.style.display = 'block';
    setTimeout(() => {
      selectedTab.classList.add('active');
    }, 50);
    selectedButton.classList.add('active');
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  initializeGenie();
  // Show dashboard by default
  switchTab('dashboard');
});