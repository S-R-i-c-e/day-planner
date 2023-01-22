const $dateField = $("#todays-date");
const $timeField = $("#the-time");


$(document).ready(function () {
    let today = moment().format("dddd DD-MMMM-YYYY");
    $dateField.text(today);
    let theTime = moment().format("mm:ss");
    $timeField.text(theTime);

})
// hoursStrings : generator creates strings for each hour between the arguments
// from, to : integers 0..23 (to be meaningful), from <= to.
function* hoursStrings(from, to) {
    for (let h = from; h <= to; h++) {
        if (h < 10) {
            yield "0" + h.toString() + ":00";
        } else {
            yield h.toString() + ":00";
        }
    }
}


// 
function* htmlHourText(from, to) {
// htmlHourText : generate Bootstrap text equivalent to day-planner hourly elements
}

let hourElementStringPartOne = '<li id="string';
let hourElementStringPartTwo = '" class="list-group-item d-flex justify-content-between align-items-center"><span class="hour mx-3">';
let hourElementStringPartThree = '</span><span class="hour-plan m-1">plan here</span><button class="btn btn-primary" type="submit">Button</button></li>'
let planList = $("ul");
for(i=0; i<4;i++) {
    planList.append($(hourElementString));
}
let hoursInTheDay = hoursStrings(9, 17);
for(let hourString of [...hoursInTheDay]) {
    console.log(hourString);
}
// let hourTag = $(hourElementString);
// $planList.append(hourTag);
// $planList.append(hourTag);
// $planList.append(hourTag);
// $planList.append(hourTag);

// let test = hoursStrings(9,13);
// console.log(test.next().value);
// console.log(test.next().value);
// console.log(test.next().value);
// // to create strings in the format "xx:00", xx is range 00..23 //
// class HourString {
//     constructor(from, to) {
//         // from - 0..23, to 0..23, from <= to //
//         this.from = from;
//         this.to = to;
//     }

//     *[Symbol.iterator]() {
//         for(let h=this.from; h <= this.to; h++) {
//             if(h<10) {
//                 yield "0"+h.toString()+":00";
//             } else {
//                 yield h.toString()+":00";
//             }
//         }
//     }

//     toString() {return this.from + '..' + this.to}
// }
// let a=new HourString(1,3);
// console.log(a.toString());
// console.log(a.next());

/* time functions
    set an interval timer to chime on teh first hour after opening the app
    and chime on every hour after 
*/
function millisecondsToTheHour(timeString) {
    /* parses a string in the format "mm:ss" format, returns number of milliseconds to the hour */
    const milliSecondsInASecond = 10 ** 3;
    const milliSecondsInAnHour = milliSecondsInASecond * 60 ** 2;
    const milliSecondsPastTheHour = timeString.split(":") // minutes and seconds in an array
        .reverse() // swap order to take advantage of the array index
        .map(x => Number(x)) // convert the number strings
        .reduce((tot, el, ind) => tot += el * 60 ** ind) // x**0 = 1 for all x
        * milliSecondsInASecond;
    return milliSecondsInAnHour - milliSecondsPastTheHour;
}
console.log(millisecondsToTheHour(moment().format("mm:ss")));

setTimeout(repeatedChimes(), millisecondsToTheHour(moment().format("mm:ss")));


function repeatedChimes() {
    const milliSecondsInAnHour = 10 ** 3 * 60 ** 2;
    updateHour(moment());
    setTimeout(updateHour(moment()), milliSecondsInAnHour);
}

function updateHour(time) {
    console.log(time.format("HH:mm:ss"));
}
