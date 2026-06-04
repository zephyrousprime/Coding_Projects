const NumberA = document.getElementById("Anum");
const NumberB = document.getElementById("Bnum");
const NumberC = document.getElementById("Cnum");
const NumberD = document.getElementById("Dnum");
const output = document.getElementById("output");
output.textContent = "Please enter valid numbers in all fields."
function calculate() {
    const A = parseFloat(NumberA.value);
    const B = parseFloat(NumberB.value);
    const C = parseFloat(NumberC.value);
    const D = parseFloat(NumberD.value);
    if (isNaN(A) || isNaN(B) || isNaN(C) || isNaN(D)) {
        output.textContent = "Please enter valid numbers in all fields.";
        return;
    }
    const result = A * (B + C) - D;
    output.textContent = `Result: ${result}`;
}
NumberA.addEventListener("input", calculate);
NumberB.addEventListener("input", calculate);
NumberC.addEventListener("input", calculate);
NumberD.addEventListener("input", calculate);