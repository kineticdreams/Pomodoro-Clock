const restEl = document.querySelector(".restLength");
const workEl = document.querySelector(".workLength");
const time = document.querySelector("#time");
const label = document.querySelector("#sessionLabel");
const inside = document.querySelector(".inside");
const workRestState = document.querySelector(".workRestTime");
const minState = document.querySelector(".minutes");
const reset = document.querySelector("#reset");
let isPaused = 1;
let seconds = 0;
let workMinutes = parseInt(workEl.textContent);
let restMinutes = parseInt(restEl.textContent);
let myInterval;
let canWork = true;

function pad(number) { //add a "0" in front of 1-9 numbers
  return (number < 10) ? `0${number.toString()}` : number.toString();
}

function timeFormat(mins) { // convert mins to hour:min:sec
  mins = parseInt(mins);
  let hours = Math.floor(mins / 60);
  hours = hours > 0 ? pad(hours) : hours;
  if (hours > 0) {
    return `${hours}:${pad(mins % 60)}:${pad(seconds)}`;
  } else {
    return `${pad(mins)}:${pad(seconds)}`;
  }
}

function changeAnimDuration(min) {
  return workRestState.style.animationDuration = `${min * 60}s`;
}

function resetAnimation() {
  workRestState.classList.remove("runAnimation");
  minState.classList.remove("runAnimation");
  setTimeout(() => {
    workRestState.classList.add("runAnimation");
    minState.classList.add("runAnimation");
  }, 1);
}

// initializing display and
time.textContent = timeFormat(workMinutes);
changeAnimDuration(workMinutes);

document.addEventListener("click", (event) => { // start/stop clock
  console.log(event);
  event.preventDefault;
  // implementation of plus/minus buttons
  if (isPaused % 2 !== 0) {
    console.log("Before Switch:", restMinutes, workMinutes, seconds, canWork, workRestState.style.animationDuration, minState.style.animationPlayState);
    switch (event.target.className) {
      case "c minusR":
        restMinutes = restMinutes <= 1 ? 1 : --restMinutes;
        seconds = 0;
        resetAnimation();
        if (!canWork) {
          time.textContent = timeFormat(restMinutes);
          changeAnimDuration(restMinutes);
        }
        restEl.textContent = restMinutes;
        break;
      case "c plusR":
        ++restMinutes;
        seconds = 0;
        resetAnimation();
        if (!canWork) {
          time.textContent = timeFormat(restMinutes);
          changeAnimDuration(restMinutes);
        }
        restEl.textContent = restMinutes;
        break;
      case "c minusW":
        workMinutes = workMinutes <= 1 ? 1 : --workMinutes;
        seconds = 0;
        resetAnimation();
        if (canWork) {
          time.textContent = timeFormat(workMinutes);
          changeAnimDuration(workMinutes);
        }
        workEl.textContent = workMinutes;
        console.log(workRestState.style.animationDuration);
        break;
      case "c plusW":
        ++workMinutes;
        seconds = 0;
        resetAnimation();
        if (canWork) {
          time.textContent = timeFormat(workMinutes);
          changeAnimDuration(workMinutes);
        }
        workEl.textContent = workMinutes;
        break;
      default:
    }
  } // end of code for +/-

  let workM = workMinutes;
  let restM = restMinutes;

  if (event.target.nearestViewportElement.id === "clock") {
    isPaused++;
    workRestState.classList.toggle("paused");
    minState.classList.toggle("paused");
    clearInterval(myInterval);

    myInterval = setInterval(() => {

      if (isPaused % 2 === 0) {

        if (canWork) {
          inside.classList.remove("red");
          time.textContent = timeFormat(workMinutes);
          label.textContent = "Work time!";
          seconds--;
          if (seconds <= 0) {
            if (workMinutes === 0) {
              seconds = 0;
            } else {
              seconds = 59;
            }
            if (workMinutes === 0) {
              canWork = false;
              restMinutes = restM;
              changeAnimDuration(restM);
            } else {
              workMinutes--;
            }
          }
        } else {
          inside.classList.add("red");
          time.textContent = timeFormat(restMinutes);
          label.textContent = "Relax";
          seconds--;
          if (seconds <= 0) {
            if (restMinutes === 0) {
              seconds = 0;
            } else {
              seconds = 59;
            }
            if (restMinutes === 0) {
              canWork = true;
              workMinutes = workM;
              changeAnimDuration(workM);
            } else {
              restMinutes--;
            }
          }
        }
        console.log("End:", restM, workM, restMinutes, workMinutes, seconds, canWork, workRestState.style.animationDuration, workRestState.style.animationPlayState);
      }

    }, 1000); // end of interval
  }
}, false);
