# Contributing

Each add-on lives in its own directory and must contain an `addon.json` manifest.
Use a namespaced lowercase identifier, declare editor and runtime entry points
under `entryPoints`, and keep every referenced file inside the add-on directory.

Before opening a pull request, run `node scripts/validate-addons.js`. The same
validation runs in GitHub Actions. Add tests or a reproducible example for any
runtime renderer contribution.
