import { Reveal } from './Reveal'

const cards = [
  {
    n: '01',
    title: 'Bank feeds nobody is watching',
    body: 'Transactions pile up unreconciled. By the time someone catches up, the backlog is a half-day job that should have taken minutes.',
  },
  {
    n: '02',
    title: 'Invoice follow-up done manually',
    body: 'Your team is sending payment reminders one by one. That is a system problem, not a staffing problem.',
  },
  {
    n: '03',
    title: 'BAS prep from multiple sources',
    body: 'Every quarter the same scramble. Data pulled from three places, checked twice, and lodged under pressure. It does not have to work this way.',
  },
  {
    n: '04',
    title: 'Reporting that takes all day',
    body: 'Your clients or directors want numbers. Your team spends hours pulling them. AI can have that ready before anyone asks.',
  },
]

export function Deliverables() {
  return (
    <section className="problem" id="problem">
      <Reveal className="problem-intro">
        <div className="kicker">The Problem</div>
        <h2>You are losing hours every week to work your software should handle.</h2>
        <p>
          Most accounting firms and small businesses run on manual processes, spreadsheet workarounds, and staff time
          that should be spent elsewhere. Every unreconciled transaction, every chased invoice, every BAS prepared by
          hand. That is time and money your business does not get back.
        </p>
      </Reveal>
      <div className="problem-grid">
        {cards.map((c, i) => (
          <Reveal key={c.n} className="pain-card" delayMs={80 * i}>
            <div className="pain-number">{c.n}</div>
            <div className="pain-title">{c.title}</div>
            <p className="pain-body">{c.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
