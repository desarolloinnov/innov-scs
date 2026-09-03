'use client';
import { useEffect, useState } from 'react';

const labels = { new: 'Nuevo', read: 'Leído', contacted: 'Contactado', closed: 'Cerrado' };

export default function Admin() {
  const [logged, setLogged] = useState(false);
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function load() {
    const r = await fetch('/api/admin/messages', { cache: 'no-store' });
    if (!r.ok) { setLogged(false); return; }
    const data = await r.json(); setMessages(data.messages || []); setLogged(true);
  }

  useEffect(() => { load(); }, []);

  async function login(e) {
    e.preventDefault(); setError('');
    const r = await fetch('/api/admin/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ password }) });
    if (!r.ok) { setError('Contraseña incorrecta'); return; }
    setPassword(''); await load();
  }

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' }); setLogged(false); setMessages([]);
  }

  async function changeStatus(id, status) {
    setLoading(true);
    await fetch('/api/admin/messages', { method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ id, status }) });
    await load(); setLoading(false);
  }

  if (!logged) return <main className="adminPage"><div className="adminLogin"><p className="eyebrow purple">INNOV · ADMIN</p><h1>Acceso a contactos</h1><p>Ingresa la contraseña administrativa para consultar los prospectos.</p><form onSubmit={login}><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Contraseña" required/><button>ENTRAR →</button>{error&&<small>{error}</small>}</form><a href="/">← Volver al sitio</a></div></main>;

  return <main className="adminPage"><div className="adminShell"><div className="adminTop"><div><p className="eyebrow purple">INNOV · ADMIN</p><h1>Contactos</h1><p>{messages.length} registros recientes</p></div><div className="adminActions"><button onClick={load} disabled={loading}>ACTUALIZAR</button><button className="ghost" onClick={logout}>SALIR</button></div></div><div className="adminTable">{messages.length===0?<div className="empty">Todavía no hay contactos.</div>:messages.map(m=><article className="message" key={m.id}><div className="messageHead"><div><b>{m.name}</b><span>{m.company || 'Sin empresa'}</span></div><select value={m.status} onChange={e=>changeStatus(m.id,e.target.value)}><option value="new">{labels.new}</option><option value="read">{labels.read}</option><option value="contacted">{labels.contacted}</option><option value="closed">{labels.closed}</option></select></div><div className="messageMeta"><a href={`mailto:${m.email}`}>{m.email}</a>{m.phone&&<a href={`tel:${m.phone}`}>{m.phone}</a>}<time>{new Date(m.created_at).toLocaleString('es-MX')}</time></div><p>{m.message}</p></article>)}</div></div></main>;
}
