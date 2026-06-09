# Guide template

Use this file as the starting point for every new library guide. Copy it, rename it, and fill in each section. Delete sections that don't apply.

---

## Structure overview

```
# Library Guide          ← top-level heading, one per file
---
## Library Name          ← one H2 per library
   Installation          ← always include, with all methods you actually use
   Examples              ← one H4 per named use case
---
## Next Library          ← repeat the block
```

A single file can cover multiple libraries (as in `library-guide.md`). Keep related libraries together (e.g. animation libs, table libs).

---

## Template

Copy everything below the line and fill it in.

---

# Library Guide

---

## Library Name

One sentence on what it does.

- **Docs:** URL
- **Download:** URL

> Optional note — version differences, gotchas, or anything easy to miss.

### Installation

**Local**

```html
<!-- paste the script/link tags for local use -->
```

**CDN**

```html
<!-- paste the CDN script/link tags -->
```

**Package manager** _(if applicable)_

```bash
npm install package-name
```

### Examples

Each example gets a heading and a one-sentence explanation of when/why to use it, then the code block.

#### Example name

What this example shows and when you'd reach for it.

```js
// code here
```

#### Another example

What this one adds or does differently.

```js
// code here
```

---

## Next Library

_(repeat the block above)_

---

## Formatting rules

Follow these when writing any guide in this project.

**Headings**

- `#` — file title only (`# Library Guide`)
- `##` — one per library
- `###` — major sections within a library (`### Installation`, `### Examples`)
- `####` — individual examples

**Code blocks**

- Always tag the language: ` ```js `, ` ```html `, ` ```bash `, ` ```css `
- One concept per block — don't mix HTML scaffold and JS logic in one block unless they genuinely belong together (like an inline script demo)
- Align related columns in data arrays if it helps readability (optional but nice)

**Notes and warnings**

- Use a blockquote (`>`) for version differences, gotchas, or easy-to-miss caveats
- Keep them short — one or two sentences max

**Links**

- Put docs and download links right under the library heading, not buried in prose
- Use bare URLs, not markdown link text, so the URL is visible in raw mode too

**What to leave out**

- Don't include every possible option — only the patterns you actually use
- Don't repeat the docs; link to them instead
- Don't add an example just to have one; each one should solve a real problem you've hit