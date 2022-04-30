const express = require(`express`);
const router = express.Router();
const mathjs = require(`mathjs`);

let listEquations = [];
let listAnswer = [];

router.get(`/`, (req, res) => {
    console.log(`/calculate GET`);
    res.send({
        equations: listEquations,
        answer: listAnswer,
    })
    listAnswer = [];
})

router.post(`/`, (req, res) => {
    console.log(`/calculate POST`);
    listEquations.push(req.body.name);
    evaluateEquation(req.body.name);
    res.sendStatus(200);
})

function evaluateEquation(str) {
    listAnswer.push(mathjs.evaluate(str))
}

module.exports = router