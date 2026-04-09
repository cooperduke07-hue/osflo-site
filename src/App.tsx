import './styles/app.css'
import { useRef } from 'react'
import { CtaBanner } from './components/CtaBanner'
import { Deliverables } from './components/Deliverables'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { WaitlistForm } from './components/WaitlistForm'
import { useScrolled } from './hooks/useScrolled'

export default function App() {
  const scrolled = useScrolled()
  const quizRef = useRef<HTMLElement>(null)

  const scrollToQuiz = () => quizRef.current?.scrollIntoView({ behavior: 'smooth' })
  const scrollToHow = () => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <Nav scrolled={scrolled} />
      <Hero onScoreCta={scrollToQuiz} onHowCta={scrollToHow} />
      <Deliverables />
      <section
        ref={quizRef}
        id="quiz"
        style={{
          padding: 'var(--space-14) var(--space-8)',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface-0)',
        }}
      >
        <WaitlistForm />
      </section>
      <CtaBanner />
      <Footer />
    </>
  )
}
