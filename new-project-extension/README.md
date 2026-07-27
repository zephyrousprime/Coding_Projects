# New Project Creator - VS Code Extension

Creates a new project folder from template files using a hotkey.

## Hotkey

| OS | Key |
|----|-----|
| Windows/Linux | `Ctrl+Shift+N` |
| Mac | `Cmd+Shift+N` |

You can also run it from the Command Palette (`Ctrl+Shift+P`) by typing **"New Project: Create from Template"**.

## How it works

1. Press the hotkey
2. Type a folder name when prompted
3. A new folder is created inside your template directory
4. All configured template files are copied into it
5. All copied files are opened in the editor

## Settings

Open Settings (`Ctrl+,`) and search for **New Project Creator**, or add these to your `settings.json`:

### `newProject.files`

**Type:** `string[]`  
**Default:** `["index.html", "style.css", "script.js"]`

The list of files to copy from the template directory into new projects. Add or remove entries to change which files get copied.

Example - add an `app.js` file:
```json
"newProject.files": [
    "index.html",
    "style.css",
    "script.js",
    "app.js"
]
```

Example - only copy HTML and CSS:
```json
"newProject.files": [
    "index.html",
    "style.css"
]
```

### `newProject.templateDir`

**Type:** `string`  
**Default:** `"01_new projects"`

The name of the folder (relative to your workspace root) that contains the template source files. Change this if your template files live in a different folder.

```json
"newProject.templateDir": "templates"
```

## Requirements

- A workspace folder must be open in VS Code
- The template directory must exist and contain the files listed in `newProject.files`
