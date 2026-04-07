import { useEffect, useRef, useState } from 'react'
import { useForm } from '@formspree/react'
import './App.css'

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function RevealSection({ children, className = '', delay = '' }: {
  children: React.ReactNode
  className?: string
  delay?: string
}) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${delay} ${className}`}>
      {children}
    </div>
  )
}

function WaitlistForm() {
  const [state, handleSubmit] = useForm('mgopqvpe')

  if (state.succeeded) {
    return (
      <div className="waitlist-confirm">
        <div className="waitlist-confirm-icon">✓</div>
        <p className="waitlist-confirm-msg">
          You're on the list. We'll be in touch within 48 hours to schedule your free audit.
        </p>
      </div>
    )
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit}>
      <div className="waitlist-row">
        <div className="waitlist-field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            placeholder="Jane Smith"
          />
        </div>
        <div className="waitlist-field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@yourfirm.com.au"
          />
        </div>
      </div>

      <div className="waitlist-row">
        <div className="waitlist-field">
          <label htmlFor="businessType">Business type</label>
          <select id="businessType" name="businessType" required defaultValue="">
            <option value="" disabled>Select your business type</option>
            <option value="Accounting firm">Accounting firm</option>
            <option value="Bookkeeping practice">Bookkeeping practice</option>
            <option value="Financial adviser">Financial adviser</option>
            <option value="Mortgage broker">Mortgage broker</option>
            <option value="Legal firm">Legal firm</option>
            <option value="Allied health">Allied health</option>
            <option value="Other service business">Other service business</option>
          </select>
        </div>
        <div className="waitlist-field">
          <label htmlFor="teamSize">Team size</label>
          <select id="teamSize" name="teamSize" required defaultValue="">
            <option value="" disabled>Select team size</option>
            <option value="Just me">Just me</option>
            <option value="2-5 people">2–5 people</option>
            <option value="6-10 people">6–10 people</option>
            <option value="11-15 people">11–15 people</option>
          </select>
        </div>
      </div>

      <div className="waitlist-field">
        <label htmlFor="adminPain">Biggest admin pain point</label>
        <textarea
          id="adminPain"
          name="adminPain"
          required
          rows={3}
          placeholder="e.g. chasing clients for documents, manually sending updates, onboarding taking too long..."
        />
      </div>

      <div className="waitlist-field">
        <label htmlFor="docCollection">How do you currently handle client document collection?</label>
        <textarea
          id="docCollection"
          name="docCollection"
          required
          rows={3}
          placeholder="e.g. email back and forth, we use a portal, clients drop things off..."
        />
      </div>

      {state.errors && (
        <p className="waitlist-error">Something went wrong. Please try again.</p>
      )}

      <button type="submit" className="waitlist-submit" disabled={state.submitting}>
        {state.submitting ? 'Submitting...' : 'Join the Waitlist'}
      </button>
    </form>
  )
}

export default function App() {
  const scrolled = useScrolled()

  return (
    <>
      {/* ── NAV ── */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-logo">OS<span>flo</span></a>
        <a href="#audit" className="nav-cta">
          Get a Free Audit
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <p className="hero-eyebrow">Automated client systems for service businesses</p>
        <h1 className="hero-headline">
          Your team should<br />stop chasing.<br /><em>Let the system do it.</em>
        </h1>
        <p className="hero-sub">
          OSFlo builds and installs automated follow-up and communication systems that run in the background — so you close more, lose fewer clients, and stop leaving money on the table.
        </p>
        <div className="hero-actions">
          <a href="#audit" className="btn-primary">
            Get a Free Audit
          </a>
          <a href="#how" className="btn-secondary">
            See how it works
          </a>
        </div>
        <div className="hero-rule">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`hero-rule-dot ${i === 2 ? 'active' : ''}`} />
          ))}
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="problem" id="problem">
        <RevealSection className="problem-intro">
          <div className="section-label">The problem</div>
          <h2>You're losing revenue to things that shouldn't require a human.</h2>
          <p>Most service businesses run on manual follow-up, gut feel, and good intentions. That's a revenue leak. Every unanswered enquiry, every stalled onboarding, every client who went quiet — that's money left behind.</p>
        </RevealSection>
        <div className="problem-grid">
          {[
            {
              n: '01',
              title: 'Leads that go cold',
              body: 'Enquiries come in and nobody follows up fast enough. By the time someone circles back, the prospect has moved on or signed with a competitor.',
            },
            {
              n: '02',
              title: 'Onboarding that stalls',
              body: 'New clients don\'t get what they need on day one. The experience feels disjointed. Trust erodes before the relationship even starts.',
            },
            {
              n: '03',
              title: 'Clients who go quiet',
              body: 'Existing clients stop engaging and you don\'t notice until it\'s too late. No touchpoints, no re-engagement — just a silent churn.',
            },
            {
              n: '04',
              title: 'Staff doing admin work',
              body: 'Your best people are sending reminder emails, chasing documents, and doing status updates. That\'s expensive overhead for work a system can handle.',
            },
          ].map((p, i) => (
            <RevealSection key={p.n} className="pain-card" delay={`reveal-delay-${i + 1}`}>
              <div className="pain-number">{p.n}</div>
              <div className="pain-title">{p.title}</div>
              <p className="pain-body">{p.body}</p>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── WHO ── */}
      <section className="who" id="who">
        <RevealSection className="who-left">
          <div className="section-label">Who it's for</div>
          <h2>Built for service businesses that are serious about growth.</h2>
          <p>If you're running a 1–15 person team and your revenue depends on client relationships, OSFlo is built for you. We work with firms that have real pipelines to protect.</p>
        </RevealSection>
        <RevealSection delay="reveal-delay-1">
          <ul className="who-list">
            {[
              'Accounting & bookkeeping firms',
              'Financial advisers & planners',
              'Mortgage brokers & finance professionals',
              'Legal & conveyancing practices',
              'Allied health providers',
              'Any service business with 1–15 staff',
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </RevealSection>
      </section>

      {/* ── WAITLIST ── */}
      <section className="waitlist" id="audit">
        <RevealSection className="waitlist-header">
          <div className="section-label">Get a Free AI Audit</div>
          <h2>We'll map exactly where your business is losing time to manual admin and deliver a written report of findings — free. No pitch, just diagnosis.</h2>
        </RevealSection>
        <RevealSection delay="reveal-delay-1">
          <WaitlistForm />
        </RevealSection>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how" id="how">
        <RevealSection>
          <div className="section-label">How it works</div>
          <h2>Done-for-you. In your stack. In days — not months.</h2>
        </RevealSection>
        <div className="steps">
          {[
            {
              n: '01',
              title: 'Audit & Map',
              body: 'We get on a call and map your current client journey — every touchpoint, every gap, every moment where a lead or client goes quiet.',
            },
            {
              n: '02',
              title: 'Build the System',
              body: 'We design and build your automated follow-up flows, onboarding sequences, and re-engagement triggers inside tools you already use.',
            },
            {
              n: '03',
              title: 'Install & Test',
              body: 'We install everything and run live tests before handover. You see it working before anything goes near a real client.',
            },
            {
              n: '04',
              title: 'Hand Over & Train',
              body: 'You get a full walkthrough and documentation. The system runs. Your team stops chasing and starts closing.',
            },
          ].map((s, i) => (
            <RevealSection key={s.n} className="step" delay={`reveal-delay-${i + 1}`}>
              <div className="step-number">{s.n}</div>
              <div className="step-title">{s.title}</div>
              <p className="step-body">{s.body}</p>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="pricing" id="pricing">
        <RevealSection className="pricing-header">
          <div className="section-label">Pricing</div>
          <h2>Straightforward. No retainers forced on you.</h2>
          <p>Pay once for the build. Add the retainer if you want us to keep iterating. No lock-ins, no subscriptions unless you want them.</p>
        </RevealSection>
        <div className="pricing-grid">
          {/* Starter */}
          <RevealSection className="pricing-card" delay="reveal-delay-1">
            <div className="pricing-tier">Starter</div>
            <div className="pricing-price"><sup>$</sup>1,500</div>
            <p className="pricing-note">First client founding rate: <strong style={{ color: 'var(--green)' }}>$750</strong> — limited spots.</p>
            <div className="pricing-divider" />
            <ul className="pricing-features">
              <li>Lead follow-up automation</li>
              <li>Onboarding sequence (up to 5 steps)</li>
              <li>1 communication channel setup</li>
              <li>14-day implementation</li>
              <li>1 round of revisions</li>
            </ul>
            <a href="#audit" className="pricing-action secondary">
              Get a Free Audit
            </a>
          </RevealSection>

          {/* Full Comms */}
          <RevealSection className="pricing-card featured" delay="reveal-delay-2">
            <div className="pricing-tier">Full Comms System</div>
            <div className="pricing-price"><sup>$</sup>3,500</div>
            <p className="pricing-note">Full client lifecycle automation. Our flagship build.</p>
            <div className="pricing-divider" />
            <ul className="pricing-features">
              <li>Everything in Starter</li>
              <li>Full onboarding + offboarding flows</li>
              <li>Re-engagement & win-back sequences</li>
              <li>Multi-channel (email, SMS, CRM)</li>
              <li>Reporting dashboard setup</li>
              <li>3 rounds of revisions</li>
              <li>30-day post-launch support</li>
            </ul>
            <a href="#audit" className="pricing-action primary">
              Get a Free Audit
            </a>
          </RevealSection>

          {/* Retainer */}
          <RevealSection className="pricing-card" delay="reveal-delay-3">
            <div className="pricing-tier">Growth Retainer</div>
            <div className="pricing-price"><sup>$</sup>500<span style={{ fontSize: '20px', fontFamily: 'var(--font-mono)' }}>/mo</span></div>
            <p className="pricing-note">Ongoing optimisation. For businesses that want to keep improving.</p>
            <div className="pricing-divider" />
            <ul className="pricing-features">
              <li>Monthly system audit & updates</li>
              <li>New flows added as you grow</li>
              <li>Priority support & response</li>
              <li>Quarterly strategy review call</li>
              <li>Cancel any time, no lock-in</li>
            </ul>
            <a href="#audit" className="pricing-action secondary">
              Get a Free Audit
            </a>
          </RevealSection>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner" id="contact">
        <RevealSection>
          <h2>Ready to stop chasing?<br /><em>Let's build your system.</em></h2>
        </RevealSection>
        <RevealSection className="cta-banner-right" delay="reveal-delay-1">
          <p>No pitch decks. We map your gaps and tell you exactly what we'd build.</p>
          <a href="#audit" className="btn-primary">
            Get a Free Audit
          </a>
        </RevealSection>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div>
          <div className="footer-brand">OS<span>Flo</span></div>
          <div className="footer-sub">Automated client systems for service businesses.</div>
        </div>
        <div className="footer-links">
          <a href="mailto:cooper@osflo.com.au" className="footer-link">cooper@osflo.com.au</a>
          <a href="https://instagram.com/osfloai" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
          <a href="https://tiktok.com/@osfloai" target="_blank" rel="noopener noreferrer" className="footer-link">TikTok</a>
          <a href="#audit" className="footer-link">Get a Free Audit</a>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} OSFlo. All rights reserved.</span>
          <span className="footer-copy">ABN — osflo.com.au</span>
        </div>
      </footer>
    </>
  )
}
