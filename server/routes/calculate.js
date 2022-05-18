// stores and requires the Express Server node module
const express = require(`express`);

// stores and requires the Express Router node module
const router = express.Router();

// stores and requires the Math JS node module
const mathjs = require(`mathjs`);

// array that stores past equations that were run
let listEquations = [];

// array that holds the formatted answer to the current equation entered
let theAnswer = [];

// POST request that adds the req.body.name to the listEquations array
// sends req.body.name to evaluate and do Math JS on the equation
// sends an 'ok' status for a valid request
router.post(`/`, (req, res) => {
    console.log(`POST to route /calculate: Equation sent to server is ${req.body.input}`);
    listEquations.push(req.body.input);
    let answer = evaluateEquation(req.body.input);
    theAnswer.push(answer);
    res.sendStatus(200);
})

// GET request that creates an object holding the equations and the answer
// clears the listAnswer array so it doesn't append on old answers
router.get(`/`, (req, res) => {
    console.log(`GET to route /calculate: Data pulled from the server is ${req.body}`);
    res.send({
        equations: listEquations,
        answer: theAnswer[0]
    })
    theAnswer = [];
})

// GET request that strictly returns the equations
router.get(`/pageLoad`, (req, res) => {
    console.log(`GET to route /calculate/pageLoad: Data pulled from the server is ${req.body}`);
    res.send({
        equations: listEquations
    })
})

// DELETE request that empties the list Equations array
// resends the listEquations array
router.delete(`/`, (req, res) => {
    console.log(`DELETE to route /calculate: Deleted all data from the calculator log at ${req.body}`);
    listEquations = [];
    res.send(listEquations);
})

// evaluates the equation using the Math JS node module
// formats the answer to include commas as proper numbers
// adds answer to the listAnswer array to be used in the GET request
function evaluateEquation(str) {
    let answer = mathjs.evaluate(str);
    return answer.toLocaleString('en-US');
}

// exports the router to use this route
module.exports = router;