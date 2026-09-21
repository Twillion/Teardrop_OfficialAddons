# Teardrop Official Add-ons

Welcome to the official repository of first-party add-ons, editor tools, and renderer extensions for **Teardrop Engine**.

---

## Included Add-ons

### 1. `gpu-inspector`
- **Identifier:** `teardrop.gpu-inspector`
- **Type:** Editor Dock & Profiler
- **Features:** Live frame CPU build/submission timers, sampled asynchronous WebGPU timestamp queries, per-pass breakdown, and format-based VRAM byte memory ledger.

### 2. `material-editor`
- **Identifier:** `teardrop.material-editor`
- **Type:** Visual Shader Canvas
- **Features:** Node-based shader graph authoring for PBR and Unlit materials using the native `MaterialCompiler` service.

### 3. `asset-optimizer`
- **Identifier:** `teardrop.asset-optimizer`
- **Type:** 3D Model & Texture Auditor
- **Features:** Audits 3D glTF models for Draco, Meshopt, and KTX2/Basis Universal texture compression. Checks GPU hardware transcode support (BC7, ASTC, ETC2).

### 4. `teardrop-lighting`
- **Identifier:** `teardrop.lighting`
- **Type:** Runtime Technique & Editor Controls
- **Features:** Clustered Forward+ light assignment and cascaded shadow mapping for complex 3D scenes.

---

## Installation & Usage

To install any of these add-ons into your Teardrop project:

1. Copy the desired add-on folder into your project's `addons/` directory:
   ```
   my-game/
     game.json
     addons/
       gpu-inspector/
         addon.json
         editor.js
   ```
2. Open your project in **Teardrop Engine IDE**.
3. Go to **Project Settings → Add-ons** and enable the add-on toggle.

---

## License

MIT © Teardrop Engine contributors.
