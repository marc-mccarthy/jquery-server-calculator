let acceptableChar = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `+`, `-`, `*`, `/`, `.`]

let currentCalc = ['4', '2'];

function checkEquations() {
    let badChar = currentCalc.filter(char => !acceptableChar.includes(char))
    if (badChar.length > 0) {
        return `Bad Characters`
    } else {
        return `Proceed`
    }
}

console.log(checkEquations())
