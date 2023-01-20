const $dateField = $("#todays-date");
const $timeField = $("#the-time");

$(document).ready(function () {
    let today = moment().format("dddd DD-MMMM-YYYY");
    $dateField.text(today);
    let theTime = moment().format("mm:ss");
    $timeField.text(theTime);
    console.log(typeof theTime);
    console.log("second past the hour : " + millisecondsToTheHour(theTime));
    console.log("to the hour<45:30> " + millisecondsToTheHour("58:00"));

})


/* time functions
    set an interval timer to chime on teh first hour after opening the app
    and chime on every hour after 
*/
const millisecondsToTheHour = function (timeString) {
    /* parses a string in the format "mm:ss" format, returns number of milliseconds to the hour */
    const milliSecondsInASecond = 10**3;
    const milliSecondsInAnHour = milliSecondsInASecond * 60 ** 2;
    const milliSecondsPastTheHour =
        timeString.split(":")
            .reverse()
            .map(x => Number(x))
            .reduce((tot, el, ind) => tot += el * 60 ** ind)
            * milliSecondsInASecond;
    return milliSecondsInAnHour - milliSecondsPastTheHour;
}

const firstChime = setTimeout(repeatedChimes,
                            millisecondsToTheHour(moment().format("mm:ss")));

const milliSecondsInAnHour = 10**3*60**2;
function repeatedChimes() {
    updateHour(moment());
    setInterval(repeatedChimes, milliSecondsInAnHour);
}
function updateHour(time) {
    console.log(time.format("HH:mm:ss"));
}