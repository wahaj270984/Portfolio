import {
  Hero,
  About,
  Skills,
  Projects,
  WorkResearch,
  Education,
  Certifications,
  TechTrivia,
  Contact,
  Footer,
} from '@/sections'

/**
 * The single scroll-driven page. Each section is a semantic landmark that
 * scroll state and the animated background key off. The neural-constellation
 * canvas (mounted in RootLayout) renders behind all sections.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <WorkResearch />
      <Education />
      <Certifications />
      <TechTrivia />
      <Contact />
      <Footer />
    </>
  )
}
