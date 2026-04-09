export function Hero({ onScoreCta, onHowCta }: { onScoreCta: () => void; onHowCta: () => void }) {
  return (
    <section className="hero">
      <p className="hero-eyebrow">AI Accounting Operations for Australian SMBs</p>
      <h1 className="hero-headline">
        Accounting should run<br />
        <em>itself.</em>
      </h1>
      <p className="hero-sub">
        OSflo builds and installs AI-powered accounting workflows directly into your existing stack.
        Reconciliation, invoicing, BAS prep, and client reporting. We will get it done.
      </p>
      <div className="hero-actions">
        <button onClick={onScoreCta} className="btn btn--primary">
          Get Your Free Score
        </button>
        <button onClick={onHowCta} className="btn btn--ghost">
          See how it works
        </button>
      </div>
      <div className="hero-rule" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`hero-rule-dot ${i === 2 ? 'active' : ''}`} />
        ))}
      </div>
    </section>
  )
}
