$(document).ready(onReady);

function onReady() {
    $(`#0Button`).on(`click`, evalButtons)
    $(`#1Button`).on(`click`, evalButtons)
    $(`#2Button`).on(`click`, evalButtons)
    $(`#3Button`).on(`click`, evalButtons)
    $(`#4Button`).on(`click`, evalButtons)
    $(`#5Button`).on(`click`, evalButtons)
    $(`#6Button`).on(`click`, evalButtons)
    $(`#7Button`).on(`click`, evalButtons)
    $(`#8Button`).on(`click`, evalButtons)
    $(`#9Button`).on(`click`, evalButtons)
    $(`#plusButton`).on(`click`, evalButtons)
    $(`#minusButton`).on(`click`, evalButtons)
    $(`#multiplicationButton`).on(`click`, evalButtons)
    $(`#divisionButton`).on(`click`, evalButtons)
    $(`#periodButton`).on(`click`, evalButtons)
    $(`#deleteSpaceButton`).on(`click`, deleteSpace)
    $(`#clearButton`).on(`click`, clearCalcInput)
}

let currentCalc = [];

function evalButtons() {
    currentCalc.push($(this).val())
    $(`#calcInput`).val(currentCalc.join(``))
}

function deleteSpace() {
    currentCalc.pop();
    $(`#calcInput`).val(currentCalc.join(``))
}

function clearCalcInput() {
    $(`#calcInput`).val(``);
}