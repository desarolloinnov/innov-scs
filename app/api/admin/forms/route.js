import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { validAdmin } from '../../admin-auth.js';

async function ensureTables(sql) {
  await sql`CREATE TABLE IF NOT EXISTS innov_clients (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS innov_form_data (
    client_id TEXT NOT NULL REFERENCES innov_clients(id) ON DELETE CASCADE,
    form_id TEXT NOT NULL,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (client_id, form_id)
  )`;
}

export async function GET(req) {
  if (!validAdmin(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: 'DATABASE_URL no configurada' }, { status: 500 });
  const clientId = new URL(req.url).searchParams.get('clientId');
  const formId = new URL(req.url).searchParams.get('formId');
  if (!clientId || !formId) return NextResponse.json({ error: 'clientId y formId son obligatorios' }, { status: 400 });
  try {
    const sql = neon(process.env.DATABASE_URL);
    await ensureTables(sql);
    const rows = await sql`SELECT data, updated_at FROM innov_form_data WHERE client_id = ${clientId} AND form_id = ${formId}`;
    return NextResponse.json({ data: rows[0]?.data || {}, updated_at: rows[0]?.updated_at || null });
  } catch (error) {
    console.error('Admin form GET:', error);
    return NextResponse.json({ error: 'No fue posible cargar el formulario' }, { status: 500 });
  }
}

export async function PUT(req) {
  if (!validAdmin(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: 'DATABASE_URL no configurada' }, { status: 500 });
  try {
    const body = await req.json();
    const clientId = String(body.clientId || '');
    const formId = String(body.formId || '');
    const data = body.data && typeof body.data === 'object' ? body.data : {};
    if (!clientId || !formId) return NextResponse.json({ error: 'clientId y formId son obligatorios' }, { status: 400 });
    const sql = neon(process.env.DATABASE_URL);
    await ensureTables(sql);
    const check = await sql`SELECT id FROM innov_clients WHERE id = ${clientId}`;
    if (!check.length) return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 });
    const rows = await sql`INSERT INTO innov_form_data (client_id, form_id, data, updated_at)
      VALUES (${clientId}, ${formId}, ${JSON.stringify(data)}::jsonb, NOW())
      ON CONFLICT (client_id, form_id)
      DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
      RETURNING updated_at`;
    return NextResponse.json({ ok: true, updated_at: rows[0].updated_at });
  } catch (error) {
    console.error('Admin form PUT:', error);
    return NextResponse.json({ error: 'No fue posible guardar el formulario' }, { status: 500 });
  }
}
