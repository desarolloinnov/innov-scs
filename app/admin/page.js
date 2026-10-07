'use client';
import { useEffect, useState } from 'react';

const labels = { new: 'Nuevo', read: 'Leído', contacted: 'Contactado', closed: 'Cerrado' };

export default function Admin() {
  const [logged, setLogged] = useState(false);
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('contacts');

  async function load() {
    const r = await fetch('/api/admin/messages', { cache: 'no-store' });
    if (!r.ok) { setLogged(false); return; }
    const data = await r.json();
    setMessages(data.messages || []);
    setLogged(true);
  }

  useEffect(() => { load(); }, []);

  async function login(e) {
    e.preventDefault();
    setError('');
    const r = await fetch('/api/admin/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ password })
    });
    if (!r.ok) { setError('Contraseña incorrecta'); return; }
    setPassword('');
    await load();
  }

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' });
    setLogged(false);
    setMessages([]);
  }

  async function changeStatus(id, status) {
    setLoading(true);
    await fetch('/api/admin/messages', {
      method: 'PATCH',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ id, status })
    });
    await load();
    setLoading(false);
  }

  const countText = messages.length === 1 ? '1 registro reciente' : messages.length + ' registros recientes';

  if (!logged) {
    return (
      <main className="adminPortal">
        <div className="adminLoginReplica">
          <p className="adminEyebrow">INNOV · ADMIN</p>
          <h1>Acceso a<br/>contactos</h1>
          <p>Ingresa la contraseña administrativa para consultar los prospectos.</p>
          <form onSubmit={login}>
            <input
              type="password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              autoFocus
            />
            <button type="submit">ENTRAR →</button>
            {error && <small>{error}</small>}
          </form>
          <a href="/">← Volver al sitio</a>
        </div>
      </main>
    );
  }

  return (
    <main className="adminPortal adminLogged">
      <div className="adminPortalShell">
        <div className="adminPortalHeader">
          <div>
            <p className="adminEyebrow">INNOV · ADMIN</p>
            <h1>{tab === 'contacts' ? 'Contactos' : 'Formularios'}</h1>
            <p>{tab === 'contacts' ? countText : 'Formularios internos de levantamiento.'}</p>
          </div>
          <div className="adminPortalActions">
            <button
              className={tab === 'contacts' ? 'adminPrimary' : 'adminGhost'}
              onClick={tab === 'contacts' ? load : undefined}
              disabled={tab === 'contacts' && loading}
            >
              ACTUALIZAR
            </button>
            <button className="adminGhost" onClick={logout}>SALIR</button>
          </div>
        </div>

        <div className="adminTabs" role="tablist" aria-label="Secciones de administración">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'contacts'}
            className={tab === 'contacts' ? 'active' : ''}
            onClick={()=>setTab('contacts')}
          >
            CONTACTOS
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'site'}
            className={tab === 'site' ? 'active' : ''}
            onClick={()=>setTab('site')}
          >
            SITIO
          </button>
        </div>

        {tab === 'contacts' ? (
          <div className="adminContactList">
            {messages.length === 0 ? (
              <div className="adminEmpty">Todavía no hay contactos.</div>
            ) : messages.map(m => (
              <article className="adminContactCard" key={m.id}>
                <div className="adminContactTop">
                  <div>
                    <b>{m.name}</b>
                    <span>{m.company || 'Sin empresa'}</span>
                  </div>
                  <select value={m.status} onChange={e=>changeStatus(m.id,e.target.value)} aria-label={'Estatus de '+m.name}>
                    <option value="new">{labels.new}</option>
                    <option value="read">{labels.read}</option>
                    <option value="contacted">{labels.contacted}</option>
                    <option value="closed">{labels.closed}</option>
                  </select>
                </div>
                <div className="adminContactMeta">
                  <a href={'mailto:'+m.email}>{m.email}</a>
                  {m.phone && <a href={'tel:'+m.phone}>{m.phone}</a>}
                  <time>{new Date(m.created_at).toLocaleString('es-MX')}</time>
                </div>
                <p>{m.message}</p>
              </article>
            ))}
          </div>
        ) : (
          <section className="adminFormsTab">
            <div className="adminFormsToolbar">
              <span>FORMULARIOS · LEVANTAMIENTOS</span>
              <small>Área interna para capturar levantamientos y consultar la información generada.</small>
            </div>
            <div className="adminFormsNotice">
              <p className="adminEyebrow">INNOV · FORMS</p>
              <h2>Formularios de levantamiento</h2>
              <p>La pestaña ya está preparada dentro del portal administrativo. La estructura exacta de los formularios de Wix se debe reproducir a partir del contenido visual del editor.</p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
