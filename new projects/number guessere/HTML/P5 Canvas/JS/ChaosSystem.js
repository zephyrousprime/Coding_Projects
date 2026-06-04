import { allUse } from './AllUse.js';

export class ChaosSystem {
  constructor() {
    this.angles270 = [0, 90, 180, 270, 360];
    this.prisonAngles = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
  }
  chaos270(scaleFactor, angleOffset, diameter) {
      
    let index = 0;
    for (let x of this.angles270) {
      for (let y of this.angles270) {
        for (let z of this.angles270) {

          window.push();

          window.scale(scaleFactor + index * 0.5);

          window.rotateX(x * angleOffset);
          window.rotateY(y * angleOffset);
          window.rotateZ(z * angleOffset);

          allUse.frameRotate(); 
          window.torus(80, diameter);

          window.pop();

          index++;
        }
      }
    }
  }
  the_prison_that_holds_god(scaleFactor, angleOffset, diameter) {
      
    let angles = [0, 10, 20, 30, 40, 50, 60];

    for (let x of this.prisonAngles) {
      for (let y of this.prisonAngles) {
        for (let z of this.prisonAngles) {

          window.push();

          window.rotateX(x * angleOffset);
          window.rotateY(y * angleOffset);
          window.rotateZ(z * angleOffset);

          allUse.frameRotate(); 
          window.torus(80, diameter);

          window.pop();
        }
      }
    }
  }
  advance(scaleFactor, angleOffset, diameter) {
      
    const rotations = [
      ["y",180],["x",180],["y",90],["x",90],["xy",[180,180]],["xy",[90,90]],["xy",[90,180]],["xy",[180,90]],["z",90],["z",180],["zy",[90,90]],["zy",[90,180]],["zy",[180,90]],["zy",[180,180]],["zx",[180,90]],["zx",[90,90]],["zx",[180,180]],["zx",[90,180]],["xyz",[90,90,90]],["xyz",[180,180,180]],["xyz",[90,180,90]],["xyz",[180,90,180]],["xyz",[180,90,90]],["xyz",[90,180,180]],["xyz",[90,90,180]],["xyz",[180,180,90]],
    ];

    for (let i = 0; i < rotations.length; i++) {
      window.push();

      window.scale(scaleFactor + i * 0.5);
      allUse.applyRotate(rotations[i], angleOffset);

      allUse.frameRotate(); 
      window.torus(80, diameter);

      window.pop();
    }
  }
  simple(scaleFactor, angleOffset, diameter) {
      
    const rotations = [
      ["y",180],["x",180],["y",90],["x",90],["xy",[180,180]],["xy",[90,90]],["xy",[90,180]],["xy",[180,90]],
    ];
    for (let i = 0; i < rotations.length; i++) {
      window.push();

      window.scale(scaleFactor + i * 0.5);

      allUse.applyRotate(rotations[i], angleOffset);

      allUse.frameRotate(); 
      window.torus(80, diameter);

      window.pop();
    }
  }

}