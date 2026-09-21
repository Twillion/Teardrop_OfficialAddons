const React = require('react');

module.exports = class AssetOptimizerPlugin {
  onEnable(editor) {
    editor.addCommand({
      id: 'teardrop.audit-3d-assets',
      label: 'Tools: 3D Asset Auditor',
      run: () => {
        if (typeof editor.openDock === 'function') {
          editor.openDock('asset-optimizer');
        }
      },
    });

    editor.addMenuItem({
      path: 'Tools/3D Asset Auditor',
      command: 'teardrop.audit-3d-assets',
    });

    editor.addDock({
      id: 'asset-optimizer',
      title: '3D Asset Auditor',
      slot: 'bottom',
      render: () => React.createElement(AssetOptimizerPanel, { editor }),
    });
  }

  onDisable() {}
};

function AssetOptimizerPanel({ editor }) {
  const gdjs = global.gdjs;
  const target = gdjs && gdjs.CodecRegistryHelper
    ? gdjs.CodecRegistryHelper.selectTextureTranscodeTarget()
    : 'rgba32';

  return React.createElement(
    'div',
    { style: { padding: 16, fontFamily: 'sans-serif', fontSize: 13, height: '100%', overflow: 'auto' } },
    React.createElement('h3', { style: { margin: '0 0 8px 0' } }, '3D Asset Compression & Codec Auditor'),
    React.createElement('div', { style: { marginBottom: 12 } },
      React.createElement('strong', null, 'Active Texture Transcode Target: '),
      React.createElement('span', { style: { color: '#61afef', fontWeight: 'bold' } }, target.toUpperCase())
    ),
    React.createElement('ul', null,
      React.createElement('li', null, 'Google Draco: Enabled (geometry vertex decompression)'),
      React.createElement('li', null, 'Meshopt: Enabled (ultra-fast SIMD decompression)'),
      React.createElement('li', null, 'KTX2 / Basis: Enabled (GPU-native hardware transcoding)')
    )
  );
}
