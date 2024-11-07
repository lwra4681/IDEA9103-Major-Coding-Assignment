// main.js

// Array to hold all sketch instances
let sketches = []; 

// Predefined color values in RGBA format
let green = [128, 179, 128, 255]; 
let white = [255, 255, 255, 255]; 

// Variables for scene management, sound analysis, and sketch instances
let scene;
let audioAnalyser;
let instanceData = []; // Holds position and scaling data for each instance
let instances = 3; // Number of instances to create
let playPauseButton; // Button for controlling audio play/pause

// Variables for handling canvas resising and aspect ratio
let aspectRatio = 1 / 1; // Fixed aspect ratio (1:1)
let minWidth = 600;   // Minimum width for the canvas
let minHeight = 600;  // Minimum height for the canvas
let maxWidth = 900;  // Maximum width for the canvas
let maxHeight = 900;  // Maximum height for the canvas

// Preload function to load sketch data and audio file
function preload() {
  // Initialise sound analyser with an audio file
  audioAnalyser = new AudioAnalyser("assets/audio_files/le-cygne.mp3");

  // Load all sketch components (points) from CSV files and assign colors
  sketches.push(new Sketch("body.csv", white)); // Body of the sketch
  sketches.push(new Sketch("Rwing.csv", white)); // Right wing
  sketches.push(new Sketch("Lwing.csv", [255, 255, 255, 200])); // Left wing with transparency
  sketches.push(new Sketch("eye.csv", [60, 60, 60, 100])); // Eye
  sketches.push(new Sketch("branch.csv", green)); // Branch (green)
  sketches.push(new Sketch("leaf1.csv", green)); // Leaf 1 (green)
  sketches.push(new Sketch("leaf2.csv", green)); // Leaf 2 (green)
  sketches.push(new Sketch("leaf3.csv", green)); // Leaf 3 (green)
  sketches.push(new Sketch("leaf4.csv", green)); // Leaf 4 (green)
}

// Setup function to initialise canvas, scene, and instance data
function setup() {
  // Create a 600x600 canvas with WebGL rendering mode
  createCanvas(600, 600, WEBGL);
  noStroke(); // Disable stroke on shapes
  scene = new Scene(width, height); // Initialise scene with canvas dimensions

  // Load points for each sketch object
  sketches.forEach(sketch => sketch.loadPoints());

  // Start playing the audio
  audioAnalyser.togglePlay();

  // Generate and store random position and scale data for each instance
  for (let i = 0; i < instances; i++) {
    let x = random(-width / 2, width / 2); // Random x position
    let y = random(-height / 2, height / 2); // Random y position
    let z = 200; // Fixed z position (depth)
    let scaleValue = random(0.5, 1); // Random scale value between 0.5 and 1
    let phaseOffset = random(PI / 4); // Random phase offset for animation

    // Store instance data (position, scale, phaseOffset)
    instanceData.push({ x, y, z, scaleValue, phaseOffset });
  }

  // Create play/pause button and position it on the canvas
  playPauseButton = createButton('Load Audio');
  playPauseButton.position(10, 10); // Position at the top-left corner
  playPauseButton.mousePressed(togglePlayPause); // Toggle play/pause when clicked
}

// Draw function to continuously render the scene and animate the sketches
function draw() {
  scene.displayBackground(); // Display the scene's background
  audioAnalyser.update(); // Update the sound analyser for audio data

  // Loop through each instance's data and animate them
  instanceData.forEach((data, i) => {
    let scaleValue = data.scaleValue * 0.5; // Reduce scale value by half
    let speed = 0.05 * map(audioAnalyser.getAmplitude(), 0, 255, 1, 1.2); // Speed based on audio amplitude

    // Update the x and y position based on the sound amplitude (for movement effect)
    data.x += 1+audioAnalyser.getAmplitude() / 10;
    data.y += 1+audioAnalyser.getAmplitude() / 10;

    // Reset x and y positions if they go out of bounds (screen wrap effect)
    if (data.x > width + 200) data.x = -width - 200;
    if (data.y > height + 200) data.y = -height - 200;

    // Animate sketches with oscillation and rotation effects
    animateOscillationScaled([0, 3, 4, 5, 6, 7, 8], scaleValue, data.x, data.y, data.z, speed);
    animateRotationScaled([1], scaleValue, data.x + 50, -data.y + 40, data.z, PI / 4, speed);
    animateRotationScaled([2], scaleValue, data.x, -data.y + 40, data.z, PI / 4, speed, -1, -1);
  });
}
