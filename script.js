let items = {}; // Initialize an empty object to store items
let currentTab = 'shirts'; // Default tab
let backgrounds = ['blue-background.png', 'pink-background.png', 'green-background.png']; // Backgrounds
let currentBackgroundIndex = 0; // Track the current background

// Switch between tabs (e.g., shirts, skirts, hats)
function switchTab(tab) {
  currentTab = tab;
  renderItems();
}

// Render items for the current tab
function renderItems() {
  const container = document.getElementById(`${currentTab}-options`);
  const allContainers = document.querySelectorAll('.selection-container > div');
  allContainers.forEach(div => (div.style.display = 'none')); // Hide all options
  container.style.display = 'flex'; // Show the current tab's options

  container.innerHTML = ''; // Clear existing items
  items[currentTab].forEach((item, index) => {
    const button = document.createElement('button');
    button.id = `${currentTab}-${index + 1}`;
    button.style.backgroundImage = `url('assets/${currentTab}/${item}')`;
    button.onclick = () => {
      document.getElementById(currentTab.slice(0, -1)).src = `assets/${currentTab}/${item}`;
    };
    container.appendChild(button);
  });
}

// Change background using left and right buttons
function changeBackground(direction) {
  if (direction === 'left') {
    currentBackgroundIndex = (currentBackgroundIndex - 1 + backgrounds.length) % backgrounds.length;
  } else if (direction === 'right') {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
  }
  document.querySelector('.pochacco-container').style.backgroundImage = `url('assets/background/${backgrounds[currentBackgroundIndex]}')`;
}

// Load items from items.json
async function loadItems() {
  try {
    const response = await fetch('items.json');
    if (!response.ok) throw new Error('Failed to load items.json');
    items = await response.json();
    renderItems(); // Render items after loading
  } catch (error) {
    console.error('Error loading items:', error);
  }
}

// Initialize the page
window.onload = () => {
  document.getElementById('hat').src = '';
  document.getElementById('shirt').src = '';
  document.getElementById('skirt').src = '';
  loadItems();

  // Add event listeners for background buttons
  document.getElementById('left-background-button').onclick = () => changeBackground('left');
  document.getElementById('right-background-button').onclick = () => changeBackground('right');

  // Add event listeners for tab buttons
  document.getElementById('shirt-button').onclick = () => switchTab('shirts');
  document.getElementById('skirt-button').onclick = () => switchTab('skirts');
  document.getElementById('hat-button').onclick = () => switchTab('hats');
};
