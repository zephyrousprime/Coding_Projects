---
tags:
  - library/javascript
  - category/animation
  - "#title/gsap"
aliases:
  - GSAP
---

# GSAP

> Professional animation platform

## Related Libraries
- [[Anime.js]]

## Parent Indexes
- [[Libary-Master]]
- [[Category-Index]]

## Backlinks
- [[Libary-Master]]

---

High-performance animation library for CSS properties, SVG, canvas, and JavaScript objects.

- **Docs:** https://gsap.com/docs/v3/
- **Download:** https://github.com/greensock/GSAP

> **Note:** Register GSAP plugins in module builds. This prevents bundlers from tree-shaking the plugin and makes the dependency explicit.

### Installation

**Local**

```html
<script src="path/to/gsap.min.js"></script>
```

**CDN**

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
```

**Package manager**

```bash
npm install gsap
```

### Examples

#### Basic tween

Moves and rotates a target over one second with an easing curve.

```js
gsap.to(".card", {
  x: 160,
  rotation: 8,
  duration: 1,
  ease: "power2.out",
});
```

#### Timeline sequence

Coordinates several animations in a readable sequence.

```js
const intro = gsap.timeline({ defaults: { ease: "power2.out" } });

intro
  .from(".title", { y: 32, opacity: 0, duration: 0.5 })
  .from(".subtitle", { y: 20, opacity: 0, duration: 0.4 }, "-=0.2")
  .from(".cta", { scale: 0.8, opacity: 0, duration: 0.3 }, "-=0.1");
```

#### Animate a list with a stagger

Reveals each matching element with a short, consistent offset.

```js
gsap.from(".feature", {
  y: 24,
  opacity: 0,
  duration: 0.45,
  stagger: 0.1,
  ease: "power2.out",
});
```

#### Trigger an animation on scroll

Registers ScrollTrigger and plays the tween when the target reaches the viewport.

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
```

```js
gsap.registerPlugin(ScrollTrigger);

gsap.from(".stats", {
  scrollTrigger: {
    trigger: ".stats",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  y: 48,
  opacity: 0,
  duration: 0.6,
});
```

---

## Navigation
- [[Libary-Master]]
