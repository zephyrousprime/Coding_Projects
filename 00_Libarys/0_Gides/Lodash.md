---
tags:
  - library/javascript
  - category/utility
  - "#title/lodash"
aliases:
  - Lodash
---

# Lodash

> Utility helpers

## Related Libraries
- [[Day.js]]

## Parent Indexes
- [[Libary-Master]]
- [[Category-Index]]

## Backlinks
- [[Libary-Master]]

---

Utility library for working with arrays, objects, collections, strings, and functions.

- **Docs:** https://lodash.com/docs/
- **Download:** https://github.com/lodash/lodash

> **Note:** Import individual methods in bundled applications when possible. It reduces the amount of utility code included in the final build.

### Installation

**Local**

```html
<script src="path/to/lodash.min.js"></script>
```

**CDN**

```html
<script src="https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js"></script>
```

**Package manager**

```bash
npm install lodash
```

### Examples

#### Group records by a property

Groups an array into an object keyed by each record's category.

```js
const tasksByStatus = _.groupBy(tasks, "status");

console.log(tasksByStatus.todo);
console.log(tasksByStatus.done);
```

#### Sort and pick the top records

Orders records by a numeric property, then keeps the first three.

```js
const topScores = _.orderBy(players, ["score", "name"], ["desc", "asc"])
  .slice(0, 3);
```

#### Safely read nested data

Returns a fallback when a deeply nested property is missing.

```js
const suburb = _.get(user, "address.suburb", "Unknown suburb");
const hasAdminRole = _.includes(_.get(user, "roles", []), "admin");
```

#### Debounce a search input

Waits until typing stops before calling the search function.

```js
const runSearch = _.debounce(async query => {
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  renderResults(await response.json());
}, 300);

document.querySelector("#search").addEventListener("input", event => {
  runSearch(event.target.value);
});
```

---

## Navigation
- [[Libary-Master]]
