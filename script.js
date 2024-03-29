const exp = document.querySelector('.expression');
let expArray = ["0"];
exp.textContent = expArray[0];
const result = document.querySelector('.result');

const operations = ['+', '-', '*', '/']

const btns = document.querySelector('.buttons')
btns.addEventListener('click', (e) => { 
    if (e.target != btns) onKey(e.target.textContent) 
})

document.addEventListener('keydown', (e) => {
if (e.key.match(/[\d=.*/+-]/) || e.key == 'Enter' || e.key == 'Backspace' || e.key == 'Delete') onKey(e.key)
})

function onKey(key){
    // playanimation(key)
    switch(key){
        case 'Enter':
        case '=': onEqual();
        break;
        case 'Backspace':
        case 'Delete': removeKey();
        break;
        case '.': addDec(key);
        break;
        default: key.match(/[\d]/) ? addNumber(key) : addOperator(key)
    }
    show(exp, expArray.join(' '))
}

// playanimation = (key) => {
//     playAnimation
// }

function show(display, value){
    display.textContent = value;
}

function addNumber(num){
    const last = getLastValue()
    if(last == 0){
        expArray.splice(-1, 1, num);
    } else if (Number(last)){
        expArray.splice(-1, 1, last+num)
    } else {
        expArray.push(num)
    }
}

function addOperator(op){
    const last = getLastValue()
    const bLast = expArray[expArray.length-2];

    if(op != '-' && last == '-' && operations.includes(bLast)){
        expArray.splice(-2, 2,op)
    }
    if((last == '*' || last == '/') && op == '-'){
        expArray.push(op);
    } 
    if(operations.includes(last)){
        expArray.splice(-1, 1, op)
    } else{
        expArray.push(op)
    }
}

function addDec(key){
    const last = getLastValue()
    if(isNaN(last)){
        expArray.push(key)
    }
    else if(!last.includes(key) && !operations.includes(last)){
        expArray.splice(-1, 1, last+key)
    }
}

function getLastValue(){
    return expArray[expArray.length-1]
}

const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function onEqual(){
    processExp();
    const value = calculate();
    show(result, value)
    expArray = ["0"];
    show(exp, expArray[0]);
}

function removeKey(){
    const last = getLastValue();
    if(last == undefined) return;
    last.length == 1 ? expArray.pop() : expArray.splice(-1, 1, last.slice(0, -1))
}

function processExp(){
    let last = getLastValue();

    while(operations.includes(last)){
        expArray.pop();
        last = getLastValue();
    }

    let index = expArray.findIndex((e, i)=>operations.includes(e) && operations.includes(expArray[i-1]))

    while(index != -1){
        expArray.splice(index, 2, '-' + expArray[index + 1])
        index = expArray.findIndex((e, i)=>operations.includes(e) && operations.includes(expArray[i-1]))
    }
}

function operate(index, operation){
    expArray.splice(index - 1, 3, operation(expArray[index - 1], expArray[index + 1]))
}

function calculate(){
    while(expArray.includes('*') || expArray.includes('/')){
        const index = expArray.findIndex((e)=> e == '*' || e == '/')
        expArray[index] == '*' ? 
        operate(index, multiply) : 
        operate(index, divide)
    }

    while(expArray.includes('+') || expArray.includes('-')){
        const index = expArray.findIndex((e)=> e == '+' || e == '-')
        expArray[index] == '+' ? 
        operate(index, add) : 
        operate(index, subtract)
    }

    return expArray.join(' ')
}
