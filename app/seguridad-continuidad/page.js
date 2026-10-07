import Link from 'next/link';
import './seguridad-continuidad.css';

const problems=[
  ['01','Incendios en infraestructura automatizada','Conveyors, equipos automatizados, instalaciones eléctricas y zonas de acceso limitado pueden dificultar una respuesta manual rápida.'],
  ['02','Riesgo de reignición','Apagar la llama no necesariamente elimina las condiciones que pueden provocar nuevamente la combustión; la protección debe contemplar extinción, enfriamiento y protección posterior.'],
  ['03','Diferentes riesgos en una misma instalación','Un CEDIS concentra mercancías, empaques, combustibles, instalaciones eléctricas y equipos con diferentes perfiles de riesgo.'],
  ['04','Contaminación y daño colateral','En alimentos, bebidas y productos sensibles, la forma de extinguir también puede ser determinante para limitar la afectación de mercancía y áreas adyacentes.'],
  ['05','Tiempo excesivo de respuesta','La dependencia de intervención humana puede ampliar el tiempo entre detección, intervención y control.'],
  ['06','Alto costo de ciclo de vida','Recargas, mantenimiento, pruebas y remediación generan costos recurrentes que deben evaluarse como costo total de propiedad.']
];

const solution=[
  ['01','Protección fija','Sistemas integrados para proteger zonas y activos críticos dentro de la instalación.'],
  ['02','Protección portátil y móvil','Alternativas para responder a diferentes puntos y condiciones operativas.'],
  ['03','Protección autónoma','Equipos diseñados para reducir la dependencia de la intervención humana y operar aun ante una contingencia de energía.'],
  ['04','Actuación localizada','Protección orientada a puntos críticos y zonas de difícil acceso dentro de la infraestructura automatizada.'],
  ['05','Múltiples clases de fuego','La solución documentada contempla un mismo agente para clases A, B, C, D y K.'],
  ['06','Menor impacto posterior','El enfoque busca reducir contaminación, daños secundarios, riesgo de reignición y necesidades de remediación.']
];

const design=[
  ['PREVENIR','La protección debe formar parte integral del diseño intralogístico y evolucionar junto con la automatización.'],
  ['DETECTAR','Identificar tempranamente una condición de incendio en los puntos donde una intervención manual sería más compleja.'],
  ['RESPONDER','Actuar sobre el punto crítico con mecanismos localizados y, cuando la solución lo contempla, sin intervención humana.'],
  ['CONTENER','Reducir daño a personas, inventario, infraestructura, conveyors, sorters, instalaciones eléctricas y equipos.'],
  ['RECUPERAR','Favorecer una recuperación más rápida de la operación y limitar las consecuencias de la contingencia.']
];

export default function SeguridadContinuidad(){
  return <main className="scPage">
    <header className="scHeader">
      <Link className="scLogo" href="/">Inn<i className="logoO">O</i>v<span>SUPPLY CHAIN SOLUTIONS</span></Link>
      <nav><Link href="/#retos">Retos Logísticos</Link><Link href="/#capacidades">Capacidades</Link><Link href="/#metodologia">Cómo Trabajamos</Link><Link href="/#industria">Experiencia y Resultados</Link><Link href="/#nosotros">Nosotros</Link></nav>
      <Link className="scCta" href="/#contacto">Contacto</Link>
    </header>

    <section className="scHero">
      <div className="scHeroCopy">
        <p className="scEyebrow">SEGURIDAD Y CONTINUIDAD OPERATIVA</p>
        <h1>Proteger el almacén también es proteger la capacidad de seguir operando.</h1>
        <p>Diseñamos estrategias de prevención y combate de incendios para instalaciones logísticas, industriales y cada vez más automatizadas, buscando reducir el impacto de una contingencia sobre personas, mercancías, infraestructura y activos tecnológicos.</p>
        <div className="scActions"><Link href="/#contacto" className="scPrimary">Cuéntenos su reto →</Link><Link href="/#capacidades" className="scSecondary">Volver a capacidades</Link></div>
      </div>
      <div className="scHeroVisual">
        <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=90" alt="Infraestructura industrial"/>
        <div><span>PREVENCIÓN · DETECCIÓN · RESPUESTA</span><strong>La protección evoluciona junto con la automatización.</strong></div>
      </div>
    </section>

    <section className="scSection scRole">
      <div className="scKicker"><span>01</span><p>ROL DENTRO DE LA OPERACIÓN</p></div>
      <div className="scTwoCol"><div><h2>La seguridad no termina en evitar el incendio. También debe preservar la continuidad.</h2></div><div><p>La Seguridad y Continuidad Operativa protege personas, inventario, infraestructura y activos tecnológicos que sostienen la operación del almacén, buscando prevenir que un incidente se convierta en una interrupción significativa del negocio y reducir sus consecuencias.</p><p>Con mayor automatización aumentan la densidad de inventario, la infraestructura eléctrica y la cantidad de equipos críticos; por eso la protección contra incendios debe formar parte integral del diseño intralogístico.</p></div></div>
      <div className="scStatement">Un incendio puede afectar mercancía e infraestructura, pero también conveyors, sorters, instalaciones eléctricas y equipos móviles, comprometiendo directamente la capacidad de operación.</div>
    </section>

    <section className="scSection scProblems">
      <div className="scKicker"><span>02</span><p>PROBLEMÁTICAS QUE RESOLVEMOS</p></div>
      <h2>Diseñamos la protección considerando no sólo el fuego, sino sus consecuencias sobre la operación.</h2>
      <div className="scCardGrid">{problems.map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}</div>
    </section>

    <section className="scValue">
      <div className="scValueInner">
        <div>
          <div className="scKicker light"><span>03</span><p>PROPUESTA DE VALOR</p></div>
          <h2>Una estrategia de protección más versátil, autónoma y alineada con el riesgo operacional.</h2>
        </div>
        <p>Nuestra propuesta busca proteger la capacidad del almacén para seguir funcionando ante un incidente, combinando prevención, detección y respuesta. La solución puede incorporar sistemas fijos, portátiles, móviles y autónomos para proteger zonas y activos críticos y reducir la dependencia de la intervención humana.</p>
      </div>
      <div className="scQuote">No basta con extinguir el incendio; también importa cómo se extingue y qué consecuencias deja sobre el producto, los equipos y el ambiente operativo.</div>
    </section>

    <section className="scSection scSolution">
      <div className="scKicker"><span>04</span><p>CARACTERÍSTICAS DE LA SOLUCIÓN</p></div>
      <h2>Protección diseñada alrededor de la operación y de los activos que no pueden detenerse.</h2>
      <div className="scSolutionGrid">{solution.map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p><span>Conocer enfoque →</span></article>)}</div>
    </section>

    <section className="scDark">
      <div className="scSection scDesign">
        <div className="scKicker light"><span>05</span><p>ESTRATEGIA DE PROTECCIÓN</p></div>
        <h2>Prevenir, detectar, responder, contener y recuperar.</h2>
        <div className="scDesignFlow">{design.map(([t,d],i)=><article key={t}><span>0{i+1}</span><strong>{t}</strong><p>{d}</p>{i<design.length-1&&<i>→</i>}</article>)}</div>
      </div>
    </section>

    <section className="scSection scContinuity">
      <div className="scKicker"><span>06</span><p>CONTINUIDAD OPERATIVA</p></div>
      <div className="scTwoCol"><div><h2>El objetivo final es preservar la operación y acelerar la recuperación.</h2></div><div><p>El valor debe evaluarse por su contribución a preservar personas y activos, contener pérdidas de inventario e infraestructura, reducir daños colaterales y acelerar la recuperación.</p><p>Las consecuencias documentadas de un incendio pueden incluir paro total o parcial del CEDIS, incumplimiento de entregas, penalizaciones, pérdida de clientes y reprogramación logística.</p></div></div>
      <div className="scContinuityGrid"><article><b>PERSONAS</b><span>Protección prioritaria de quienes operan y mantienen la instalación.</span></article><article><b>INVENTARIO</b><span>Contención de pérdidas y reducción de afectación sobre mercancías.</span></article><article><b>INFRAESTRUCTURA</b><span>Protección de equipos, instalaciones eléctricas y automatización crítica.</span></article><article><b>RECUPERACIÓN</b><span>Menor impacto colateral y una recuperación operativa más rápida.</span></article></div>
    </section>

    <section className="scSection scEvidence">
      <div className="scKicker"><span>07</span><p>CRITERIOS DE EVALUACIÓN</p></div>
      <h2>Evaluamos la protección por su desempeño y por el costo total de proteger la operación.</h2>
      <div className="scEvidenceGrid">
        <article><b>TIPO DE RIESGO</b><p>Mercancías, empaques, combustibles, instalaciones eléctricas y equipos presentes en el CEDIS.</p></article>
        <article><b>VELOCIDAD DE RESPUESTA</b><p>Tiempo entre detección, intervención y control, especialmente en puntos de difícil acceso.</p></article>
        <article><b>REIGNICIÓN</b><p>Capacidad de enfriar y reducir las condiciones que pueden provocar nuevamente la combustión.</p></article>
        <article><b>IMPACTO POSTERIOR</b><p>Contaminación, residuos, daño colateral y remediación sobre producto, equipos y ambiente operativo.</p></article>
        <article><b>COSTO DE CICLO DE VIDA</b><p>Inversión, mantenimiento, recargas, pruebas y demás costos recurrentes documentados para la solución.</p></article>
        <article><b>AUTONOMÍA</b><p>Posibilidad de actuar sin alimentación eléctrica y, en determinados equipos, sin intervención humana.</p></article>
      </div>
    </section>

    <section className="scFinal">
      <div>
        <p>SEGURIDAD Y CONTINUIDAD OPERATIVA · INNOV</p>
        <h2>Protejamos la infraestructura que hace posible que su operación siga funcionando.</h2>
        <Link href="/#contacto">Hablemos de su operación →</Link>
      </div>
    </section>
  </main>
}
