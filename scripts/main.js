function operate(operator, a, b) {
    return operator === add ? add(a, b):
            operator === subtract ? subtract(a, b): 
            operator === multiply ? multiply(a, b): 
            operator === divide ? divide(a, b): null;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function evaluate(operator, operatorF){

    if(operator == '/' && +displayValue.split('/')[1] == 0){
        return display.textContent = 'ERROR';
    }

    display.textContent = operate(operatorF, +displayValue.split(operator)[0], +displayValue.split(operator)[1]);
   
    if(operator != '='){
        displayValue = display.textContent;
    }
}

let displayValue = '';
let latestInput = '';
let lastOperator = '';

const display = document.querySelector('.display');

const numbers = document.querySelectorAll('.numbers');
numbers.forEach(e => e.addEventListener('click', () => {
    
    if(lastOperator != '='){
        display.textContent += e.textContent;
        displayValue += e.textContent;
          
    }
    if(lastOperator == '=' && /[-+x/]/.test(displayValue.toString()[displayValue.length-1])){
        display.textContent += e.textContent;
        displayValue += e.textContent;   
    }   
})
);

const operators = document.querySelectorAll('.operators');
operators.forEach(e => e.addEventListener('click', () => {
    
    if(/[-+x/]/.test(displayValue) && /[^-+x/]/.test(displayValue.toString()[displayValue.length-1])){
        
        switch(latestInput){
            case('+'):               
                evaluate('+', add);               
                break;
            case('-'):             
                evaluate('-', subtract);        
                break;
            case('x'):
                evaluate('x', multiply);           
                break;
            case('/'):       
                evaluate('/', divide);              
                break;
            case('='):              
                if(/[-+x/]/.test(displayValue)){
                    evaluate(`'${displayValue.toString()[displayValue.length-1]}'`, displayValue[displayValue.search(/[-+x/]/)]);                
                }
                break;
        }      
    }

    if(/[^-+x/]/.test(displayValue.toString()[displayValue.length-1])) {
        if(e.textContent != '='){
            display.textContent += e.textContent;
            displayValue += e.textContent;
        }    
    }

    latestInput = displayValue.toString()[displayValue.length-1];
    lastOperator = e.textContent;
      
}));

const decimal = document.querySelector('.decimal');
decimal.addEventListener('click', () => {
    if(!/\./.test(displayValue)) {
            display.textContent += decimal.textContent;
            displayValue += decimal.textContent;       
        }

    if(/\./.test(displayValue) && displayValue.toString()[displayValue.length-1] != '.' && (displayValue.match(/\./g) || []).length == 1 && /[-+x/]/.test(displayValue)) {
            display.textContent += decimal.textContent;
            displayValue += decimal.textContent;
        }
});

const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
    displayValue = '';
    display.textContent = displayValue;
    lastOperator = clear.textContent;
});

const back = document.querySelector('.back');
back.addEventListener('click', () => {
    displayValue = displayValue.substring(0, displayValue.toString().length - 1);
    display.textContent = displayValue;
    lastOperator = clear.textContent;
});






