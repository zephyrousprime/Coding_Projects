---
tags:
  - library/javascript
  - category/tables
  - "#title/tabulator"
aliases:
  - Tabulator
---

# Tabulator

> Interactive data tables

## Related Libraries
- [[Chart.js]]
- [[ApexCharts]]

## Parent Indexes
- [[Libary-Master]]
- [[Category-Index]]

## Backlinks
- [[Libary-Master]]

---

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

---

## Notes

Add installation instructions, examples, gotchas, and patterns here.

## Navigation
- [[Libary-Master]]
