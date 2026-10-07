import Link from 'next/link';
import './visibilidad-inteligencia.css';

const problems=[
  ['01','Puntos ciegos entre lo registrado y lo que realmente ocurre','Los sistemas registran transacciones y movimientos, pero no siempre permiten conocer cómo se ejecutó físicamente el proceso ni explicar con rapidez las causas de una incidencia.'],
  ['02','Cuellos de botella y esperas difíciles de identificar','Saturaciones, filas, recorridos innecesarios y tiempos improductivos pueden permanecer ocultos sin una medición objetiva y continua.'],
  ['03','Baja visibilidad sobre recursos y activos','Conocer cuántos equipos, estaciones, bahías o espacios existen no significa conocer cuánto se utilizan ni dónde hay capacidad ociosa.'],
  ['04','Procesos críticos sin evidencia objetiva','Recepciones, cargas, descargas, consolidaciones o devoluciones pueden depender de verificaciones manuales difíciles de reconstruir después.'],
  ['05','Desviaciones detectadas demasiado tarde','Incumplimientos, manipulación incorrecta, accesos indebidos o situaciones anómalas pueden descubrirse cuando el impacto ya se convirtió en costo.'],
  ['06','Andenes, patios y zonas de transición difíciles de controlar','Sin información precisa sobre llegadas, esperas, ocupación y duración de maniobras, administrar bahías y detectar causas de demora se vuelve más complejo.'],
  ['07','Pérdidas, sustracciones y riesgos difíciles de prevenir','La vigilancia tradicional permite investigar eventos, pero tiene capacidad limitada para detectar oportunamente comportamientos y situaciones previamente definidos.'],
  ['08','Decisiones de mejora basadas en observaciones parciales','Sin información continua y medible, decisiones sobre personal, equipos, capacidad, layout o procesos pueden depender de percepciones o estudios puntuales.']
];

const capabilities=[
  ['01','Trazabilidad visual de mercancías y procesos','Asociar eventos operativos con evidencia visual para localizar mercancías, reconstruir recorridos y entender qué ocurrió durante recepción, almacenamiento, preparación, empaque o despacho.'],
  ['02','Supervisión y optimización de andenes','Observar ocupación, llegadas, salidas, tiempos de espera, duración de maniobras, filas y utilización de muelles para identificar saturaciones y mejorar flujo.'],
  ['03','Análisis de flujos, congestión y utilización','Analizar movimientos de personas, mercancías y equipos para detectar concentraciones, recorridos, zonas congestionadas y espacios subutilizados.'],
  ['04','Medición de utilización y desempeño de activos','Medir actividad, espera y ociosidad de montacargas y equipos móviles para encontrar desequilibrios, sobredimensionamiento y oportunidades de reasignación.'],
  ['05','Verificación visual de procesos críticos','Comprobar mediante evidencia visual que carga, descarga, preparación, empaque, recepción o devoluciones se ejecutaron conforme a lo esperado.'],
  ['06','Conteo y control visual de mercancías','Detectar y contabilizar bultos, pallets y otros objetos y contrastarlos con la información operacional esperada.'],
  ['07','Prevención de pérdidas y situaciones de riesgo','Observar zonas sensibles para detectar accesos, permanencias o eventos definidos que puedan asociarse con sustracciones, manipulación indebida o incumplimientos de seguridad.'],
  ['08','Inteligencia operacional y análisis de desempeño','Convertir eventos visuales y datos en métricas sobre tiempos, utilización, flujos, productividad, excepciones y cumplimiento.']
];

const implementation=[
  ['01','DEFINIR','Casos de uso y objetivos operativos','Qué procesos, zonas, mercancías, personas, vehículos, equipos o eventos debemos observar, medir, contar, seguir, verificar o evidenciar.'],
  ['02','DIAGNOSTICAR','Operación e infraestructura existente','Analizamos procesos, flujos, cámaras, cobertura, óptica, iluminación, conectividad, procesamiento, almacenamiento, VMS y fuentes operacionales.'],
  ['03','DISEÑAR','Arquitectura integral de la solución','Determinamos qué infraestructura puede mantenerse, reubicarse o reconfigurarse y qué componentes adicionales son necesarios.'],
  ['04','CONFIGURAR Y VALIDAR','Analítica y casos de uso','Configuramos analítica para detectar, clasificar, contar, seguir, medir o verificar eventos y validamos su comportamiento con condiciones representativas.'],
  ['05','IMPLEMENTAR E INTEGRAR','Infraestructura y ecosistema operacional','Implementamos cámaras, conectividad, servidores, almacenamiento, VMS, procesamiento e integración con WMS, WCS, ERP, control de accesos y telemetría.'],
  ['06','PONER A PUNTO','Operación en condiciones reales','Probamos imagen, conectividad, procesamiento, almacenamiento, analítica, integraciones, reglas, alertas y visualización en ambiente productivo.'],
  ['07','MEDIR Y EVOLUCIONAR','Impacto y mejora continua','Medimos contra líneas base y KPI, ajustamos reglas y analítica y extendemos nuevos casos de uso donde existe justificación.']
];

const impact=[
  ['PRODUCTIVIDAD Y EFICIENCIA','Productividad por hora/turno · tiempo de ciclo · tiempo efectivo vs. improductivo · throughput · tiempos de espera'],
  ['UTILIZACIÓN Y CAPACIDAD','% de utilización · ocupación · tiempo activo/inactivo · capacidad utilizada vs. disponible · utilización por zona/equipo'],
  ['CALIDAD Y CONTROL','Operaciones conformes · excepciones · errores y retrabajos · cumplimiento de proceso · tiempo de resolución · eventos con evidencia'],
  ['PREVENCIÓN Y RIESGOS','Incidencias · valor de pérdidas · merma · eventos de riesgo · reincidencias · pérdidas evitadas · tiempo de detección'],
  ['IMPACTO ECONÓMICO','Ahorro operativo · costo evitado · inversión evitada/diferida · costo por unidad · valor de pérdidas evitadas · ROI / payback']
];

const cases=[
  ['CJ LOGISTICS','Trazabilidad visual y gestión de reclamaciones','Arquitectura que vincula códigos de barras con el video correspondiente al empaque, reduciendo búsquedas manuales y acelerando investigaciones.'],
  ['HD SUPPLY','Visibilidad y gestión de una red de centros de distribución','Arquitectura con cámaras panorámicas, multisensor, PTZ y térmicas integrada mediante una plataforma central, desplegada sobre una red de más de 100 centros.'],
  ['CENTRO LOGÍSTICO · REINO UNIDO','Monitoreo inteligente de operación automatizada','Cobertura visual de un área 24/7 que procesa aproximadamente 90 paquetes por minuto, ayudando a detectar atascos, fallas y paquetes fuera de posición.']
];

export default function VisibilidadInteligencia(){
  return <main className="viPage">
    <header className="viHeader">
      <Link className="viLogo" href="/">Inn<i className="logoO">O</i>v<span>SUPPLY CHAIN SOLUTIONS</span></Link>
      <nav><Link href="/#retos">Retos Logísticos</Link><Link href="/#capacidades">Capacidades</Link><Link href="/#metodologia">Cómo Trabajamos</Link><Link href="/#industria">Experiencia y Resultados</Link><Link href="/#nosotros">Nosotros</Link></nav>
      <Link className="viCta" href="/#contacto">Contacto</Link>
    </header>

    <section className="viHero">
      <div className="viHeroCopy">
        <p className="viEyebrow">VISIBILIDAD E INTELIGENCIA OPERATIVA</p>
        <h1>Convertimos la actividad física del almacén en información objetiva, medible y accionable.</h1>
        <p>Una capa de observación y análisis que permite entender cómo está funcionando realmente la operación y actuar oportunamente sobre desviaciones, ineficiencias y riesgos.</p>
        <div className="viActions"><Link href="/#contacto" className="viPrimary">Cuéntenos su reto →</Link><Link href="/#capacidades" className="viSecondary">Volver a capacidades</Link></div>
      </div>
      <div className="viHeroVisual">
        <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=90" alt="Visibilidad operativa"/>
        <div><span>VIDEO · IA · DATOS · ANALÍTICA</span><strong>De observar más a entender mejor.</strong></div>
      </div>
    </section>

    <section className="viSection viRole">
      <div className="viKicker"><span>01</span><p>ROL DENTRO DE LA OPERACIÓN</p></div>
      <div className="viTwoCol"><div><h2>La operación física también genera datos. Hay que convertirlos en decisiones.</h2></div><div><p>Mientras WMS, ERP y otros sistemas registran órdenes, inventarios, movimientos y transacciones, esta capacidad observa el comportamiento físico asociado a esos procesos mediante cámaras, analítica de video, inteligencia artificial y otras fuentes operacionales.</p><p>Así podemos medir flujos, tiempos, utilización de equipos y espacios, cumplimiento de procesos, movimientos de mercancía y condiciones de seguridad.</p></div></div>
      <div className="viStatement">No buscamos agregar cámaras para ver más; buscamos obtener información que hoy no existe para operar mejor.</div>
    </section>

    <section className="viSection viProblems">
      <div className="viKicker"><span>02</span><p>PROBLEMÁTICA QUE RESOLVEMOS</p></div>
      <h2>Hacemos visibles los eventos que normalmente quedan fuera de los sistemas transaccionales.</h2>
      <div className="viCardGrid">{problems.map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}</div>
    </section>

    <section className="viSection viValue">
      <div className="viValuePanel">
        <div><div className="viKicker light"><span>03</span><p>PROPUESTA DE VALOR</p></div><h2>Observar, correlacionar y convertir la operación física en información accionable.</h2></div>
        <p>Aprovechamos la infraestructura existente cuando resulta viable y la complementamos donde es necesario. Integramos eventos visuales con datos operacionales para medir tiempos, flujos, utilización, cumplimiento y excepciones, detectar desviaciones y generar evidencia sobre eventos críticos.</p>
      </div>
      <div className="viQuestions"><b>Preguntas que la operación puede responder</b><span>¿Por qué se saturan determinadas bahías?</span><span>¿Cuánto tiempo permanece realmente un vehículo en carga?</span><span>¿Dónde se producen las esperas?</span><span>¿Se cargó correctamente una unidad?</span><span>¿Qué zonas concentran situaciones de riesgo?</span></div>
    </section>

    <section className="viSection viCapabilities">
      <div className="viKicker"><span>04</span><p>CAPACIDADES DE SOLUCIÓN</p></div>
      <h2>Una capa de inteligencia para observar, medir, verificar y actuar.</h2>
      <div className="viCapabilityGrid">{capabilities.map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p><span>Explorar capacidad →</span></article>)}</div>
    </section>

    <section className="viSection viIntegration">
      <div className="viKicker"><span>05</span><p>INTEGRACIÓN CON EL ECOSISTEMA OPERATIVO</p></div>
      <h2>La inteligencia adquiere valor cuando se relaciona con lo que el sistema esperaba.</h2>
      <p className="viLead">Integramos eventos visuales, analítica y otras fuentes con WMS, WCS, ERP, automatización, control de accesos, telemetría y otras plataformas para asociar un evento con una orden, producto, pallet, vehículo, bahía, operador, equipo, ubicación o momento.</p>
      <div className="viFlow"><article><span>SISTEMAS</span><strong>WMS · WCS · ERP · Automatización · Accesos</strong></article><i>↕</i><article className="active"><span>CAPA DE VISIBILIDAD</span><strong>Correlación · Reglas · Analítica · Alertas · Métricas · Evidencia</strong></article><i>↕</i><article><span>OPERACIÓN FÍSICA</span><strong>Cámaras · Equipos · Personas · Mercancías · Vehículos · Espacios · Telemetría</strong></article></div>
    </section>

    <section className="viSection viImplementation">
      <div className="viKicker"><span>06</span><p>CONSULTORÍA E IMPLEMENTACIÓN</p></div>
      <div className="viTwoCol"><div><h2>Diseñamos la solución completa alrededor de los casos de uso.</h2></div><p>Evaluamos infraestructura, conectividad, procesamiento, almacenamiento y sistemas existentes para reutilizar al máximo los activos antes de incorporar nueva infraestructura.</p></div>
      <div className="viTimeline">{implementation.map(([n,k,t,d])=><article key={n}><b>{n}</b><div><span>{k}</span><h3>{t}</h3><p>{d}</p></div></article>)}</div>
    </section>

    <section className="viSection viMethod">
      <div className="viMethodPanel"><p>METODOLOGÍA INNOV</p><h2>Definir → Diagnosticar → Diseñar → Validar → Implementar e integrar → Poner a punto → Medir y evolucionar</h2><span>Aprovechamos al máximo los activos existentes antes de incorporar nueva infraestructura y entregamos una solución operacional completa.</span></div>
    </section>

    <section className="viImpact">
      <div className="viSection">
        <div className="viKicker"><span>07</span><p>BENEFICIOS E INDICADORES DE IMPACTO</p></div>
        <h2>El valor de la visibilidad se demuestra con indicadores.</h2>
        <div className="viImpactGrid">{impact.map(([t,d])=><article key={t}><b>{t}</b><p>{d}</p></article>)}</div>
      </div>
    </section>

    <section className="viSection viEvidence">
      <div className="viKicker"><span>08</span><p>EVIDENCIAS</p></div>
      <h2>Experiencias que muestran cómo la información visual puede integrarse al proceso.</h2>
      <div className="viCaseGrid">{cases.map(([ey,t,d])=><article key={ey}><b>{ey}</b><h3>{t}</h3><p>{d}</p><a href="/#contacto">Conocer aplicación →</a></article>)}</div>
      <div className="viMexico">La evidencia del documento también reporta cobertura multisectorial y experiencia en logística y videoanalítica, incluyendo trazabilidad visual, análisis de flujos, utilización de equipos, gestión de andenes y prevención de pérdidas.</div>
    </section>

    <section className="viFinalCta"><div><p>VISIBILIDAD E INTELIGENCIA OPERATIVA · INNOV</p><h2>Hagamos visible lo que hoy la operación no puede explicar.</h2><Link href="/#contacto">Hablemos de su operación →</Link></div></section>
  </main>
}
