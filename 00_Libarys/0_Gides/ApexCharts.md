---
tags:
  - library/javascript
  - category/charts
  - "#title/apexcharts"
aliases:
  - ApexCharts
---

# ApexCharts

> Interactive charts

## Related Libraries
- [[Chart.js]]

## Parent Indexes
- [[Libary-Master]]
- [[Category-Index]]

## Backlinks
- [[Libary-Master]]

---

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

---

## Notes

Add installation instructions, examples, gotchas, and patterns here.

## Navigation
- [[Libary-Master]]
