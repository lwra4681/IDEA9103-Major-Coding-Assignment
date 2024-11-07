// AudioAnalyser class definition
class AudioAnalyser {
    constructor(filePath) {
      this.audio = loadSound(filePath); // Load the sound file
      this.fft = new p5.FFT(); // Create a new FFT analyser
      this.fft.setInput(this.audio); // Set the audio input for FFT
      this.amplitude = 0; // Variable to store amplitude for animation
      this.spectrum = [];
      }
  
    // Play or pause the audio
    togglePlay() {
      if (this.audio.isPlaying()) {
        this.audio.pause();
      } else {
        this.audio.loop(); // Loop the audio if no other input exists
      }
    }
  
    // Update amplitude value based on FFT analysis
    update() {
      this.spectrum = this.fft.analyze(); // Analyse the frequency spectrum
      this.amplitude = this.fft.getEnergy("treble"); 
      // Get amplitude for high frequencies, as the aim is to animate the melody
      
    }
  
    // Get the current amplitude value for use in animation
    getAmplitude() {
      return this.amplitude;
    }
    
    
  }