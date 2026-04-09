import { useState } from 'react'

const questions = [
  {
    q: 'What accounting platform are you currently using?',
    options: [
      { label: 'Xero', points: 10 },
      { label: 'MYOB', points: 10 },
      { label: 'QuickBooks', points: 10 },
      { label: 'Spreadsheets only', points: 30 },
      { label: 'Multiple platforms or not sure', points: 20 },
    ],
  },
  {
    q: 'How do you currently handle bank reconciliation?',
    options: [
      { label: 'Mostly automated, we rarely touch it', points: 0 },
      { label: 'Weekly with some manual checking', points: 10 },
      { label: 'Someone does it manually each month', points: 20 },
      { label: 'It piles up and we catch up when we can', points: 30 },
      { label: 'We are not sure what our process is', points: 25 },
    ],
  },
  {
    q: 'How are overdue invoices followed up?',
    options: [
      { label: 'Automated reminders go out without us doing anything', points: 0 },
      { label: 'We have a process but someone sends them manually', points: 15 },
      { label: 'We chase them when we remember', points: 25 },
      { label: 'We often miss them entirely', points: 30 },
    ],
  },
  {
    q: 'How is your BAS currently prepared?',
    options: [
      { label: 'Pulled automatically from our accounting software', points: 0 },
      { label: 'Our accountant handles it but gathering the data takes time', points: 15 },
      { label: 'We compile it manually from multiple sources each quarter', points: 25 },
      { label: 'We are not sure what our process is', points: 30 },
    ],
  },
  {
    q: 'How long does your monthly financial reporting take?',
    options: [
      { label: 'Under an hour, mostly automated', points: 0 },
      { label: 'Half a day with some manual pulling', points: 15 },
      { label: 'A full day or more', points: 25 },
      { label: 'We do not do monthly reporting', points: 20 },
    ],
  },
  {
    q: 'How many hours per week does your team spend on manual accounting admin?',
    options: [
      { label: 'Less than 2 hours', points: 0 },
      { label: '2 to 5 hours', points: 15 },
      { label: '5 to 10 hours', points: 25 },
      { label: 'More than 10 hours', points: 30 },
    ],
  },
]

function getScoreLabel(score: number) {
  if (score <= 30) return 'Optimised'
  if (score <= 55) return 'Partially Automated'
  if (score <= 79) return 'Mostly Manual'
  return 'Not Automated'
}

function getFindings(answers: number[]) {
  const candidates: Array<{ pts: number; text: string }> = []
  if (answers[1] >= 20)
    candidates.push({
      pts: answers[1],
      text: 'Bank reconciliation is your biggest time drain. This is fully automatable inside Xero in under a week.',
    })
  if (answers[2] >= 25)
    candidates.push({
      pts: answers[2],
      text: 'Invoice follow-up is still manual. Automated reminders can recover hours per week without anyone on your team touching it.',
    })
  if (answers[3] >= 25)
    candidates.push({
      pts: answers[3],
      text: 'BAS preparation is costing your team significant time each quarter. A connected Xero workflow can cut this by 80 percent.',
    })
  if (answers[5] >= 25)
    candidates.push({
      pts: answers[5],
      text: 'Your team is spending more than 5 hours per week on admin that should be automated.',
    })
  return candidates.sort((a, b) => b.pts - a.pts).slice(0, 3)
}

export function WaitlistForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>(Array(6).fill(-1))
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const totalPoints = answers.reduce((sum, pts) => sum + (pts === -1 ? 0 : pts), 0)
  const score = Math.round((totalPoints / 145) * 100)
  const scoreLabel = getScoreLabel(score)

  const r = 54
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - score / 100)

  const handleOptionSelect = (optionIndex: number, points: number) => {
    const updated = [...answers]
    updated[currentStep - 1] = points
    setAnswers(updated)
    setSelectedOptionIndex(optionIndex)
  }

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
      setSelectedOptionIndex(null)
    } else {
      setCurrentStep(7)
    }
  }

  const handleResultsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitState('submitting')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          score,
          scoreLabel,
          answers,
          timestamp: new Date().toISOString(),
        }),
      })
      setSubmitState(res.ok ? 'success' : 'error')
    } catch {
      setSubmitState('error')
    }
  }

  const cardStyle: React.CSSProperties = {
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    background: 'linear-gradient(180deg, var(--surface-1), var(--surface-2))',
    padding: 'var(--space-8)',
    maxWidth: '680px',
    margin: '0 auto',
  }

  if (currentStep === 0) {
    return (
      <div style={cardStyle}>
        <div className="kicker" style={{ marginBottom: 'var(--space-5)' }}>Check Your Score</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.2vw, 40px)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 'var(--space-4)' }}>
          Find out how much time your accounting workflows are costing you.
        </h2>
        <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, fontSize: 'var(--text-sm)', marginBottom: 'var(--space-7)' }}>
          6 questions. 2 minutes. A personalised score showing exactly where your biggest automation opportunities are.
        </p>
        <button className="btn btn--primary" onClick={() => setCurrentStep(1)}>
          Start the Quiz
        </button>
      </div>
    )
  }

  if (currentStep >= 1 && currentStep <= 6) {
    const q = questions[currentStep - 1]
    const isAnswered = answers[currentStep - 1] !== -1
    const isFinal = currentStep === 6

    return (
      <div style={cardStyle}>
        <style>{`
          .quiz-option {
            display: block;
            width: 100%;
            text-align: left;
            padding: 14px 18px;
            border-radius: var(--radius-md);
            border: 1px solid var(--border);
            background: var(--surface-1);
            color: var(--text);
            font-family: var(--font-sans);
            font-size: var(--text-sm);
            cursor: pointer;
            transition: border-color 0.12s ease, background 0.12s ease;
          }
          .quiz-option:hover {
            border-color: var(--accent);
          }
          .quiz-option.quiz-option--selected {
            border-color: var(--accent);
            background: color-mix(in oklab, var(--accent) 12%, var(--surface-1));
          }
        `}</style>

        <div style={{ marginBottom: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
              {currentStep} of 6
            </span>
          </div>
          <div style={{ width: '100%', height: '4px', background: 'var(--border)', borderRadius: '2px' }}>
            <div style={{ width: `${(currentStep / 6) * 100}%`, height: '100%', background: 'var(--accent)', borderRadius: '2px', transition: 'width 0.3s ease' }} />
          </div>
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.12em', color: 'var(--accent)', marginBottom: 'var(--space-3)', textTransform: 'uppercase' }}>
          Question {currentStep}
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', lineHeight: 1.2, marginBottom: 'var(--space-6)' }}>
          {q.q}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-7)' }}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              className={`quiz-option${selectedOptionIndex === i ? ' quiz-option--selected' : ''}`}
              onClick={() => handleOptionSelect(i, opt.points)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <button
          className="btn btn--primary"
          onClick={handleNext}
          disabled={!isAnswered}
          style={{ opacity: isAnswered ? 1 : 0.4, cursor: isAnswered ? 'pointer' : 'not-allowed' }}
        >
          {isFinal ? 'Submit' : 'Next'}
        </button>
      </div>
    )
  }

  if (currentStep === 7) {
    const findings = getFindings(answers)

    if (submitState === 'success') {
      return (
        <div style={cardStyle}>
          <div className="panel__icon" aria-hidden="true">
            ✓
          </div>
          <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, marginTop: 'var(--space-4)' }}>
            Done. Check your inbox and we will be in touch shortly to confirm your call.
          </p>
        </div>
      )
    }

    return (
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <svg width="140" height="140" viewBox="0 0 140 140" style={{ display: 'block', margin: '0 auto var(--space-4)' }}>
            <circle cx="70" cy="70" r={r} fill="none" stroke="var(--border)" strokeWidth="10" />
            <circle
              cx="70"
              cy="70"
              r={r}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="10"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 70 70)"
              style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />
            <text x="70" y="62" textAnchor="middle" fill="var(--text)" fontSize="28" fontWeight="bold" fontFamily="var(--font-display)">
              {score}
            </text>
            <text x="70" y="82" textAnchor="middle" fill="var(--text-muted)" fontSize="12" fontFamily="var(--font-mono)">
              / 100
            </text>
          </svg>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            {scoreLabel}
          </div>
        </div>

        {findings.length > 0 && (
          <div style={{ marginBottom: 'var(--space-8)' }}>
            <div className="kicker" style={{ marginBottom: 'var(--space-4)' }}>Your Findings</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {findings.map((f, i) => (
                <div key={i} style={{ padding: 'var(--space-5) var(--space-6)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--surface-1)' }}>
                  <p style={{ color: 'var(--text-dim)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-7)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', lineHeight: 1.2, marginBottom: 'var(--space-3)' }}>
            Get your full report and book a free 30-minute call.
          </h3>
          <p style={{ color: 'var(--text-dim)', fontSize: 'var(--text-sm)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>
            We will walk you through your findings and show you exactly what we would build.
          </p>
          <form onSubmit={handleResultsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div className="field">
              <label htmlFor="res-name" className="field__label">Full Name</label>
              <input
                id="res-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                className="field__control"
              />
            </div>
            <div className="field">
              <label htmlFor="res-email" className="field__label">Email Address</label>
              <input
                id="res-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@yourfirm.com.au"
                className="field__control"
              />
            </div>
            {submitState === 'error' && (
              <p className="form__error">
                Something went wrong. Please email us directly at hello@osflo.com.au
              </p>
            )}
            <button
              type="submit"
              className="btn btn--primary"
              disabled={submitState === 'submitting'}
              style={{ width: '100%' }}
            >
              {submitState === 'submitting' ? 'Sending...' : 'Send My Report and Book a Call'}
            </button>
            <p className="form__fineprint">
              You will receive your score summary by email. We will reach out to confirm your call time.
            </p>
          </form>
        </div>
      </div>
    )
  }

  return null
}
