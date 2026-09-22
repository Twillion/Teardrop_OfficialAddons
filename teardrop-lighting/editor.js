const { EditorPlugin } = require("@teardrop/editor-api");

module.exports = class TeardropLightingPlugin extends EditorPlugin {
  onEnable(editor) {
    this.addCommand({
      id: "teardrop.lighting.configure",
      label: "Lighting: Configure Forward+ Clusters",
      run: () => {
        console.log("Teardrop Lighting Forward+ configured.");
      }
    });
  }

  onDisable() {}
};
