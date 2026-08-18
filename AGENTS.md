# AGENTS.md

## What this is

This is a **multi-project personal workspace** (an Obsidian vault synced via Google Drive), not a monorepo. There is no root `package.json`, build system, or test runner. Each top-level directory is an independent, self-contained project. Don't assume any tooling exists outside a project's own folder.

## Layout

- `01_new projects/` — primary collection of small HTML/CSS/JS projects (one folder each). The files `01_new projects/index.html`, `style.css`, `script.js` at its root are the **template** the VS Code extension copies into new projects.
- `00_Libarys/` — vendored library sources (chart.js-master, anime-master, tabulator-master) plus hand-written library guides in `00_Libarys/0_Gides/`. **This is its own nested git repo** — running `git` commands here affects a different repo than the root.
- `03_User Experiece/` — the only project with a real setup: Jest + ESLint (see commands below).
- `02_python/` — loose Python scripts, no venv or config; run directly with `python`.
- `04_C#/` — single C# file, no solution/project file.
- `05_Watkin/` — one-off static site (index.html + css/js).
- `new-project-extension/` — VS Code extension that creates projects from the `01_new projects` template (Ctrl+Shift+N). Run via F5 in the Extension Development Host.
- `my-site/`, `New folder/` — empty stubs, ignore.

## Commands

In `03_User Experiece/`:
- `npm test` — Jest suite (tests live in `tests/*.test.js`)
- `npm run serve` — `python -m http.server 8000`; website runs at `http://localhost:8000`
- `npm run lint` — ESLint, scoped to `Code/**/*.js`
- `npm install` first if `node_modules` is missing.

## Gotchas

- **`sever.js`** (note the typo) at the root is a local Express server, but its `/api/projects` endpoint reads `public/01_new projects`, which **does not exist** — projects live at the repo root. The endpoint returns 500; it only serves static files from `public/` correctly.
- Root `index.html` is a static **hub page** listing links into `01_new projects/`; keep its anchor hrefs in sync when adding a project.
- New project convention: copy the template files from `01_new projects/` root into a new subfolder, or create via the extension.
- Library guides in `00_Libarys/0_Gides/` must follow `Master-Temp.md` formatting rules (H2 per library, `### Installation` / `### Examples`, bare URLs, blockquotes for gotchas, tagged code blocks).
- Obsidian docs use `[[wikilinks]]` (e.g. `MaterMD.md`, `Libary-Master.md`).

## Chat Logs

At the end of every conversation (when the user says goodbye, thanks, or indicates they're done), write the full chat history — all user messages and assistant responses — to `chat-logs/YYYY-MM-DD_HH-MM.md` in the workspace root. Create the `chat-logs/` directory if it doesn't exist. Format each message as a markdown heading (`## User` / `## Assistant`) followed by the message body.

## Environment

- Windows + PowerShell. The workspace path contains spaces (`G:\My Drive\1 school\TI\tech\code`), so always quote paths.
- Root `.gitignore` is empty and the root git repo tracks everything (branch `main`, terse "update" commit style). Office/Drive sync drops `~WRL*.tmp` files — don't commit those or vendored `node_modules`.
