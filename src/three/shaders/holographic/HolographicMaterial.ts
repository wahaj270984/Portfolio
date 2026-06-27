import { Color } from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend, type ThreeElement } from '@react-three/fiber'
import vertexShader from './holographic.vert'
import fragmentShader from './holographic.frag'

/**
 * A self-contained `ShaderMaterial` subclass built with drei's
 * {@link shaderMaterial} helper. The first argument is the uniform schema —
 * drei generates typed accessor props for each key, so uniforms can be set
 * either declaratively (`<holographicMaterial uColorA={…} />`) or imperatively
 * (`materialRef.current.uTime = …`).
 *
 * This is the template for every bespoke material in the project: define the
 * uniforms + GLSL here, `extend` it into the R3F catalogue, and augment
 * `ThreeElements` so the lower-cased element name is type-checked in JSX.
 */
export const HolographicMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorA: new Color('#3a1c71'),
    uColorB: new Color('#22d3ee'),
    uFresnelPower: 2.5,
  },
  vertexShader,
  fragmentShader,
)

extend({ HolographicMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    holographicMaterial: ThreeElement<typeof HolographicMaterial>
  }
}
