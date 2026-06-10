---
tags:
  - library/javascript
  - category/charts
  - "#title/charts-js"
aliases:
  - Chart.js
---

# Chart.js

> Charting library

## Related Libraries
- [[ApexCharts]]
- [[D3.js]]

## Parent Indexes
- [[Libary-Master]]
- [[Category-Index]]

## Backlinks
- [[Libary-Master]]

---

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

---

## Notes

Add installation instructions, examples, gotchas, and patterns here.

## Navigation
- [[Libary-Master]]
