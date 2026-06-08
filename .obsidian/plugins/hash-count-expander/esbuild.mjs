import esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["main.ts"],
  bundle: true,
  outfile: "main.js",
  format: "cjs",
  target: "es2018",
  platform: "browser",
  external: ["obsidian", "electron"],
});
