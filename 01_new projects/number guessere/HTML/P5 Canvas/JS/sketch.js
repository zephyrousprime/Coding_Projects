let canv = document.getElementsByClassName('canvas_ontainer')[0];

function setup() {
  createCanvas(1000, 800, WEBGL, canv);
  perspective(PI / 3, width / height, 0.1, 1000);
}

let angles = [0, 0, 0, 0, 0, 0, 0, 0]; // Rotation angles for each planet
let moonAngle = 0; // Angle for the moon


function draw() {
  background(0); // Black space background

  // Lighting
  ambientLight(50);
   
  // Sun at center
  pointLight(255, 255, 0, 0, 0, 0); // Bright yellow light for the Sun
  push();
  ambientMaterial(255, 200, 0);
  sphere(50);
  pop();

  // Planets data: [distance, size, color, speed multiplier]
  let planets = [
    [80, 8, [169, 169, 169], 4.15],   // Mercury
    [110, 12, [255, 215, 0], 1.62],   // Venus
    [150, 15, [0, 100, 255], 1],      // Earth
    [200, 10, [205, 92, 92], 0.53],   // Mars
    [280, 35, [255, 140, 0], 0.084],  // Jupiter
    [350, 30, [255, 215, 0], 0.034],  // Saturn
    [420, 20, [173, 216, 230], 0.012], // Uranus
    [480, 18, [0, 0, 255], 0.006]     // Neptune
  ];

  // Draw planets
  for (let i = 0; i < planets.length; i++) {
    push();
    rotateY(angles[i]);
    translate(planets[i][0], 0, 0);
    ambientMaterial(planets[i][2][0], planets[i][2][1], planets[i][2][2]);
    sphere(planets[i][1]);
    
    // Special case: Add moon to Earth (i=2)
    if (i === 2) {
      push();
      rotateY(moonAngle);
      translate(30, 0, 0); // Moon distance from Earth
      ambientMaterial(200, 200, 200); // Gray moon
      sphere(5);
      pop();
    }
    
    // Special case: Add rings to Saturn (i=5)
    if (i === 5) {
      push();
      rotateX(PI / 2); // Rotate to make it a ring
      ambientMaterial(255, 215, 0);
      torus(40, 2); // Outer radius, thickness
      pop();
    }
    
    pop();
    
    // Update angle for next frame
    angles[i] += planets[i][3] * 0.01;
  }

  // Update moon angle
  moonAngle += 0.05;

  // Enable orbit controls for mouse interaction
  orbitControl();
}