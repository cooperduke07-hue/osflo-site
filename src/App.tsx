import './styles/app.css'
import { CtaBanner } from './components/CtaBanner'
import { Deliverables } from './components/Deliverables'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Reveal } from './components/Reveal'
import { WaitlistForm } from './components/WaitlistForm'
import { useScrolled } from './hooks/useScrolled'

export default function App() {
  const scrolled = useScrolled()

  return (
    <>
      <Nav scrolled={scrolled} />
      <Hero />

      {/* ── PROBLEM ── */}
      <section className="problem" id="problem">
        <Reveal className="problem-intro">
          <div className="kicker">The problem</div>
          <h2>You're losing revenue to things that shouldn't require a human.</h2>
          <p>Most service businesses run on manual follow-up, gut feel, and good intentions. That's a revenue leak. Every unanswered enquiry, every stalled onboarding, every client who went quiet — that's money left behind.</p>
        </Reveal>
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
            <Reveal key={p.n} className="pain-card" delayMs={80 * i}>
              <div className="pain-number">{p.n}</div>
              <div className="pain-title">{p.title}</div>
              <p className="pain-body">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── WHO ── */}
      <section className="who" id="who">
        <Reveal className="who-left">
          <div className="kicker">Who it's for</div>
          <h2>Built for service businesses that are serious about growth.</h2>
          <p>If you're running a 1–15 person team and your revenue depends on client relationships, OSFlo is built for you. We work with firms that have real pipelines to protect.</p>
        </Reveal>
        <Reveal delayMs={120}>
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
        </Reveal>
      </section>

      {/* ── WAITLIST ── */}
      <section className="waitlist" id="audit">
        <Reveal className="waitlist-header">
          <div className="kicker">Get a Free Audit</div>
          <h2>We'll map exactly where your business is losing time to manual admin and deliver a written report of findings — free. No pitch, just diagnosis.</h2>
        </Reveal>
        <Reveal delayMs={120}>
          <WaitlistForm />
        </Reveal>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how" id="how">
        <Reveal>
          <div className="kicker">How it works</div>
          <h2>Done-for-you. In your stack. In days — not months.</h2>
        </Reveal>
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
            <Reveal key={s.n} className="step" delayMs={80 * i}>
              <div className="step-number">{s.n}</div>
              <div className="step-title">{s.title}</div>
              <p className="step-body">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Deliverables />

      <CtaBanner />
      <Footer />
    </>
  )
}
