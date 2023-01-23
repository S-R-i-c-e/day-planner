// CONSTANT AND VARIABLE DECLARATIONS
// name the html element handles
const $dateField = $("#todays-date");
const planList = $("ul");  

const NINEOCLOCK = 9; //start of the working day

// Create the page
let today = moment().format("dddd DD-MMMM-YYYY");
$dateField.text(today);
let pArray = planStorage();
console.log(pArray);
renderPlan();



// plan storage an array of strings, one for each hour of the plan, in hour order
function planStorage() {
    let planArray = retrieve("day-plan") || createPlanStorage();
    store("day-plan", planArray);
    return planArray;
}

function createPlanStorage() {
    let hours = hoursStrings(9,17);
    let plan = [];
    for(index in [...hours]) {
        plan.push("click to set text");
    }
    return plan;
}

function parseHour(hour) {
    return Number(hour.replace(/:00/, ""))-NINEOCLOCK;
}
 function retriveDayPlan(hour) {
    parseHour(hour);

 }
// colorHours - makes no sense - recieves the hour in "HH" format
 function colorHours(time) {
    const thisHour = Number(time)-NINEOCLOCK; // suntract 9 to aligne hours with array indicies starting at 9 o'clock
    const past = "bg-secondary"; // some bootstarp colors
    const present = "bg-danger";
    const future = "bg-primary"
    let hours = hoursStrings(9,17); //9-17 hours generator
    let colorPlan = [];                // array to hold the Bootstrap color strings
    for(let hour of [...hours]) {      // shuffle throughth the day in your sad way
        if(parseHour(hour) < thisHour) { // assign colors
            colorPlan.push(past);
        } else {
            if(parseHour(hour) == thisHour) {
                colorPlan.push(present);
            } else {
                colorPlan.push(future);
            }
        }
    }
    return colorPlan;   
 }
//     const hourElementStringPartFour = '</span><span class="hour-plan m-1">'
//     const hourElementStringPartFive = '<button class="btn btn-primary" type="submit">Button</button></li>'
function renderPlan() {
    // strings equating to Bootstrap day-plan list elements
    // split hourElement String into three to include id and hour string in iterator
    const hourElementStringPartOne = '<li id="string';  // 'string' pre-fix for hour-wise identifier because id name must start with alpha-char
    const hourElementStringPartTwo = '" class="list-group-item d-flex justify-content-between align-items-center ';
    const hourElementStringPartThree = '"><span class="hour mx-3">';
    const hourElementStringPartFour = '</span><span id="text';
    const hourElementStringPartFive = '" class="mx-3"></span><button class="btn btn-primary" type="submit">Button</button></li>'
    const hourColors = colorHours(moment().format("HH"));  // check hour color routine here - enter 24 hour clock hour "HH"

    let hoursInTheDay = hoursStrings(9, 17);    // set the hours in a day
    for(let hourString of [...hoursInTheDay]) {
        let hourElementString = hourElementStringPartOne +
                                hourString +
                                hourElementStringPartTwo +
                                hourColors[parseHour(hourString)] +
                                hourElementStringPartThree +
                                hourString +
                                hourElementStringPartFour +
                                parseHour(hourString) +
                                hourElementStringPartFive;
        planList.append($(hourElementString));
        let jElementText = "#text" + parseHour(hourString);
        $(jElementText).text(pArray[parseHour(hourString)]);

    }

}

function clearPlan() {
    $("li").detach();
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

const runEveryFullHours = (updateHour) => {
    setTimeout(() => {
        updateHour;
        setInterval(updateHour, Hour);
    }, firstCall);
  };

const updateHour = (time) => {
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