export class allUse {
  static applyRotate(r, offset) {
    if (r[0] === "x") window.rotateX(r[1] * offset);
    if (r[0] === "y") window.rotateY(r[1] * offset);
    if (r[0] === "z") window.rotateZ(r[1] * offset);

    if (r[0] === "xy") {
      window.rotateX(r[1][0] * offset);
      window.rotateY(r[1][1] * offset);
    }

    if (r[0] === "zy") {
      window.rotateZ(r[1][0] * offset);
      window.rotateY(r[1][1] * offset);
    }

    if (r[0] === "zx") {
      window.rotateZ(r[1][0] * offset);
      window.rotateX(r[1][1] * offset);
    }

    if (r[0] === "xyz") {
      window.rotateX(r[1][0] * offset);
      window.rotateY(r[1][1] * offset);
      window.rotateZ(r[1][2] * offset);
    }
  }
/*/////////////////////////////////////*/
  static frameRotate() {
    window.rotateZ(window.frameCount * 0.01);
    window.rotateX(window.frameCount * 0.01);
    window.rotateY(window.frameCount * 0.01);
  }
  static drawCube(size) {
    window.push();
    window.box(size);
    window.pop();
  }
}