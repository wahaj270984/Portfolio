// Holographic test material — vertex stage.
// Passes the world-space normal and view direction to the fragment shader so it
// can compute a Fresnel rim, plus the local position for the scan-line bands.

uniform float uTime;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vPosition;

void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);

  vNormal = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - worldPosition.xyz);
  vPosition = position;

  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
