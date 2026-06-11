const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/projects", (req, res) => {
  const folderPath = path.join(__dirname, "public", "01_new projects");

  fs.readdir(folderPath, { withFileTypes: true }, (err, items) => {
    if (err) {
      return res.status(500).json({ error: "Could not read folder" });
    }

    const folders = items
      .filter(item => item.isDirectory())
      .map(item => ({
        name: item.name,
        url: `/01_new projects/${encodeURIComponent(item.name)}/`
      }));

    res.json(folders);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});