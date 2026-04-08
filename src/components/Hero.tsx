export function Hero() {
  return (
    <section className="hero">
      <p className="hero-eyebrow">Automated client systems for service businesses</p>
      <h1 className="hero-headline">
        Your team should<br />
        stop chasing.<br />
        <em>Let the system do it.</em>
      </h1>
      <p className="hero-sub">
        OSFlo builds and installs automated follow-up and communication systems that run in the background — so you close
        more, lose fewer clients, and stop leaving money on the table.
      </p>
      <div className="hero-actions">
        <a href="#audit" className="btn btn--primary">
          Get the Free Audit
        </a>
        <a href="#how" className="btn btn--ghost">
          See how it works
        </a>
      </div>
      <div className="hero-rule" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`hero-rule-dot ${i === 2 ? 'active' : ''}`} />
        ))}
      </div>
    </section>
  )
}

