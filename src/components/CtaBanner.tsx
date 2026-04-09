import { Reveal } from './Reveal'

const steps = [
  {
    n: '01',
    title: 'Score and Map',
    body: 'Complete the AI Readiness Score above. We review your answers and map every manual workflow in your accounting stack.',
  },
  {
    n: '02',
    title: 'Receive Your Report',
    body: 'You get a full written report. Ranked automation opportunities, a build plan, and a cost estimate. Flat fee of $500.',
  },
  {
    n: '03',
    title: 'We Build It',
    body: 'If you want us to implement it, we quote based on scope and build directly into Xero, MYOB, or whatever you are already running.',
  },
  {
    n: '04',
    title: 'Hand Over and Train',
    body: 'Full documentation and a walkthrough. Your team can run and modify everything without ongoing dependency on us.',
  },
]

export function CtaBanner() {
  return (
    <section className="how" id="how">
      <Reveal>
        <div className="kicker">How It Works</div>
        <h2>Done for you. In your stack. In days, not months.</h2>
      </Reveal>
      <div className="steps">
        {steps.map((s, i) => (
          <Reveal key={s.n} className="step" delayMs={80 * i}>
            <div className="step-number">{s.n}</div>
            <div className="step-title">{s.title}</div>
            <p className="step-body">{s.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
