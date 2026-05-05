import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

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
          from: `Woodiko Web <${fromEmail}>`,
          to: toEmail,
          subject: `Yeni İletişim Mesajı — ${data.name}`,
          html: `
            <h2>Yeni İletişim Mesajı</h2>
            <p><strong>Ad Soyad:</strong> ${data.name}</p>
            <p><strong>Telefon:</strong> ${data.phone}</p>
            <p><strong>E-posta:</strong> ${data.email}</p>
            <p><strong>Mesaj:</strong></p>
            <p>${data.message}</p>
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
