$(document).ready(onReady);

function onReady() {
    $(`#0Button`).on(`click`, pushButtonJoin)
    $(`#1Button`).on(`click`, pushButtonJoin)
    $(`#2Button`).on(`click`, pushButtonJoin)
    $(`#3Button`).on(`click`, pushButtonJoin)
    $(`#4Button`).on(`click`, pushButtonJoin)
    $(`#5Button`).on(`click`, pushButtonJoin)
    $(`#6Button`).on(`click`, pushButtonJoin)
    $(`#7Button`).on(`click`, pushButtonJoin)
    $(`#8Button`).on(`click`, pushButtonJoin)
    $(`#9Button`).on(`click`, pushButtonJoin)
    $(`#plusButton`).on(`click`, pushButtonJoin)
    $(`#minusButton`).on(`click`, pushButtonJoin)
    $(`#multiplicationButton`).on(`click`, pushButtonJoin)
    $(`#divisionButton`).on(`click`, pushButtonJoin)
    $(`#periodButton`).on(`click`, pushButtonJoin)
    $(`#deleteSpaceButton`).on(`click`, deleteSpace)
    $(`#clearButton`).on(`click`, clearCalcInput)
    $(`#equalsButton`).on(`click`, checkEquation)
}

// array for holding equations
let allCalc = [];
// array for holding button presses
let currentCalc = [];

// adds button value on button calculator button press
function pushButtonJoin() {
    // adds this button value to the currentCalc array
    currentCalc.push($(this).val());
    // joins each element in the currentCalc array into a string and adds it to the DOM 
    $(`#calcInput`).val(currentCalc.join(``));
}

// deletes last button press on DOM
function deleteSpace() {
    // removes last button press from currentCalc array
    currentCalc.pop();
    // joins each element in the currentCalc array into a string and adds it to the DOM
    $(`#calcInput`).val(currentCalc.join(``))
}

function clearCalcInput() {
    $(`#calcInput`).val(``);
    currentCalc = [];
}

function checkEquation() {
    if ($(`#calcInput`).val() === ``) {
        alert(`Nothing to process...`)
        return false
    }
    postEquation();
}

function postEquation() {
    let equation = {
        name: $(`#calcInput`).val(),
    }
    $.ajax({
        method: `POST`,
        url: `/calculate`,
        data: equation
    }).then(response => {
        console.log(`Valid Back from POST: ${response}`)
        processEquation();
    }).catch(response => {
        console.log(`Invalid Back from POST ${response}`)
    })
}

function processEquation() {
    $.ajax({
        method: `GET`,
        url: `/calculate`
    }).then(response => {
        console.log(`Valid Back from GET`, response)
        appendAnswer(response);
        appendEquations(response);
    }).catch(response => {
        console.log(`Invalid Back from GET ${response}`)
    })
}

function appendAnswer(response) {
    let el = $(`#calculation`)
    el.empty();
    el.append(response.answer)
}

function appendEquations(response) {
    console.log(response.equations)
    let el = $(`#calcLog`)
    el.empty();
    let listEquations = response.equations
    for (i = 0; i < listEquations.length; i++) {
        el.append(`<li class="listEquations id="equation${i}">${listEquations[i]}</li>`)
    }
}