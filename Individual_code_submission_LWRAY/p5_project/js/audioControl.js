// audioControl.js

// Function to toggle the play/pause state of the audio
function togglePlayPause() {
  // Toggle the play/pause state of the audioAnalyser
  audioAnalyser.togglePlay();

  // Check if the audio is currently playing
  if (audioAnalyser.audio.isPlaying()) {
    // If audio is playing, update the button text to 'Pause Audio'
    playPauseButton.html('Pause Audio');
  } else {
    // If audio is not playing, update the button text to 'Play Audio'
    playPauseButton.html('Play Audio');
  }
}
