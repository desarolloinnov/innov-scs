import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { neon } from '@neondatabase/serverless';

function validAdmin(req) {
  const token = req.cookies.get('innov_admin')?.value || '';
  const dot = token.lastIndexOf('.');
  if (dot < 1 || !process.env.SESSION_SECRET) return false;
  const value = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = crypto.createHmac('sha256', process.env.SESSION_SECRET).update(value).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

export async function GET(req) {
  if (!validAdmin(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  try {
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`SELECT id, name, company, email, phone, message, status, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 200`;
    return NextResponse.json({ messages: rows });
  } catch (error) {
    console.error('Admin messages error:', error);
    return NextResponse.json({ error: 'No fue posible consultar los contactos' }, { status: 500 });
  }
}

export async function PATCH(req) {
  if (!validAdmin(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  try {
    const { id, status } = await req.json();
    const allowed = ['new', 'read', 'contacted', 'closed'];
    if (!id || !allowed.includes(status)) return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    const sql = neon(process.env.DATABASE_URL);
    await sql`UPDATE contact_messages SET status = ${status} WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Admin status error:', error);
    return NextResponse.json({ error: 'No fue posible actualizar el contacto' }, { status: 500 });
  }
}
