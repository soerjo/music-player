const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progres");
const progressContainer = document.querySelector(".progres-container");
const title = document.querySelector(`#title`);
const cover = document.querySelector("#image");

//song titles
const songs = ["hey", "summer", "ukulele"];

//keep track of songs
let songIndex = 0;

loadSong(songs[songIndex]);
var isPlaying = false;
//update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  image.src = `images/${song}.jpg`;
}

//event listener playBtn
playBtn.addEventListener("click", () => {
  isPlaying = !isPlaying;
  console.log(isPlaying);
  if (isPlaying) {
    playSong();
  } else {
    pauseSong();
  }
});

function pauseSong() {
  playBtn.querySelector("i.fas").classList.remove("fa-pause-circle");
  playBtn.querySelector("i.fas").classList.add("fa-play-circle");

  audio.pause();
}

function playSong() {
  isPlaying = true;
  playBtn.querySelector("i.fas").classList.remove("fa-play-circle");
  playBtn.querySelector("i.fas").classList.add("fa-pause-circle");

  audio.play();
}

//eventListener nextBtn
nextBtn.addEventListener("click", nextSong);

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  console.log(songIndex);
  playSong();
}

//eventListener prevBtn
prevBtn.addEventListener("click", prevSong);
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  console.log(`${songs[songIndex]}`, songIndex);
  playSong();
}

//update progress bar
audio.addEventListener("timeupdate", updateProgress);

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progresPercent = (currentTime / duration) * 100;
  //   console.log(progresPercent);
  progress.style.width = `${progresPercent}%`;
}

//addEventListener to progress bar
progressContainer.addEventListener("click", setProgress);

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const currentTime = (clickX / width) * audio.duration;
  //   console.log(width);
  //   console.log(clickX);
  //   console.log("jadi presentasi sekarang adalah", currentTime);
  audio.currentTime = currentTime;
}

//addEventListener if the song ended
audio.addEventListener("ended", nextSong);
