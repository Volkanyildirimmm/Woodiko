import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN
const TEST_CODE = process.env.META_CAPI_TEST_EVENT_CODE

const hashSHA256 = (value: string) =>
  crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex')

const sanitizePhone = (value: string) => value.replace(/[^\d+]/g, '')

export async function POST(req: NextRequest) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json(
      { skipped: true, reason: 'Meta CAPI not configured' },
      { status: 200 },
    )
  }

  try {
    const body = await req.json()
    const {
      eventName,
      params = {},
      eventId,
      eventTime,
      eventSourceUrl,
      userAgent,
    } = body || {}

    if (!eventName) {
      return NextResponse.json({ error: 'eventName required' }, { status: 400 })
    }

    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || undefined

    const fbc = req.cookies.get('_fbc')?.value
    const fbp = req.cookies.get('_fbp')?.value

    const userData: Record<string, unknown> = {
      client_ip_address: ip,
      client_user_agent: userAgent,
    }
    if (fbc) userData.fbc = fbc
    if (fbp) userData.fbp = fbp
    if (params.email) userData.em = [hashSHA256(String(params.email))]
    if (params.phone) userData.ph = [hashSHA256(sanitizePhone(String(params.phone)))]

    const { email, phone, ...customData } = params as Record<string, unknown>

    const eventData = {
      data: [
        {
          event_name: eventName,
          event_time: eventTime ?? Math.floor(Date.now() / 1000),
          event_id: eventId,
          event_source_url: eventSourceUrl,
          action_source: 'website',
          user_data: userData,
          custom_data: customData,
        },
      ],
      ...(TEST_CODE ? { test_event_code: TEST_CODE } : {}),
    }

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
        cache: 'no-store',
      },
    )

    const result = await response.json()

    if (!response.ok) {
      console.error('Meta CAPI error response:', result)
      return NextResponse.json({ success: false, error: result }, { status: 502 })
    }

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('Meta CAPI error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
