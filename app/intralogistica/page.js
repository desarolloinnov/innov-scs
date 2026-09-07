import Link from 'next/link';
import './intralogistica.css';

const technologies = [
  ['01','Almacenamiento y densificación','AS/RS · MINILOAD · SHUTTLE SYSTEMS · HIGH-DENSITY STORAGE','Aumentamos la utilización del espacio y la capacidad de almacenamiento mediante soluciones compactas y automatizadas que reducen desplazamientos y permiten aprovechar mejor la superficie y altura disponible.','Impacta: densidad · capacidad · productividad · utilización de espacio.','https://images.unsplash.com/photo-1586528116493-da8c8f8b9a3f?auto=format&fit=crop&w=1200&q=88'],
  ['02','Movimiento y transporte interno','AMR · AGV · CONVEYORS · AUTONOMOUS FORKLIFTS','Automatizamos movimientos repetitivos entre recepción, almacenamiento, producción, picking, consolidación y despacho reduciendo traslados improductivos y dependencia del movimiento manual.','Impacta: productividad · tiempos de movimiento · utilización de recursos · seguridad.','https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=88'],
  ['03','Preparación y surtido','GOODS-TO-PERSON · PICK/P UTT-TO-LIGHT · ROBOTIC PICKING · AMR-ASSISTED PICKING','Llevamos el producto al operador —o automatizamos directamente parte del proceso— para reducir recorridos, acelerar el surtido y elevar simultáneamente productividad y precisión.','Impacta: líneas/hora · pedidos/hora · exactitud · tiempo de ciclo · costo por pedido.','https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=88'],
  ['04','Clasificación y distribución','SORTERS · CROSS-BELT · CONVEYORS · ROBOTIC SORTING','Automatizamos la clasificación de productos, pedidos o paquetes con destinos para soportar mayores volúmenes, múltiples rutas y operaciones multicanal con mayor velocidad y precisión.','Impacta: throughput · capacidad · precisión · tiempo de procesamiento.','https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=88']
];

const process = [
  ['01','Entender','Objetivos, operación y datos'],
  ['02','Diagnosticar','Restricciones y oportunidades'],
  ['03','Diseñar','Alternativas y dimensionamiento'],
  ['04','Simular','Capacidad y desempeño esperado'],
  ['05','Validar','ROI y caso financiero'],
  ['06','Implementar','Integración, puesta en marcha y evolución']
];

export default function Intralogistica(){
  return <main className="intralogisticaPage">
    <header className="intraHeader">
      <Link className="intraLogo" href="/">INNOV<span>SUPPLY CHAIN SOLUTIONS</span></Link>
      <nav><Link href="/#retos">Retos Logísticos</Link><Link href="/#capacidades">Capacidades</Link><Link href="/#metodologia">Cómo Trabajamos</Link><Link href="/#industria">Experiencia y Resultados</Link><Link href="/#nosotros">Nosotros</Link></nav>
      <Link className="intraCta" href="/#contacto">Contacto</Link>
    </header>

    <section className="intraHero">
      <div className="intraHeroCopy">
        <p className="intraEyebrow">AUTOMATIZACIÓN INTRALOGÍSTICA</p>
        <h1>Más capacidad, productividad y control para hacer crecer su operación.</h1>
        <p className="intraLead">Diseñamos e integramos soluciones de automatización intralogística a partir de los objetivos, restricciones y características reales de cada operación. Combinamos tecnologías de almacenamiento, movimiento, surtido y clasificación para incrementar capacidad y productividad, reducir errores y construir operaciones más escalables y eficientes.</p>
        <div className="intraActions"><Link href="/#contacto" className="intraPrimary">Cuéntenos su reto →</Link><Link href="/#metodologia" className="intraSecondary">Conozca cómo trabajamos</Link></div>
      </div>
      <div className="intraHeroVisual"><img src="https://images.unsplash.com/photo-1749244768351-2726dc23d26c?auto=format&fit=crop&w=1800&q=90" alt="Operación intralogística"/><span>FLUJO · AUTOMATIZACIÓN · PRODUCTIVIDAD</span></div>
    </section>

    <section className="wixSection wixProcess">
      <p className="wixEyebrow">01 · DEL RETO A LA SOLUCIÓN</p>
      <h2>Automatizar empieza por entender qué está limitando a la operación.</h2>
      <p className="wixLead">Partimos de los objetivos del negocio, los flujos, volúmenes, perfiles de pedido, inventario, restricciones físicas y niveles de servicio. Identificamos qué está limitando el desempeño, diseñamos alternativas y validamos su capacidad y viabilidad económica antes de implementar. Así, la automatización responde a la operación y no al revés.</p>
      <div className="processRow">{process.map(([n,t,d],i)=><div className={'processItem '+(i===3||i===4?'isActive':'')} key={n}><span>{n}</span><strong>{t}</strong><small>{d}</small>{i<process.length-1&&<i>→</i>}</div>)}</div>
      <div className="processNote"><strong>No partimos de una tecnología.</strong><span>Primero demostramos qué solución puede producir el resultado esperado y si la inversión tiene sentido.</span></div>
    </section>

    <section className="wixSection wixTech">
      <p className="wixEyebrow">02 · CAPACIDADES DE AUTOMATIZACIÓN</p>
      <h2>Combinamos tecnologías para transformar el flujo físico completo.</h2>
      <p className="wixLead">La solución puede integrar diferentes tecnologías y niveles de automatización. El objetivo es seleccionar la combinación que resuelva las restricciones de la operación con el mejor balance entre capacidad, productividad, flexibilidad y retorno.</p>
      <div className="wixTechGrid">{technologies.map(([n,t,tag,d,impact,img])=><article key={n} className="wixTechCard"><img src={img} alt={t}/><div className="wixTechBody"><h3>{t}</h3><b>{tag}</b><p>{d}</p><hr/><small>{impact}</small></div></article>)}</div>
    </section>

    <section className="wixSection wixLevels">
      <p className="wixEyebrow">03 · NIVEL DE AUTOMATIZACIÓN</p>
      <h2>El objetivo no es alcanzar la máxima automatización. Es encontrar la automatización correcta.</h2>
      <p className="wixLead">Evaluamos qué procesos conviene mantener manuales, cuáles deben ser asistidos y cuáles justifican una automatización parcial o completa. La solución puede evolucionar conforme cambian los volúmenes, la complejidad y las necesidades del negocio, evitando sobredimensionamiento y protegiendo la inversión.</p>
      <div className="levels"><span>Manual</span><span>Asistido</span><span>Semiautomatizado</span><span>Automatizado</span><span>Autónomo</span></div>
    </section>

    <section className="wixSection wixIntegration">
      <p className="wixEyebrow">04 · INTEGRACIÓN Y ORQUESTACIÓN</p>
      <h2>La automatización genera valor cuando funciona como un solo sistema.</h2>
      <p className="wixLead">Integramos la automatización con los sistemas de gestión y control de la operación para coordinar inventario, tareas, recursos y equipos en tiempo real, incluso cuando la arquitectura incorpora tecnologías de distintos fabricantes.</p>
      <div className="integrationFlow"><div>ERP / OMS</div><i>↓</i><div>WMS</div><i>↓</i><div>WCS / Orquestación</div><i>↓</i><div>AS/RS · AMR · AGV · Conveyors · Sorters · Robots</div><i>↓</i><div>Operación física</div></div>
    </section>

    <section className="wixSection wixCases">
      <p className="wixEyebrow">05 · EXPERIENCIA Y RESULTADOS</p>
      <h2>Casos que demuestran el impacto de automatizar con propósito.</h2>
      <p className="wixLead">Mostramos únicamente resultados respaldados por los casos disponibles, diferenciando experiencia directa de InnOv y evidencia de nuestro ecosistema tecnológico.</p>
      <div className="caseGrid"><article><b>FARMACÉUTICA</b><h3>Automatización integral de intralogística</h3><p>Integración de automatización, control y sistemas de gestión para transformar el flujo físico de una operación regulada.</p><a href="#contacto">Ver caso completo →</a></article><article><b>E-COMMERCE / FULFILLMENT</b><h3>Mayor capacidad para procesamiento de pedidos</h3><p>Automatización orientada a incrementar velocidad, precisión y capacidad de surtido en operaciones de alto volumen.</p><a href="#contacto">Ver caso completo →</a></article><article><b>DISTRIBUCIÓN</b><h3>Clasificación automatizada multicanal</h3><p>Sorting y orquestación para soportar múltiples destinos y mayores volúmenes con menor intervención manual.</p><a href="#contacto">Ver caso completo →</a></article></div>
    </section>
  </main>
}
