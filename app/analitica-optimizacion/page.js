import Link from 'next/link';
import './analitica-optimizacion.css';

const challenges=[
  ['01','Datos dispersos','La operación puede generar información en distintas fuentes sin una lectura común para supervisores y responsables.'],
  ['02','Decisiones reactivas','Sin indicadores claros, las desviaciones se detectan cuando ya impactaron productividad, costo o servicio.'],
  ['03','Restricciones difíciles de anticipar','La operación cambia por volumen, mezcla, capacidad y comportamiento de la demanda; la analítica permite anticipar escenarios.'],
  ['04','Capacidad subutilizada','Equipos, estaciones, espacio y recursos pueden operar por debajo o por encima de lo necesario sin una medición sistemática.'],
  ['05','Optimización aislada','Mejorar un punto del proceso sin mirar el sistema completo puede desplazar el problema hacia otra parte de la operación.'],
  ['06','Poca trazabilidad del impacto','Las iniciativas necesitan medirse contra indicadores para comprobar si el cambio produjo el resultado esperado.']
];

const capabilities=[
  ['01','Dashboards operativos','Concentramos indicadores relevantes de operación, productividad, capacidad, calidad y servicio en vistas diseñadas para cada nivel de decisión.'],
  ['02','KPIs y tableros ejecutivos','Traducimos la operación a indicadores que permitan priorizar, comparar desempeño y enfocar acciones sobre las restricciones más relevantes.'],
  ['03','Análisis de productividad','Identificamos patrones, tiempos, utilización y diferencias de desempeño para localizar oportunidades concretas de mejora.'],
  ['04','Modelos predictivos','Utilizamos datos históricos y operativos para anticipar comportamientos, restricciones y escenarios que puedan afectar la operación.'],
  ['05','Simulación y escenarios','Evaluamos alternativas antes de modificar la operación, contrastando capacidad, recursos y condiciones para apoyar decisiones de inversión.'],
  ['06','Optimización operativa','Convertimos hallazgos analíticos en acciones sobre procesos, recursos, layouts, tecnología y prioridades de operación.'],
  ['07','Alertas y seguimiento','Definimos métricas y reglas que permiten detectar desviaciones y dar seguimiento a la evolución de los indicadores.'],
      ['08','Mejora continua','Medimos el impacto de las acciones, comparamos contra la línea base y construimos una ruta de evolución basada en evidencia.']
];

const cycle=[
  ['01','OBSERVAR','Capturamos información relevante de la operación.'],
  ['02','MEDIR','Convertimos actividad en indicadores comparables.'],
  ['03','ENTENDER','Encontramos patrones, restricciones y causas recurrentes.'],
  ['04','ANTICIPAR','Evaluamos escenarios y posibles impactos.'],
  ['05','OPTIMIZAR','Seleccionamos acciones con mejor balance operativo y económico.'],
  ['06','VERIFICAR','Medimos el resultado y volvemos a comenzar.']
];

const metrics=[
  ['PRODUCTIVIDAD','Unidades por hora · throughput · tiempo de ciclo · productividad por operador/estación'],
  ['CAPACIDAD','Utilización · capacidad disponible · saturación · demanda vs. capacidad'],
  ['COSTO','Costo por unidad · horas-hombre · retrabajo · costo operativo'],
  ['CALIDAD','Errores · excepciones · retrabajos · cumplimiento de proceso'],
  ['SERVICIO','Nivel de servicio · tiempos de respuesta · cumplimiento de promesa'],
  ['MEJORA','Ahorro · capacidad liberada · impacto de iniciativas · ROI / payback']
];

export default function AnaliticaOptimizacion(){
  return <main className="aoPage">
    <header className="aoHeader">
      <Link className="aoLogo" href="/">Inn<i className="logoO">O</i>v<span>SUPPLY CHAIN SOLUTIONS</span></Link>
      <nav><Link href="/#retos">Retos Logísticos</Link><Link href="/#capacidades">Capacidades</Link><Link href="/#metodologia">Cómo Trabajamos</Link><Link href="/#industria">Experiencia y Resultados</Link><Link href="/#nosotros">Nosotros</Link></nav>
      <Link className="aoCta" href="/#contacto">Contacto</Link>
    </header>

    <section className="aoHero">
      <div className="aoHeroCopy">
        <p className="aoEyebrow">ANALÍTICA Y OPTIMIZACIÓN</p>
        <h1>Convertimos datos operativos en decisiones que mejoran productividad, costo y nivel de servicio.</h1>
        <p>Construimos una lectura operacional que ayuda a entender qué está ocurriendo, detectar restricciones y modelar oportunidades de mejora.</p>
        <div className="aoActions"><Link href="/#contacto" className="aoPrimary">Cuéntenos su reto →</Link><Link href="/#capacidades" className="aoSecondary">Volver a capacidades</Link></div>
      </div>
      <div className="aoHeroVisual">
        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=90" alt="Analítica y optimización"/>
        <div><span>DATOS · KPI · MODELOS · OPTIMIZACIÓN</span><strong>De datos dispersos a decisiones accionables.</strong></div>
      </div>
    </section>

    <section className="aoSection">
      <div className="aoKicker"><span>01</span><p>ROL DENTRO DE LA OPERACIÓN</p></div>
      <div className="aoTwoCol"><div><h2>La analítica da contexto a lo que la operación ya está generando.</h2></div><div><p>Integramos información operacional para construir una lectura común del desempeño. El objetivo no es acumular más datos, sino convertirlos en señales útiles para decidir con mayor velocidad y precisión.</p><p>Desde indicadores y tableros hasta modelos predictivos y optimización, conectamos análisis con las decisiones que realmente afectan productividad, capacidad, costo y servicio.</p></div></div>
      <div className="aoStatement">La tecnología tiene sentido cuando la información permite actuar antes de que una restricción se convierta en un problema mayor.</div>
    </section>

    <section className="aoSection aoProblems">
      <div className="aoKicker"><span>02</span><p>PROBLEMÁTICAS QUE RESOLVEMOS</p></div>
      <h2>Hacemos visible dónde están las oportunidades y qué impacto pueden producir.</h2>
      <div className="aoCardGrid">{challenges.map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}</div>
    </section>

    <section className="aoValue">
      <div className="aoValueInner">
        <div><div className="aoKicker light"><span>03</span><p>PROPUESTA DE VALOR</p></div><h2>Modelamos oportunidades antes de convertirlas en decisiones.</h2></div>
        <p>Combinamos indicadores, análisis y escenarios para entender el impacto de diferentes alternativas. Así podemos priorizar acciones, comparar opciones y justificar cambios con una visión operativa y económica.</p>
      </div>
      <div className="aoQuestionRow"><span>¿Dónde se pierde capacidad?</span><span>¿Qué explica el costo?</span><span>¿Qué pasaría si cambia el volumen?</span><span>¿Qué iniciativa genera mayor impacto?</span></div>
    </section>

    <section className="aoSection">
      <div className="aoKicker"><span>04</span><p>CAPACIDADES</p></div>
      <h2>Una capa analítica para entender, anticipar y optimizar.</h2>
      <div className="aoCapabilityGrid">{capabilities.map(([n,t,d])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{d}</p><span>Explorar capacidad →</span></article>)}</div>
    </section>

    <section className="aoSection aoCycle">
      <div className="aoKicker"><span>05</span><p>CICLO DE INTELIGENCIA OPERATIVA</p></div>
      <h2>Observar → medir → entender → anticipar → optimizar → verificar.</h2>
      <div className="aoCycleGrid">{cycle.map(([n,t,d],i)=><article key={n}><span>{n}</span><strong>{t}</strong><p>{d}</p>{i<cycle.length-1&&<i>→</i>}</article>)}</div>
    </section>

    <section className="aoSection aoIntegration">
      <div className="aoKicker"><span>06</span><p>INTEGRACIÓN Y TOMA DE DECISIONES</p></div>
      <div className="aoTwoCol"><div><h2>La analítica se conecta con la operación, no vive aislada en un tablero.</h2></div><div><p>Los indicadores pueden relacionarse con procesos, inventarios, equipos, órdenes, personas y eventos para construir una lectura contextualizada del desempeño.</p><p>El resultado es una arquitectura donde la información ayuda a priorizar acciones, medir avances y sostener una evolución continua.</p></div></div>
      <div className="aoStack"><div>FUENTES OPERACIONALES</div><span>↓</span><div className="active">DATOS · KPI · MODELOS · REGLAS · ESCENARIOS</div><span>↓</span><div>DECISIÓN Y EJECUCIÓN OPERATIVA</div></div>
    </section>

    <section className="aoMetrics">
      <div className="aoSection">
        <div className="aoKicker light"><span>07</span><p>BENEFICIOS E INDICADORES</p></div>
        <h2>El valor se demuestra en indicadores que la operación entiende.</h2>
        <div className="aoMetricsGrid">{metrics.map(([t,d])=><article key={t}><b>{t}</b><p>{d}</p></article>)}</div>
      </div>
    </section>

    <section className="aoSection aoFinalSection">
      <div className="aoKicker"><span>08</span><p>EVOLUCIÓN Y MEJORA CONTINUA</p></div>
      <h2>Medimos el cambio, comprobamos el impacto y evolucionamos la solución.</h2>
      <p className="aoLead">Cada iniciativa debe partir de una línea base, tener indicadores definidos y regresar a la operación como una mejora verificable. Así la analítica se convierte en un mecanismo permanente de evolución.</p>
    </section>

    <section className="aoFinal"><div><p>ANALÍTICA Y OPTIMIZACIÓN · INNOV</p><h2>Transformemos sus datos operativos en una ventaja medible.</h2><Link href="/#contacto">Hablemos de su operación →</Link></div></section>
  </main>
}
