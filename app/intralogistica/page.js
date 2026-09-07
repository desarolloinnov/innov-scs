import Link from 'next/link';
import './intralogistica.css';

const technologies = [
  ['01','Almacenamiento automatizado','AS/RS, shuttles y soluciones Goods-to-Person para aumentar densidad, capacidad y velocidad de operación.','https://images.unsplash.com/photo-1586528116493-da8c8f8b9a3f?auto=format&fit=crop&w=1200&q=88'],
  ['02','Movimiento inteligente','AMR, AGV y conveyors para transportar materiales de forma segura, flexible y coordinada.','https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=88'],
  ['03','Picking y clasificación','Sorters, estaciones ergonómicas y automatización para elevar productividad y precisión.','https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=88'],
  ['04','Orquestación operacional','WMS, WCS y software para coordinar personas, equipos, inventario y flujo físico.','https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=88']
];

const results = ['Mayor throughput y productividad','Reducción de recorridos y tiempos de ciclo','Mayor utilización del espacio','Escalabilidad para crecimiento futuro'];

export default function Intralogistica(){
  return <main className="intralogisticaPage">
    <header className="intraHeader">
      <Link className="intraLogo" href="/">INNOV<span>SUPPLY CHAIN SOLUTIONS</span></Link>
      <nav><Link href="/#retos">Retos Logísticos</Link><Link href="/#capacidades">Capacidades</Link><Link href="/#metodologia">Cómo Trabajamos</Link><Link href="/#industria">Experiencia y Resultados</Link><Link href="/#nosotros">Nosotros</Link></nav>
      <Link className="intraCta" href="/#contacto">HABLEMOS</Link>
    </header>

    <section className="intraHero">
      <div className="intraHeroCopy">
        <p className="intraEyebrow">01 · INTRALOGÍSTICA</p>
        <h1>Combinamos tecnologías para transformar el flujo completo.</h1>
        <p className="intraLead">Integramos tecnologías y niveles de automatización. El objetivo es seleccionar la combinación que resuelva las restricciones de la operación con el mejor equilibrio entre productividad, flexibilidad y retorno.</p>
        <div className="intraActions"><Link href="/#contacto" className="intraPrimary">HABLEMOS DE TU PROYECTO →</Link><Link href="/#capacidades" className="intraSecondary">← VOLVER A CAPACIDADES</Link></div>
      </div>
      <div className="intraHeroVisual"><img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=90" alt="Operación intralogística"/><span>FLUJO · AUTOMATIZACIÓN · PRODUCTIVIDAD</span></div>
    </section>

    <section className="intraIntro">
      <div><p className="intraEyebrow purple">UNA ARQUITECTURA, MÚLTIPLES TECNOLOGÍAS</p><h2>La solución correcta depende de cómo funciona tu operación.</h2></div>
      <p>Analizamos volúmenes, recorridos, inventario, niveles de servicio, restricciones físicas y crecimiento esperado para diseñar una arquitectura que combine automatización, software e infraestructura sin sobredimensionar la solución.</p>
    </section>

    <section className="intraTech"><div className="intraSectionHead"><p className="intraEyebrow purple">TECNOLOGÍAS QUE COMBINAMOS</p><h2>De la automatización puntual a una operación orquestada.</h2></div><div className="intraTechGrid">{technologies.map(([n,t,d,img])=><article key={n}><div className="intraTechImage"><img src={img} alt={t}/><span>{n}</span></div><div className="intraTechBody"><h3>{t}</h3><p>{d}</p><span className="intraArrow">Explorar tecnología →</span></div></article>)}</div></section>

    <section className="intraDark"><div><p className="intraEyebrow">EL OBJETIVO NO ES AUTOMATIZAR POR AUTOMATIZAR</p><h2>Diseñamos el nivel de automatización que realmente necesita la operación.</h2><p className="intraDarkText">Una buena arquitectura permite crecer, medir y evolucionar. Integramos las tecnologías existentes con nuevas capacidades para construir una operación más eficiente sin perder flexibilidad.</p></div><div className="intraResults">{results.map((r,i)=><div key={r}><b>0{i+1}</b><span>{r}</span></div>)}</div></section>

    <section className="intraCases"><div className="intraSectionHead"><p className="intraEyebrow purple">APLICACIONES</p><h2>Donde la intralogística puede cambiar el desempeño.</h2></div><div className="intraCasesGrid"><article><span>01</span><h3>Almacenes de alta demanda</h3><p>Más capacidad de procesamiento y productividad sin depender de recorridos manuales.</p></article><article><span>02</span><h3>Operaciones con crecimiento</h3><p>Arquitecturas escalables que permiten aumentar capacidad conforme evoluciona el negocio.</p></article><article><span>03</span><h3>Picking y fulfillment</h3><p>Flujos más cortos, mayor precisión y mejor nivel de servicio para pedidos de alta rotación.</p></article></div></section>

    <section className="intraCtaSection"><p className="intraEyebrow">¿TIENES UN RETO DE INTRALOGÍSTICA?</p><h2>Diseñemos la combinación tecnológica que mejor responda a tu operación.</h2><Link href="/#contacto">HABLEMOS DE TU PROYECTO →</Link></section>
  </main>
}
