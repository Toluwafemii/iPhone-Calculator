alert('js is linked')

const calculator = document.querySelector(".calculator");
const display = calculator.querySelector(".calculator_display");
const keys = calculator.querySelector(".calculator_keys");

// state variables to track the current calculation
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

// Event listener for all button clicks
keys.addEventListener("click", (e) => {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;

    //Ignore clicks that are not on buttons
    if (!key.matches("button")) return;

    if (!action) {
        // Handle key number
        if (waitingForSecondOperand) {
            display.textContent = keyContent;
            waitingForSecondOperand = false; 
        } else {
            display.textContent = 
                displayedNum === "0" ? keyContent : displayedNum + keyContent;
        }
    }

    if (
        action === "add" ||
        action === "multiply" ||
        action === "subtract" ||
        action === "divide"
    ) {
        if (firstOperand === null && !waitingForSecondOperand) {
            firstOperand = parseFloat (displayedNum);
        } else if (operator) {
            const result = calculate(
                firstOperand, 
                operator,
                parseFloat(displayedNum)
            );
            display.textContent = result;
            firstOperand = result; 
        }
        waitingForSecondOperand = true;
        operator = action;
    }

    if (action === "decimal") {
        if (!displayedNum.includes(".")) {
            display.textContent = displayedNum === "" ? "0." : displayedNum + ".";
        }
    }
    
    if (action === "clear") {
        resetCalculator ();
    }

    if (action === "calculate") {
        if (operator && !waitingForSecondOperand) {
            const result = calculate (firstOperand, 
                operator,
                parseFloat(displayedNum)
            );
            display.textContent = result; 
            firstOperand = result;
            operator = null;
            waitingForSecondOperand = false;
        }
    }
});

// Function to perform the calculations

function calculate (firstOperand, operator, secondOperand) {
    switch (operator) {
        case "add" : return firstOperand + secondOperand;
        case "subtract" : return firstOperand - secondOperand;
        case "multiply" : return firstOperand * secondOperand;
        case "divide" : return secondOperand !== 0 ? firstOperand / secondOperand: "Error";
        default : return secondOperand
    }
}

// Function to reset Calculator

function resetCalculator() {
    firstOperand = null; 
    operator = null;
    waitingForSecondOperand = false; 
    display.textContent = "0"
}