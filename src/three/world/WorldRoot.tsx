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
 */
export function WorldRoot() {
  return (
    <>
      <Nebula />
      <Starfield />
      <Dust />

      <HeroCore />
      <NeuralNetwork />
      <SkillField />
    </>
  )
}
