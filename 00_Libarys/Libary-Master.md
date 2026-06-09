# Library Guide

---
[[Master-Temp]]
## Tabulator

Interactive data tables with sorting, filtering, and pagination.

- **Docs:** https://tabulator.info/docs/6.4
- **Download:** https://github.com/olifolkerd/tabulator/releases

### Installation

**Local**

```html
<script src="../../00_Libarys/tabulator-master/dist/js/tabulator.min.js"></script>
<link rel="stylesheet" href="../../00_Libarys/tabulator-master/dist/css/tabulator.min.css">
```

**CDN**

```html
<link href="https://unpkg.com/tabulator-tables@6.3.0/dist/css/tabulator.min.css" rel="stylesheet">
<script src="https://unpkg.com/tabulator-tables@6.3.0/dist/js/tabulator.min.js"></script>
```

### Examples

#### Basic table

Inline data, explicit columns.

```js
new Tabulator("#example-table", {
  layout: "fitColumns",
  data: [
    { id: 1, name: "John",  age: 20 },
    { id: 2, name: "Sarah", age: 18 },
    { id: 3, name: "Mike",  age: 22 },
  ],
  columns: [
    { title: "ID",   field: "id"   },
    { title: "Name", field: "name" },
    { title: "Age",  field: "age"  },
  ],
});
```

#### Data from variable

Useful when the dataset is defined separately. `autoColumns` generates columns automatically from the data keys.

```js
const tableData = [
  { id: 1, name: "Oli Bob",            progress: 12,  gender: "male",   rating: 1, col: "red",    dob: "19/02/1984", car: 1    },
  { id: 2, name: "Mary May",           progress: 1,   gender: "female", rating: 2, col: "blue",   dob: "14/05/1982", car: true },
  { id: 3, name: "Christine Lobowski", progress: 42,  gender: "female", rating: 0, col: "green",  dob: "22/05/1982", car: true },
  { id: 4, name: "Brendon Philips",    progress: 100, gender: "male",   rating: 1, col: "orange", dob: "01/08/1980"            },
  { id: 5, name: "Margret Marmajuke",  progress: 16,  gender: "female", rating: 5, col: "yellow", dob: "31/01/1999"            },
  { id: 6, name: "Frank Harbours",     progress: 38,  gender: "male",   rating: 4, col: "red",    dob: "12/05/1966", car: 1    },
];

const table = new Tabulator("#example-table", {
  data: tableData,
  autoColumns: true,
});
```

#### Dynamic data (fetch + setData)

Initialise the table first with empty data, then populate it after fetching. The table must exist before `setData()` is called.

```js
const table = new Tabulator("#example-table", {
  data: [],
  autoColumns: true,
});

function displayStats(stats) {
  const tableData = stats.drops.map((drop, index) => ({
    id: index + 1,
    name: drop.name,
    theoretical_chance: `${drop.chance}%`,
    amount_received: drop.value,
    true_probability: `${(drop.value / input_number * 100).toFixed(0)}%`,
  }));
  table.setData(tableData);
}

function fetchData(value) {
  fetch(`${value}.json`)
    .then(response => response.json())
    .then(data => displayStats(data));
}
```

---

## Anime.js

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