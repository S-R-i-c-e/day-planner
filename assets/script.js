
const $dateField = $("#todays-date");



$(document).ready(function () {
    let today = moment().format("dddd DD-MMMM-YYYY");
    $dateField.text(today);
    // let theTime = moment().format("mm:ss");
    // $timeField.text(theTime);
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
// prove hoursString generator
// let test = hoursStrings(9,13);
// console.log(test.next().value);
// console.log(test.next().value);
// console.log(test.next().value);

// prove element append by jQuery & string
// const hourElementString = '<li class="list-group-item d-flex justify-content-between align-items-center"><span class="hour mx-3">09:00</span><span class="hour-plan m-1">plan here</span><button class="btn btn-primary" type="submit">Button</button></li>'
// let planList = $("ul");
// for(i=0; i<4;i++) {
//     planList.append($(hourElementString));
// }

// split hourElement String into three to include id and hour string in iterator
const hourElementStringPartOne = '<li id="string';  // 'string' pre-fix for hour-wise identifier because id name must start with alpha-char
const hourElementStringPartTwo = '" class="list-group-item d-flex justify-content-between align-items-center h-100"><span class="h-100 col-1 mx-3">';
const hourElementStringPartThree = '</span><span class="h-100 col-8 m-1">plan here</span><button class="btn btn-primary" type="submit">Button</button></li>'

let hoursInTheDay = hoursStrings(9, 17);    // set the hours in a day
let planList = $("ul");                     // the handle for the list
for (let hourString of [...hoursInTheDay]) {
    //    console.log(hourString);                // test
    let hourElementString = hourElementStringPartOne +
        hourString +
        hourElementStringPartTwo +
        hourString +
        hourElementStringPartThree;
    planList.append($(hourElementString));
}
// test write access to elements

$("li").on("click", "button", function (event) {
    save(trimString($(event.target).parent("li")[0].id));
    console.log("save " + $(event.target).parent("li")[0].id);  
})
$("li").on("click", "span", function (event) {
    edit(trimString($(event.target).parent("li")[0].id));
    console.log("edit " + $(event.target).parent("li")[0].id);
})

function trimString(hourID) {
    return hourID.replace(/string/, "");
}
function edit(identifier) {
//    let hour = identifier.replace(/string/, "");
    console.log("edit hour : " + identifier);
}
function save(identifier) {
//    let hour = identifier.replace(/string/, "");
    console.log("save hour : " + identifier);
}
// let hourTag = $(hourElementString);
// $planList.append(hourTag);
// $planList.append(hourTag);
// $planList.append(hourTag);
// $planList.append(hourTag);


// // to create strings in the format "xx:00", xx is range 00..23 //
// class HourString {
//     constructor(from, to) {
//         // from - 0..23, to 0..23, from <= to //
//         this.from = from;
//         this.to = to;
//     }

//     *[Symbol.iterator]() { // [Symbol.iterator] not literal - insert function name!
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
    and chime on every hour after [TODO] it's not quite right - calls twice on 
    initiation for reason unknown - no harm if intention is to check color of planner
*/
function millisecondsToTheHour(timeString) {
    /* parses a string in the format "mm:ss" format, returns number of milliseconds to the hour */
    const milliSecondsInASecond = 10 ** 3;
    const milliSecondsInAnHour = milliSecondsInASecond * 60 ** 2;
    const milliSecondsPastTheHour = timeString.split(":")   // minutes and seconds in an array
        .reverse()                                          // swap order to take advantage of the array index
        .map(x => Number(x))                                // convert the number strings
        .reduce((tot, el, ind) => tot += el * 60 ** ind)    // since x**0 = 1 for all x
        * milliSecondsInASecond;
    return milliSecondsInAnHour - milliSecondsPastTheHour;
}
// console.log(millisecondsToTheHour(moment().format("mm:ss")));

setTimeout(repeatedChimes(), millisecondsToTheHour(moment().format("mm:ss")));

function repeatedChimes() {
    const milliSecondsInAnHour = 10 ** 3 * 60 ** 2;
    updateHour(moment());
    setTimeout(updateHour(moment()), milliSecondsInAnHour);
}

function updateHour(time) {
    console.log(time.format("HH:mm:ss"));
}


// // not much doing in the HourPlan class
// class HourPlan {
//     // 
//     constructor(hour, todo) {
//         this.hour = hour;
//         this.todo = todo;
//     }
//     // get hour() {return this.hour;}
//     // get todo() {return this.todo;}
//     // set hour(time) {this.hour = time;}
//     // set todo(doThis) {this.todo = doThis;}
//     toString() { return this.hour + " & " + this.todo }
// }

// // entry = new HourPlan("09:00", "what the Hell?");
// // console.log(entry.toString());
// // console.log(entry.todo)

// class DayPlan {
//     constructor() {
//         this.day = [];
//         let hoursInTheDay = hoursStrings(9, 17);
//         for(let hour of [...hoursInTheDay]) {
//             let hourPlan = new HourPlan(hour, "");
//             this.day.push(hourPlan);
//         }
//     }
//     get hourPlan(hour) {
//         for(hourPlan of [...this.day]) {

//         })

//     }
//     toString() {
//         this.day.forEach(function(hour)   { hour=>hour.hour + " & " + hour.todo);
//     }
// }
// let today=new DayPlan();

