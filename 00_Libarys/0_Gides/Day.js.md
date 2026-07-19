---
tags:
  - library/javascript
  - category/dates
  - "#title/day-js"
aliases:
  - Day.js
---

# Day.js

> Date handling

## Related Libraries
- [[Lodash]]

## Parent Indexes
- [[Libary-Master]]
- [[Category-Index]]

## Backlinks
- [[Libary-Master]]

---

Small immutable date-time library with a Moment.js-compatible API.

- **Docs:** https://day.js.org/docs/en/installation/installation
- **Download:** https://github.com/iamkun/dayjs/releases

> **Note:** Day.js objects are immutable. Methods such as `add()` and `startOf()` return a new object, so assign their result when you want to keep the change.

### Installation

**Local**

```html
<script src="path/to/dayjs.min.js"></script>
```

**CDN**

```html
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
```

**Package manager**

```bash
npm install dayjs
```

### Examples

#### Parse and format a date

Formats dates for display while keeping the stored value in a standard ISO-style format.

```js
const dueDate = dayjs("2026-07-16");

console.log(dueDate.format("DD MMMM YYYY"));
console.log(dueDate.format("YYYY-MM-DD"));
```

#### Add time and compare dates

Creates a deadline one week from now and checks whether it has passed.

```js
const deadline = dayjs().add(7, "day").endOf("day");
const isOverdue = deadline.isBefore(dayjs());

console.log({ deadline: deadline.toISOString(), isOverdue });
```

#### Relative time with a plugin

Extends Day.js once, then produces readable labels such as "3 hours ago".

```html
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/plugin/relativeTime.js"></script>
```

```js
dayjs.extend(dayjs_plugin_relativeTime);

const publishedAt = dayjs().subtract(3, "hour");
console.log(publishedAt.fromNow());
```

#### Filter records by date range

Keeps records whose dates fall within an inclusive range.

```js
const start = dayjs("2026-07-01").startOf("day");
const end = dayjs("2026-07-31").endOf("day");

const julyOrders = orders.filter(order => {
  const createdAt = dayjs(order.createdAt);
  return !createdAt.isBefore(start) && !createdAt.isAfter(end);
});
```

---

## Navigation
- [[Libary-Master]]
