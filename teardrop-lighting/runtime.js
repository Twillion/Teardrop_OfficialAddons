// Teardrop Lighting Runtime Script
if (typeof gdjs !== "undefined" && gdjs.PipelineRegistry) {
  // Registers or aliases clustered forward-plus
  if (!gdjs.PipelineRegistry.hasPipeline("teardrop-forward-plus")) {
    gdjs.PipelineRegistry.registerPipeline(
      "teardrop-forward-plus",
      renderer =>
        typeof gdjs.GDevelopLightingAdapter === "function"
          ? new gdjs.GDevelopLightingAdapter(renderer)
          : new gdjs.CurrentForwardPipeline(renderer),
      {
        providerId: "teardrop.lighting",
        label: "Forward+ Adapter",
        description:
          "Uses the engine lighting adapter when available and otherwise renders with the native forward pipeline.",
        supportedBackends: ["webgpu", "webgl2"],
        fallback: "forward"
      }
    );
  }
}
