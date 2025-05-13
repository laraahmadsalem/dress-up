const clothesByCategory = {
  accessory: ["assets/accessory/accessory-1.png", "assets/accessory/bag-1.png", "assets/accessory/beanie-1.png","assets/accessory/hat-1.png", "assets/accessory/hat-2.png", "assets/accessory/necklace.png", "assets/accessory/scarf-1.png", "assets/accessory/shoes-1.png"],
  bottom: ["assets/bottom/pants-1.png", "assets/bottom/pants-2.png", "assets/bottom/skirt-1.png", "assets/bottom/skirt-2.png"],
  dress: ["assets/dress/dress-1.png", "assets/dress/dress-2.png", "assets/dress/thobe-1.png"],
  top: ["assets/top/sweater-1.png", "assets/top/top-1.png", "assets/top/top-2.png", "assets/top/top-3.png"]
};

let currentCategory = "accessory";
let currentPage = 0;
const itemsPerPage = 4;

// Load a category when a tab is clicked
document.querySelectorAll('.tab-button').forEach(btn => {
  btn.addEventListener('click', () => {
    currentCategory = btn.dataset.category;
    currentPage = 0;
    renderClothingOptions();
  });
});

// Render 4 clothing items at a time
function renderClothingOptions() {
  const container = document.querySelector('.clothes-container');
  container.innerHTML = ''; // Clear previous

  // Show/hide pagination buttons
  document.getElementById('back-button').style.visibility = currentPage > 0 ? 'visible' : 'hidden';

  const totalItems = clothesByCategory[currentCategory].length;
  const nextButton = document.getElementById('next-button');
  nextButton.style.visibility = ((currentPage + 1) * itemsPerPage < totalItems) ? 'visible' : 'hidden';


  const items = clothesByCategory[currentCategory];
  const start = currentPage * itemsPerPage;
  const pageItems = items.slice(start, start + itemsPerPage);

  pageItems.forEach((src, index) => {
    const btn = document.createElement('button');
    btn.classList.add('clothing-item');
    btn.innerHTML = `<img src="${src}" alt="${currentCategory} item ${index}" />`;
    btn.addEventListener('click', () => {
      const characterImg = document.getElementById(`character-${currentCategory}`);
      
      if (characterImg.src.includes(src)) {
        characterImg.removeAttribute('src'); // Safe removal of image
      } else {
        characterImg.src = src;
      }
    });

    container.appendChild(btn);
  });
}

// Pagination
document.getElementById('back-button').addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    renderClothingOptions();
  }
});

document.getElementById('next-button').addEventListener('click', () => {
  const totalItems = clothesByCategory[currentCategory].length;
  if ((currentPage + 1) * itemsPerPage < totalItems) {
    currentPage++;
    renderClothingOptions();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderClothingOptions();
});
