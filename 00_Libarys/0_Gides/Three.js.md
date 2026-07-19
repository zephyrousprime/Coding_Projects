---
tags:
  - library/javascript
  - category/3d
  - "#title/three-js"
aliases:
  - Three.js
---

# Three.js

> 3D graphics

## Related Libraries
- [[GSAP]]

## Parent Indexes
- [[Libary-Master]]
- [[Category-Index]]

## Backlinks
- [[Libary-Master]]

---

3D rendering library built on WebGL, with scenes, cameras, geometry, lights, and loaders.

- **Docs:** https://threejs.org/manual/en/creating-a-scene.html
- **Download:** https://github.com/mrdoob/three.js/releases

> **Note:** Three.js uses ES modules. Run the project through a local development server instead of opening the HTML file directly, and keep the core and addon URLs on the same version.

### Installation

**Local (import map)**

```html
<script type="importmap">
{
  "imports": {
    "three": "./path/to/three.module.js",
    "three/addons/": "./path/to/examples/jsm/"
  }
}
</script>
```

**CDN (import map)**

```html
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three/examples/jsm/"
  }
}
</script>
```

**Package manager**

```bash
npm install three
```

### Examples

#### Spinning cube

Creates the minimum scene, camera, renderer, mesh, and animation loop for a 3D object.

```js
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x3498db }),
);

scene.add(cube);
scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 2));
camera.position.z = 3;

renderer.setAnimationLoop(() => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
});
```

#### Resize the renderer

Keeps the camera projection and renderer canvas in sync with the browser window.

```js
function resizeRenderer() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

window.addEventListener("resize", resizeRenderer);
resizeRenderer();
```

#### Add orbit controls

Lets users rotate, zoom, and pan around a scene.

```js
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});
```

#### Load a glTF model

Loads a `.glb` or `.gltf` model and adds its scene graph when ready.

```js
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

loader.load(
  "models/robot.glb",
  gltf => scene.add(gltf.scene),
  undefined,
  error => console.error("Could not load model:", error),
);
```

---

## Navigation
- [[Libary-Master]]
