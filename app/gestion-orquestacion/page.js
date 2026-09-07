import Link from 'next/link';
import './gestion-orquestacion.css';

const challenges = [
  ['01','Inventario poco confiable','Diferencias físico-sistema, trazabilidad incompleta y dificultad para conocer ubicación, lote, serie, estado o caducidad.'],
  ['02','Capacidad mal aprovechada','Ubicaciones utilizadas sin criterios homogéneos, saturación de zonas y movimientos posteriores innecesarios.'],
  ['03','Procesos desincronizados','Picking esperando reabasto, packing saturado, mercancía acumulada y pedidos listos sin coordinación con expedición.'],
  ['04','Decisiones demasiado manuales','Supervisores asignando tareas, prioridades, ubicaciones y excepciones con hojas de cálculo o comunicación informal.'],
  ['05','Fulfillment cada vez más complejo','B2B, retail y e-commerce comparten infraestructura, pero requieren prioridades, perfiles y niveles de servicio distintos.'],
  ['06','Tecnologías desconectadas','ERP, WMS, dispositivos y automatización operan como islas y dificultan mantener sincronizada la ejecución.']
];

const flow = [
  ['01','↧','Recibir','Recepción, validación, identificación y creación de unidades logísticas.'],
  ['02','▦','Ubicar','Put-away dirigido y administración inteligente de ubicaciones.'],
  ['03','◎','Gestionar','Inventario por ubicación, SKU, lote, serie, estado y caducidad.'],
  ['04','↻','Reabastecer','Reposición priorizada de reserva hacia posiciones de picking.'],
  ['05','✓','Preparar','Waves, batches, misiones y diferentes estrategias de picking.'],
  ['06','▣','Consolidar','Packing, pesaje, etiquetado y creación de unidades de embarque.'],
  ['07','⇧','Despachar','Staging, andenes, control de carga y confirmación de salida.'],
  ['08','↩','Devolver','Logística inversa, clasificación y reincorporación o cuarentena.']
];

const wmsCards = [
  ['GESTIÓN','WMS','Inventario, ubicaciones, reglas, prioridades, procesos, trazabilidad y carga de trabajo.'],
  ['ORQUESTACIÓN Y CONTROL','WCS','Sincronización y ejecución sobre equipos, subsistemas y tecnologías de automatización.'],
  ['EJECUCIÓN FÍSICA','Personas · RF · Voice · PTL · AS/RS · Conveyors · Sorters · AGV/AMR · Robots','Las decisiones digitales se convierten en movimientos, tareas y eventos físicos.']
];

const evolution = [
  ['01','CONSERVAR','Lo que sigue aportando valor.'],
  ['02','INTEGRAR','Lo que debe conectarse.'],
  ['03','COMPLEMENTAR','Lo que requiere nuevas capacidades.'],
  ['04','EVOLUCIONAR','Lo que puede crecer por etapas.'],
  ['05','SUSTITUIR','Solo cuando existe justificación.']
];

const implementation = [
  ['01','Entender','Procesos, flujos, volúmenes, inventarios, perfiles de pedido, sistemas y restricciones.'],
  ['02','Diseñar','Modelo operativo, reglas, zonas, estrategias de picking, interfaces y arquitectura WMS/WCS.'],
  ['03','Dimensionar','Cómputo, almacenamiento, base de datos, comunicaciones, disponibilidad y continuidad.'],
  ['04','Configurar e integrar','Procesos, parámetros, usuarios, dispositivos, sistemas empresariales y automatización.'],
  ['05','Validar y arrancar','Pruebas funcionales, integrales y operativas, capacitación y Go-Live.'],
  ['06','Soportar y evolucionar','Estabilización, ajustes, soporte y nuevas capacidades conforme cambia la operación.']
];

const impact = [
  ['INVENTARIO','Confiabilidad y trazabilidad','Exactitud · localización · rotación · lotes · series · caducidades.'],
  ['PRODUCTIVIDAD','Más trabajo con los mismos recursos','Líneas/hora · pedidos/hora · productividad por operador.'],
  ['VELOCIDAD','Menores tiempos de ciclo','Dock-to-stock · picking · packing · staging · carga.'],
  ['CAPACIDAD','Mejor uso del almacén','Ocupación · utilización de posiciones · throughput · saturación.'],
  ['SERVICIO','Mayor cumplimiento','Pedidos completos · exactitud · despachos a tiempo · excepciones.'],
  ['ORQUESTACIÓN','Flujo sincronizado','Esperas · utilización de recursos · tareas pendientes · disponibilidad.']
];

const cases = [
  ['FARMACÉUTICA · MÉXICO','Liomont','Automatización y sincronización integral de un centro de distribución.','Integración de recepción, inventario, picking por caja y pieza, consolidación, peso, clasificación y preembarque bajo una capa central de control capaz de coordinar tecnologías heterogéneas.','Operación automatizada y sincronizada, manteniendo flexibilidad y requerimientos GAMP5.','Ver caso Liomont ↗'],
  ['MANUFACTURA · ITALIA','Florim','WMS, SAP, MES y automatización en una sola operación.','Integración de almacén automático, carretillas geolocalizadas, identificación automática y sistemas empresariales sobre más de 100,000 posiciones de pallet.','+30% de productividad y eliminación de errores manuales documentados.','Ver caso Florim ↗'],
  ['RETAIL / ÓPTICA · GLOBAL','Safilo Group','Orquestación de fulfillment de gran escala y alta fragmentación.','25,000 artículos, 280,000 posiciones, 15 mini-loads, tres sorters, estrategias de picking y personalización integradas bajo una misma lógica de gestión.','Capacidad documentada de hasta 100,000 piezas despachadas al día.','Ver referencia Safilo ↗']
];

const partners = ['Beta 80','META GROUP','COGNEX','ZEBRA','SAP','Honeywell'];

export default function GestionOrquestacion(){
  return <main className="gestionPage">
    <header className="goHeader">
      <Link className="goLogo" href="/">INNOV<span>SUPPLY CHAIN SOLUTIONS</span></Link>
      <nav><Link href="/#retos">Retos Logísticos</Link><Link href="/#capacidades">Capacidades</Link><Link href="/#metodologia">Cómo Trabajamos</Link><Link href="/#industria">Experiencia y Resultados</Link><Link href="/#nosotros">Nosotros</Link></nav>
      <Link className="goCta" href="/#contacto">Contacto</Link>
    </header>

    <section className="goHero">
      <div className="goHeroCopy">
        <p className="goEyebrow">GESTIÓN Y ORQUESTACIÓN</p>
        <h1>El cerebro operativo que coordina todo lo que ocurre dentro del almacén.</h1>
        <p>Integramos inventarios, órdenes, ubicaciones, personas, dispositivos y automatización dentro de una misma lógica operacional para ejecutar cada proceso con mayor productividad, precisión y control.</p>
        <div className="goActions"><Link href="/#capacidades" className="goPrimary">Conozca nuestras capacidades</Link><Link href="/#contacto" className="goSecondary">Hablemos de su operación</Link></div>
      </div>
      <div className="goHeroMedia">
        <div className="goMainImage"><img src="https://images.unsplash.com/photo-1586528116493-da8c8f8b9a3f?auto=format&fit=crop&w=1500&q=90" alt="Centro de distribución"/><span>Visibilidad · Decisión · Ejecución · Control</span></div>
        <div className="goSideStack"><img src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=88" alt="Operación de picking"/><div className="goMiniCard"><b>UNA SOLA LÓGICA OPERACIONAL</b><h3>Del inventario a la ejecución física.</h3><span>WMS · WCS · Personas · Dispositivos · Automatización</span></div></div>
      </div>
    </section>

    <section className="goSection goChallenges">
      <p className="goEyebrow">01 · DE OPERACIONES FRAGMENTADAS A UNA EJECUCIÓN COORDINADA</p>
      <h2>Cuando cada proceso trabaja por separado, el almacén pierde productividad, visibilidad y capacidad de respuesta.</h2>
      <p className="goLead">Gestión y Orquestación constituye la columna vertebral digital del almacén: la capa que mantiene alineado lo que el negocio necesita con lo que realmente ocurre en piso. Su función es coordinar procesos, inventarios, reglas, prioridades y recursos dentro de una misma lógica operacional.</p>
      <div className="goChallengeGrid">{challenges.map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}</div>
      <div className="goDarkBar"><strong>El objetivo no es administrar transacciones.</strong><span>Es conseguir que toda la operación ejecute bajo una misma lógica.</span></div>
    </section>

    <section className="goSection goFlowSection">
      <p className="goEyebrow">02 · GESTIONAMOS Y ORQUESTAMOS EL FLUJO COMPLETO DEL ALMACÉN</p>
      <h2>Del ingreso de la mercancía a su expedición, cada etapa forma parte de una sola operación.</h2>
      <p className="goLead">Las capacidades acompañan el flujo completo intramuros e incorporan transversalmente gestión multi-almacén, fulfillment multicanal, planeación de recursos, trazabilidad, ejecución asistida, visibilidad y control de automatización.</p>
      <div className="goFlowGrid">{flow.map(([n,icon,t,d])=><article key={n}><b>{n}</b><i>{icon}</i><h3>{t}</h3><p>{d}</p></article>)}</div>
      <div className="goPills"><span>Multi-almacén</span><span>Multicanal</span><span>Planeación de recursos</span><span>Ejecución asistida</span><span>Automatización</span><span>Integración</span><span>Visibilidad</span></div>
    </section>

    <section className="goImageBand"><div className="goPillRow"><span>Multi-almacén</span><span>Multicanal</span><span>Planeación de recursos</span><span>Ejecución asistida</span><span>Automatización</span><span>Integración</span><span>Visibilidad</span></div><div className="goImageStrip"><img src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1300&q=88" alt="Picking asistido"/><img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1300&q=88" alt="Automatización industrial"/><img src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1300&q=88" alt="Logística y WMS"/></div></section>

    <section className="goSection goOrchestration">
      <p className="goEyebrow">03 · LA INTELIGENCIA QUE COORDINA LA OPERACIÓN</p>
      <h2>Del sistema empresarial a la ejecución física, mantenemos sincronizada toda la operación.</h2>
      <p className="goLead">La arquitectura combina las capas necesarias para convertir necesidades de negocio en decisiones operativas y esas decisiones en ejecución física coordinada.</p>
      <div className="goOrchGrid"><div className="goOrchFlow"><div className="goFlowRow"><b>NEGOCIO</b><span><strong>ERP · OMS · TMS · Manufactura · E-commerce</strong><small>Demanda, pedidos, compras, transporte, producción y compromisos de servicio.</small></span></div><i>↓</i><div className="goFlowRow darkRow"><b>GESTIÓN</b><span><strong>WMS</strong><small>Inventario, ubicaciones, reglas, prioridades, procesos, trazabilidad y carga de trabajo.</small></span></div><i>↓</i><div className="goFlowRow lilacRow"><b>ORQUESTACIÓN Y CONTROL</b><span><strong>WCS</strong><small>Sincronización y ejecución sobre equipos, subsistemas y tecnologías de automatización.</small></span></div><i>↓</i><div className="goFlowRow"><b>EJECUCIÓN FÍSICA</b><span><strong>Personas · RF · Voice · PTL · AS/RS · Conveyors · Sorters · AGV/AMR · Robots</strong><small>Las decisiones digitales se convierten en movimientos, tareas y eventos físicos.</small></span></div></div><div className="goWmsCards"><article><b>WMS</b><h3>Gestiona y decide</h3><p>¿Qué tenemos? ¿Dónde está? ¿Qué debemos hacer? ¿Con qué prioridad?</p></article><article><b>WCS</b><h3>Coordina y ejecuta</h3><p>¿Qué equipo debe actuar? ¿En qué secuencia? ¿Cómo mantener sincronizado el flujo?</p></article></div></div>
    </section>

    <section className="goSection goEvolution">
      <p className="goEyebrow">04 · EVOLUCIONAMOS LO QUE YA TIENE, NO NECESARIAMENTE LO REEMPLAZAMOS</p>
      <h2>Su operación puede necesitar un nuevo WMS o quizá no.</h2>
      <p className="goLead">Partimos de las capacidades existentes —incluido el WMS actual— para determinar qué debe conservarse, integrarse, complementarse, evolucionarse o sustituirse. Solo proponemos reemplazar cuando existe una justificación operativa y económica clara.</p>
      <div className="goEvolutionGrid">{evolution.map(([n,t,d])=><article key={n}><b>{n}</b><strong>{t}</strong><p>{d}</p></article>)}</div>
    </section>

    <section className="goFunctional"><div className="goFunctionalCopy"><h2>Profundidad funcional sin sobredimensionar la solución.</h2><p>Buscamos proporcionar la profundidad que requieren operaciones complejas, evitando tanto las limitaciones de plataformas que han quedado pequeñas como el costo, complejidad o rigidez de soluciones innecesariamente sobredimensionadas.</p><ul><li>Interoperabilidad con sistemas empresariales y plataformas existentes.</li><li>Escalabilidad para nuevos almacenes, canales, volúmenes y procesos.</li><li>Integración con automatización y tecnologías de diferentes fabricantes.</li><li>Evolución progresiva de acuerdo con el caso de negocio.</li></ul></div><div className="goDashboard"><div className="fakeToolbar"></div><div className="fakeRows">{Array.from({length:7},(_,i)=><div key={i}><span></span><span></span><span></span><span></span><span></span></div>)}</div><div className="fakeFooter"></div></div></section>

    <section className="goSection goImplementation">
      <p className="goEyebrow">05 · DISEÑAMOS LA SOLUCIÓN ALREDEDOR DE SU OPERACIÓN</p>
      <h2>Procesos, software, infraestructura e integración se diseñan como una sola solución.</h2>
      <p className="goLead">Acompañamos el ciclo completo desde el entendimiento funcional y técnico hasta la puesta en producción, estabilización y evolución de la plataforma.</p>
      <div className="goImplementationGrid">{implementation.map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}</div>
      <div className="goArchitectureBar"><strong>Arquitectura según la necesidad:</strong><span>On-Premise</span><span>Hosted</span><span>Nube privada</span><span>Híbrida</span></div>
    </section>

    <section className="goSection goImpact">
      <p className="goEyebrow">06 · EL IMPACTO SE MIDE EN LA OPERACIÓN</p>
      <h2>Más control debe traducirse en mejor ejecución, mayor productividad y mejor servicio.</h2>
      <p className="goLead">Definimos indicadores desde el diseño para construir una línea base, sustentar el caso de negocio y comprobar posteriormente el impacto alcanzado.</p>
      <div className="goImpactGrid">{impact.map(([k,t,d])=><article key={k}><b>{k}</b><h3>{t}</h3><p>{d}</p></article>)}</div>
      <div className="goImpactBar"><strong>MÁS CONTROL</strong><span>→</span><strong>MEJOR EJECUCIÓN</strong><span>→</span><strong>MAYOR PRODUCTIVIDAD</strong><span>→</span><strong>MEJOR SERVICIO</strong></div>
    </section>

    <section className="goSection goCases">
      <p className="goEyebrow">07 · EXPERIENCIA QUE DEMUESTRA CAPACIDAD DE ORQUESTACIÓN</p>
      <h2>Casos donde software, procesos y ejecución física funcionan como una sola arquitectura.</h2>
      <p className="goLead">Seleccionamos referencias que muestran integración de procesos complejos, automatización heterogénea, escalabilidad y control operativo.</p>
      <div className="goCasesGrid">{cases.map(([ey,brand,title,desc,callout,link])=><article key={brand}><b>{ey}</b><div className="goBrand"><span>{brand.slice(0,3)}</span><strong>{brand}</strong></div><hr/><h3>{title}</h3><p>{desc}</p><div className="goCallout">{callout}</div><a href="#contacto">{link}</a></article>)}</div>
    </section>

    <section className="goSection goArchitecture">
      <p className="goEyebrow">08 · UNA ARQUITECTURA QUE CONECTA TODO EL ECOSISTEMA</p>
      <h2>Una sola arquitectura para conectar lo que el negocio necesita, lo que el sistema decide y lo que realmente ocurre en el almacén.</h2>
      <p className="goLead">Gestión y Orquestación se integra con los sistemas empresariales, la ejecución física, la infraestructura de conectividad y las capacidades de visibilidad y analítica que permiten medir y evolucionar la operación.</p>
      <div className="goArchitectureFlow"><div> <b>NEGOCIO</b><strong>ERP · OMS · TMS · Manufactura · E-commerce</strong></div><i>↓</i><div className="strongBand"><b>GESTIÓN Y ORQUESTACIÓN</b><strong>WMS · WCS</strong></div><i>↓</i><div><b>EJECUCIÓN</b><strong>Personas · Movilidad · Identificación · Automatización</strong></div><i>↓</i><div><b>OPERACIÓN FÍSICA</b><strong>Inventario · Mercancías · Equipos · Almacenes</strong></div></div>
      <div className="goPurpleRibbon"><strong>CONECTIVIDAD</strong><span>+</span><strong>DATOS</strong><span>+</span><strong>VISIBILIDAD</strong><span>+</span><strong>ANALÍTICA</strong></div>
    </section>

    <section className="goSection goPartners">
      <p className="goEyebrow">09 · SOCIO TECNOLÓGICO</p>
      <div className="goPartnerSplit"><div><h2>Tecnología especializada respaldada por décadas de experiencia.</h2><p>Combinamos plataformas, automatización e integración con un ecosistema tecnológico especializado para construir soluciones operativas de alto impacto.</p></div><div className="betaCard"><span>∞</span><strong>Beta 80</strong><small>Soluciones especializadas para logística, WMS y ejecución de operaciones.</small></div></div>
      <div className="goPartnerGrid">{partners.map(p=><div key={p}>{p}</div>)}</div>
    </section>

    <section className="goFooterCta"><div><p className="goEyebrow light">10 · HABLEMOS DE SU OPERACIÓN</p><h2>¿Dónde está hoy la principal restricción de su operación?</h2><p>Analicemos juntos si la gestión y orquestación puede producir un mejor resultado y cuál sería la arquitectura adecuada.</p><Link href="/#contacto">Hablemos de su operación →</Link></div></section>
  </main>
}
