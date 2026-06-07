let canv = document.getElementsByClassName('canvas_ontainer')[0];

let torusarray = [];
let normalarray = [];
let circularray = [];

function setup() {
  createCanvas(1200, 700, WEBGL, canv);

  normalarray = [
    [plane,     77,   0,   10, [25]],
    [box,        0, 119,   20, [25, 25, 5]],
    [cylinder, -168,  0,    30, [25, 25]],
    [cone,       0, -230,   40, [25, 25]],
    [ellipsoid, 0, 0,   50, [25, 25, 25]]
  ];
  torusarray = [
    [80, 8, [-10]],
    [120, 8, [-25]],
    [170, 8, [-35]],
    [235, 8, [-45]],
    [295, 8, [-55]]
  ];
}

function draw() {
  background(30);
  sphere(50);
    toruscircle();
    normalbob();
  orbitControl();
}

function normalbob() {
  for (let i = 0; i < normalarray.length; i++) {
    push();
    let o = normalarray[i];
    translate(o[1], o[2], o[3]);
    o[0](...o[4]);
    pop();
  }
}

function toruscircle() {
  for (let i = 0; i < torusarray.length; i++) {
    push();
    let t = torusarray[i]; 
    translate(0, 0, t[2]);
    torus(t[0], t[1]);
    pop();
  }
}







/*
let canv = document.getElementsByClassName('canvas_ontainer')[0];
let color = [
  [255, 0, 0],    // Red
  [0, 255, 0],    // Green
  [0, 0, 255],    // Blue
  [255, 255, 0],  // Yellow
  [255, 0, 255],  // Magenta
  [0, 255, 255],  // Cyan
  [255, 165, 0],  // Orange
  [128, 0, 128]   // Purple
  
];
function setup() {
  createCanvas(1200, 1000, WEBGL,canv);
  
}
function draw() {
  background(30);
  
  chaos(1.5, 1, 8);
  
    function chaosangle(scaleFactor){
      
      push();
      scale(scaleFactor);
      rotateY(180);
      frameRotate();
      torus(80, 10);  
      pop();

      push();
      scale(scaleFactor+0.5);
      rotateX(180);
      frameRotate();
      torus(80, 10);
      pop();

      push();
      scale(scaleFactor+1);
      rotateY(90);
      frameRotate();
      torus(80, 10);
      pop();

      push();
      scale(scaleFactor+1.5);
      rotateX(90);
      frameRotate();
      torus(80, 10);
      pop();
      
      push();
      scale(scaleFactor);
      rotateX(90);
      rotateY(180);
      frameRotate();
      torus(80, 10);
      pop();

      push();
      scale(scaleFactor+0.5);
      rotateX(180);
      rotateY(90);
      frameRotate();
      torus(80, 10);
      pop();

      push();
      scale(scaleFactor+1);
      rotateX(180);
      rotateY(180);
      frameRotate();
      torus(80, 10);
      pop();

      push();
      scale(scaleFactor+1.5);
      rotateX(90);
      rotateY(90);
      frameRotate();
      torus(80, 10);
      pop();
    }
    function chaossimple(scaleFactor){
      push();  
      scale(scaleFactor);
      rotateY(180);
      frameRotate();
      torus(80, 10);  
      pop();

      push();
      scale(scaleFactor+0.5);
      rotateX(180);
      frameRotate();
      torus(80, 10);
      pop();

      push();
      scale(scaleFactor+1);
      rotateY(90);
      frameRotate();
      torus(80, 10);
      pop();

      push();
      scale(scaleFactor+1.5);
      rotateX(90);
      frameRotate();
      torus(80, 10);
      pop();

      push();
      scale(scaleFactor+2);
      rotateZ(90);
      frameRotate();
      torus(80, 10);
      pop();

      push();
      scale(scaleFactor+2.5);
      rotateZ(180);
      frameRotate();
      torus(80, 10);
      pop();
    }
    function chaos270(scaleFactor, angleOffset, diameter){

      chaoscube(70);

      let angles = [0, 90, 180, 270, 360];
      let index = 0;

      for (let x of angles){
        for (let y of angles){
          for (let z of angles){

            push();
            

            scale(scaleFactor + index * 0.5);

            rotateX(x * angleOffset);
            rotateY(y * angleOffset);
            rotateZ(z * angleOffset);

            frameRotate();
            torus(80, diameter);

            pop();

            index++;
          }
        }
      }
    }
    function the_prison_that_holds_god(scaleFactor, angleOffset, diameter){
      chaoscube(70);

      let angles = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140];

      for (let x of angles){
        for (let y of angles){
          for (let z of angles){

            push();        

            rotateX(x * angleOffset);
            rotateY(y * angleOffset);
            rotateZ(z * angleOffset);

            frameRotate();
            torus(80, diameter);

            pop();
          }
        }
      }
    }
    function chaosadvance(scaleFactor, angleOffset, diameter){
      chaoscube(70);
      
      const rotations = [
        ["y",180],["x",180],["y",90],["x",90],
        ["xy",[180,180]],
        ["xy",[90,90]],
        ["xy",[90,180]],
        ["xy",[180,90]],
        ["z",90],["z",180],
        ["zy",[90,90]],
        ["zy",[90,180]],
        ["zy",[180,90]],
        ["zy",[180,180]],
        ["zx",[180,90]],
        ["zx",[90,90]],
        ["zx",[180,180]],
        ["zx",[90,180]],
        ["xyz",[90,90,90]],
        ["xyz",[180,180,180]],
        ["xyz",[90,180,90]],
        ["xyz",[180,90,180]],
        ["xyz",[180,90,90]],
        ["xyz",[90,180,180]],
        ["xyz",[90,90,180]],
        ["xyz",[180,180,90]],
        ];

      for(let i = 0; i < rotations.length; i++){
        push();
         

        scale(scaleFactor + i * 0.5);

        let r = rotations[i];

        if(r[0] === "x") rotateX(r[1] * angleOffset);
        if(r[0] === "y") rotateY(r[1] * angleOffset);
        if(r[0] === "z") rotateZ(r[1] * angleOffset);

        if(r[0] === "xy"){
          rotateX(r[1][0] * angleOffset);
          rotateY(r[1][1] * angleOffset);
        }

        if(r[0] === "zy"){
          rotateZ(r[1][0] * angleOffset);
          rotateY(r[1][1] * angleOffset);
        }

        if(r[0] === "zx"){
          rotateZ(r[1][0] * angleOffset);
          rotateX(r[1][1] * angleOffset);
        }

        if(r[0] === "xyz"){
          rotateX(r[1][0] * angleOffset);
          rotateY(r[1][1] * angleOffset);
          rotateZ(r[1][2] * angleOffset);
        }

        frameRotate();
        torus(80, diameter);

        pop();
      }
    }
    function unused(){
        
      function chaoscage(scaleFactor){

        push();
        scale(scaleFactor);
        rotateY(180);
        frameRotate();
        torus(80, 10);  
        pop();

        push();
        scale(scaleFactor);
        rotateX(180);
        frameRotate();
        torus(80, 10);
        pop();

        push();
        scale(scaleFactor);
        rotateY(90);
        frameRotate();
        torus(80, 10);
        pop();

        push();
        scale(scaleFactor);
        rotateX(90);
        frameRotate();
        torus(80, 10);
        pop();
        
        push();
        scale(scaleFactor);
        rotateX(90);
        rotateY(180);
        frameRotate();
        torus(80, 10);
        pop();

        push();
        scale(scaleFactor);
        rotateX(180);
        rotateY(90);
        frameRotate();
        torus(80, 10);
        pop();

        push();
        scale(scaleFactor);
        rotateX(180);
        rotateY(180);
        frameRotate();
        torus(80, 10);
        pop();

        push();
        scale(scaleFactor);
        rotateX(90);
        rotateY(90);
        frameRotate();
        torus(80, 10);
        pop();

        push();
        scale(scaleFactor);
        rotateZ(90);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor);
        rotateZ(180);
        frameRotate();
        torus(80, diameter);
        pop();
      }
      function chaos3(scaleFactor){
        push();
        scale(scaleFactor);
        rotateY(180);
        frameRotate();
        torus(80, 10);  
        pop();

        push();
        scale(scaleFactor);
        rotateX(180);
        frameRotate();
        torus(80, 10);
        pop();

        push();
        scale(scaleFactor);
        rotateY(90);
        frameRotate();
        torus(80, 10);
        pop();

        push();
        scale(scaleFactor);
        rotateX(90);
        frameRotate();
        torus(80, 10);
        pop();
        
      }
      function chaosadvanceold(scaleFactor, angleOffset, diameter){
        chaoscube(70);
        push();
        scale(scaleFactor);
        rotateY(180*angleOffset);
        frameRotate();
        torus(80, diameter);  
        pop();

        push();
        scale(scaleFactor+0.5);
        rotateX(180*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+1);
        rotateY(90*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+1.5);
        rotateX(90*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+2);
        rotateX(180*angleOffset);
        rotateY(180*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+2.5);
        rotateX(90*angleOffset);
        rotateY(90*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+3);
        rotateX(90*angleOffset);
        rotateY(180*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+3.5);
        rotateX(180*angleOffset);
        rotateY(90*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+4);
        rotateZ(90*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+4.5);
        rotateZ(180*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+5);
        rotateZ(90*angleOffset);
        rotateY(90*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+5.5);
        rotateZ(90*angleOffset);
        rotateY(180*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+6);
        rotateZ(180*angleOffset);
        rotateY(90*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+6.5);
        rotateZ(180*angleOffset);
        rotateY(180*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+7);
        rotateZ(180*angleOffset);
        rotateX(90*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+7.5);
        rotateZ(90*angleOffset);
        rotateX(90*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+8);
        rotateZ(180*angleOffset);
        rotateX(180*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+8.5);
        rotateZ(90*angleOffset);
        rotateX(180*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+9);
        rotateZ(90*angleOffset);
        rotateY(90*angleOffset);
        rotateX(90*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+9.5);
        rotateZ(180*angleOffset);
        rotateY(180*angleOffset);
        rotateX(180*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+10);
        rotateZ(90*angleOffset);
        rotateY(180*angleOffset);
        rotateX(90*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+10.5);
        rotateZ(180*angleOffset);
        rotateY(90*angleOffset);
        rotateX(180*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+11);
        rotateZ(180*angleOffset);
        rotateY(90*angleOffset);
        rotateX(90*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+11.5);
        rotateZ(90*angleOffset);
        rotateY(180*angleOffset);
        rotateX(180*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+12);
        rotateZ(90*angleOffset);
        rotateY(90*angleOffset);
        rotateX(180*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();

        push();
        scale(scaleFactor+12.5);
        rotateZ(180*angleOffset);
        rotateY(180*angleOffset);
        rotateX(90*angleOffset);
        frameRotate();
        torus(80, diameter);
        pop();  
        }
    }
 orbitControl();
}  
 function chaoscube(scaleFactor){
  push();
  translate(0, 0, 0);
  box(scaleFactor);  
  pop();
 }
function frameRotate() {
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
}
*/