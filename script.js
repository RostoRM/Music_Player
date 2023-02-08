// Check if Playing
let isPlaying = false;

// Pause Songs
const stopSong = () => {
  music.pause();
};

// Random Songs
const randomSongs = () => {
  isPlaying = true;
  loadSong(songs[Math.floor(Math.random() * songs.length)]);
  playBtn.classList.replace('fa-play', 'fa-pause');
  music.play();
};

// Play
const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
};

// Pause
const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
};

// Play or pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
const loadSong = (song) => {
  title.textContent = song.songTitle;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
};

// Current Song
let songIndex = 0;

// Previous Song
const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

// Next Song
const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & TIme
const updateProgressbar = (e) => {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Update dynamic-circle
    dynamicCircle.style.marginLeft = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration element to avoid NAN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
};

// Set Progress Bar
function setProgressBar(e) {
  const { duration } = music;
  const width = this.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * duration;
}

// Volume Controls --------------------------- //
let lastVolume = 1;
// Volume Bar
const changeVolume = (e) => {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // Rounding volume up or down
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  circleVolume.style.marginLeft = `${volume * 100}%`;
  volumeValue.textContent = `${Math.floor(volume * 100)}`;
  music.volume = volume;
  // Change icon volume depending on volume
  volumeIcon.className = '';
  if (volume > 0.7) {
    volumeIcon.classList.add('fa-solid', 'fa-volume-up');
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fa-solid', 'fa-volume-down');
  } else if (volume === 0) {
    volumeIcon.classList.add('fa-solid', 'fa-volume-off');
  }
  lastVolume = volume;
};

// Show/ Hide Volume icon
let showVolumeIcon = false;

const toggleVolume = () => {
  !showVolumeIcon ? (volumeContainer.hidden = false) : (volumeContainer.hidden = true);
  showVolumeIcon = !showVolumeIcon;
};

//Event Listener
shuffleBtn.addEventListener('click', randomSongs);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
stop.addEventListener('click', stopSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressbar);
progressContainer.addEventListener('click', setProgressBar);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleVolume);
