import { ChaosSystem } from './ChaosSystem.js';
import { CallingSystem } from './CallingSystem.js';
const canv = document.getElementsByClassName('canvas_ontainer')[0];
let chaos;
let system;
let currentMode = "simple"; // default mode

window.setup = function() {
  window.createCanvas(1200, 700, WEBGL, canv);
  chaos = new ChaosSystem();
  system = new CallingSystem(chaos); // pass it in
  // Add event listeners for radio buttons
  document.querySelectorAll('input[name="canvas"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      let value = e.target.value;
      if (value === "advance") { currentMode = "advance";
      } else if (value === "270") { currentMode = "chaos270";
      } else if (value === "the_prison_that_holds_god") { currentMode = "prison";
      } else if (value === "simple") { currentMode = "simple";
      }
    });
  });
}
window.draw = function() {
  window.background(30);
  window.orbitControl();
  system.render(currentMode, 1.5, 1, 8);
}
