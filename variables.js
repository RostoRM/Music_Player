//Cashing DOM

const getElement = (value) => {
  return document.querySelector(value);
};

const cashingDOM = {
  progressContainer: getElement('#progress-container'),
  progress: getElement('#progress'),
  dynamicCircle: getElement('#dynamic-circle'),
  currentTimeEl: getElement('#current-time'),
  durationEl: getElement('#duration'),
  image: getElement('img'),
  title: getElement('#title'),
  artist: getElement('#artist'),
  music: getElement('audio'),
  shuffleBtn: getElement('#shuffle'),
  prevBtn: getElement('#prev'),
  playBtn: getElement('#play'),
  nextBtn: getElement('#next'),
  stop: getElement('#stop'),
  volumeIcon: getElement('#volume-icon'),
  volumeRange: getElement('.volume-range'),
  volumeBar: getElement('.volume-bar'),
  circleVolume: getElement('#dynamic-circle-volume'),
  volumeValue: getElement('#volume-value'),
  volumeContainer: getElement('.volume-container'),
};

export { cashingDOM };
