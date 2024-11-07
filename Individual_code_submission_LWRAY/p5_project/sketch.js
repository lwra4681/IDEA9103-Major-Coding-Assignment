let sketches = []; // Array to hold all sketch instances
let green = [128, 179, 128, 255]; // RGBA colour array for green
let white = [255, 255, 255, 255]; // RGBA colour array for white

let scene; // Variable to hold the Scene object
let soundAnalyzer; // Variable to hold the SoundAnalyzer object
let instanceData = []; // Array to hold position and scale for each instance
let instances = 3; // Number of instances
let playPauseButton; // Button for play/pause

// Preload function to load sketch data and audio file
function preload() {
  soundAnalyzer = new SoundAnalyzer("audio_files/le-cygne.mp3");

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

// Setup function to initialize the canvas, scene, and instance data
function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
  scene = new Scene(width, height);
  sketches.forEach(sketch => sketch.loadPoints());

  soundAnalyzer.togglePlay();


  // Generate and store random position and scale data for each instance
  for (let i = 0; i < instances; i++) {
    let x = random(-width / 2, width / 2);
    let y = random(-height / 2, height / 2);
    let z = 200; // Keep z fixed or make it random if desired
    let scaleValue = random(0.5, 1); // Generate a random scale for each instance
    let phaseOffset = random(PI/4); // Random phase offset for each instance

    instanceData.push({ x, y, z, scaleValue,phaseOffset});
   }
  // Create a play/pause button
  playPauseButton = createButton('Load Audio');
  playPauseButton.position(10, 10); // Position the button on the canvas
  playPauseButton.mousePressed(togglePlayPause); // Attach function to button press
}


function draw() {
  scene.displayBackground();
  soundAnalyzer.update();
  
  instanceData.forEach((data, i) => {
    // Retrieve scale value from audio if desired (optional)
    let scaleValue = data.scaleValue * 0.5;
    let speed = 0.05 * map(soundAnalyzer.getAmplitude(), 0, 255, 1, 1.2);
    
    
    data.x = data.x + soundAnalyzer.getAmplitude()/10;
    data.y = data.y + soundAnalyzer.getAmplitude()/10;

    // Check if the x and y positions are outside the canvas bounds
    if (data.x > width+200) {
      data.x = -width-200; // Reset x if it's outside the canvas width
    }
    if (data.y > height+200) {
      data.y = -height-200; // Reset y if it's outside the canvas height
    }
    
    // Animate oscillation with scaling for specific sketches at stored positions
    animateOscillationScaled([0, 3, 4, 5, 6, 7, 8], scaleValue, data.x, data.y, data.z, speed);

    
    animateRotation([1], scaleValue, data.x + 50, -data.y + 40, data.z, PI/4, speed); // Rotate right wing
    animateRotation([2], scaleValue, data.x, -data.y + 40, data.z, PI/4, speed, -1, -1); // Rotate left wing
  })

}


// Function to animate oscillation for a set of sketches with dynamic scaling
function animateOscillationScaled(sketchIndices, scaleValue, x, y, z, speed) {
  push();
  scale(scaleValue); // Apply scale based on amplitude or another sound property
  sketchIndices.forEach(index => {
    sketches[index].animateOscillation(x, y, z, 20,speed);
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


// Function to toggle play/pause
function togglePlayPause() {
  soundAnalyzer.togglePlay(); // Toggle the audio play state
  if (soundAnalyzer.audio.isPlaying()) {
    playPauseButton.html('Pause Audio'); // Change button text to "Pause" when audio is playing
  } else {
    playPauseButton.html('Play Audio'); // Change button text to "Play" when audio is paused
  }
}
