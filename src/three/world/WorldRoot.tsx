import { useExperience } from '@/store/useExperience'
import { Nebula } from '../background/Nebula'
import { Starfield } from '../background/Starfield'
import { Dust } from '../background/Dust'
import { HeroCore } from '../objects/HeroCore'
import { NeuralNetwork } from '../objects/NeuralNetwork'
import { SkillField } from '../objects/SkillField'

/**
 * The single cohesive 3D universe rendered inside the persistent canvas.
 *
 * Background layers (nebula, stars, dust) are always present and give the world
 * depth; the foreground motifs (hero core, neural net, skill field) each
 * self-manage their presence off `activeSection` so they cross-fade as the
 * camera travels — there is no per-section scene teardown, just one world that
 * shifts focus.
 *
 * The hero centerpiece is dual-track: when the Spline hero is active the R3F
 * `HeroCore` stands down to avoid two competing centerpieces; it returns as the
 * landing anchor whenever the experience falls back to the native hero (load
 * failure or reduced-motion).
 */
export function WorldRoot() {
  const useR3FHero = useExperience((s) => s.useR3FHero)
  const reducedMotion = useExperience((s) => s.reducedMotion)
  const showR3FHero = useR3FHero || reducedMotion

  return (
    <>
      <Nebula />
      <Starfield />
      <Dust />

      {showR3FHero && <HeroCore />}
      <NeuralNetwork />
      <SkillField />
    </>
  )
}
