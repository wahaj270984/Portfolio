// Holographic test material — fragment stage.
// A Fresnel-lit gradient with animated scan-line bands. Deliberately cheap so
// the test scene proves the GLSL pipeline (vite-plugin-glsl import + drei
// shaderMaterial + colour-managed output) without costing frame budget.

uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uFresnelPower;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vPosition;

void main() {
  // Rim light: bright where the surface faces away from the camera.
  float fresnel = pow(1.0 - clamp(dot(vNormal, vViewDir), 0.0, 1.0), uFresnelPower);

  // Travelling scan-lines along the local Y axis.
  float bands = sin(vPosition.y * 8.0 - uTime * 1.5) * 0.5 + 0.5;

  vec3 base = mix(uColorA, uColorB, bands);
  vec3 color = base + fresnel * 0.9;

  gl_FragColor = vec4(color, 1.0);

  // Match the renderer's tone-mapping + output colour space so the material
  // sits correctly alongside lit/PBR objects and the bloom pass.
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
