const breakEl = document.querySelector(".breakLength");
const workEl = document.querySelector(".workLength");
const time = document.querySelector("#time");
const clock = document.querySelector("#clock");
const workRestState = document.querySelector(".workRestTime");
const minState = document.querySelector(".minutes");
let isPaused = 1;
let seconds = 60;
let minutes = parseInt(workEl.textContent);
let count = 0;
let myInterval;
time.textContent = `${workEl.textContent}:00`;

clock.addEventListener("click", () => {
  isPaused++;
  clearInterval(myInterval);
  workRestState.classList.toggle("paused");
  minState.classList.toggle("paused");

  myInterval = setInterval(() => {
    function pad(d) { //add a "0" in front of 1-9 numbers
      return (d < 10) ? `0${d.toString()}` : d.toString();
    }

    if (isPaused % 2 === 0) {
      seconds--;
      if (seconds === 0) {
        seconds = 60;
        minutes--;
      }
      time.textContent = `${minutes - 1}:${pad(seconds)}`;
    }

  }, 1000); // end of interval
});
