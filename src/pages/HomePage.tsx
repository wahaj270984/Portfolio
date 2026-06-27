import {
  Hero,
  About,
  Skills,
  Projects,
  Experience,
  Research,
  Education,
  Achievements,
  Certifications,
  Contact,
  Footer,
} from '@/sections'

/**
 * The single scroll-driven page. Each section is a semantic landmark that the
 * camera rig, scrollspy and 3D world key their state off. The persistent canvas
 * (mounted in RootLayout) renders the cohesive 3D universe behind all of this.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Research />
      <Education />
      <Achievements />
      <Certifications />
      <Contact />
      <Footer />
    </>
  )
}
