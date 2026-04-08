import { Reveal } from './Reveal'

const deliverables = [
  {
    title: 'A mapped client journey',
    body: 'We document your current lead-to-client flow and highlight every handoff, delay, and dead-end.',
  },
  {
    title: 'Revenue leak checklist',
    body: 'A ranked list of where clients go quiet, where follow-up fails, and where manual admin is costing you money.',
  },
  {
    title: 'Automation opportunities',
    body: 'Specific triggers, messages, and sequences that can run in your existing tools (CRM, email, SMS).',
  },
  {
    title: 'Implementation blueprint',
    body: 'A clear plan for what we’d build, in what order, and what it would change operationally.',
  },
]

export function Deliverables() {
  return (
    <section className="deliverables" id="report">
      <div className="container">
        <Reveal className="section-head">
          <div className="kicker">The report</div>
          <h2>What you get (before we ever talk pricing).</h2>
          <p>
            You’ll receive a written audit with clear findings and a recommended build plan. If it’s a fit, we discuss
            implementation and pricing after you’ve seen the report.
          </p>
        </Reveal>

        <div className="card-grid card-grid--2">
          {deliverables.map((d, i) => (
            <Reveal key={d.title} className="card" delayMs={90 * i}>
              <h3>{d.title}</h3>
              <p>{d.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="next-steps" delayMs={150}>
          <div className="next-steps__title">What happens after</div>
          <ul className="next-steps__list">
            <li>We send the report and walk you through the findings.</li>
            <li>If you want the system built, we quote based on scope and your stack.</li>
            <li>No retainers required. You decide if you want ongoing iteration.</li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

