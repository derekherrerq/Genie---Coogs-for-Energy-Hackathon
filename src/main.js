import './style.css';

function initializeGenie() {
  const wishButton = document.getElementById('grantWishButton');
  const wishInput = document.getElementById('wishInput');
  
  if (wishButton && wishInput) {
    wishButton.addEventListener('click', () => {
      handleWish(wishInput.value);
    });

    // Also handle Enter key
    wishInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleWish(wishInput.value);
      }
    });
  }
}

function handleWish(wish) {
  if (!wish.trim()) {
    alert('Please make a wish first!');
    return;
  }
  
  // Here you can add the main functionality of your Genie app
  console.log('Processing wish:', wish);
  alert(`Your wish "${wish}" has been heard! ✨`);
}

document.addEventListener('DOMContentLoaded', initializeGenie);