// resizeHandler.js

// Function to handle window resizing events
function windowResized() {
  // Get the current width of the window
  let newWidth = windowWidth;
  
  // Calculate the new height based on the fixed aspect ratio
  let newHeight = newWidth / aspectRatio;

  // If the new height exceeds the maximum allowed height, adjust it
  if (newHeight > maxHeight) {
    newHeight = maxHeight; // Limit height to maxHeight
    newWidth = newHeight * aspectRatio; // Adjust width to maintain aspect ratio
  } 
  // If the new width is smaller than the minimum allowed width, adjust it
  else if (newWidth < minWidth) {
    newWidth = minWidth; // Limit width to minWidth
    newHeight = newWidth / aspectRatio; // Adjust height to maintain aspect ratio
  }

  // Resize the canvas to the newly calculated dimensions
  resizeCanvas(newWidth, newHeight);

  // Create a new scene with the updated dimensions
  scene = new Scene(newWidth, newHeight);

  // Reload points for all sketches to adjust their positions or sizes
  sketches.forEach(sketch => sketch.loadPoints());
}
