window.onload = function() {

    let workTime;
    let breakTime;
    let restTime;
    let timesCompleted;
    let cyclesGoal;
    let cyclesCompleted = 0;

    function pomodoroController() {
        if (isRestTime()) {
            cyclesCompleted++;
            if (!goalReached()) {
                currentTime = restTime;
                timer();
                timesCompleted = 0;
            } else {
            }
            return;
        }
        if (timesCompleted % 2 == 0) {
            currentTime = workTime;
            timesCompleted++;
            timer();
        } else {
            currentTime = breakTime;
            timesCompleted++;
            timer();
        };
    };

    function isRestTime() {
        return timesCompleted == 7;
    };

    function goalReached() {
        return cyclesGoal == cyclesCompleted;
    }

    let currentTime;
    let seconds = 0;

    function timer() {
        if (currentTime > 0 || seconds > 0) {
            if (seconds == 0) {
                seconds = 59;
                currentTime--;
            } else {
                seconds--;
            }
            updateClock();
            console.log(currentTime, seconds);
            interval = setTimeout(timer,1000);
        } else{
            pomodoroController();
        };
    };

    let clock = document.getElementById('clock');
    let cyclesInput = document.getElementById('cycles-input');
    let startButton = document.getElementById('start-button');
    let workTimeInput = document.getElementById('work-time');
    let breakTimeInput = document.getElementById('break-time');
    let restTimeInput = document.getElementById('rest-time');

    startButton.onclick = () => {
        populateVariables();
        startPomodoro();
    };

    function startPomodoro() {
        pomodoroController();
    };

    function populateVariables() {
        workTime = workTimeInput.value;
        breakTime = breakTimeInput.value;
        restTime = restTimeInput.value;
        cyclesGoal = cyclesInput.value;
        timesCompleted = 0;
    };

    let clockMinutes;
    let clockSeconds;

    function updateClock() {
        clockMinutes = formatNumbers(currentTime);
        clockSeconds = formatNumbers(seconds);
        clock.innerHTML = clockMinutes + ":" + clockSeconds;
    };

    function formatNumbers(time) {
        let formattedDigits;
        if (time < 10) {
            formattedDigits = "0" + time;
        } else {
            formattedDigits = time;
        }
        return formattedDigits;
    }
};