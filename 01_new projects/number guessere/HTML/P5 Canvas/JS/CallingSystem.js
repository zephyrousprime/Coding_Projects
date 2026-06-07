import { allUse } from './AllUse.js';

export class CallingSystem {
  constructor(chaosSystem) {
  this.chaos = chaosSystem;
  }

  render(mode, scaleFactor, angleOffset, diameter) {
    allUse.drawCube(70);
    switch (mode) {
      case "chaos270":
        this.chaos.chaos270(scaleFactor, angleOffset, diameter);
        break;

      case "prison":
        this.chaos.the_prison_that_holds_god(scaleFactor, angleOffset, diameter);
        break;

      case "advance":
        this.chaos.advance(scaleFactor, angleOffset, diameter);
        break;

      case "simple":
        this.chaos.simple(scaleFactor, angleOffset, diameter);
        break;
    }
    
  }
}