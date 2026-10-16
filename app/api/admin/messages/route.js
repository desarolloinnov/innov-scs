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
  try { return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)); } catch { return false; }
}

export async function GET(req) {
  if (!validAdmin(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  try {
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`SELECT id, name, company, email, phone, message, status, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 200`;
    const clients = await sql`SELECT id, name, company, notes, created_at, updated_at FROM innov_clients ORDER BY name ASC`;
    return NextResponse.json({ messages: rows, clients });
  } catch (error) {
    console.error('Admin messages error:', error);
    return NextResponse.json({ error: 'No fue posible consultar la información administrativa' }, { status: 500 });
  }
}

export async function POST(req) {
  if (!validAdmin(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  try {
    const body = await req.json();
    const name = String(body.name || '').trim().slice(0, 160);
    const company = String(body.company || '').trim().slice(0, 200);
    const notes = String(body.notes || '').trim().slice(0, 2000);
    if (!name) return NextResponse.json({ error: 'El nombre del cliente es obligatorio' }, { status: 400 });
    const sql = neon(process.env.DATABASE_URL);
    await sql`CREATE TABLE IF NOT EXISTS innov_clients (id TEXT PRIMARY KEY, name TEXT NOT NULL, company TEXT, notes TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
    const id = crypto.randomUUID();
    const rows = await sql`INSERT INTO innov_clients (id,name,company,notes) VALUES (\${id},\${name},\${company},\${notes}) RETURNING id,name,company,notes,created_at,updated_at`;
    return NextResponse.json({ client: rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Admin client create error:', error);
    return NextResponse.json({ error: 'No fue posible guardar el cliente' }, { status: 500 });
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