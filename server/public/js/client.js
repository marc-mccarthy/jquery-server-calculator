$(document).ready(onReady);

// onReady processes all events on HTML document load
function onReady() {
    $(`#0Button`).on(`click`, pushButtonJoin);
    $(`#1Button`).on(`click`, pushButtonJoin);
    $(`#2Button`).on(`click`, pushButtonJoin);
    $(`#3Button`).on(`click`, pushButtonJoin);
    $(`#4Button`).on(`click`, pushButtonJoin);
    $(`#5Button`).on(`click`, pushButtonJoin);
    $(`#6Button`).on(`click`, pushButtonJoin);
    $(`#7Button`).on(`click`, pushButtonJoin);
    $(`#8Button`).on(`click`, pushButtonJoin);
    $(`#9Button`).on(`click`, pushButtonJoin);
    $(`#plusButton`).on(`click`, pushButtonJoin);
    $(`#minusButton`).on(`click`, pushButtonJoin);
    $(`#multiplicationButton`).on(`click`, pushButtonJoin);
    $(`#divisionButton`).on(`click`, pushButtonJoin);
    $(`#periodButton`).on(`click`, pushButtonJoin);
    $(`#deleteSpaceButton`).on(`click`, deleteSpace);
    $(`#clearButton`).on(`click`, clearCalcInput);
    $(`#equalsButton`).on(`click`, checkEquation);
}

// TODO array of acceptable inputs on the DOM. Not used yet
let acceptableChar = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `+`, `-`, `*`, `/`, `.`];
// array for holding equations
let allCalc = [];
// array for holding each button press for a single equation entry
let currentCalc = [];

// adds this button value to the currentCalc array
// joins each element in the currentCalc array into a string and adds it to the DOM 
function pushButtonJoin() {
    currentCalc.push($(this).val());
    $(`#calcInput`).val(currentCalc.join(``));
}

// store value of calcInput on DOM
// checks if nothing is inside calcInput and shows user an alert that there is nothing input to process
// runs postEquation if there are no issues
function checkEquation() {
    let calcInput = $(`#calcInput`).val();
    if (calcInput === ``) {
        return alert(`Nothing to process...`);
    }
    let invalidChar = currentCalc.filter(char => !acceptableChar.includes(char))
    if (invalidChar.length > 0) {
        alert(`Invalid characters used`)
    }
    postEquation();
}

// create equation object
// create POST request that sends the equation object
// run getEquation function after request is completed *or*
// send alert to user if POST request fails
function postEquation() {
    let equation = {
        name: $(`#calcInput`).val(),
    }
    $.ajax({
        method: `POST`,
        url: `/calculate`,
        data: equation,
    }).then(response => {
        console.log(`Valid response back from POST: ${response}`);
        getEquation();
    }).catch(response => {
        alert(`Invalid response back from POST: ${response}`);
    })
}

// create GET request that receives the response from the server
// pass the response into appendAnswer function to get answer *or*
// pass the response into appendEquations function to get all previous equations *or*
// send alert to user if GET request fails
function getEquation() {
    $.ajax({
        method: `GET`,
        url: `/calculate`,
    }).then(response => {
        console.log(`Valid response back from GET: ${response}`);
        appendAnswer(response);
        appendEquations(response);
    }).catch(response => {
        alert(`Invalid response back from GET: ${response}`);
    })
}

// clears out the previous calculation in the DOM
// adds the current GET response answer to the calculation on DOM
function appendAnswer(response) {
    let el = $(`#calculation`);
    el.empty();
    el.append(response.answer);
}

// clears out the previous calculation log in the DOM
// adds the current GET response answer to the calculation on DOM
function appendEquations(response) {
    let el = $(`#calcLog`);
    el.empty();
    let listEquations = response.equations;
    for (i = 0; i < listEquations.length; i++) {
        el.append(`<li class="listEquations id="equation${i}">${listEquations[i]}</li>`);
    }
}

// removes last button press from currentCalc array on button click
// joins each element in the currentCalc array into a string and adds it to the DOM
function deleteSpace() {
    currentCalc.pop();
    $(`#calcInput`).val(currentCalc.join(``));
}

// clears the calcInput on the DOM
// clears currentCalc input so it doesn't reappear on the DOM at the start of a new equation
function clearCalcInput() {
    $(`#calcInput`).val(``);
    currentCalc = [];
}