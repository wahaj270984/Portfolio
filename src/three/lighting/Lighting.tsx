/**
 * Scene lighting — a classic three-point rig plus a soft ambient fill.
 *
 * Kept declarative and cheap: no real-time shadow maps (grounding is handled by
 * the much cheaper `<ContactShadows>` in the scene), so this stays within the
 * 60 FPS budget on every tier. The procedural environment supplies image-based
 * reflections; these lights add directional shape on top.
 */
export function Lighting() {
  return (
    <>
      {/* Ambient base so shadowed faces never read pure black. */}
      <ambientLight intensity={0.35} />

      {/* Key — the dominant light, warm, high and to the right. */}
      <directionalLight
        position={[5, 6, 4]}
        intensity={2.4}
        color="#fff1e0"
      />

      {/* Fill — softens key shadows from the opposite side, cooler + dimmer. */}
      <directionalLight
        position={[-6, 2, 3]}
        intensity={0.8}
        color="#a5c8ff"
      />

      {/* Rim / back light — separates the subject from the background. */}
      <pointLight
        position={[0, 3, -6]}
        intensity={40}
        distance={20}
        decay={2}
        color="#22d3ee"
      />
    </>
  )
}
