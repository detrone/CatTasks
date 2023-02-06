// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
var timeRunning = new Boolean(false);

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const RESET_TIME = 1500;
var TIME_LIMIT = 1500;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0" xmlns="http://www.w3.org/2000/svg">
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

function onTimesUp() {
  clearInterval(timerInterval);
  timeRunning = false;
  btnStart.innerText = "▶";
}

function startTimer() {
  if (timeLeft > 0) {
    timeRunning = true;
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      document.getElementById("base-timer-label").innerHTML = formatTime(
        timeLeft
      );
  
      if (timeLeft === 0) {
        onTimesUp();
      }
    }, 1000);
}
}

function formatTime(time) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor(time / 60 - hours * 60);
  let seconds = time % 60;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  if (hours < 1) {
    hours = ``;
  } else {
    hours = `${hours}:`
  }

  return `${hours}${minutes}:${seconds}`;
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

/*toggle start button*/ 
const btnStart = document.getElementById("startTime");

function toggleStart() {
  {
    if(timeRunning == false && timeLeft > 0) {
      startTimer();
      btnStart.innerText = "∎";
    } else if (timeRunning == true){
      onTimesUp();
      btnStart.innerText = "▶";
    } 
  }
}

function addMinute() {
  timeLeft += 60;
  TIME_LIMIT += 60;
  document.getElementById("base-timer-label").innerHTML = formatTime(
    timeLeft
  );
}

function minusMinute(){
  if (timeLeft >= 60) {
  timeLeft -= 60;
  TIME_LIMIT -= 60;
  document.getElementById("base-timer-label").innerHTML = formatTime(
    timeLeft
  );
  }
}

function resetTimer(){
  timeLeft = RESET_TIME;
  TIME_LIMIT = RESET_TIME;
  timePassed = 0;
  document.getElementById("base-timer-label").innerHTML = formatTime(
    timeLeft
  );
  onTimesUp();
}

function breakTime(){
  timeLeft = 300;
  TIME_LIMIT = 300;
  timePassed = 0;
  document.getElementById("base-timer-label").innerHTML = formatTime(
    timeLeft
  );
  onTimesUp();
}