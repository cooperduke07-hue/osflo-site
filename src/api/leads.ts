// TODO: Wire up Supabase to persist leads and Resend to send the score summary email once credentials are provided.

export async function POST(request: Request): Promise<Response> {
  const body = await request.json()
  console.log('New lead submission:', JSON.stringify(body, null, 2))
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
