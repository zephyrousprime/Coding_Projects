---
tags:
  - library/javascript
  - category/animation
  - "#title/anime-js"
aliases:
  - Anime.js
---

# Anime.js

> Animation library

## Related Libraries
- [[GSAP]]

## Parent Indexes
- [[Libary-Master]]
- [[Category-Index]]

## Backlinks
- [[Libary-Master]]

---

Lightweight JavaScript animation library.

- **Docs:** https://animejs.com/documentation/getting-started/installation/
- **Download:** https://github.com/juliangarnier/anime/tree/master

> **Note:** the local path uses the v4 ESM syntax (`import { animate }`), while the CDN below is v3's global `anime()` function. Pick one version and stay consistent — mixing them will break things.

### Installation

**Local (v4 ESM)**

```js
import { animate } from '../../00_Libarys/anime-master/dist/bundles/anime.esm.min.js';
```

**CDN (v3 UMD)**

```html
<script src="https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js"></script>
```

### Examples

#### Basic animation

Translates and scales a `div` on a looping alternate cycle.

```html
<div id="box" style="background:#3498db; width:50px; height:50px;"></div>

<script src="https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js"></script>
<script>
anime({
  targets: '#box',
  translateX: 250,
  scale: 1.5,
  duration: 2000,
  easing: 'easeInOutQuad',
  direction: 'alternate',
  loop: true,
});
</script>
```

#### SVG animation

Animate SVG stroke and fill properties for icon animations.

```html
<svg width="100" height="100">
  <circle id="svg-circle" cx="50" cy="50" r="30" fill="none" stroke="#3498db" stroke-width="3"/>
</svg>

<script>
anime({
  targets: '#svg-circle',
  r: 40,
  strokeDashoffset: [anime.setDashoffset, 0],
  duration: 1500,
  easing: 'easeInOutQuart',
  loop: true,
  direction: 'alternate',
});
</script>
```

#### Timeline with multiple animations

Sequence multiple animations with delays using a timeline.

```html
<div id="timeline-box" style="width:50px; height:50px; background:#e74c3c;"></div>

<script>
const timeline = anime.timeline({
  autoplay: true,
  loop: true,
});

timeline
  .add({
    targets: '#timeline-box',
    translateX: 200,
    duration: 1000,
    easing: 'easeInOutQuad',
  })
  .add({
    targets: '#timeline-box',
    scale: 1.5,
    duration: 500,
    easing: 'easeInOutQuad',
  }, '-=500')
  .add({
    targets: '#timeline-box',
    rotate: 360,
    duration: 1000,
    easing: 'easeInOutQuad',
  }, '-=500');
</script>
```

#### Easing functions showcase

Compare different easing curves for smooth or bouncy animations.

```html
<style>
  .easing-box { width: 40px; height: 40px; margin: 10px 0; background: #3498db; }
</style>

<div class="easing-box" id="ease-linear"></div>
<div class="easing-box" id="ease-bounce"></div>
<div class="easing-box" id="ease-elastic"></div>

<script>
anime({
  targets: '#ease-linear',
  translateX: 200,
  duration: 2000,
  easing: 'linear',
  loop: true,
  direction: 'alternate',
});

anime({
  targets: '#ease-bounce',
  translateX: 200,
  duration: 2000,
  easing: 'easeOutBounce',
  loop: true,
  direction: 'alternate',
});

anime({
  targets: '#ease-elastic',
  translateX: 200,
  duration: 2000,
  easing: 'easeOutElastic(1, 0.6)',
  loop: true,
  direction: 'alternate',
});
</script>
```

#### Callbacks and event chaining

Trigger functions at animation start, update, and completion for reactive sequences.

```html
<div id="callback-box" style="width:50px; height:50px; background:#2ecc71;"></div>
<p id="status">Ready</p>

<script>
const animation = anime({
  targets: '#callback-box',
  translateX: [0, 300],
  duration: 1500,
  easing: 'easeInOutQuad',
  begin: () => {
    document.getElementById('status').textContent = 'Animation started';
  },
  update: (anim) => {
    document.getElementById('status').textContent = `Progress: ${Math.round(anim.progress)}%`;
  },
  complete: () => {
    document.getElementById('status').textContent = 'Animation complete';
  },
});
</script>
```

#### Stagger effect on multiple elements

Animate multiple elements with a time offset between each.

```html
<style>
  .stagger-item {
    width: 30px;
    height: 30px;
    background: #3498db;
    margin: 5px;
    display: inline-block;
  }
</style>

<div class="stagger-item"></div>
<div class="stagger-item"></div>
<div class="stagger-item"></div>
<div class="stagger-item"></div>
<div class="stagger-item"></div>

<script>
anime({
  targets: '.stagger-item',
  translateY: 100,
  duration: 800,
  easing: 'easeInOutQuad',
  delay: anime.stagger(100),
  loop: true,
  direction: 'alternate',
});
</script>
```

---

---

## Notes

Add installation instructions, examples, gotchas, and patterns here.

## Navigation
- [[Libary-Master]]
