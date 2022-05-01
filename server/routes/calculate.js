// stores and requires the Express Server node module
const express = require(`express`);

// stores and requires the Express Router node module
const router = express.Router();

// stores and requires the Math JS node module
const mathjs = require(`mathjs`);

// array that stores past equations that were run
let listEquations = [];

// array that holds the formatted answer to the current equation entered
let listAnswer = [];

// GET request that creates an object holding the equations and the answer
// clears the listAnswer array so it doesn't append on old answers
router.get(`/`, (req, res) => {
    console.log(`/calculate GET`);
    res.send({
        equations: listEquations,
        answer: listAnswer,
    })
    listAnswer = [];
})

// POST request that adds the req.body.name to the listEquations array
// sends req.body.name to evaluate and do Math JS on the equation
// sends an 'ok' status for a valid request
router.post(`/`, (req, res) => {
    console.log(`/calculate POST`);
    listEquations.push(req.body.name);
    evaluateEquation(req.body.name);
    res.sendStatus(200);
})

router.delete(`/`, (req, res) => {
    console.log(`/calculate DELETE`);
    listEquations = [];
    res.send(listEquations);
})

// evaluates the equation using the Math JS node module
// formats the answer to include commas as proper numbers
// adds answer to the listAnswer array to be used in the GET request
function evaluateEquation(str) {
    let answer = mathjs.evaluate(str);
    let answerFormatted = answer.toLocaleString('en-US');
    listAnswer.push(answerFormatted);
}

// exports the router to use this route
module.exports = router;