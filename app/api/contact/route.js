import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const clean = (value, max = 2000) => String(value ?? '').trim().slice(0, max);

export async function POST(req) {
  try {
    const body = await req.json();
    if (clean(body.website, 100)) return NextResponse.json({ ok: true });

    const name = clean(body.name, 120);
    const company = clean(body.company, 160);
    const email = clean(body.email, 254).toLowerCase();
    const phone = clean(body.phone, 50);
    const message = clean(body.message, 4000);

    if (!name || !email || !message) return NextResponse.json({ error: 'Campos requeridos' }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Correo no válido' }, { status: 400 });
    if (!process.env.DATABASE_URL) return NextResponse.json({ error: 'DATABASE_URL no configurada' }, { status: 500 });

    const sql = neon(process.env.DATABASE_URL);
    await sql`INSERT INTO contact_messages (name, company, email, phone, message) VALUES (${name}, ${company}, ${email}, ${phone}, ${message})`;

    if (process.env.RESEND_API_KEY && process.env.EMAIL_TO && process.env.EMAIL_FROM) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM,
          to: [process.env.EMAIL_TO],
          subject: `Nuevo contacto InnOv: ${name}`,
          reply_to: email,
          text: [`Nombre: ${name}`, `Empresa: ${company || 'No indicada'}`, `Correo: ${email}`, `Teléfono: ${phone || 'No indicado'}`, '', 'Mensaje:', message].join('\n'),
        }),
      });
      if (!emailResponse.ok) console.error('Resend error:', await emailResponse.text());
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'No fue posible procesar el mensaje' }, { status: 500 });
  }
}
