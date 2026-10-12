import crypto from 'node:crypto';

export function validAdmin(req) {
  const token = req.cookies.get('innov_admin')?.value || '';
  const dot = token.lastIndexOf('.');
  if (dot < 1 || !process.env.SESSION_SECRET) return false;
  const value = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = crypto.createHmac('sha256', process.env.SESSION_SECRET).update(value).digest('hex');
  try { return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)); } catch { return false; }
}
