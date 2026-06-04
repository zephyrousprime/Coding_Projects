const display = document.getElementById("display");

function appendtodisplay(input) {
    // Check if the input is a valid character (number or operator)
    display.value += input;
}

function calculate() {
    // Using eval is not recommended for production code due to security risks,
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}

function clearDisplay() {
    // Clear the display
    display.value = "";
}
