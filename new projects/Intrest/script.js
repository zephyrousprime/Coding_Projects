const output = document.getElementById('result');
output.textContent = 'Please enter valid numbers for principal, rate, and time.';
function calculateIntrest() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const time = parseFloat(document.getElementById('time').value);
    if (!isNaN(principal) && !isNaN(rate) && !isNaN(time)){
        const interest = (principal * rate * time) / 100;
    output.textContent = `The simple interest is: ${interest}`;
    }    
    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        output.textContent = 'Please enter valid numbers for principal, rate, and time.';
        return;
    }    
}
document.getElementById('principal').addEventListener('input', calculateIntrest);
document.getElementById('rate').addEventListener('input', calculateIntrest);
document.getElementById('time').addEventListener('input', calculateIntrest);