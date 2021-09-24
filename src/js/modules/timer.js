function timer(timerSelector, endDate) {
    //Timer
    //variables
    const millisecondsInASecond = 1000,
        millisecondsInADay = millisecondsInASecond * 60 * 60 * 24,
        millisecondsInAnHour = millisecondsInASecond * 60 * 60,
        millisecondsInAMinute = millisecondsInASecond * 60;
        
    //functions for timer
    const getTimeRemaining = (endDate) => {
        //gets time from now to the endtime
        const t = Date.parse(endDate) - Date.parse(new Date()), //in ms
            days = Math.floor(t / millisecondsInADay), //days in t
            hours = Math.floor( (t / millisecondsInAnHour) % 24 ), 
            minutes = Math.floor( (t / millisecondsInAMinute) % 60),
            seconds = Math.floor( (t / millisecondsInASecond) % 60);
        
        return {
            'totalTimeRemaining': t,
            'daysRemaining': days,
            'hoursRemaining': hours,
            'minutesRemaining': minutes,
            'secondsRemaining': seconds
        };
    };

    const putZero = (num) => {
        //returns small numbers with zero in front
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    };

    const setTimer = (timerSelector, endDate) => {
        const timer = document.querySelector(timerSelector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector('#seconds'),
            //updates timer each second
            timeInterval = setInterval(updateTimer, 1000);

        updateTimer();

        function updateTimer() {
            const t = getTimeRemaining(endDate);
            //puts numbers to HTML
            days.innerHTML = putZero(t.daysRemaining);
            hours.innerHTML = putZero(t.hoursRemaining);
            minutes.innerHTML = putZero(t.minutesRemaining);
            seconds.innerHTML = putZero(t.secondsRemaining);

            if(t.totalTimeRemaining <= 0) {
                //stops updating timer when endtime comes
                clearInterval(timeInterval);
            }
        }
    };

    setTimer(timerSelector, endDate);

}

export default timer;