const React = require("react");
const { EditorPlugin } = require("@teardrop/editor-api");

module.exports = class AssetOptimizerPlugin extends EditorPlugin {
  onEnable(editor) {
    this.addCommand({
      id: "teardrop.audit-3d-assets",
      label: "Tools: 3D Asset Auditor",
      run: () => {
        if (typeof editor.openDock === "function") {
          editor.openDock("asset-optimizer");
        }
      }
    });

    this.addMenuItem({
      path: "Tools/3D Asset Auditor",
      command: "teardrop.audit-3d-assets"
    });

    this.addDock({
      id: "asset-optimizer",
      title: "3D Asset Auditor",
      slot: "bottom",
      render: () => React.createElement(AssetOptimizerPanel, { editor })
    });
  }

  onDisable() {}
};

function AssetOptimizerPanel({ editor }) {
  const gdjs = global.gdjs;
  const target =
    gdjs && gdjs.CodecRegistryHelper
      ? gdjs.CodecRegistryHelper.selectTextureTranscodeTarget()
      : "rgba32";
  const registeredCodecIds =
    gdjs && gdjs.assetCodecRegistry
      ? new Set(
          gdjs.assetCodecRegistry
            .getDescriptors()
            .map(descriptor => descriptor.id)
        )
      : new Set();
  const codecs = [
    ["Google Draco", "KHR_draco_mesh_compression"],
    ["Meshopt", "EXT_meshopt_compression"],
    ["KTX2 / Basis", "KHR_texture_basisu"]
  ];

  return React.createElement(
    "div",
    {
      style: {
        padding: 16,
        fontFamily: "sans-serif",
        fontSize: 13,
        height: "100%",
        overflow: "auto"
      }
    },
    React.createElement(
      "h3",
      { style: { margin: "0 0 8px 0" } },
      "3D Asset Compression & Codec Auditor"
    ),
    React.createElement(
      "div",
      { style: { marginBottom: 12 } },
      React.createElement("strong", null, "Active Texture Transcode Target: "),
      React.createElement(
        "span",
        { style: { color: "#61afef", fontWeight: "bold" } },
        target.toUpperCase()
      )
    ),
    React.createElement(
      "ul",
      null,
      ...codecs.map(([name, extension]) =>
        React.createElement(
          "li",
          { key: extension },
          `${name}: ${
            registeredCodecIds.has(extension) ? "Registered" : "Unavailable"
          } (${extension})`
        )
      )
    )
  );
}
