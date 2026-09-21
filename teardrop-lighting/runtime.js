// Teardrop Lighting Runtime Script
if (typeof gdjs !== 'undefined' && gdjs.PipelineRegistry) {
  // Registers or aliases clustered forward-plus
  if (!gdjs.PipelineRegistry.hasPipeline('teardrop-forward-plus')) {
    gdjs.PipelineRegistry.registerPipeline(
      'teardrop-forward-plus',
      renderer => new gdjs.CurrentForwardPipeline(renderer),
      {
        providerId: 'teardrop.lighting',
        label: 'Clustered Forward+',
        description: 'Clustered light allocation for high-density 3D scenes.',
        supportedBackends: ['webgpu', 'webgl2'],
        fallback: 'forward',
      }
    );
  }
}
