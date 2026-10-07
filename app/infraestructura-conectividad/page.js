import Link from 'next/link';
import './infraestructura-conectividad.css';

const problems=[
  ['01','Conectividad insuficiente o inestable','La operación depende de comunicaciones consistentes para WMS, automatización, movilidad, IoT y sistemas críticos.'],
  ['02','Cobertura desigual','Zonas de almacén, patios, racks y áreas industriales pueden presentar diferencias de cobertura, capacidad o interferencia.'],
  ['03','Arquitecturas que no escalan','Una red diseñada para la necesidad actual puede convertirse en una restricción cuando aumentan equipos, datos y automatización.'],
  ['04','Infraestructura dispersa','Servidores, edge, IoT, Wi-Fi y comunicaciones pueden crecer de forma independiente sin una arquitectura común.'],
  ['05','Puntos únicos de falla','La dependencia de un componente o enlace crítico puede comprometer la disponibilidad de la operación.'],
  ['06','Difícil visibilidad de la infraestructura','Cuando la red y los equipos no están monitorizados, diagnosticar degradación y anticipar problemas se vuelve más lento.']
];

const capabilities=[
  ['01','Redes empresariales e industriales','Diseñamos redes para soportar sistemas de gestión, automatización, movilidad, IoT y comunicaciones críticas.'],
  ['02','Wi-Fi industrial','Planeamos cobertura, capacidad, roaming y desempeño para zonas de operación donde movilidad y continuidad son esenciales.'],
  ['03','Conectividad para automatización','Integramos comunicaciones necesarias para conveyors, AS/RS, AMR, AGV, sorters, sensores y control.'],
  ['04','IoT y edge','Conectamos dispositivos y procesamiento cercano al punto donde se generan los datos para responder con menor dependencia de plataformas centrales.'],
  ['05','Servidores y plataformas','Dimensionamos infraestructura de cómputo y servicios que soportan aplicaciones, analítica, integración y operación.'],
  ['06','Alta disponibilidad','Diseñamos redundancia y continuidad para componentes cuya falla puede afectar procesos críticos.'],
  ['07','Monitoreo e infraestructura visible','Convertimos el comportamiento de red, enlaces y equipos en información útil para operación y soporte.'],
  ['08','Ciberseguridad de la infraestructura','Consideramos segmentación, controles de acceso y arquitectura segura para proteger la conectividad y los sistemas operacionales.']
];

const layers=[
  ['01','CONECTIVIDAD FÍSICA','Cableado, fibra, switching, enlaces y energía que soportan la infraestructura.'],
  ['02','ACCESO Y MOVILIDAD','Wi-Fi, movilidad, dispositivos y cobertura en los puntos donde trabaja la operación.'],
  ['03','CONTROL Y AUTOMATIZACIÓN','Conectividad de equipos, sensores, PLC, robots y sistemas de control.'],
  ['04','DATOS Y EDGE','Procesamiento, servidores, almacenamiento e IoT cerca de los procesos.'],
  ['05','SISTEMAS DE NEGOCIO','WMS, ERP, analítica, integración y plataformas que usan la información.']
];

const metrics=[
  ['DISPONIBILIDAD','Disponibilidad de red · enlaces · servicios · componentes críticos'],
  ['COBERTURA','Cobertura Wi-Fi · calidad de señal · capacidad · roaming'],
  ['CAPACIDAD','Throughput · utilización de enlaces · latencia · pérdida de paquetes'],
  ['RESILIENCIA','Redundancia · failover · tiempo de recuperación · puntos únicos de falla'],
  ['SEGURIDAD','Segmentación · controles · accesos · eventos de infraestructura'],
  ['OPERACIÓN','Incidencias · tiempos de atención · tendencias · capacidad futura']
];

export default function InfraestructuraConectividad(){
  return <main className="icPage">
    <header className="icHeader">
      <Link className="icLogo" href="/">Inn<i className="logoO">O</i>v<span>SUPPLY CHAIN SOLUTIONS</span></Link>
      <nav><Link href="/#retos">Retos Logísticos</Link><Link href="/#capacidades">Capacidades</Link><Link href="/#metodologia">Cómo Trabajamos</Link><Link href="/#industria">Experiencia y Resultados</Link><Link href="/#nosotros">Nosotros</Link></nav>
      <Link className="icCta" href="/#contacto">Contacto</Link>
    </header>

    <section className="icHero">
      <div className="icHeroCopy">
        <p className="icEyebrow">INFRAESTRUCTURA Y CONECTIVIDAD</p>
        <h1>La operación conectada necesita una infraestructura robusta, segura y escalable.</h1>
        <p>Diseñamos redes, Wi-Fi industrial, IoT, servidores y edge para que los sistemas que sostienen la operación puedan comunicarse y crecer con ella.</p>
        <div className="icActions"><Link href="/#contacto" className="icPrimary">Cuéntenos su reto →</Link><Link href="/#capacidades" className="icSecondary">Volver a capacidades</Link></div>
      </div>
      <div className="icHeroVisual"><img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=90" alt="Infraestructura y conectividad"/><div><span>REDES · WI-FI · IoT · EDGE</span><strong>Infraestructura que acompaña la evolución de la operación.</strong></div></div>
    </section>

    <section className="icSection">
      <div className="icKicker"><span>01</span><p>ROL DENTRO DE LA OPERACIÓN</p></div>
      <div className="icTwoCol"><div><h2>La infraestructura es la capa que mantiene comunicada la operación.</h2></div><div><p>WMS, automatización, movilidad, analítica, IoT y otras plataformas dependen de comunicaciones y recursos de cómputo disponibles cuando la operación los necesita.</p><p>Por eso diseñamos conectividad e infraestructura como parte de la arquitectura completa, considerando desempeño, disponibilidad, seguridad y capacidad futura.</p></div></div>
      <div className="icStatement">Una operación crítica necesita que la infraestructura no sea una restricción silenciosa para crecer, automatizar o responder en tiempo real.</div>
    </section>

    <section className="icSection icProblems">
      <div className="icKicker"><span>02</span><p>PROBLEMÁTICAS QUE RESOLVEMOS</p></div>
      <h2>Construimos una base tecnológica capaz de sostener la operación de hoy y la que viene.</h2>
      <div className="icCardGrid">{problems.map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}</div>
    </section>

    <section className="icValue">
      <div className="icValueInner"><div><div className="icKicker light"><span>03</span><p>PROPUESTA DE VALOR</p></div><h2>Diseñamos la infraestructura alrededor del proceso y sus requerimientos.</h2></div><p>Partimos de los sistemas, equipos, flujos y condiciones de la operación para dimensionar conectividad, procesamiento y plataformas. La arquitectura busca equilibrar desempeño, continuidad, seguridad y capacidad de evolución.</p></div>
      <div className="icTags"><span>ROBUSTA</span><span>SEGURA</span><span>ESCALABLE</span><span>VISIBLE</span><span>PREPARADA PARA CRECER</span></div>
    </section>

    <section className="icSection">
      <div className="icKicker"><span>04</span><p>CAPACIDADES</p></div>
      <h2>Una arquitectura de infraestructura que soporta todas las capas de la operación.</h2>
      <div className="icCapabilityGrid">{capabilities.map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p><span>Explorar capacidad →</span></article>)}</div>
    </section>

    <section className="icSection icLayers">
      <div className="icKicker"><span>05</span><p>ARQUITECTURA DE CONECTIVIDAD</p></div>
      <h2>De la conectividad física a los sistemas que gobiernan el negocio.</h2>
      <div className="icLayerGrid">{layers.map(([n,t,d])=><article key={n}><span>{n}</span><strong>{t}</strong><p>{d}</p></article>)}</div>
    </section>

    <section className="icSection icIntegration">
      <div className="icKicker"><span>06</span><p>INTEGRACIÓN Y CONTINUIDAD</p></div>
      <div className="icTwoCol"><div><h2>Una infraestructura bien diseñada también reduce el riesgo operacional.</h2></div><div><p>La arquitectura considera disponibilidad, redundancia, segmentación, monitoreo y capacidad de recuperación para evitar que una falla de conectividad se convierta en una interrupción mayor.</p><p>El objetivo es que la infraestructura permanezca invisible cuando funciona y sea rápidamente diagnosticable cuando algo cambia.</p></div></div>
      <div className="icFlow"><div>USUARIOS Y DISPOSITIVOS</div><span>↓</span><div className="active">RED · WI-FI · SEGMENTACIÓN</div><span>↓</span><div>EDGE · SERVIDORES · IoT</div><span>↓</span><div>WMS · ERP · ANALÍTICA · AUTOMATIZACIÓN</div></div>
    </section>

    <section className="icMetrics">
      <div className="icSection"><div className="icKicker light"><span>07</span><p>BENEFICIOS E INDICADORES</p></div><h2>La infraestructura debe poder medirse y sostenerse.</h2><div className="icMetricsGrid">{metrics.map(([t,d])=><article key={t}><b>{t}</b><p>{d}</p></article>)}</div></div>
    </section>

    <section className="icSection icFinalSection">
      <div className="icKicker"><span>08</span><p>EVOLUCIÓN</p></div>
      <h2>Construimos una plataforma tecnológica preparada para acompañar la siguiente etapa de la operación.</h2>
      <p className="icLead">La infraestructura no se diseña únicamente para el volumen actual. Se considera la evolución de usuarios, dispositivos, automatización, datos y nuevas capacidades que la operación pueda incorporar.</p>
    </section>

    <section className="icFinal"><div><p>INFRAESTRUCTURA Y CONECTIVIDAD · INNOV</p><h2>Conectemos la tecnología que necesita para que la operación pueda avanzar.</h2><Link href="/#contacto">Hablemos de su operación →</Link></div></section>
  </main>
}
