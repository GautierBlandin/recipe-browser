// This file contains code that will be executed in the renderer process

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Renderer script loaded!');
  
  // Get references to DOM elements
  const clickButton = document.getElementById('clickButton');
  const resultDiv = document.getElementById('result');
  
  // Counter to keep track of clicks
  let clickCount = 0;
  
  // Add event listener to the button
  clickButton.addEventListener('click', () => {
    clickCount++;
    resultDiv.textContent = `Button clicked ${clickCount} time${clickCount !== 1 ? 's' : ''}!`;
    
    // Change button color randomly on click
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    clickButton.style.backgroundColor = randomColor;
  });
});
