/*console.log(`Hello, World!`)
window.alert(`Hello, World!`)*/
const Input = {
  mouse: {
    left: false,
    middle: false,
    right: false,
    x: 0,
    y: 0
  }
};
let speed = 0.01; 
const orb = document.getElementById("orb");
document.getElementById("speedValue").textContent = speed.toFixed(2);
let orbPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
document.addEventListener("mousedown", function(event) {
  switch (event.button) {
    case 0:
      Input.mouse.left = true;
      break;
    case 1:
      Input.mouse.middle = true;
      break;
    case 2:
      Input.mouse.right = true;
      break;
  }
});
document.addEventListener("mouseup", function(event) {
  switch (event.button) {
    case 0:
      Input.mouse.left = false;
      break;
    case 1:
      Input.mouse.middle = false;
      break;
    case 2:
      Input.mouse.right = false;
      break;
  }
});
document.addEventListener("mousedown", function(event) {
    if (Input.mouse.middle === true) {
    speed = 0.01;
    document.getElementById("speedValue").textContent = speed.toFixed(2);
    // Reset orb position to center
    orbPos.x = window.innerWidth / 2;
    orbPos.y = window.innerHeight / 2;
    orb.style.left = orbPos.x + "px";
    orb.style.top = orbPos.y + "px";
    }
});
document.getElementById("increase").addEventListener("click", function() {
  speed += 0.01;
  document.getElementById("speedValue").textContent = speed.toFixed(2);
});
document.getElementById("decrease").addEventListener("click", function() {
    if (speed <= 0.01) {
        speed = 0.01;
    } else {
        speed -= 0.01;
    }
  document.getElementById("speedValue").textContent = speed.toFixed(2);
});
document.getElementById("reset").addEventListener("click", function() {
  speed = 0.01;
  document.getElementById("speedValue").textContent = speed.toFixed(2);
  // Reset orb position to center
  orbPos.x = window.innerWidth / 2;
  orbPos.y = window.innerHeight / 2;
  orb.style.left = orbPos.x + "px";
  orb.style.top = orbPos.y + "px";
});
function mover() {
  if (Input.mouse.left || Input.mouse.right) {
    orbPos.x += (Input.mouse.x - orbPos.x) * speed;
    orbPos.y += (Input.mouse.y - orbPos.y) * speed;
    orb.style.left = orbPos.x + "px";
    orb.style.top = orbPos.y + "px";
  }
    requestAnimationFrame(mover);
}
document.addEventListener("wheel", function(event) {
  // event.deltaY tells you how much the wheel was scrolled (positive = down, negative = up)
  if (event.deltaY < 0) {
    // Scrolled up
    // For example, increase speed
    speed += 0.01;
  } else if (event.deltaY > 0) {
    // Scrolled down
    // For example, decrease speed
    speed = Math.max(0.01, speed - 0.01);
  }
  document.getElementById("speedValue").textContent = speed.toFixed(2);
});
function colorChange() {
    switch (true) {
        case (speed === 0.1):
            orb.style.backgroundColor = `hsl(0, 100%, 50%)`;
            
        case (speed === 0.2):
            orb.style.backgroundColor = `hsl(120, 100%, 50%)`;
            

        case (speed === 0.3):
            orb.style.backgroundColor = `hsl(240, 100%, 50%)`;
            
        case (speed <= 0.4):
            orb.style.backgroundColor = `hsla(41, 100%, 50%, 1.00)`;
            
        default:
            orb.style.backgroundColor = `hsl(360, 100%, 50%)`;
    }
}
mover();
colorChange();