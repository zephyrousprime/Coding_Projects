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

#### Editable cells with validation

Allow users to edit cell values inline with real-time validation.

```js
const table = new Tabulator("#example-table", {
  data: [
    { id: 1, name: "John", email: "john@example.com", score: 95 },
    { id: 2, name: "Sarah", email: "sarah@example.com", score: 87 },
  ],
  columns: [
    { title: "ID", field: "id", editor: false },
    { title: "Name", field: "name", editor: "input" },
    { title: "Email", field: "email", editor: "input" },
    {
      title: "Score",
      field: "score",
      editor: "number",
      editorParams: { min: 0, max: 100 },
    },
  ],
  editable: true,
  rowHeight: 30,
});
```

#### Sorting, filtering, and pagination

Enable user-driven sorting, built-in filtering, and pagination controls.

```js
const table = new Tabulator("#example-table", {
  data: largeDataArray,
  autoColumns: true,
  layout: "fitDataStretch",
  pagination: "local",
  paginationSize: 10,
  paginationSizeSelector: [5, 10, 20, 50],
  columnHeaderSortMulti: true,
  initialSort: [
    { column: "name", dir: "asc" },
  ],
});

// Add filtering
document.getElementById("filterBtn").addEventListener("click", () => {
  table.setFilter([
    { field: "score", type: ">=", value: 80 },
  ]);
});
```

#### Row selection with action buttons

Select multiple rows and perform bulk actions.

```js
const table = new Tabulator("#example-table", {
  data: tableData,
  autoColumns: true,
  selectable: true,
  selectableRollingSelection: false,
});

document.getElementById("deleteBtn").addEventListener("click", () => {
  const selectedRows = table.getSelectedRows();
  selectedRows.forEach(row => row.delete());
});

document.getElementById("exportBtn").addEventListener("click", () => {
  table.download("csv", "data.csv");
});
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

## Chart.js

Simple yet flexible JavaScript charting library for designers and developers.

- **Docs:** https://www.chartjs.org/docs/latest/
- **Download:** https://github.com/chartjs/Chart.js/releases

### Installation

**Local**

```html
<script src="../../00_Libarys/chart.js/dist/chart.min.js"></script>
```

**CDN**

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

**Package manager**

```bash
npm install chart.js
```

### Examples

#### Line chart

Basic line chart with multiple datasets and grid lines.

```html
<canvas id="lineChart"></canvas>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script>
const ctx = document.getElementById('lineChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  },
});
</script>
```

#### Bar chart

Grouped or stacked bar chart for comparing categories.

```html
<canvas id="barChart"></canvas>

<script>
const ctx = document.getElementById('barChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Product A',
        data: [30, 45, 50, 60],
        backgroundColor: '#3498db',
      },
      {
        label: 'Product B',
        data: [20, 35, 40, 50],
        backgroundColor: '#e74c3c',
      },
    ],
  },
  options: {
    scales: {
      y: { beginAtZero: true },
    },
  },
});
</script>
```

#### Pie chart

Displays proportions with slices.

```html
<canvas id="pieChart"></canvas>

<script>
const ctx = document.getElementById('pieChart').getContext('2d');
new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 150, 100],
        backgroundColor: ['#e74c3c', '#3498db', '#f1c40f'],
        borderColor: '#2c3e50',
        borderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'right' },
    },
  },
});
</script>
```

---

## ApexCharts

Interactive and animated charting library with extensive chart types and themes.

- **Docs:** https://apexcharts.com/docs/
- **Download:** https://github.com/apexcharts/apexcharts.js/releases

> **Note:** ApexCharts is heavier than Chart.js but offers more interactivity and predefined themes out of the box.

### Installation

**Local**

```html
<script src="../../00_Libarys/apexcharts/dist/apexcharts.min.js"></script>
```

**CDN**

```html
<script src="https://cdn.jsdelivr.net/npm/apexcharts@latest/dist/apexcharts.umd.js"></script>
```

**Package manager**

```bash
npm install apexcharts
```

### Examples

#### Line chart with multiple series

Interactive line chart with tooltip and legend.

```html
<div id="lineChart"></div>

<script src="https://cdn.jsdelivr.net/npm/apexcharts@latest/dist/apexcharts.umd.js"></script>
<script>
const options = {
  chart: {
    type: 'line',
    height: 350,
  },
  series: [
    {
      name: 'Series 1',
      data: [30, 40, 35, 50, 49, 60, 70],
    },
    {
      name: 'Series 2',
      data: [23, 12, 54, 61, 27, 38, 50],
    },
  ],
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  },
};
new ApexCharts(document.querySelector('#lineChart'), options).render();
</script>
```

#### Area chart

Stacked area chart showing data trends over time.

```html
<div id="areaChart"></div>

<script>
const options = {
  chart: {
    type: 'area',
    stacked: false,
    height: 350,
  },
  series: [
    {
      name: 'Visitors',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'Clicks',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
};
new ApexCharts(document.querySelector('#areaChart'), options).render();
</script>
```

#### Radial bar chart

Gauge-style radial chart for displaying progress or percentages.

```html
<div id="radialChart"></div>

<script>
const options = {
  chart: {
    type: 'radialBar',
    height: 350,
  },
  series: [75, 60, 50],
  labels: ['Metric A', 'Metric B', 'Metric C'],
};
new ApexCharts(document.querySelector('#radialChart'), options).render();
</script>
```