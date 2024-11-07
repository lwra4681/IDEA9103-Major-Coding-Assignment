// SoundAnalyzer class definition
class SoundAnalyzer {
    constructor(filePath) {
      this.audio = loadSound(filePath); // Load the sound file
      this.fft = new p5.FFT(); // Create a new FFT analyzer
      this.fft.setInput(this.audio); // Set the audio input for FFT
      this.amplitude = 0; // Variable to store amplitude for animation
      this.spectrum = [];
      }
  
    // Play or pause the audio
    togglePlay() {
      if (this.audio.isPlaying()) {
        this.audio.pause();
      } else {
        this.audio.loop(); // Loop the audio
      }
    }
  
    // Update amplitude value based on FFT analysis
    update() {
      this.spectrum = this.fft.analyze(); // Analyze the frequency spectrum
      this.amplitude = this.fft.getEnergy("treble"); // Get amplitude for bass frequencies
      this.centroid = this.fft.getCentroid();
    }
  
    // Get the current amplitude value for use in animation
    getAmplitude() {
      return this.amplitude;
    }
    // Draw spectrum bars on the canvas
    drawSpectrum(x, y, width, height) {
        let barWidth = width / this.spectrum.length; // Calculate width for each bar
        noStroke(); // Disable stroke for bars
        fill(0, 200, 255); // Set color for bars (can be customized)

        for (let i = 0; i < this.spectrum.length; i++) {
            let barHeight = map(this.spectrum[i], 0, 255, 0, height); // Map frequency intensity to bar height
            rect(x + i * barWidth, y + height - barHeight, barWidth, barHeight); // Draw each bar
        }
    }
    
  }