const React = require('react');

module.exports = class GpuInspectorPlugin {
  onEnable(editor) {
    editor.addCommand({
      id: 'teardrop.view-gpu-inspector',
      label: 'View: GPU Inspector',
      run: () => {
        if (typeof editor.openDock === 'function') {
          editor.openDock('gpu-inspector');
        }
      },
    });

    editor.addMenuItem({
      path: 'View/GPU Inspector',
      command: 'teardrop.view-gpu-inspector',
    });

    editor.addDock({
      id: 'gpu-inspector',
      title: 'GPU Inspector',
      slot: 'bottom',
      render: () => React.createElement(GpuInspectorPanel, { editor }),
    });
  }

  onDisable() {
    // Teardrop Engine automatically handles resource disposal
  }
};

function GpuInspectorPanel({ editor }) {
  const [snapshot, setSnapshot] = React.useState(null);

  React.useEffect(() => {
    const gdjs = global.gdjs;
    if (!gdjs || !gdjs.DiagnosticsCollector) return;

    const collector = gdjs.DiagnosticsCollector.getShared();
    collector.setEnabled(true);

    const intervalId = setInterval(() => {
      const snap = collector.getLastSnapshot();
      if (snap) setSnapshot(snap);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  const gdjs = global.gdjs;
  const backendName = gdjs && gdjs.CapabilityService
    ? gdjs.CapabilityService.getShared().getBackendDisplayName()
    : 'WebGPU / WebGL2';

  return React.createElement(
    'div',
    {
      style: {
        padding: 12,
        fontFamily: 'monospace',
        fontSize: 12,
        overflow: 'auto',
        height: '100%',
      },
    },
    React.createElement('div', { style: { fontWeight: 'bold', marginBottom: 8 } },
      `Teardrop GPU Inspector — ${backendName}`
    ),
    snapshot
      ? React.createElement('div', null,
          React.createElement('div', { style: { display: 'flex', gap: 16, marginBottom: 8 } },
            React.createElement('div', null, `CPU Build: ${snapshot.frame.cpuBuildMs.toFixed(2)} ms`),
            React.createElement('div', null, `CPU Submit: ${snapshot.frame.cpuSubmitMs.toFixed(2)} ms`),
            React.createElement('div', null, `GPU Duration: ${snapshot.frame.gpuMs !== undefined ? snapshot.frame.gpuMs.toFixed(2) + ' ms' : 'Unavailable'}`)
          ),
          React.createElement('div', null,
            `VRAM: ${(snapshot.resources.estimatedVramBytes / (1024 * 1024)).toFixed(2)} MB | Textures: ${snapshot.resources.totalTextures} | Buffers: ${snapshot.resources.totalBuffers}`
          )
        )
      : React.createElement('div', { style: { color: '#888' } }, 'Collecting GPU diagnostics...')
  );
}
