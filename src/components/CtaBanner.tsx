import { Reveal } from './Reveal'

export function CtaBanner() {
  return (
    <section className="cta-banner" id="contact">
      <Reveal>
        <h2>
          Ready to stop chasing?<br />
          <em>Let's build your system.</em>
        </h2>
      </Reveal>
      <Reveal className="cta-banner-right" delayMs={120}>
        <p>No pitch decks. We map your gaps and tell you exactly what we'd build.</p>
        <a href="#audit" className="btn btn--primary">
          Get the Free Audit
        </a>
      </Reveal>
    </section>
  )
}

