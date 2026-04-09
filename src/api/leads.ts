import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
)
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request): Promise<Response> {
  const body = await request.json()
  const { name, email, score, scoreLabel, answers } = body

  const { error } = await supabase.from('leads').insert({
    name,
    email,
    score,
    score_label: scoreLabel,
    answers,
    created_at: new Date().toISOString(),
  })

  if (error) {
    console.error('Supabase insert error:', error)
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  await Promise.all([
    resend.emails.send({
      from: 'OSFlo <cooper@osflo.com.au>',
      to: email,
      subject: `Your AI Readiness Score: ${score}/100 — ${scoreLabel}`,
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for completing the OSFlo AI Readiness Quiz.</p>
        <p>Your score is <strong>${score}/100 — ${scoreLabel}</strong>.</p>
        <p>We'll be in touch shortly to walk you through your findings and show you exactly what we'd build for your workflow.</p>
        <p>— Cooper @ OSFlo</p>
      `,
    }),
    resend.emails.send({
      from: 'OSFlo <cooper@osflo.com.au>',
      to: 'cooper@osflo.com.au',
      subject: `New lead: ${name} — ${score}/100 (${scoreLabel})`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Score:</strong> ${score}/100 — ${scoreLabel}</p>
        <p><strong>Answers:</strong> ${JSON.stringify(answers)}</p>
      `,
    }),
  ])

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
