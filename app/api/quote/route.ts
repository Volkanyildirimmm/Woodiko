import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { SERVICES } from '@/lib/constants'

const schema = z.object({
  service: z.string().min(1),
  area: z.number().min(1).max(100),
  budget: z.string().min(1),
  district: z.string().min(2),
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  note: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const serviceName = SERVICES.find((s) => s.slug === data.service)?.title || data.service
    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.TO_EMAIL || 'info@woodiko.com.tr'
    const fromEmail = process.env.FROM_EMAIL || 'noreply@woodiko.com.tr'

    if (apiKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `Woodiko Teklif <${fromEmail}>`,
          to: toEmail,
          subject: `Yeni Teklif Talebi — ${data.name} / ${serviceName}`,
          html: `
            <h2>Yeni Teklif Talebi</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:6px;font-weight:bold">Ad Soyad</td><td style="padding:6px">${data.name}</td></tr>
              <tr><td style="padding:6px;font-weight:bold">Telefon</td><td style="padding:6px">${data.phone}</td></tr>
              <tr><td style="padding:6px;font-weight:bold">E-posta</td><td style="padding:6px">${data.email}</td></tr>
              <tr><td style="padding:6px;font-weight:bold">Hizmet</td><td style="padding:6px">${serviceName}</td></tr>
              <tr><td style="padding:6px;font-weight:bold">Alan</td><td style="padding:6px">${data.area} m²</td></tr>
              <tr><td style="padding:6px;font-weight:bold">Bütçe</td><td style="padding:6px">${data.budget}</td></tr>
              <tr><td style="padding:6px;font-weight:bold">Semt</td><td style="padding:6px">${data.district}</td></tr>
              ${data.note ? `<tr><td style="padding:6px;font-weight:bold">Not</td><td style="padding:6px">${data.note}</td></tr>` : ''}
            </table>
          `,
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Geçersiz veri' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
