var video = document.getElementById("video");
var playSpeed = document.getElementById("play-speed");
var skipSpeed = document.getElementById("skip-speed");
var btnRewind = document.getElementById("skip-rewind");
var btnForward = document.getElementById("skip-forward");

function multPlaySpeed(e) {
  var value = this.options[this.selectedIndex].value;
  video.playbackRate = parseFloat(value);
  video.play();
}

function skip_rewind() {
  video.currentTime -= parseFloat(skipSpeed.value);
  if (video.currentTime < 0) {
    video.pause();
    video.currentTime = 0;
  }
}

function skip_forward() {
  video.currentTime += parseFloat(skipSpeed.value);
  if (video.currentTime > video.duration) {
    video.pause();
    video.currentTime = 0;
  }
}

function toggle_play_pause() {
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
}

playSpeed.onchange = multPlaySpeed;
btnRewind.onclick = skip_rewind;
btnForward.onclick = skip_forward;

window.onkeydown = function (e) {
  switch (e.keyCode) {
    case 37:
      e.preventDefault();
      skip_rewind();
      break;
    case 39:
      e.preventDefault();
      skip_forward();
      break;
    case 32:
      e.preventDefault();
      toggle_play_pause();
      break;
  }
};

video.onfocus = function (e) {
  e.preventDefault();
  e.target.blur();
};
