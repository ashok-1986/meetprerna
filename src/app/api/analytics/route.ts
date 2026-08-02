// This does NOT record the conversion funnel. The funnel is measured
// at source: Vercel Analytics for page views, Fillout's own Analytics
// tab for form visitors and submissions.
// This endpoint records on-site behaviour only — whether the
// interactions we built are actually being used.

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, props } = body as {
      event: string
      props?: Record<string, unknown>
    }

    const log = { event, props, timestamp: new Date().toISOString() }
    console.log('[behaviour]', JSON.stringify(log))
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
