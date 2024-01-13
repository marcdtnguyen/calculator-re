const exp = document.querySelector('.expression');
const expArray = [0];
const value = document.querySelector('.value');

// const operations = ['+', '-', '*', '/']

const btns = document.querySelector('.buttons')
btns.addEventListener('click', (e) => { 
    if (e.target != btns) onKey(e.target.innerText) 
})

document.addEventListener('keypress', (e) => {
if (e.key.match(/[\d=*/+-]/)) onKey(e.key)
})

function onKey(key){
    // playanimation(key)
    switch(key){
        // case : addNumber();
        // break;
        // case op: addOperator();
        // break;
        case '=': onEqual();
        break;
        default: key.match(/[\d]/) ? addNumber(key) : addOperator(key)
    }
    show(exp, expArray.join(' '))
}

// playanimation = (key) => {
//     playAnimation
// }

function show(display, value){
    display.innerText = value;
}

function addNumber(num){
    console.log(num);
//     last = getLastValue()
//     if(last = 0){
//         expression.replace(last, num)
//     } else if (last = number){
//         expression.replace(last, last+num)
//     } else {
//         expression.push(num)
//     }
}

function addOperator(op){
    console.log(op)
//     last = getLastValue()
//     if(last = op){
//         expression.replace(last, op)
//     } else{
//         expression.push(op)
//     }
}

// addition function (a, b) => a + b;
// subtraction function (a, b) => a - b;
// multiplication function (a, b) => a * b;
// division function (a, b) => a / b;

function onEqual(){
    console.log('=')
//     getExpression
//     value = calculate processed expression
//     display(value)
}

// calculate = (proExp) {
//     proExp.reduce()
//     * / 
//     + -
//     return value;
// }
