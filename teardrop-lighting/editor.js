module.exports = class TeardropLightingPlugin {
  onEnable(editor) {
    editor.addCommand({
      id: 'teardrop.lighting.configure',
      label: 'Lighting: Configure Forward+ Clusters',
      run: () => {
        console.log('Teardrop Lighting Forward+ configured.');
      },
    });
  }

  onDisable() {}
};
