const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const idPattern = /^[a-z0-9]+(?:[.-][a-z0-9]+)*$/;
let failures = 0;

for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
  const manifestPath = path.join(root, entry.name, "addon.json");
  if (!fs.existsSync(manifestPath)) continue;
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    if (!idPattern.test(manifest.id || "")) throw new Error("invalid id");
    if (manifest.apiVersion !== 1) throw new Error("unsupported apiVersion");
    const editor = manifest.entryPoints?.editor || manifest.main;
    const runtime = manifest.entryPoints?.runtime || manifest.runtime;
    for (const relativePath of [editor, runtime].filter(Boolean)) {
      const resolved = path.resolve(path.dirname(manifestPath), relativePath);
      if (!resolved.startsWith(path.dirname(manifestPath) + path.sep)) {
        throw new Error(
          `entry point escapes add-on directory: ${relativePath}`
        );
      }
      if (!fs.existsSync(resolved)) throw new Error(`missing ${relativePath}`);
    }
    console.log(`valid: ${manifest.id}`);
  } catch (error) {
    failures++;
    console.error(`invalid: ${entry.name}: ${error.message}`);
  }
}

process.exitCode = failures ? 1 : 0;
