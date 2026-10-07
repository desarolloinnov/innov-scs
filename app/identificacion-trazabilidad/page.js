import Link from 'next/link';
import './identificacion-trazabilidad.css';

const problems=[
  ['01','Baja productividad y altos costos','La identificación individual puede consumir tiempo y mano de obra en recepción, inventario, preparación, clasificación y despacho.'],
  ['02','Errores y retrabajos','Lecturas incorrectas o capturas manuales pueden provocar diferencias de inventario, errores de surtido, embarques incorrectos y reclamaciones.'],
  ['03','Pérdida de trazabilidad','Sin registros confiables en puntos críticos es difícil conocer dónde está una unidad, reconstruir su recorrido o determinar dónde ocurrió una desviación.'],
  ['04','Cuellos de botella','La capacidad de recepción, clasificación, procesamiento o expedición puede quedar limitada por la capacidad de identificar y registrar mercancías.'],
  ['05','Dificultad para escalar','Cuando la identificación depende de lecturas individuales o intervención humana, crecer exige incrementar proporcionalmente operadores, dispositivos o estaciones.'],
  ['06','Riesgo de cumplimiento','El seguimiento por lote, serie, fecha o unidad logística exige que la información se capture y conserve de forma confiable durante todo el proceso.']
];

const capabilities=[
  ['01','Identificación automática de productos y paquetes','Cajas, paquetes, totes y productos en diferentes puntos, reduciendo escaneo manual y generando eventos para recepción, control, clasificación, preparación o despacho.'],
  ['02','Identificación y validación de pallets','Validación contra orden, destino, embarque, bahía o proceso asignado para detectar discrepancias antes de la siguiente etapa.'],
  ['03','Identificación de mercancías en movimiento','Reconocimiento mientras las unidades se desplazan, sin detener el flujo, para seguimiento, direccionamiento y clasificación.'],
  ['04','Captura múltiple y masiva','Lectura simultánea de múltiples códigos o identificadores dentro de una misma unidad logística o campo visual.'],
  ['05','Captura de información no codificada','Reconocimiento de números de serie, lotes, fechas e identificadores impresos que no están contenidos en códigos convencionales.'],
  ['06','Identificación móvil y flexible','Captura en distintos puntos de la operación mediante dispositivos móviles cuando una infraestructura fija no resulta necesaria.'],
  ['07','Identificación especializada de activos','Necesidades sobre vehículos, contenedores, neumáticos, activos u otras unidades con características físicas o identificadores particulares.'],
  ['08','Detección, clasificación y verificación','Detección de objetos, dimensionamiento y verificación de códigos, textos o características relevantes para validar el proceso.']
];

const engineering=[
  ['01','Caracterizar la aplicación','Qué debe identificarse, dónde y bajo qué condiciones: producto, unidad logística, simbología, superficie, contraste, orientación, distancia, velocidad, iluminación, variabilidad y volumen.'],
  ['02','Definir el criterio de desempeño','Establecemos qué significa que la solución funcione: tasa de lectura, precisión, falsos positivos, tiempo de captura y manejo de excepciones.'],
  ['03','Diseñar la arquitectura de captura','Definimos campo de visión, cobertura, distancia, velocidad, iluminación, resolución y número de puntos; desde móviles hasta estaciones fijas y lectura multicara.'],
  ['04','Probar y validar la lectura','Utilizamos muestras representativas e incluimos casos difíciles y excepciones antes del despliegue.'],
  ['05','Integrar la identificación al proceso','La lectura se convierte en un evento operacional: registrar, validar, actualizar trazabilidad, generar excepciones o direccionar una unidad.'],
  ['06','Instalar, calibrar y poner a punto','Configuramos la solución en el ambiente definitivo y validamos posiciones, distancias, iluminación, velocidades, comunicaciones y excepciones.'],
  ['07','Monitorear y optimizar','Analizamos tasas de lectura, excepciones, códigos problemáticos y condiciones recurrentes para sostener el desempeño y evolucionar la solución.']
];

const impact=[
  ['PRODUCTIVIDAD','Unidades identificadas por hora · productividad por estación · operaciones por turno'],
  ['VELOCIDAD Y CAPACIDAD','Unidades por minuto/hora · tiempo de identificación · throughput · tiempo de ciclo'],
  ['CONFIABILIDAD','Read rate · no-read rate · precisión · falsas lecturas · excepciones'],
  ['CALIDAD','Errores de identificación · discrepancias · embarques incorrectos · retrabajos'],
  ['TRAZABILIDAD','Trazabilidad completa · puntos de control automatizados · incidencias sin trazabilidad'],
  ['COSTO Y ESCALABILIDAD','Costo por unidad · horas-hombre · retrabajo · ahorro · payback/ROI']
];

const cases=[
  ['SSG.com · Corea del Sur','Túneles de lectura para micro-fulfillment','99% de tasa de lectura en tiempo real bajo condiciones normales y menor intervención manual.'],
  ['Zenni Optical / OSARO · Estados Unidos','Identificación integrada con automatización robótica','+80% de throughput, hasta 410 unidades/hora y 99.5%+ de tasa de lectura.'],
  ['B&H Worldwide · Nueva Zelanda','Trazabilidad digital de neumáticos','60% menor tiempo de procesamiento, 99%+ de precisión y 30% más unidades por hora.'],
  ['TireHub · Estados Unidos','Trazabilidad DOT en distribución de neumáticos','Captura móvil del número DOT directamente desde el neumático, eliminando transcripción manual.']
];

export default function IdentificacionTrazabilidad(){
  return <main className="itPage">
    <header className="itHeader">
      <Link className="itLogo" href="/">Inn<i className="logoO">O</i>v<span>SUPPLY CHAIN SOLUTIONS</span></Link>
      <nav><Link href="/#retos">Retos Logísticos</Link><Link href="/#capacidades">Capacidades</Link><Link href="/#metodologia">Cómo Trabajamos</Link><Link href="/#industria">Experiencia y Resultados</Link><Link href="/#nosotros">Nosotros</Link></nav>
      <Link className="itCta" href="/#contacto">Contacto</Link>
    </header>

    <section className="itHero">
      <div className="itHeroCopy">
        <p className="itEyebrow">IDENTIFICACIÓN Y TRAZABILIDAD</p>
        <h1>Convertimos cada movimiento físico relevante en un evento digital identificable, verificable y trazable.</h1>
        <p>La capa que vincula el flujo físico de mercancías con la información digital que gobierna la operación.</p>
        <div className="itHeroActions"><Link href="/#contacto" className="itPrimary">Cuéntenos su reto →</Link><Link href="/#capacidades" className="itSecondary">Volver a capacidades</Link></div>
      </div>
      <div className="itHeroVisual">
        <div className="itVisualMain"><img src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=90" alt="Identificación y trazabilidad logística"/></div>
        <div className="itVisualCard"><span>CAPTURA · VALIDACIÓN · TRAZABILIDAD</span><strong>Del movimiento físico al evento digital.</strong></div>
      </div>
    </section>

    <section className="itSection itRole">
      <div className="itKicker"><span>01</span><p>ROL DENTRO DE LA OPERACIÓN</p></div>
      <div className="itTwoCol"><div><h2>Identificar no es solamente leer un código.</h2></div><div><p>Diseñamos la captura para saber qué es, dónde se encuentra, por dónde pasó y qué ocurrió con cada unidad. La capacidad acompaña transversalmente recepción, almacenamiento, picking, clasificación, consolidación y despacho.</p><p>Puede operar desde dispositivos móviles y terminales portátiles hasta sistemas industriales de lectura fija y automática, utilizando códigos 1D/2D, OCR y otras técnicas de reconocimiento visual.</p></div></div>
      <div className="itStatement">El objetivo es capturar, validar y registrar eventos físicos relevantes incluso en condiciones de alto volumen, velocidad, orientación variable, códigos difíciles de leer o información no estructurada en una etiqueta convencional.</div>
    </section>

    <section className="itSection itProblems">
      <div className="itKicker"><span>02</span><p>PROBLEMÁTICAS QUE RESOLVEMOS</p></div>
      <h2>La identificación se vuelve crítica cuando empieza a limitar productividad, calidad o capacidad.</h2>
      <div className="itCardGrid">{problems.map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}</div>
    </section>

    <section className="itSection itValue">
      <div className="itValuePanel">
        <div><div className="itKicker light"><span>03</span><p>PROPUESTA DE VALOR</p></div><h2>La tecnología se determina por la necesidad real de la operación.</h2></div>
        <p>Partimos de volumen, velocidad, tipo de identificador, características del producto, entorno y nivel de automatización para definir la tecnología y arquitectura de captura. Puede ser tan simple como aprovechar un dispositivo móvil existente o tan sofisticada como automatizar la identificación de miles de unidades en movimiento.</p>
      </div>
    </section>

    <section className="itSection itCapabilities">
      <div className="itKicker"><span>04</span><p>CAPACIDADES DE LA SOLUCIÓN</p></div>
      <h2>Una misma disciplina de captura para múltiples puntos del flujo.</h2>
      <div className="itCapabilityGrid">{capabilities.map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p><span>Explorar capacidad →</span></article>)}</div>
    </section>

    <section className="itSection itIntegration">
      <div className="itKicker"><span>05</span><p>INTEGRACIÓN CON CONTROL Y AUTOMATIZACIÓN</p></div>
      <h2>Identificar · Validar · Registrar · Decidir · Ejecutar · Trazar</h2>
      <p className="itLead">Cada evento puede convertirse en información utilizable por los sistemas de gestión y control. La captura se integra con WMS, WCS, ERP y tecnologías de automatización para validar operaciones, actualizar trazabilidad, generar excepciones y habilitar la siguiente acción.</p>
      <div className="itFlow">{['IDENTIFICAR','VALIDAR','REGISTRAR','DECIDIR','EJECUTAR','TRAZAR'].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong>{i<5&&<i>→</i>}</div>)}</div>
      <div className="itIntegrationCards"><article><b>GESTIÓN Y CONTROL</b><h3>WMS · WCS · ERP</h3><p>Contrastar identidad con órdenes, ubicaciones, destinos y reglas de proceso.</p></article><article><b>AUTOMATIZACIÓN</b><h3>Conveyors · Sorters · AS/RS · AGV/AMR</h3><p>Proporcionar el dato que permite direccionar, clasificar, almacenar, recuperar o mover.</p></article><article><b>TRAZABILIDAD</b><h3>Evento · ubicación · momento · etapa</h3><p>Construir el recorrido digital y mantener sincronizado lo físico con la información disponible.</p></article></div>
    </section>

    <section className="itSection itEngineering">
      <div className="itKicker"><span>06</span><p>INGENIERÍA E IMPLEMENTACIÓN</p></div>
      <div className="itTwoCol"><div><h2>Primero demostramos que podemos identificarlo de manera confiable; después hacemos que esa identificación forme parte del proceso.</h2></div><p>Cada aplicación presenta condiciones particulares que determinan la viabilidad y arquitectura. El proceso va desde caracterizar la aplicación hasta monitorear y optimizar la captura en producción.</p></div>
      <div className="itTimeline">{engineering.map(([n,t,d])=><article key={n}><b>{n}</b><div><h3>{t}</h3><p>{d}</p></div></article>)}</div>
    </section>

    <section className="itImpact">
      <div className="itSection">
        <div className="itKicker"><span>07</span><p>BENEFICIOS E INDICADORES DE IMPACTO</p></div>
        <h2>El valor de la identificación se mide en la operación.</h2>
        <div className="itImpactGrid">{impact.map(([t,d])=><article key={t}><b>{t}</b><p>{d}</p></article>)}</div>
      </div>
    </section>

    <section className="itSection itEvidence">
      <div className="itKicker"><span>08</span><p>EVIDENCIAS Y CASOS</p></div>
      <h2>Experiencias que muestran el impacto de integrar identificación al proceso.</h2>
      <div className="itCaseGrid">{cases.map(([ey,t,d])=><article key={ey}><b>{ey}</b><h3>{t}</h3><p>{d}</p><a href="/#contacto">Conocer aplicación →</a></article>)}</div>
    </section>

    <section className="itFinalCta"><div><p>IDENTIFICACIÓN Y TRAZABILIDAD · INNOV</p><h2>Hagamos que cada evento físico tenga una representación digital confiable.</h2><Link href="/#contacto">Hablemos de su operación →</Link></div></section>
  </main>
}
