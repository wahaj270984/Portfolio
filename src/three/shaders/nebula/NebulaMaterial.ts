import { Color } from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend, type ThreeElement } from '@react-three/fiber'

/**
 * Volumetric-looking nebula painted onto a large background sphere (BackSide).
 * Self-contained: the simplex noise + fbm are inlined so there's no glslify /
 * external-include resolution to worry about. Three accent colours flow through
 * an fbm field to evoke an aurora-tinted deep-space backdrop.
 */
const vertex = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uIntensity;
  uniform float uDetail; // 1.0 = full (two fbm passes), 0.0 = cheap (single pass)
  varying vec3 vPos;

  // --- Ashima simplex noise (3D) -------------------------------------------
  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  float fbm(vec3 p){
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * snoise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main(){
    vec3 dir = normalize(vPos);
    vec3 q = dir * 1.6;
    float t = uTime * 0.03;
    float n = fbm(q + vec3(t, -t * 0.5, t * 0.3));
    // Second turbulence pass is the expensive half; skipped on low-end devices.
    float n2 = uDetail > 0.5 ? fbm(q * 2.0 + n + vec3(-t, t, 0.0)) : 0.0;
    float clouds = smoothstep(-0.2, 0.9, n + 0.4 * n2);

    vec3 col = mix(uColorA, uColorB, clouds);
    col = mix(col, uColorC, smoothstep(0.4, 1.0, n2));
    col *= clouds * uIntensity;

    // Gentle vignette toward the poles so it never reads as a flat dome.
    float pole = 1.0 - abs(dir.y) * 0.5;
    col *= pole;

    gl_FragColor = vec4(col, 1.0);
  }
`

export const NebulaMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorA: new Color('#070b18'),
    uColorB: new Color('#1e3a8a'),
    uColorC: new Color('#22d3ee'),
    uIntensity: 1,
    uDetail: 1,
  },
  vertex,
  fragment,
)

extend({ NebulaMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    nebulaMaterial: ThreeElement<typeof NebulaMaterial>
  }
}
