const React = require('react');

module.exports = class MaterialEditorPlugin {
  onEnable(editor) {
    editor.addCommand({
      id: 'teardrop.open-material-editor',
      label: 'Tools: Open Material Graph Editor',
      run: () => {
        if (typeof editor.openDock === 'function') {
          editor.openDock('material-editor');
        }
      },
    });

    editor.addMenuItem({
      path: 'Tools/Material Graph Editor',
      command: 'teardrop.open-material-editor',
    });

    editor.addDock({
      id: 'material-editor',
      title: 'Material Graph Editor',
      slot: 'center',
      render: () => React.createElement(MaterialEditorPanel, { editor }),
    });
  }

  onDisable() {}
};

function MaterialEditorPanel({ editor }) {
  const [model, setModel] = React.useState('pbr');
  const [roughness, setRoughness] = React.useState(0.5);
  const [metalness, setMetalness] = React.useState(0.0);

  return React.createElement(
    'div',
    { style: { padding: 16, fontFamily: 'sans-serif', height: '100%', display: 'flex', flexDirection: 'column' } },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #444', paddingBottom: 8 } },
      React.createElement('h3', { style: { margin: 0 } }, 'Teardrop Material Graph Editor'),
      React.createElement('div', null,
        React.createElement('button', { onClick: () => setModel('pbr'), style: { fontWeight: model === 'pbr' ? 'bold' : 'normal' } }, 'PBR Surface'),
        React.createElement('button', { onClick: () => setModel('unlit'), style: { marginLeft: 8, fontWeight: model === 'unlit' ? 'bold' : 'normal' } }, 'Unlit')
      )
    ),
    React.createElement('div', { style: { marginTop: 16 } },
      React.createElement('p', null, `Active Model: ${model.toUpperCase()}`),
      model === 'pbr' && React.createElement('div', null,
        React.createElement('label', null, `Roughness: ${roughness}`),
        React.createElement('input', {
          type: 'range', min: 0, max: 1, step: 0.01, value: roughness,
          onChange: e => setRoughness(parseFloat(e.target.value)),
          style: { display: 'block', width: 200, marginBottom: 8 }
        }),
        React.createElement('label', null, `Metalness: ${metalness}`),
        React.createElement('input', {
          type: 'range', min: 0, max: 1, step: 0.01, value: metalness,
          onChange: e => setMetalness(parseFloat(e.target.value)),
          style: { display: 'block', width: 200 }
        })
      )
    )
  );
}
