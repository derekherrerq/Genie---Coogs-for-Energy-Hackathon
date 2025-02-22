
function initializeGenie() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  const timeInstalled = document.getElementById('time-installed');

  chrome.storage.local.get('trackingSince', (result) => {
    timeInstalled.textContent = result.trackingSince;
  });

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Get the tab to show
      const tabToShow = button.getAttribute('data-tab');
      switchTab(tabToShow);
    });
  });

  const labels = ['Code', 'Math', 'Image', 'Other'];
  const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f'];

  
  chrome.storage.local.get(['codeQueries', 'mathQueries', 'imageQueries', 'otherQueries'], (result) => {
    const y = [0, 0, 0, 0];
    y[0] = result.codeQueries;
    y[1] = result.mathQueries;
    y[2] = result.imageQueries;
    y[3] = result.otherQueries;

    const barPlot = document.getElementById('bar');
    Plotly.newPlot(barPlot, [{
      x: labels,
      y: y,
      type: 'bar',
      marker: {
        color: colors
      }
    }]);

    const total_emission = 0.00012 * y[0] + 0.00012* y[1] + 0.00013  * y[2] + 0.00014 * y[3];
    const total_energy = 0.0008 * y[0] + 0.0008 * y[1] + 0.0009 * y[2] + 0.001 * y[3];

    console.log(total_emission);
    console.log(total_energy);

    document.querySelector('#power-usage').textContent = total_energy;
    document.querySelector('#emissions').textContent = total_emission;
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