# Workspace

A multi-project workspace containing a collection of web experiments, JavaScript library guides, a test-driven website, scripting playgrounds, and a VS Code extension.

This is not a monorepo — there is no root `package.json` or shared build system. Each top-level directory is an independent, self-contained project.

## Repository layout

| Path | Description |
|------|-------------|
| `01_new projects/` | Collection of ~35 small HTML/CSS/JS projects (clock, calculator, weather, Pokedex app, and more) using `index.html`, `style.css`, `script.js` as the shared template files |
| `00_Libarys/` | Vendored JavaScript library sources (Chart.js, Anime.js, Tabulator) plus hand-written guides in `0_Gides/` for common libraries |
| `03_User Experiece/` | Interactive website about world hunger with a comprehensive Jest + ESLint test suite (see its [README](03_User%20Experiece/README.md)) |
| `02_python/` | Loose Python scripts, run directly with `python` |
| `04_C#/` | Standalone C# plugin file in `Plugin/` |
| `05_Watkin/` | One-off static website |
| `new-project-extension/` | VS Code extension that scaffolds new projects from the template files |
| `my-site/` | Placeholder project stub |
| `New folder/` | Placeholder project stub |
| `index.html` | Static hub page that links into the projects in `01_new projects/` |
| `sever.js` | Local Express server — **not yet working**; the `/api/projects` endpoint still needs work |

## Getting started

### Hub page

Open `index.html` in a browser to browse the collection of mini-projects.

### Express server

```bash
node sever.js
```

Note: the server currently only serves static files from `public/`. The `/api/projects` endpoint is **not yet working** and will be fixed.

### User Experience site

```bash
cd "03_User Experiece"
npm install
npm run serve    # http://localhost:8000
npm test         # Jest suite
npm run lint     # ESLint
```

## Adding a new project

- Copy the template files (`index.html`, `style.css`, `script.js`) from the root of `01_new projects/` into a new subfolder, or
- Use the `new-project-extension` (press `Ctrl+Shift+N` inside VS Code) to scaffold one automatically.

When adding a project, keep the links in the root `index.html` hub page in sync.

## Conventions

- Each mini-project contains exactly an `index.html`, `style.css`, and `script.js` unless it intentionally uses a library.
- Library guides in `00_Libarys/0_Gides/` follow the formatting rules in `Master-Temp.md` (H2 per library, `### Installation` / `### Examples` sections, tagged code blocks).
- Note that `00_Libarys/` tracks its own separate git history from the rest of this workspace.