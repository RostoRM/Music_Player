const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const dynamicCircle = document.getElementById('dynamic-circle');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const shuffleBtn = document.getElementById('shuffle');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const stop = document.getElementById('stop');

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

//Event Listener
shuffleBtn.addEventListener('click', randomSongs);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
stop.addEventListener('click', stopSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressbar);
progressContainer.addEventListener('click', setProgressBar);
