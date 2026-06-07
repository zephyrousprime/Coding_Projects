//variables
const fibCtx = document.getElementById('fibonacciCanvas').getContext('2d');
const expCtx = document.getElementById('exponentialCanvas').getContext('2d');
const startb = document.getElementById('start');
const numberSequence = document.getElementById('sequens');
const fibonacciNumberBob = document.getElementById('fibonacci_number');
const exponentialNumber = document.getElementById('exponential_number');
const restart = document.getElementById('restart');
const mathFib = document.getElementById('math_fib');
let intervalId = null;
let fibonacciData = [1];
let fibonacciLabels = [1];
let exponentialData = [1];

// Initialize Chart
const fibChart = new Chart(fibCtx, {
  type: 'line',
  data: {
    labels: fibonacciLabels,
    datasets: [{
      label: 'Fibonacci Sequence',
      data: fibonacciData,
      borderWidth: 2,
      borderColor: 'hsla(53, 44%, 7%, 1.00)',
      backgroundColor: 'hsla(180, 100%, 50%, 0.60)',
      tension: 0.1
    }]
  },
  options: {
    responsive: true,
    animation: { duration: 0 }
  }
});

const expChart = new Chart(expCtx, {
  type: 'line',
  data: {
    labels: fibonacciLabels,
    datasets: [{
      label: 'Exponential Growth',
      data: exponentialData,
      borderWidth: 2,
      borderColor: 'hsla(53, 44%, 7%, 1.00)',
      backgroundColor: 'hsla(44, 100%, 50%, 0.60)',
      tension: 0.1
    }]
  },
  options: {
    responsive: true,
    animation: { duration: 0 }
  }
});

document.querySelectorAll('.Inputs').forEach(button => {
    button.addEventListener('click', Buttons);
});
// Fibonacci sequence generator with start/stop functionality
function Buttons(e){
    const id = e.currentTarget.id;
    if (id === 'start'){
        if (startb.textContent === 'Start') {
            startb.textContent = 'Stop';
            intervalId = setInterval(() => {
                exponential.run();
                fibonacci.run();
                fibonacci.math_fib_count();
            }, 500);
        } else {
            startb.textContent = 'Start';
            clearInterval(intervalId);
            intervalId = null;
        }
    }
    if (id === 'restart'){
        exponential.reset();
        fibonacci.reset();
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
            startb.textContent = 'Start';
        }
    }
}

class Fibonacci_Class {
  constructor() {
    this.number1 = 1;
    this.number2 = 0;
    this.sequence = 1;
  }

  run() {
    this.sequence++;
    const next = this.number1 + this.number2;
    this.number2 = this.number1;
    this.number1 = next;

    fibonacciNumberBob.textContent = String(next);
    numberSequence.textContent = String(this.sequence);
    

    fibonacciData.push(next);
    fibonacciLabels.push(this.sequence);

    fibChart.data.labels = fibonacciLabels;
    fibChart.data.datasets[0].data = fibonacciData;
    fibChart.update();
  }
  math_fib_count() {
    // make a function that gets the curent and then devides it by the previous one
      const ratio = this.number1 / this.number2;
      mathFib.textContent = String(ratio.toFixed(5));

  }
  reset() {
    this.number1 = 1;
    this.number2 = 0;
    this.sequence = 1;

    fibonacciData = [1];
    fibonacciLabels = [1];

    fibonacciNumberBob.textContent = '1';
    numberSequence.textContent = '1';

    fibChart.data.labels = fibonacciLabels;
    fibChart.data.datasets[0].data = fibonacciData;
    fibChart.update();
  }
}
class Exponential_Class {
  constructor() {
    this.number = 1;
  }

  run() {
    this.number *= 2;
    exponentialData.push(this.number);
    exponentialNumber.textContent = String(exponentialData[exponentialData.length - 1]);
    expChart.data.datasets[0].data = exponentialData;
    expChart.update();
  }

  reset() {
    this.number = 1;
    exponentialData = [1];
    exponentialNumber.textContent = '1';
    expChart.data.datasets[0].data = exponentialData;
    expChart.update();
  }
}

const fibonacci = new Fibonacci_Class();
const exponential = new Exponential_Class();