// Function to change card heights
const changeCardHeights = () => {
    let maxHeight = 0;

  // Get all cards by class name and store in an array
  const cards = Array.from(document.getElementsByClassName('card'));

  // Reset all cards heights to auto
  cards.forEach(card => card.style.height = 'auto');

  // Find the tallest
  cards.forEach(card => {
    if(card.offsetHeight > maxHeight) {
        maxHeight = card.offsetHeight;
    }
  });

  // Set all cards to the height of the tallest card
  cards.forEach(card => card.style.height = maxHeight + "px");
}

// Run the function when the page loads or resizes
window.addEventListener('load', changeCardHeights);
window.addEventListener('resize', changeCardHeights);
