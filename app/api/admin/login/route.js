import { NextResponse } from 'next/server';
import crypto from 'node:crypto';

function sign(value) {
  return crypto.createHmac('sha256', process.env.SESSION_SECRET || '').update(value).digest('hex');
}

export async function POST(req) {
  try {
    const { password } = await req.json();
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || !password || password !== expected) {
      return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 });
    }
    if (!process.env.SESSION_SECRET) {
      return NextResponse.json({ error: 'SESSION_SECRET no configurado' }, { status: 500 });
    }
    const value = `admin:${Date.now()}`;
    const token = `${value}.${sign(value)}`;
    const res = NextResponse.json({ ok: true });
    res.cookies.set('innov_admin', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 8 });
    return res;
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set('innov_admin', '', { httpOnly: true, expires: new Date(0), path: '/' });
  return res;
}
