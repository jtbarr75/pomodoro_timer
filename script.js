
let sessionTime = 25*60;
let breakTime = 5*60;
let timeRemaining = 25*60;
let isPaused = true;
let isOnBreak = false;
let timer = document.getElementById("timer");
let session = document.getElementById("session-label");
let breakContainer = document.getElementById("break-label");
let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let resetButton = document.getElementById("reset");
let increaseSessionButton = document.getElementById("session-increase");
let decreaseSessionButton = document.getElementById("session-decrease");
let increaseBreakButton = document.getElementById("break-increase");
let decreaseBreakButton = document.getElementById("break-decrease");
let sessionButton = document.getElementById("session-button");
let breakButton = document.getElementById("break-button");

startButton.addEventListener("click", start);
stopButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
sessionButton.addEventListener("click", backToWork);
breakButton.addEventListener("click", takeBreak);

increaseSessionButton.addEventListener("click", function(){
    if (isPaused){
        if (sessionTime != 3600){
            sessionTime += 60;
        updateSession();
        }
    }
});

decreaseSessionButton.addEventListener("click", function(){
    if (isPaused){
        if (sessionTime != 60){
            sessionTime -= 60;
        updateSession();
        }
    }
});

increaseBreakButton.addEventListener("click", function(){
    if (isPaused){
        if (breakTime != 3600){
            breakTime += 60;
            updateBreak();
        }
        
    }
});

decreaseBreakButton.addEventListener("click", function(){
    if (isPaused){
        if (breakTime != 60){
            breakTime -= 60;
            updateBreak();
        }
    }
});

var t = setInterval(function() {
    if (!isPaused){
        if (timeRemaining <= 0){
            timer.innerHTML = "00:00";
            document.querySelector("title").innerHTML = "Ding!";
            playSound();
            isPaused = true;
        }
        else {
            updateTimer()
            timeRemaining--;
        }
    }
    
}, 1000);

function takeBreak(){
    if (isPaused){
        isOnBreak = true;
        document.getElementById("session-or-break").innerHTML = "Break";
        reset();
    } 
}

function backToWork(){
    if (isPaused){
        isOnBreak = false;
        document.getElementById("session-or-break").innerHTML = "Session";
        reset();
    } 
}

function pause(){
    isPaused = true;
}

function start(){
    isPaused = false;
}

function reset(){
    if (isOnBreak){
        timeRemaining = breakTime;
    } else {
        timeRemaining = sessionTime;
    }
    updateTimer();
}

function updateTimer(){
    var minutes = Math.floor(timeRemaining / 60);
    var seconds = Math.floor(timeRemaining % 60);
    timer.innerHTML = `${pad(minutes)}:${pad(seconds)}`;
    document.querySelector("title").innerHTML = `(${pad(minutes)}:${pad(seconds)}) Pomodoro Timer`;
}

function updateSession(){
    var minutes = Math.floor(sessionTime / 60);
    session.innerHTML = `${pad(minutes)}`;
    if (!isOnBreak){
        reset();
    }
}

function updateBreak(){
    var minutes = Math.floor(breakTime / 60);
    breakContainer.innerHTML = minutes;
    if (isOnBreak){
        reset();
    }
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function playSound() {
    const audio = document.getElementById("ding");
    if (!audio) return;
    audio.play();
  }