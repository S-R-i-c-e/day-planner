// CONSTANT AND VARIABLE DECLARATIONS
// name the html element handles
const $dateField = $("#todays-date");

// Create the page
let today = moment().format("dddd DD-MMMM-YYYY");
$dateField.text(today);
planStorage();
renderPlan();

function planStorage() {
    planArray = retrieve("day-plan") || createPlanStorage();
    store("day-plan", planArray);
}

function createPlanStorage() {
    const PLANPLACEHOLDER = "Please enter your task by clicking this text";
    let hours = hoursStrings(9,17);
    let plan = [];
    for(index in [...hours]) {
        plan.push(PLANPLACEHOLDER);
    }
    return plan;
}
function parseHour(hour) {
    const NINEOCLOCK = 9;
    return Number(hour.replace(/:00/, ""))-NINEOCLOCK;
}
console.log(parseHour("10:00"));
 function retriveDayPlan(hour) {
    parseHour(hour);

 }

function renderPlan() {
    // strings equating to Bootstrap day-plan list elements
    // split hourElement String into three to include id and hour string in iterator
    const hourElementStringPartOne = '<li id="string';  // 'string' pre-fix for hour-wise identifier because id name must start with alpha-char
    const hourElementStringPartTwo = '" class="list-group-item d-flex justify-content-between align-items-center"><span class="hour mx-3">';
    const hourElementStringPartThree = '</span><span class="hour-plan m-1">'
    const hourElementStringPartFour = '</span><button class="btn btn-primary" type="submit">Button</button></li>'

    let hoursInTheDay = hoursStrings(9, 17);    // set the hours in a day
    let planList = $("ul");                     // the handle for the list
    for(let hourString of [...hoursInTheDay]) {
    //    console.log(hourString);                // test
        let hourElementString = hourElementStringPartOne +
                                hourString +
                                hourElementStringPartTwo +
                                hourString +
                                hourElementStringPartThree +
                                planArray[parseHour(hourString)] +
                                hourElementStringPartFour;
        planList.append($(hourElementString));
    }
}

// EVENT LISTENERS
$("li").on("click", "button", function(event) {
//    console.log($(event.target).parent("li")[0].id);

 //   savePlan($(event.target).parent("li")[0].id);
});
$("li").on("click", "span", function(event) {
    $(event.target).parent("li").children()[1].textContent = "test";
//    console.log($(event.target).parent("li")[0].id);
    console.log($(event.target).parent("li").children()[1].textContent);

//    editPlan($(event.target).parent("li")[0].id);
});


function savePlan(hour) {
    console.log("save " + hour);
}

function editPlan(hour) {
    let planField = hour;
    console.log("planField " + planField);
    console.log("edit " + hour);  
}

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

// TIME FUNCTIONS
//    set an interval timer to chime on teh first hour after opening the app
//    and chime on every hour after [TODO] it's not quite right - calls twice on 
//    initiation for reason unknown - no harm if intention is to check color of planner
const MILLISECONDSINASECOND = 10 ** 3;
const MILLISECONDSINANHOUR = MILLISECONDSINASECOND * 60 ** 2;

function millisecondsToTheHour(timeString) {
    /* parses a string in the format "mm:ss" format, returns number of milliseconds to the hour */
    let milliSecondsPastTheHour = timeString.split(":")   // minutes and seconds in an array
        .reverse()                                          // swap order to take advantage of the array index
        .map(x => Number(x))                                // convert the number strings
        .reduce((tot, el, ind) => tot += el * 60 ** ind)    // since x**0 = 1 for all x
        * MILLISECONDSINASECOND;
    return MILLISECONDSINANHOUR - milliSecondsPastTheHour;
}

let chimeDelay =  setTimeout(repeatedChimes(), millisecondsToTheHour(moment().format("mm:ss")));

function repeatedChimes() {
    updateHour(moment());
    setTimeout(updateHour(moment()), MILLISECONDSINANHOUR);
}

function updateHour(time) {
    console.log(time.format("HH:mm:ss"));
}
// GENERIC FUNCTIONS
// set and get local storage
function store(storageName, obj) {
    localStorage.setItem(storageName, JSON.stringify(obj));    
}
function retrieve(storageName) {
    return JSON.parse(localStorage.getItem(storageName));
}