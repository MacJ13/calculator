// Dom elements;
const displayInput = document.querySelector('.input');
const equationElement = document.querySelector('.equation');
const container = document.querySelector('.container');


const equationArr = []

let btnEl;

// global variable:
let operand1 = '';
let operand2 = '';
let operator = '';
let inputStr = displayInput.value // assign initial display elemnent value;

// addition function
function add(a, b){
    return a + b;
}


// substraction function
function substract(a, b){
    return a - b;
}


// multiplication function
function multiply(a, b){
    return a * b;
}

// division function
function divide(a , b){
    return a / b;
}


// create obj operator with mathematical function as values
const calculation = {
    "+": add,
    '-': substract,
    "*": multiply,
    "/": divide,
}

// function which display typing numbers
function displayInputNumbers(key){
    // check if string if number length exceeds max length (9) numeric characters in 'display' element
    if(inputStr.length > displayInput.maxLength) return;
    
    // clear inpuStr variable to prevent displaying 0 before longer number 
    if(inputStr[0] === '0' && inputStr.length === 1) inputStr = '';

    // we add pressed number to string of number
    inputStr += key;
    console.log(inputStr);

    //we add string of number to displayInput element;
    displayInput.value = inputStr; 
}


function operate(){
    // clear inputStr variable to empty string
    inputStr = '';

    // if operator doesn't exist we leave from fucntion
    if(!operator) return;

    // assign displayInput value to second operand variable
    // convert to displayInput to number
    operand2 = +displayInput.value;

    // display error if it's division by 0 and leave the function
    if(operand2 === 0 && operator === '/'){
        displayInput.value = 'ERROR!';
        return
    }

    // assign chosen property to call proper mathematical function
    const calculate = calculation[operator];

    // assign result to displayInput 
    displayInput.value = calculate(operand1, operand2);
    
    // assign variable operator to empty string after calculation
    operator = '';

    // display second operator and equal sign
    equationArr.push(operand2.toString(), '=')
    equationElement.textContent = equationArr.join(' ');
    equationArr.length = 0;
}

function updateOperator(key){
    // call the function to clear inputStr variable to empty string
    operate()

    // assign displayInput value to operand1 and convert to number
    operand1 = +displayInput.value
    
    // assign mathematical operator to variable 'operator' from clicked operator button
    operator = key;

    // display first operand and operator in equation element
    equationArr.push(operand1.toString(), operator)
    equationElement.textContent = equationArr.join(' ');

}

function undoTyping(){
    // we remove last number from display string
    
    // if inputStr is empty we assign 0 
    inputStr = (displayInput.value.slice(0, displayInput.value.length -1)) || '0';
    
    displayInput.value = inputStr;
    
}

// function adding decimal point to display string 
function updateToFloat(){
    // check if decimal point is added to inputStr variable
    if(inputStr.includes('.')) return;
    // check if input is empty we assign 0 to variable
    if(!inputStr) inputStr = '0';

    // add decimal point to inputStr 
    inputStr += '.';
    displayInput.value = inputStr;
 }


 // functon calculate percentage of display string of numbers
function calculatePercentage(){
    // percentage value of displayInput number
    displayInput.value = +displayInput.value / 100;
    inputStr  = displayInput.value;
}

// function to clear all globar variables;
function clearAll(){
    // clear display and assign value of 0
    displayInput.value = '0';

    // clear assign global variables to initial values
    inputStr = displayInput.value;
    operand1 = '';
    operand2 = '';
    operator = '';

    equationElement.textContent = '\xa0';
    equationArr.length = 0;
}


function chooseOperation(btn){
    // execute mathematical function for specific button element
    // after clicking on proper button or pressing given keyboard key
    switch(btn.className){

        case "digit": 
            displayInputNumbers(btn.dataset.key);
            break;

        case "operator":
            updateOperator(btn.dataset.key);
            break;

        case "equal":
            operate();
            break;

        case "backspace":
            undoTyping();
            break;

        case "percentage":
            calculatePercentage();
            break;

        case "point":
            updateToFloat();
            break;

        case "plusminus":
            displayInput.value *= (-1);
            inputStr = displayInput.value;
            break;
        
        case "clear":
            clearAll();
            break;
    }
}

// event listener for container element, execute
// specific math 
container.addEventListener('click', (e) => {
    // check if target element is button type element
    if(!(e.target.nodeName === 'BUTTON')) return;
    
    // get from name of class attribute btn element
    btnEl = e.target;
    
    // pass element to execute function on proper button on calculator
    chooseOperation(btnEl);

});

// event listener after pressing keyboard key
window.addEventListener('keydown', (e) => {
    
    // assign dom element after pressing proper button
    btnEl = document.querySelector(`button[data-key="${e.key}"]`);
    if(!btnEl) return;
    
    // pass element to execute function on proper button
    chooseOperation(btnEl);

    // execute function to toggle 'pressed' class from a button element
    btnEl.classList.toggle('pressed');
})

// event to toggle 'pressed' class from a button element
window.addEventListener('keyup', () => {
    btnEl.classList.toggle('pressed');
});
