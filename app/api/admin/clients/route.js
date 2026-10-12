import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import crypto from 'node:crypto';
import { validAdmin } from '../../admin-auth.js';

async function ensureTables(sql) {
  await sql\`CREATE TABLE IF NOT EXISTS innov_clients (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )\`;
  await sql\`CREATE TABLE IF NOT EXISTS innov_form_data (
    client_id TEXT NOT NULL REFERENCES innov_clients(id) ON DELETE CASCADE,
    form_id TEXT NOT NULL,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (client_id, form_id)
  )\`;
}

export async function GET(req) {
  if (!validAdmin(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: 'DATABASE_URL no configurada' }, { status: 500 });
  try {
    const sql = neon(process.env.DATABASE_URL);
    await ensureTables(sql);
    const clients = await sql\`SELECT id, name, company, notes, created_at, updated_at FROM innov_clients ORDER BY name ASC\`;
    return NextResponse.json({ clients });
  } catch (error) {
    console.error('Admin clients GET:', error);
    return NextResponse.json({ error: 'No fue posible consultar los clientes' }, { status: 500 });
  }
}

export async function POST(req) {
  if (!validAdmin(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: 'DATABASE_URL no configurada' }, { status: 500 });
  try {
    const body = await req.json();
    const name = String(body.name || '').trim().slice(0, 160);
    const company = String(body.company || '').trim().slice(0, 200);
    const notes = String(body.notes || '').trim().slice(0, 2000);
    if (!name) return NextResponse.json({ error: 'El nombre del cliente es obligatorio' }, { status: 400 });
    const sql = neon(process.env.DATABASE_URL);
    await ensureTables(sql);
    const id = crypto.randomUUID();
    const rows = await sql\`INSERT INTO innov_clients (id, name, company, notes)
      VALUES (\${id}, \${name}, \${company}, \${notes})
      RETURNING id, name, company, notes, created_at, updated_at\`;
    return NextResponse.json({ client: rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Admin clients POST:', error);
    return NextResponse.json({ error: 'No fue posible crear el cliente' }, { status: 500 });
  }
}
