let sketches = []; // Array to hold all sketch instances
let green = [128, 179, 128, 255]; // RGBA colour array for green
let white = [255, 255, 255, 255]; // RGBA colour array for white

let scene; // Variable to hold the Scene object
let soundAnalyzer; // Variable to hold the SoundAnalyzer object

// Define fixed aspect ratio and canvas dimensions
let aspectRatio = 1 / 1; // Fixed aspect ratio
let minWidth = 600;   // Minimum width for the canvas
let minHeight = 600;  // Minimum height for the canvas
let maxWidth = 900;  // Maximum width for the canvas
let maxHeight = 900;  // Maximum height for the canvas



// Preload function to load sketch data and audio file
function preload() {
  // Load audio for SoundAnalyzer
  soundAnalyzer = new SoundAnalyzer("audio_files/cello.wav");

  // Create new Sketch instances from CSV files and assign colours
  sketches.push(new Sketch("body.csv", white));
  sketches.push(new Sketch("Rwing.csv", white));
  sketches.push(new Sketch("Lwing.csv", [255, 255, 255, 200]));
  sketches.push(new Sketch("eye.csv", [60, 60, 60, 100]));
  sketches.push(new Sketch("branch.csv", green));
  sketches.push(new Sketch("leaf1.csv", green));
  sketches.push(new Sketch("leaf2.csv", green));
  sketches.push(new Sketch("leaf3.csv", green));
  sketches.push(new Sketch("leaf4.csv", green));
}

// Setup function to initialize the canvas and scene
function setup() {
  createCanvas(600, 600, WEBGL); // Create a 600x600 WebGL canvas
  noStroke(); // Disable stroke drawing
  scene = new Scene(width, height); // Initialize the scene with canvas dimensions
  
  // Load all sketch points for each sketch
  sketches.forEach(sketch => sketch.loadPoints());

  // Start playing the audio
  soundAnalyzer.togglePlay();
}


// In your main draw function:
function draw() {
  scene.displayBackground(); // Display background gradient
  soundAnalyzer.update();

  // Example: Retrieve scale value from amplitude, energy, or another FFT property
  let scaleValue = map(soundAnalyzer.getAmplitude(), 0, 255, 0.5, 1.5);

  let x = 0;
  let y = 40;
  let z = 200;

  // Animate oscillation with scaling for specific sketches
  animateOscillationWithScale([0, 3, 4, 5, 6, 7, 8], scaleValue, x, y, z);
  // Animate rotation for specific sketches without scaling
  animateRotation([1], scaleValue, 50, 0, z, PI / 4, 0.05); // Rotate right wing
  animateRotation([2], scaleValue, 0, 0, z, PI / 4, 0.05, -1, -1); // Rotate left wing
}


// Function to animate oscillation for a set of sketches with dynamic scaling
function animateOscillationWithScale(sketchIndices, scaleValue, x, y, z) {
  push();
  scale(scaleValue); // Apply scale based on amplitude or another sound property
  sketchIndices.forEach(index => {
    sketches[index].animateOscillation(x, y, z);
  });
  pop();
}

// Function to animate rotation for specific sketches without scaling
function animateRotation(sketchIndices, scaleValue=1, x, y, z, angle, speed, xAxis = 1, yAxis = 1) {
  push();
  scale(scaleValue);
  sketchIndices.forEach(index => {
    sketches[index].animateRotation(x, y, z, angle, speed, xAxis, yAxis);
  });
  pop();
}

// Function to handle window resizing events
function windowResized() {
  let newWidth = windowWidth;
  let newHeight = newWidth / aspectRatio;

  if (newHeight > maxHeight) {
    newHeight = maxHeight;
    newWidth = newHeight * aspectRatio;
  } else if (newWidth < minWidth) {
    newWidth = minWidth;
    newHeight = newWidth / aspectRatio;
  }

  resizeCanvas(newWidth, newHeight);
  scene = new Scene(newWidth, newHeight);
  sketches.forEach(sketch => sketch.loadPoints());
}

// Function to toggle audio playback with mouse click
function mousePressed() {
  soundAnalyzer.togglePlay();
}
