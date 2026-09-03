'use client';
import { useEffect, useState } from 'react';

const slides = [
  'https://images.unsplash.com/photo-1586528116493-da8c8f8b9a3f?auto=format&fit=crop&w=2000&q=88',
  'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=2000&q=88',
  'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=2000&q=88',
];

const challenges = [
  ['01', 'Productividad y costo', 'Reducimos movimientos innecesarios, tiempos improductivos y costos operativos.'],
  ['02', 'Capacidad y crecimiento', 'Diseñamos operaciones preparadas para crecer sin perder control ni eficiencia.'],
  ['03', 'Inventario y servicio', 'Mayor visibilidad, exactitud de inventario y cumplimiento de niveles de servicio.'],
  ['04', 'Precisión y trazabilidad', 'Conectamos identificación, procesos y datos para conocer qué ocurre y dónde ocurre.'],
  ['05', 'Visibilidad y control', 'Convertimos datos operativos en información accionable para decidir con mayor velocidad.'],
  ['06', 'Riesgo y continuidad', 'Fortalecemos la operación frente a interrupciones, errores y puntos críticos.'],
];

const capabilities = [
  ['01', 'Automatización Intralogística', 'Tecnología para mover, almacenar y surtir con mayor velocidad y consistencia.'],
  ['02', 'Gestión y Orquestación', 'WMS, software e integración para coordinar personas, procesos y equipos.'],
  ['03', 'Identificación y Trazabilidad', 'Captura confiable de información mediante códigos, visión y dispositivos.'],
  ['04', 'Visibilidad e Inteligencia Operativa', 'Tableros, indicadores y datos para entender la operación en tiempo real.'],
  ['05', 'Seguridad y Continuidad Operativa', 'Soluciones que protegen activos y mantienen la operación disponible.'],
  ['06', 'Analítica y Optimización', 'Modelamos oportunidades para mejorar productividad, costo y nivel de servicio.'],
  ['07', 'Infraestructura y Conectividad', 'Redes, comunicaciones y plataformas que soportan una operación crítica.'],
];

const steps = [
  ['01', 'Entendemos objetivos y retos'],
  ['02', 'Diagnosticamos la operación'],
  ['03', 'Diseñamos alternativas'],
  ['04', 'Validamos el caso financiero'],
  ['05', 'Implementamos e integramos'],
  ['06', 'Medimos y evolucionamos'],
];

const industries = [
  ['01', 'Retail & E-commerce', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1100&q=85'],
  ['02', 'Logística, Distribución & 3PL', 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1100&q=85'],
  ['03', 'Manufactura & Automotriz', 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1100&q=85'],
  ['04', 'Farmacéutica & Life Sciences', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1100&q=85'],
  ['05', 'Consumo, Alimentos & Bebidas', 'https://images.unsplash.com/photo-1556767576-cfba4d8f2f1f?auto=format&fit=crop&w=1100&q=85'],
  ['06', 'Infraestructura & Operaciones Críticas', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1100&q=85'],
];

const partners = ['CAI NIAO', 'META GROUP', 'COGNEX', 'ZEBRA', 'Hanwha Vision', 'SAP', 'Honeywell', 'Lightera'];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setSlide((value) => (value + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  async function submit(event) {
    event.preventDefault();
    setBusy(true); setError(''); setSent(false);
    try {
      const data = Object.fromEntries(new FormData(event.currentTarget));
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || 'No fue posible enviar el mensaje');
      }
      setSent(true); event.currentTarget.reset();
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  const closeMenu = () => setMenuOpen(false);
  const navItems = [['Retos Logísticos','#retos'],['Capacidades','#capacidades'],['Cómo Trabajamos','#metodologia'],['Experiencia y Resultados','#industria'],['Nosotros','#nosotros'],['Contacto','#contacto']];

  return (
    <main>
      <header className={menuOpen ? 'menuOpen' : ''}>
        <a className="logo" href="#inicio" onClick={closeMenu}>INNOV<span>SUPPLY CHAIN SOLUTIONS</span></a>
        <button className="menuButton" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}><i></i><i></i><i></i></button>
        <nav>{navItems.map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}</a>)}</nav>
        <a className="navCta" href="#contacto" onClick={closeMenu}>HABLEMOS</a>
      </header>

      <section id="inicio" className="hero">
        <div className="heroBg" style={{ backgroundImage: `linear-gradient(90deg,rgba(35,10,61,.97),rgba(35,10,61,.58),rgba(35,10,61,.16)),url(${slides[slide]})` }} />
        <div className="heroText">
          <p className="eyebrow">SUPPLY CHAIN SOLUTIONS</p>
          <h1>Transformamos la operación de tu almacén en ventaja competitiva.</h1>
          <p>Soluciones integrales de WMS, automatización e integración tecnológica para lograr operaciones más eficientes, visibles y rentables.</p>
          <div className="actions"><a href="#capacidades" className="primary">CONOCE NUESTRAS SOLUCIONES</a><a href="#contacto" className="secondary">HABLEMOS DE TU PROYECTO</a></div>
        </div>
        <div className="heroStats"><span><strong>16+</strong><small>AÑOS DE EXPERIENCIA</small></span><span><strong>360°</strong><small>VISIÓN DE LA OPERACIÓN</small></span><span><strong>1</strong><small>RETO · UNA SOLUCIÓN</small></span></div>
        <div className="dots">{slides.map((_, index) => <button key={index} type="button" aria-label={`Imagen ${index + 1}`} className={index === slide ? 'active' : ''} onClick={() => setSlide(index)} />)}</div>
      </section>

      <section id="retos" className="intro sectionReveal">
        <div className="sectionKicker"><span>01</span><p className="eyebrow purple">LOS RETOS</p></div>
        <h2>Los grandes retos que frenan el desempeño de una operación logística.</h2>
        <p>Antes de implementar tecnología, identificamos las restricciones que realmente afectan tu operación y construimos soluciones orientadas a resultados medibles.</p>
        <div className="cards">{challenges.map(([number, title, text]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{text}</p><span className="cardArrow">↗</span></article>)}</div>
      </section>

      <section id="capacidades" className="dark sectionReveal">
        <div className="split"><div><div className="sectionKicker"><span>02</span><p className="eyebrow">CAPACIDADES</p></div><h2>Capacidades que combinamos para resolver el reto completo.</h2></div><p>Integramos tecnología, procesos y conocimiento operativo para construir soluciones que no dependen de una sola marca ni de una sola capa tecnológica.</p></div>
        <div className="capGrid">{capabilities.map(([number, title, text]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{text}</p><span className="cardArrow">↗</span></article>)}</div>
      </section>

      <section id="metodologia" className="method sectionReveal">
        <div className="sectionKicker"><span>03</span><p className="eyebrow purple">CÓMO TRABAJAMOS</p></div>
        <h2>Del objetivo de negocio a una solución implementada y medible.</h2>
        <div className="steps">{steps.map(([number, title]) => <article key={number}><b>{number}</b><h3>{title}</h3><span>→</span></article>)}</div>
        <a className="textLink" href="#contacto">Conocer nuestra metodología completa →</a>
      </section>

      <section id="industria" className="industry sectionReveal">
        <div className="sectionKicker"><span>04</span><p className="eyebrow purple">EXPERIENCIA Y RESULTADOS</p></div>
        <h2>Indicadores que reflejan el impacto de la transformación logística en cada industria.</h2>
        <p>Cada sector enfrenta restricciones diferentes. Nuestra experiencia nos permite enfocar la transformación en los indicadores operativos y económicos que tienen mayor relevancia para cada tipo de operación.</p>
        <div className="industryGrid">{industries.map(([number, title, image]) => <article key={number}><div className="industryImage"><img src={image} alt="" loading="lazy"/><span>{number}</span></div><div><b>{number}</b><h3>{title}</h3><span>Explorar industria →</span></div></article>)}</div>
      </section>

      <section id="nosotros" className="about sectionReveal">
        <div className="aboutIntro"><div><div className="sectionKicker"><span>05</span><p className="eyebrow">NOSOTROS</p></div><h2>¿Quién es InnOv?</h2></div><p>Ayudamos a las compañías a construir operaciones más eficientes, escalables y preparadas para crecer de forma sostenible. Contamos con más de 16 años de experiencia integrando soluciones tecnológicas de alto impacto en México.</p></div>
        <div className="aboutGrid">{[
          ['01','Valor antes que tecnología','Partimos del resultado que el negocio necesita y después definimos la tecnología.'],
          ['02','Independencia tecnológica','Evaluamos alternativas con una visión integral para elegir lo que mejor resuelve el reto.'],
          ['03','Evolución sin ruptura','Diseñamos arquitecturas que permiten transformar la operación sin detenerla.'],
          ['04','Viabilidad económica','Validamos el caso financiero para que la transformación tenga sentido operativo y económico.'],
        ].map(([number,title,text]) => <article key={number}><b>{number}</b><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="ecosystem sectionReveal">
        <div className="sectionKicker"><span>06</span><p className="eyebrow purple">ECOSISTEMA TECNOLÓGICO</p></div>
        <h2>Tecnología líder al servicio de la solución.</h2>
        <p>Trabajamos con un ecosistema de fabricantes y plataformas líderes para construir la arquitectura adecuada para cada proyecto.</p>
        <div className="partnerGrid">{partners.map((partner) => <div key={partner}>{partner}</div>)}</div>
      </section>

      <section id="contacto" className="contact sectionReveal">
        <div><div className="sectionKicker"><span>07</span><p className="eyebrow purple">CONTACTO</p></div><h2>Cuéntenos su reto. Diseñemos juntos la solución que lo hace posible.</h2><p>No necesita comenzar definiendo la tecnología. Comience por decirnos qué necesita lograr.</p><div className="contactNote"><strong>InnOv · Supply Chain Solutions</strong><span>Transformación logística con visión de negocio.</span></div></div>
        <form onSubmit={submit}><input name="name" placeholder="Nombre *" required/><input name="company" placeholder="Empresa"/><input name="email" type="email" placeholder="Correo electrónico *" required/><input name="phone" placeholder="Teléfono"/><textarea name="message" placeholder="Cuéntenos sobre su proyecto *" rows="5" required/><input name="website" className="hp" tabIndex="-1" autoComplete="off"/><button disabled={busy}>{busy ? 'ENVIANDO...' : 'ENVIAR PROYECTO →'}</button>{sent && <small>Mensaje enviado correctamente.</small>}{error && <small className="formError">{error}</small>}</form>
      </section>

      <footer><div className="logo">INNOV<span>SUPPLY CHAIN SOLUTIONS</span></div><p>© 2026 Innov. Todos los derechos reservados. · <a href="/admin">Administración</a></p></footer>
    </main>
  );
}
