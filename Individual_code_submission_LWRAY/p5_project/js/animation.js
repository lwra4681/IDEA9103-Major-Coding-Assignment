// animations.js

// this function is a wrapper used for appling the scaling values from the audio.
//Ultimately it could probabyl be combined with the functions in the sketch class

// Function to animate oscillation with scaling applied
function animateOscillationScaled(sketchIndices, scaleValue, x, y, z, speed) {
  push(); // Save the current transformation state
  scale(scaleValue); // Apply scaling transformation based on the scaleValue

  // Loop through each index in sketchIndices and animate the corresponding sketches
  sketchIndices.forEach(index => {
    sketches[index].animateOscillation(x, y, z, 20, speed); // Call the oscillation animation on each sketch
  });

  pop(); // Restore the previous transformation state
}

// Function to animate rotation with optional scaling
function animateRotationScaled(sketchIndices, scaleValue = 1, x, y, z, angle, speed, xAxis = 1, yAxis = 1) {
  push(); // Save the current transformation state
  scale(scaleValue); // Apply scaling transformation based on scaleValue

  // Loop through each index in sketchIndices and animate the corresponding sketches
  sketchIndices.forEach(index => {
    sketches[index].animateRotation(x, y, z, angle, speed, xAxis, yAxis); 
    // Call the rotation, animation method from sketch class, on each sketch
  });

  pop(); // Restore the previous transformation state
}
