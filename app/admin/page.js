'use client';

import { useEffect, useMemo, useState } from 'react';

const FORMS = [
  { id:'eligibility', title:'Calificación de Elegibilidad', subtitle:'Preevaluación de la oportunidad.' },
  { id:'warehouseInitial', title:'Levantamiento Inicial para: Almacén', subtitle:'Primera visita y diagnóstico operativo.' },
  { id:'sortingInitial', title:'Levantamiento Inicial para: Sorting', subtitle:'Primera visita y diagnóstico del sistema de clasificación.' },
  { id:'warehouseDetailed', title:'Cuestionario detallado para: Almacén', subtitle:'Levantamiento técnico y operativo.' },
  { id:'sortingDetailed', title:'Cuestionario detallado para: Sorting', subtitle:'Assessment técnico del centro de clasificación.' },
  { id:'amr', title:"Cálculo inicial de AMR's", subtitle:'Captura inicial de datos para pre-scope.' },
  { id:'fiberVolumetry', title:'Volumetría de Fibra Óptica', subtitle:'Levantamiento y estimación de infraestructura óptica para almacenes y edificios.' },
  { id:'electricalSurvey', title:'Levantamiento Eléctrico', subtitle:'Captura y estimación preliminar de cargas para almacenes y edificios.' }
];

const CONTACT_STATUS = { new:'Nuevo', read:'Leído', contacted:'Contactado', closed:'Cerrado' };

const fieldSets = {
  eligibility:[
    ['Cliente','text'],['Operación','text'],['Volumen relevante','text'],['Nivel de automatización','select:Bajo|Medio|Alto'],
    ['Problema claramente identificado','textarea'],['Datos disponibles','textarea'],['Viabilidad operativa','textarea']
  ],
  warehouseInitial:[
    ['Cliente','text'],['Centro de distribución / sitio','text'],['Fecha','date'],['Responsable del cliente','text'],
    ['Tipo de operación','select:Basada en tarimas|Basada en totes|Operación mixta|Otra'],['Volumen promedio diario','text'],
    ['Volumen pico diario','text'],['Recursos actuales','text'],['Horas efectivas','text'],['Recepción','text'],
    ['Almacenamiento','text'],['Despacho','text'],['Recorridos principales','textarea'],['Productividad actual','text'],
    ['Cuellos de botella','textarea'],['Errores / retrabajos','textarea'],['Altura libre','text'],['Área','text'],
    ['Capacidad eléctrica','text'],['Restricciones','textarea'],['Objetivo principal','textarea']
  ],
  sortingInitial:[
    ['Cliente','text'],['Centro de distribución / sitio','text'],['Fecha','date'],['Responsable del cliente','text'],
    ['Volumen promedio diario','text'],['Volumen pico diario','text'],['Horas efectivas','text'],['Unidad de manejo principal','select:Tarima|Caja|Tote|Paquete|Mixta|Otra'],
    ['Peso típico','text'],['Dimensiones típicas','text'],['Variabilidad del producto','select:Baja|Media|Alta'],['Altura libre disponible','text'],
    ['Área aproximada','text'],['Restricciones físicas','textarea'],['Voltaje disponible','text'],['Capacidad eléctrica disponible','text'],
    ['Sistema principal','text'],['Método de integración','select:REST API|SOAP|Web Services|Base de datos|CSV / XML|FTP / SFTP|MQTT|OPC-UA|Otro'],
    ['Read Rate actual','text'],['Porcentaje de No Read','text'],['Manejo de excepciones','textarea'],['Observaciones finales','textarea'],
    ['Origen del flujo','text'],['Destinos de clasificación','textarea'],['Número de destinos','number'],['Recorrido actual','textarea'],
    ['Puntos de acumulación','textarea'],['Equipos existentes','textarea'],['Objetivo principal','textarea'],
    ['Prioridades de automatización','textarea'],['Información pendiente','textarea']
  ],
  warehouseDetailed:[
    ['Cliente','text'],['Centro de distribución / sitio','text'],['Fecha','date'],['Responsable del cliente','text'],
    ['Tipo de operación','select:Cross Dock|Almacenamiento|Fulfillment|Distribución|Mixta'],['Volumen promedio diario','text'],
    ['Volumen pico diario','text'],['Unidades por hora','text'],['Productividad actual','text'],
    ['Cuellos de botella','textarea'],['Altura libre','text'],['Área','text'],['Capacidad eléctrica','text'],
    ['Sistema WMS','text'],['Integración disponible','select:REST API|SOAP|Base de datos|CSV / XML|FTP / SFTP|Otro'],
    ['Layout y recorridos','textarea'],['Problemas observados','textarea'],['Objetivos','textarea'],['Observaciones finales','textarea']
  ],
  sortingDetailed:[
    ['Cliente','text'],['Centro de distribución / sitio','text'],['Fecha','date'],['Responsable del cliente','text'],
    ['Volumen promedio diario','text'],['Volumen pico diario','text'],['Volumen mínimo diario','text'],['Horas efectivas por día','text'],
    ['Unidad de manejo principal','select:Tarima|Caja|Tote|Paquete|Mixta|Otra'],['Peso típico','text'],['Dimensiones típicas','text'],
    ['Variabilidad del producto','select:Baja|Media|Alta'],['Altura libre disponible','text'],['Área aproximada','text'],
    ['Restricciones físicas','textarea'],['Capacidad de carga del piso','text'],['Espesor de losa','text'],
    ['Voltaje disponible','text'],['Capacidad eléctrica disponible','text'],['Sistema contra incendio','text'],
    ['Sistema principal','text'],['Método de integración','select:REST API|SOAP|Web Services|Base de datos|CSV / XML|FTP / SFTP|MQTT|OPC-UA|Otro'],
    ['Read Rate actual','text'],['Porcentaje de No Read','text'],['Manejo de excepciones','textarea'],
    ['Recorrido actual','textarea'],['Problemas observados','textarea'],['Expectativas del cliente','textarea'],['Observaciones finales','textarea'],
    ['Dirección del centro de clasificación','textarea'],['Superficie total construida del inmueble','number'],['Superficie disponible para este proyecto','number'],
    ['Responsable del sitio','text'],['Fecha de levantamiento','date'],['Días de operación por semana','number'],['Turnos por día','number'],
    ['Peso máximo','number'],['Dimensiones máximas','text'],['Porcentaje de unidades fuera de estándar','number'],['Número de destinos','number'],
    ['Destinos de clasificación','textarea'],['Porcentaje por destino','textarea'],['Volumen por destino','textarea'],['Distribución por turno','textarea'],['Picos por destino','textarea'],
    ['Regla principal de clasificación','textarea'],['Reglas secundarias','textarea'],['Reintentos o recirculación','textarea'],['Salida para rechazo','textarea'],['Proceso de contingencia','textarea'],
    ['Disponibilidad objetivo (%)','number'],['Throughput requerido','number'],['Tiempo máximo de recuperación','text'],['Ventana de operación','text'],['Penalizaciones o métricas de servicio','textarea']
  ],
  amr:[
    ['Cliente','text'],['Tipo de proceso','select:Picking AMR|Goods-to-person|Pallets / AGV|Totes / Bins|Mixto'],
    ['Volumen pico por hora','number'],['Capacidad conservadora por robot / h','number'],['Utilización objetivo (%)','number'],
    ['Número de estaciones','number'],['Inversión estimada','number'],['Ahorro mensual estimado','number'],
    ['Payback estimado (meses)','number'],['Notas del pre-scope','textarea']
  ]
};

function getKey(label){return label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'');}

function FormField({def,value,onChange}){
  const label=def[0], typeSpec=def[1];
  const parts=String(typeSpec).split(':');
  const type=parts[0];
  const options=parts.slice(1).join(':').split('|');
  const common={value:value??'',onChange:e=>onChange(e.target.value)};
  if(type==='textarea')return <label className="wfField wide"><span>{label}</span><textarea {...common}/></label>;
  if(type==='select')return <label className="wfField"><span>{label}</span><select {...common}><option value="">Seleccione</option>{options.map(o=><option key={o} value={o}>{o}</option>)}</select></label>;
  return <label className="wfField"><span>{label}</span><input type={type} {...common}/></label>;
}

function Card({number,title,subtitle,children}){
  return <section className="wfCard">
    <header><b>{number}</b><div><h3>{title}</h3>{subtitle&&<p>{subtitle}</p>}</div></header>
    <div className="wfBody">{children}</div>
  </section>;
}


const ELIGIBILITY_CRITERIA=[
 {id:'loi',no:1,title:'Fecha objetivo de la LOI',desc:'Mes y año previstos para la emisión de la Carta de Intención (LOI).',weight:15,type:'date'},
 {id:'goLive',no:2,title:'Fecha objetivo de puesta en operación',desc:'Mes y año en que el cliente espera que la solución entre en operación.',weight:15,type:'date'},
 {id:'budget',no:3,title:'Nivel de presupuesto del proyecto',desc:'Precio estimado del proyecto o presupuesto disponible del cliente.',weight:15,type:'budget'},
 {id:'relationship',no:4,title:'Relación con el cliente',desc:'Calidad de la relación comercial y nivel de acceso a los principales responsables de decisión.',weight:10,options:[['Negativa',1],['Normal',3],['Buena',5],['Sólida',10]]},
 {id:'importance',no:5,title:'Importancia del cliente',desc:'Importancia del cliente por reputación, escala de negocio o relevancia estratégica regional.',weight:5,options:[['Pequeño',1],['Normal',3],['Grande',5],['Cuenta clave / C20',10]]},
 {id:'urgency',no:6,title:'Urgencia de la propuesta',desc:'Plazo esperado para desarrollar y presentar la propuesta de preventa.',weight:5,options:[['Desconocida',0],['Largo plazo',3],['Mediano plazo',5],['Urgente',10]]},
 {id:'bid',no:7,title:'Estrategia de licitación o compra',desc:'Tipo de proceso de compra, criterios de selección y posición en la lista larga o corta de proveedores.',weight:5,options:[['Desconocida',0],['Licitación pública',3],['Comparación de precios',5],['Adjudicación directa',10]]},
 {id:'definition',no:8,title:'Nivel de definición de los requerimientos',desc:'Grado de integridad del RFP/RFI, formularios, datos, SOP y parámetros de diseño disponibles.',weight:15,options:[['Por aclarar',1],['Parcialmente identificados',3],['Completamente identificados',5],['Solución definida',10]]},
 {id:'product',no:9,title:'Tipo de producto o solución',desc:'Tipo previsto de equipamiento, personalización y modalidad de suministro.',weight:10,options:[['Personalizado + subcontratado',1],['Estándar + subcontratado',5],['Personalizado + desarrollo interno',7],['Estándar + desarrollo interno',10]]},
 {id:'competitors',no:10,title:'Información de competidores',desc:'Nombres de competidores, relación con el cliente e información relevante disponible.',weight:5,options:[['No identificados',1],['Parcialmente identificada',5],['Completamente identificada',10]]}
];

function eligibilityScore(c,data){
 const v=data['eligibility_'+c.id];
 if(!v)return 0;
 if(c.type==='date'){
   const y=Number(String(v).slice(0,4));
   if(y===2026)return 10;
   if(y===2027)return 5;
   return 1;
 }
 if(c.type==='budget'){
   const usd=Number(v);
   const rmb=usd*7.10;
   if(rmb>=127800000)return 10;
   if(rmb>=63900000)return 5;
   if(rmb>=21300000)return 3;
   return 1;
 }
 return Number(c.options.find(x=>x[0]===v)?.[1]||0);
}

function EligibilityWixForm({data,set}){
 const scored=ELIGIBILITY_CRITERIA.map(c=>({c,score:eligibilityScore(c,data)}));
 const completed=scored.filter(x=>Boolean(data['eligibility_'+x.c.id])).length;
 const total=scored.reduce((sum,x)=>sum+x.score*x.c.weight/100,0);
 const progress=Math.round(completed/10*100);
 const getStatus=()=>completed<10?'Evaluación incompleta':total<=5?'Prioridad baja':total<8?'Seguimiento normal':'Prioridad alta';

 const inputFor=(c)=>{
   const key='eligibility_'+c.id;
   if(c.type==='date')return <input className="eligYellow" type="month" value={data[key]||''} onChange={e=>set(key,e.target.value)} />;
   if(c.type==='budget')return <input className="eligYellow" type="number" min="0" step="1000" value={data[key]||''} placeholder="Ejemplo: 1500000" onChange={e=>set(key,e.target.value)} />;
   return <select className="eligYellow" value={data[key]||''} onChange={e=>set(key,e.target.value)}><option value="">Seleccione...</option>{c.options.map(([label,score])=><option key={label} value={label}>{label} — {score} pts</option>)}</select>;
 };

 return <div className="eligibilityView">
   <section className="eligHero">
     <div>
       <p className="eligEyebrow">SOP DE COOPERACIÓN PARA SOLUCIONES DE AUTOMATIZACIÓN</p>
       <h2>Evaluación de Elegibilidad del Proyecto</h2>
       <p>Capture la información del cliente. La evaluación reproduce la lógica de puntuación y ponderación de la hoja de evaluación.</p>
     </div>
   </section>
   <div className="eligTopGrid">
     <section className="eligResult">
       <div className="eligScoreCircle"><strong>{total.toFixed(2)}</strong><span>de 10</span></div>
       <div className="eligResultCopy"><h3>{getStatus()}</h3><p>{completed===10?'Todos los criterios están completados.':'Complete todos los campos amarillos para obtener el resultado final de elegibilidad.'}</p><span>{completed} de 10 criterios completados</span></div>
     </section>
     <section className="eligThresholds">
       <h3>Umbrales de prioridad</h3>
       <div><b className="red">≤ 5.0</b><span><strong>Prioridad baja</strong>Se recomienda descartar o despriorizar cuando los recursos sean limitados.</span></div>
       <div><b className="amber">5.0–8.0</b><span><strong>Seguimiento normal</strong>Continuar con la calificación y el desarrollo de la oportunidad.</span></div>
       <div><b className="green">≥ 8.0</b><span><strong>Prioridad alta</strong>Priorizar recursos de preventa y comerciales.</span></div>
     </section>
   </div>
   <section className="eligPanel">
     <header className="eligPanelHead"><div><h3>Información del cliente</h3><p>Los campos amarillos son editables. Las puntuaciones y la elegibilidad ponderada se calculan automáticamente.</p></div><b>{progress}% completado</b></header>
     <div className="eligCriteria">
       {scored.map(({c,score})=>{
         const key='eligibility_'+c.id;
         return <article className="eligCriterion" key={c.id}>
           <div className="eligNo">{c.no}</div>
           <div className="eligDescription"><h4>{c.title}</h4><p>{c.desc}</p><span>Ponderación {c.weight}%</span></div>
           <div className="eligInputArea">
             <label>{c.type==='date'?'Fecha prevista':c.type==='budget'?'Presupuesto estimado (USD)':'Seleccione el nivel aplicable'}</label>
             {inputFor(c)}
             <textarea placeholder={c.type==='budget'?'Supuestos comerciales o fuente del presupuesto (opcional)':'Información de respaldo (recomendada)'} value={data[key+'_note']||''} onChange={e=>set(key+'_note',e.target.value)} />
             {c.type==='budget'&&<small>La conversión utiliza 7.10 RMB por USD para reproducir los rangos expresados originalmente.</small>}
           </div>
           <div className="eligScoreBox"><strong>{score}</strong><span>puntuación / 10</span><small>{(score*c.weight/100).toFixed(2)}<br/>ponderado</small></div>
         </article>
       })}
     </div>
     <footer className="eligFooter"><button onClick={()=>set({})}>Restablecer</button><button onClick={()=>window.print()}>PDF en español</button><button onClick={()=>window.print()}>PDF en inglés</button><button className="dark" onClick={()=>window.print()}>Descargar resumen</button></footer>
   </section>
   <p className="eligFootNote">Base de puntuación: el libro original. Las categorías de fecha se evalúan por año calendario: 2026, 2027 y 2028 o posterior. La conversión presupuestal utiliza 7,10 RMB por USD únicamente para reproducir en dólares los rangos expresados originalmente en RMB.</p>
 </div>;
}


const WAREHOUSE_SECTIONS = [
  {
    no:1,title:'Información general',subtitle:'Datos básicos de la visita.',kind:'general',
    fields:[
      ['Cliente','text','Cliente *'],['Centro de distribución / almacén','text','Centro de distribución / almacén *'],
      ['Fecha','date','Fecha *'],['Responsable del cliente','text','Responsable del cliente'],
      ['Puesto','text','Puesto'],['Consultor responsable','text','Consultor responsable']
    ]
  },
  {
    no:2,title:'Tipo de operación',subtitle:'Seleccione la unidad de manejo principal.',kind:'operation',
    intro:'El árbol distingue operaciones basadas en tarimas, totes/contenedores, esquemas mixtos u otras unidades de manejo.',
    options:[
      ['pallet','Basada en tarimas','Almacenamiento y movimiento principalmente por pallet/tarima.'],
      ['tote','Basada en totes','Operación de cajas plásticas, bins o contenedores pequeños.'],
      ['mixed','Operación mixta','Combinación de tarimas, totes y/o otras unidades de manejo.'],
      ['other','Otra','Cartones, racks móviles, prendas colgadas u otra unidad de manejo.']
    ]
  },
  {
    no:3,title:'Volumen, inventario y recursos',subtitle:'SKUs, unidades de manejo, superficie y personal.',kind:'volume',
    palletFields:[
      ['Número de SKUs activos','number'],['Posiciones de tarima instaladas','number'],
      ['Tarimas promedio en inventario','number'],['Tarimas pico en inventario','number']
    ],
    peopleFields:[
      ['Superficie ocupada por la operación','number'],['Personal por turno','number'],
      ['Número de turnos','number'],['Personal total de la operación','number']
    ]
  },
  {
    no:4,title:'Uso del almacén y flujo logístico',subtitle:'Origen, destino y recorrido de la mercancía.',kind:'flow'
  },
  {
    no:5,title:'Eficiencia de entrada y salida',subtitle:'Desempeño Inbound / Outbound.',kind:'efficiency'
  },
  {
    no:6,title:'Infraestructura y evidencia',subtitle:'CAD, piso, flujo interno y fotografías.',kind:'infrastructure'
  },
  {
    no:7,title:'Pain Points y objetivos de negocio',subtitle:'Problemas actuales y resultados esperados.',kind:'painpoints'
  },
  {
    no:8,title:'Checklist de cierre',subtitle:'Información indispensable para continuar con la evaluación.',kind:'checklist'
  }
];

function WarehouseField({label,type,value,onChange,placeholder='',required=false}){
  return <label className="whField">
    <span>{label}{required&&<em> *</em>}</span>
    <input type={type} value={value||''} placeholder={placeholder} onChange={e=>onChange(e.target.value)} required={required}/>
  </label>;
}
function WarehouseTextArea({label,value,onChange,placeholder='',wide=false}){
  return <label className={wide?'whField whWide':'whField'}>
    <span>{label}</span>
    <textarea value={value||''} placeholder={placeholder} onChange={e=>onChange(e.target.value)}/>
  </label>;
}
function WarehouseSelect({label,value,onChange,options,placeholder='Seleccione'}){
  return <label className="whField">
    <span>{label}</span>
    <select value={value||''} onChange={e=>onChange(e.target.value)}>
      <option value="">{placeholder}</option>
      {options.map(option=><option key={option} value={option}>{option}</option>)}
    </select>
  </label>;
}
function WarehouseCheck({label,checked,onChange}){
  return <label className="whCheck"><input type="checkbox" checked={Boolean(checked)} onChange={e=>onChange(e.target.checked)}/><span>{label}</span></label>;
}
function WarehouseRadioCard({item,selected,onChange}){
  const [id,title,desc]=item;
  return <label className={selected===id?'whRadioCard active':'whRadioCard'}>
    <input type="radio" name="warehouse_operation_type" value={id} checked={selected===id} onChange={()=>onChange(id)}/>
    <strong>{title}</strong>
    <span>{desc}</span>
  </label>;
}
function WarehouseCard({section,children,anchor}){
  return <section className="whSection" id={anchor||undefined}>
    <div className="whSectionHeader" role="heading" aria-level="3">
      <div className="whNumber">{section.no}</div>
      <div className="whSectionHeaderText"><h3>{section.title}</h3><p>{section.subtitle}</p></div>
    </div>
    <div className="whSectionBody">{children}</div>
  </section>;
}

function WarehouseInitialForm({data,set}){
  const get=(key)=>data[key]??'';
  const operationType=data.operationType||'pallet';
  const setMany=(obj)=>Object.entries(obj).forEach(([k,v])=>set(k,v));
  const completedFields=[
    'client','site','date',
    'operationType','sku_count','pallet_positions','avg_inventory','peak_inventory',
    'surface','people_shift','shifts','people_total','origin','destination',
    'inbound_flow','outbound_flow','full_flow','equipment','in_volume','in_time',
    'in_productivity','out_volume','out_time','out_productivity','floor_capacity',
    'ceiling_height','automation_surface','physical_restrictions','pain_description',
    'goals_description','observations_final'
  ];
  const completed=completedFields.filter(k=>String(get(k)).trim()!=='').length;
  const boolGroups=['use_replenishment','use_direct','use_ecommerce','use_transfer','cad','floor_info','flow_diagram','site_photos',
    'photo_receiving','photo_storage','photo_picking','photo_staging','photo_shipments','photo_equipment',
    'pain_capacity','pain_space','pain_labor','pain_productivity','pain_errors','pain_trace','pain_damage','pain_other',
    'goal_capacity','goal_productivity','goal_space','goal_cost','goal_service','goal_growth'
  ];
  const boolDone=boolGroups.filter(k=>get(k)).length;
  const checklist=['check_operation','check_skus','check_capacity','check_surface','check_staff','check_use','check_inbound','check_outbound','check_cad','check_floor','check_flow','check_photos'];
  const checklistDone=checklist.filter(k=>get(k)==='yes'||get(k)==='no').length;
  const progress=Math.round((completed+boolDone+checklistDone)/(completedFields.length+boolGroups.length+checklist.length)*100);

  const sectionByKind=(kind)=>WAREHOUSE_SECTIONS.find(s=>s.kind===kind);

  return <div className="warehouseForm">
    <section className="whHero">
      <div className="whHeroIdentity"><div className="whIcon">WH</div><div><h2>Warehouse First Visit Assessment</h2><p>Instrumento de levantamiento · Primera visita</p></div></div>
      <div className="whHeroActions"><button onClick={()=>alert(JSON.stringify(data,null,2))}>Exportar JSON</button><button onClick={()=>window.print()}>PDF en español</button><button onClick={()=>window.print()}>PDF in English</button><button className="danger" onClick={()=>set({})}>Limpiar</button></div>
    </section>

    <section className="whTitleBand">
      <div><h1>Levantamiento Inicial para Almacenes</h1><p>Instrumento para evaluar oportunidades de automatización en operaciones basadas en tarimas, totes/contenedores, esquemas mixtos u otras unidades de manejo.</p></div>
      <div className="whMeta"><span>Documento<strong>Primera visita</strong></span><span>Tipo<strong>Warehouse</strong></span><span>Estado<strong>{progress<100?'En captura':'Completo'}</strong></span></div>
    </section>

    <div className="whWorkspace">
      <aside className="whLocalNav">
        <div className="whProgressLabel"><span>Avance</span><b>{progress}%</b></div>
        <div className="whProgressTrack"><i style={{width:progress+'%'}} /></div>
        {WAREHOUSE_SECTIONS.map(item=><button key={item.no} aria-label={item.no+' '+item.title} onClick={()=>document.getElementById('wh-'+item.kind)?.scrollIntoView({behavior:'smooth',block:'start'})}><b>{item.no}</b><span>{item.no===1?'Información general':item.no===2?'Tipo de operación':item.no===3?'Volumen y recursos':item.no===4?'Uso y flujo':item.no===5?'Eficiencia':item.no===6?'Infraestructura':item.no===7?'Objetivos':'Cierre'}</span></button>)}
      </aside>

      <div className="whContent">
        <WarehouseCard section={sectionByKind('general')} anchor="wh-general">
          <div className="whGrid2">
            <WarehouseField label="Cliente" type="text" value={get('client')} onChange={v=>set('client',v)} required/>
            <WarehouseField label="Centro de distribución / almacén" type="text" value={get('site')} onChange={v=>set('site',v)} required/>
            <WarehouseField label="Fecha" type="date" value={get('date')} onChange={v=>set('date',v)} required/>
            <WarehouseField label="Responsable del cliente" type="text" value={get('client_owner')} onChange={v=>set('client_owner',v)}/>
            <WarehouseField label="Puesto" type="text" value={get('position')} onChange={v=>set('position',v)}/>
            <WarehouseField label="Consultor responsable" type="text" value={get('consultant')} onChange={v=>set('consultant',v)}/>
          </div>
        </WarehouseCard>

        <WarehouseCard section={sectionByKind('operation')} anchor="wh-operation">
          <div className="whInfoBox">{sectionByKind('operation').intro}</div>
          <div className="whRadioGrid">{sectionByKind('operation').options.map(item=><WarehouseRadioCard key={item[0]} item={item} selected={operationType} onChange={v=>set('operationType',v)}/>)}</div>
          {operationType==='other'&&<div className="whOtherOperation"><WarehouseField label="Describa la unidad de manejo principal" type="text" value={get('other_operation_description')} onChange={v=>set('other_operation_description',v)} placeholder="Ej. cajas, piezas, prendas colgadas, rollos"/></div>}
        </WarehouseCard>

        <WarehouseCard section={sectionByKind('volume')} anchor="wh-volume">
          {operationType==='tote' && <>
            <h4 className="whSubhead">3.1 Operación basada en totes / contenedores</h4>
            <div className="whInfoBox">El árbol menciona más de 5 millones de unidades y capacidad para 3,000 totes como referencia. Confirme si “5m” corresponde a piezas, líneas o movimientos anuales.</div>
            <div className="whGrid4">
              <WarehouseField label="Número de SKUs activos" type="number" value={get('tote_sku_count')} onChange={v=>set('tote_sku_count',v)}/>
              <WarehouseField label="Totes disponibles" type="number" value={get('totes_available')} onChange={v=>set('totes_available',v)}/>
              <WarehouseField label="Unidades / piezas procesadas" type="number" value={get('pieces_processed')} onChange={v=>set('pieces_processed',v)}/>
              <WarehouseSelect label="Periodo del volumen anterior" value={get('volume_period')} onChange={v=>set('volume_period',v)} options={['Diario','Mensual','Anual','Otro']}/>
            </div>
          </>}
          {operationType==='pallet' && <>
            <h4 className="whSubhead">3.1 Operación basada en tarimas</h4>
            <div className="whInfoBox">El árbol utiliza 2,500 tarimas como referencia inicial para identificar operaciones con mayor potencial de automatización; no es un requisito excluyente.</div>
            <div className="whGrid4">
              <WarehouseField label="Número de SKUs activos" type="number" value={get('pallet_sku_count')} onChange={v=>set('pallet_sku_count',v)}/>
              <WarehouseField label="Posiciones de tarima instaladas" type="number" value={get('pallet_positions')} onChange={v=>set('pallet_positions',v)}/>
              <WarehouseField label="Tarimas promedio en inventario" type="number" value={get('avg_inventory')} onChange={v=>set('avg_inventory',v)}/>
              <WarehouseField label="Tarimas pico en inventario" type="number" value={get('peak_inventory')} onChange={v=>set('peak_inventory',v)}/>
            </div>
          </>}
          {operationType==='mixed' && <>
            <h4 className="whSubhead">3.1 Operación basada en tarimas</h4>
            <div className="whInfoBox">El árbol utiliza 2,500 tarimas como referencia inicial para identificar operaciones con mayor potencial de automatización; no es un requisito excluyente.</div>
            <div className="whGrid4">
              <WarehouseField label="Número de SKUs activos" type="number" value={get('mixed_pallet_sku')} onChange={v=>set('mixed_pallet_sku',v)}/>
              <WarehouseField label="Posiciones de tarima instaladas" type="number" value={get('mixed_pallet_positions')} onChange={v=>set('mixed_pallet_positions',v)}/>
              <WarehouseField label="Tarimas promedio en inventario" type="number" value={get('mixed_avg_inventory')} onChange={v=>set('mixed_avg_inventory',v)}/>
              <WarehouseField label="Tarimas pico en inventario" type="number" value={get('mixed_peak_inventory')} onChange={v=>set('mixed_peak_inventory',v)}/>
            </div>
            <h4 className="whSubhead">3.1 Operación basada en totes / contenedores</h4>
            <div className="whInfoBox">El árbol menciona más de 5 millones de unidades y capacidad para 3,000 totes como referencia. Confirme si “5m” corresponde a piezas, líneas o movimientos anuales.</div>
            <div className="whGrid4">
              <WarehouseField label="Número de SKUs activos" type="number" value={get('mixed_tote_sku')} onChange={v=>set('mixed_tote_sku',v)}/>
              <WarehouseField label="Totes disponibles" type="number" value={get('mixed_totes')} onChange={v=>set('mixed_totes',v)}/>
              <WarehouseField label="Unidades / piezas procesadas" type="number" value={get('mixed_pieces')} onChange={v=>set('mixed_pieces',v)}/>
              <WarehouseSelect label="Periodo del volumen anterior" value={get('mixed_period')} onChange={v=>set('mixed_period',v)} options={['Diario','Mensual','Anual','Otro']}/>
            </div>
            <h4 className="whSubhead">3.1 Operación mixta</h4>
            <div className="whGrid3">
              <WarehouseField label="Número total de SKUs" type="number" value={get('mixed_total_skus')} onChange={v=>set('mixed_total_skus',v)}/>
              <WarehouseTextArea label="Unidades de manejo utilizadas" value={get('mixed_handling_units')} onChange={v=>set('mixed_handling_units',v)} placeholder="Ej. tarimas, totes, cajas y piezas"/>
              <WarehouseTextArea label="Participación aproximada por unidad" value={get('mixed_share')} onChange={v=>set('mixed_share',v)} placeholder="Ej. 60% tarimas, 30% totes, 10% cajas"/>
            </div>
          </>}
          {data.operationType==='other' && <>
            <h4 className="whSubhead">3.1 Otra unidad de manejo</h4>
            <div className="whGrid3">
              <WarehouseField label="Número de SKUs" type="number" value={get('other_sku_count')} onChange={v=>set('other_sku_count',v)}/>
              <WarehouseField label="Número de unidades / carriers" type="number" value={get('other_units')} onChange={v=>set('other_units',v)}/>
              <WarehouseTextArea label="Descripción del carrier o unidad" value={get('other_unit_description')} onChange={v=>set('other_unit_description',v)} placeholder="Ej. cajas, charolas, prendas, rollos"/>
            </div>
          </>}
          <h4 className="whSubhead">3.2 Superficie y personal</h4>
          <div className="whGrid4">
            <WarehouseField label="Superficie ocupada por la operación" type="number" value={get('surface')} onChange={v=>set('surface',v)} placeholder="m²"/>
            <WarehouseField label="Personal por turno" type="number" value={get('people_shift')} onChange={v=>set('people_shift',v)}/>
            <WarehouseField label="Número de turnos" type="number" value={get('shifts')} onChange={v=>set('shifts',v)}/>
            <WarehouseField label="Personal total de la operación" type="number" value={get('people_total')} onChange={v=>set('people_total',v)}/>
          </div>
          <small className="whUnitNote">Superficie en m².</small>
        </WarehouseCard>

        <WarehouseCard section={sectionByKind('flow')} anchor="wh-flow">
          <h4 className="whSubhead">4.1 Uso de la operación</h4>
          <div className="whGrid2">
            <WarehouseTextArea label="¿De dónde proviene la mercancía?" value={get('origin')} onChange={v=>set('origin',v)} placeholder="Ej. plantas, proveedores nacionales, importaciones, otros CEDIS"/>
            <WarehouseTextArea label="¿A dónde se envía la mercancía?" value={get('destination')} onChange={v=>set('destination',v)} placeholder="Ej. tiendas, clientes, distribuidores, otros CEDIS"/>
          </div>
          <div className="whCheckGrid four"><WarehouseCheck label="Reabasto a tiendas" checked={get('use_replenishment')} onChange={v=>set('use_replenishment',v)}/><WarehouseCheck label="Entrega directa a clientes" checked={get('use_direct')} onChange={v=>set('use_direct',v)}/><WarehouseCheck label="E-commerce" checked={get('use_ecommerce')} onChange={v=>set('use_ecommerce',v)}/><WarehouseCheck label="Transferencias entre almacenes" checked={get('use_transfer')} onChange={v=>set('use_transfer',v)}/></div>
          <h4 className="whSubhead">4.2 Flujo interno de mercancía</h4>
          <div className="whInfoBox">Describa cómo una tarima, tote u otra unidad pasa desde recibo hasta embarques.</div>
          <div className="whGrid2">
            <WarehouseTextArea label="Flujo de entrada (Inbound)" value={get('inbound_flow')} onChange={v=>set('inbound_flow',v)} placeholder="Ej. cita, andén, descarga, validación, recibo y ubicación"/>
            <WarehouseTextArea label="Flujo de salida (Outbound)" value={get('outbound_flow')} onChange={v=>set('outbound_flow',v)} placeholder="Ej. liberación de pedido, surtido, consolidación, staging y embarque"/>
            <WarehouseTextArea label="Flujo interno completo" value={get('full_flow')} onChange={v=>set('full_flow',v)} placeholder="Describa paso a paso el recorrido de la unidad de manejo"/>
            <WarehouseTextArea label="Equipos de manejo utilizados" value={get('equipment')} onChange={v=>set('equipment',v)} placeholder="Ej. montacargas, patines, conveyors, AMR/AGV"/>
          </div>
        </WarehouseCard>

        <WarehouseCard section={sectionByKind('efficiency')} anchor="wh-efficiency">
          <div className="whInfoBox">“I/O Bound Efficiency” se interpreta como eficiencia de los procesos de entrada y salida. Capture el indicador que el cliente realmente utilice.</div>
          <div className="whTableWrap"><table className="whTable"><thead><tr><th>Proceso</th><th>Volumen</th><th>Tiempo / periodo</th><th>Productividad</th><th>Unidad</th></tr></thead><tbody>
            <tr><td>Recibo / Inbound</td><td><input value={get('in_volume')} onChange={e=>set('in_volume',e.target.value)}/></td><td><input value={get('in_time')} onChange={e=>set('in_time',e.target.value)}/></td><td><input value={get('in_productivity')} onChange={e=>set('in_productivity',e.target.value)}/></td><td><input placeholder="Tarimas/h, totes/h, líneas/h" value={get('in_unit')} onChange={e=>set('in_unit',e.target.value)}/></td></tr>
            <tr><td>Embarque / Outbound</td><td><input value={get('out_volume')} onChange={e=>set('out_volume',e.target.value)}/></td><td><input value={get('out_time')} onChange={e=>set('out_time',e.target.value)}/></td><td><input value={get('out_productivity')} onChange={e=>set('out_productivity',e.target.value)}/></td><td><input placeholder="Tarimas/h, totes/h, pedidos/h" value={get('out_unit')} onChange={e=>set('out_unit',e.target.value)}/></td></tr>
          </tbody></table></div>
          <WarehouseTextArea label="Comentarios sobre cuellos de botella o tiempos de espera" value={get('efficiency_comments')} onChange={v=>set('efficiency_comments',v)} wide/>
        </WarehouseCard>

        <WarehouseCard section={sectionByKind('infrastructure')} anchor="wh-infrastructure">
          <div className="whCheckGrid three"><WarehouseCheck label="Plano CAD actualizado" checked={get('cad')} onChange={v=>set('cad',v)}/><WarehouseCheck label="Información de capacidad del piso" checked={get('floor_info')} onChange={v=>set('floor_info',v)}/><WarehouseCheck label="Diagrama de flujo interno" checked={get('flow_diagram')} onChange={v=>set('flow_diagram',v)}/><WarehouseCheck label="Fotografías del sitio" checked={get('site_photos')} onChange={v=>set('site_photos',v)}/></div>
          <div className="whGrid3">
            <WarehouseField label="Capacidad de carga del piso" type="text" value={get('floor_capacity')} onChange={v=>set('floor_capacity',v)} placeholder="Ej. 5 t/m²"/>
            <WarehouseField label="Altura libre" type="text" value={get('ceiling_height')} onChange={v=>set('ceiling_height',v)} placeholder="Ej. 10 m"/>
            <WarehouseField label="Superficie disponible para automatización" type="text" value={get('automation_surface')} onChange={v=>set('automation_surface',v)} placeholder="Ej. 1,500 m²"/>
          </div>
          <WarehouseTextArea label="Restricciones físicas observadas" value={get('physical_restrictions')} onChange={v=>set('physical_restrictions',v)} placeholder="Ej. columnas, pasillos, andenes, rociadores, racks o desniveles" wide/>
          <h4 className="whSubhead">6.1 Fotografías recomendadas</h4>
          <div className="whCheckGrid three">
            <WarehouseCheck label="Recibo y andenes" checked={get('photo_receiving')} onChange={v=>set('photo_receiving',v)}/><WarehouseCheck label="Área de almacenamiento" checked={get('photo_storage')} onChange={v=>set('photo_storage',v)}/><WarehouseCheck label="Surtido / picking" checked={get('photo_picking')} onChange={v=>set('photo_picking',v)}/><WarehouseCheck label="Consolidación / staging" checked={get('photo_staging')} onChange={v=>set('photo_staging',v)}/><WarehouseCheck label="Embarques" checked={get('photo_shipments')} onChange={v=>set('photo_shipments',v)}/><WarehouseCheck label="Equipos de manejo" checked={get('photo_equipment')} onChange={v=>set('photo_equipment',v)}/>
          </div>
        </WarehouseCard>

        <WarehouseCard section={sectionByKind('painpoints')} anchor="wh-painpoints">
          <h4 className="whSubhead">7.1 Principales problemas</h4>
          <div className="whCheckGrid three">
            <WarehouseCheck label="Capacidad insuficiente" checked={get('pain_capacity')} onChange={v=>set('pain_capacity',v)}/><WarehouseCheck label="Baja utilización del espacio" checked={get('pain_space')} onChange={v=>set('pain_space',v)}/><WarehouseCheck label="Alta dependencia de mano de obra" checked={get('pain_labor')} onChange={v=>set('pain_labor',v)}/><WarehouseCheck label="Baja productividad" checked={get('pain_productivity')} onChange={v=>set('pain_productivity',v)}/><WarehouseCheck label="Errores operativos" checked={get('pain_errors')} onChange={v=>set('pain_errors',v)}/><WarehouseCheck label="Falta de trazabilidad" checked={get('pain_trace')} onChange={v=>set('pain_trace',v)}/><WarehouseCheck label="Daños" checked={get('pain_damage')} onChange={v=>set('pain_damage',v)}/><WarehouseCheck label="Otro" checked={get('pain_other')} onChange={v=>set('pain_other',v)}/>
          </div>
          <WarehouseTextArea label="Descripción y prioridad de los Pain Points" value={get('pain_description')} onChange={v=>set('pain_description',v)} wide/>
          <h4 className="whSubhead">7.2 Objetivos de negocio</h4>
          <div className="whCheckGrid three">
            <WarehouseCheck label="Aumentar capacidad" checked={get('goal_capacity')} onChange={v=>set('goal_capacity',v)}/><WarehouseCheck label="Mejorar productividad" checked={get('goal_productivity')} onChange={v=>set('goal_productivity',v)}/><WarehouseCheck label="Aprovechar mejor el espacio" checked={get('goal_space')} onChange={v=>set('goal_space',v)}/><WarehouseCheck label="Reducir costos" checked={get('goal_cost')} onChange={v=>set('goal_cost',v)}/><WarehouseCheck label="Mejorar nivel de servicio" checked={get('goal_service')} onChange={v=>set('goal_service',v)}/><WarehouseCheck label="Soportar crecimiento" checked={get('goal_growth')} onChange={v=>set('goal_growth',v)}/>
          </div>
          <WarehouseTextArea label="Metas o resultados esperados" value={get('goals_description')} onChange={v=>set('goals_description',v)} wide/>
        </WarehouseCard>

        <WarehouseCard section={sectionByKind('checklist')} anchor="wh-checklist">
          <div className="whTableWrap"><table className="whTable whChecklist"><thead><tr><th>Información</th><th>Sí</th><th>No</th><th>Observación</th></tr></thead><tbody>
            {[
              ['Tipo de operación definido','check_operation'],['Número de SKUs','check_skus'],['Unidades de manejo / capacidad','check_capacity'],['Superficie ocupada','check_surface'],['Personal por turno','check_staff'],['Uso y destinos','check_use'],['Eficiencia Inbound','check_inbound'],['Eficiencia Outbound','check_outbound'],['Plano CAD','check_cad'],['Capacidad del piso','check_floor'],['Flujo interno documentado','check_flow'],['Fotografías del sitio','check_photos']
            ].map(([label,key])=><tr key={key}><td>{label}</td><td><input type="radio" name={key} checked={get(key)==='yes'} onChange={()=>set(key,'yes')}/></td><td><input type="radio" name={key} checked={get(key)==='no'} onChange={()=>set(key,'no')}/></td><td><input className="noteInput" placeholder="Notas" value={get(key+'_note')} onChange={e=>set(key+'_note',e.target.value)}/></td></tr>)}
          </tbody></table></div>
          <div className="whClosureGrid"><div><strong>Completitud</strong><span>{checklistDone} de 12 elementos confirmados</span></div><div><strong>Estado de la visita</strong><span className={checklistDone===12?'ok':'warn'}>{checklistDone===12?'Completa':'Información incompleta'}</span></div></div>
          <WarehouseTextArea label="Observaciones finales del consultor" value={get('observations_final')} onChange={v=>set('observations_final',v)} wide/>
        </WarehouseCard>

        <div className="whFooterActions"><span>Guardado local · {new Date().toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'})}</span><button onClick={()=>window.print()}>Guardar avance</button><button onClick={()=>window.print()}>PDF en español</button><button onClick={()=>window.print()}>PDF in English</button></div>
      </div>
    </div>
  </div>;
}

const sf=(label,type='text',opts={})=>({label,type,...opts});
const sb=(title,items,description='')=>({kind:'group',title,items,description});
const sc=(title,items)=>({kind:'checks',title,items});
const st=(key,columns,rows=20,summary='',title='')=>({kind:'table',key,columns,rows,summary,title});
const SORTING_FORMS={
  sortingInitial:{eyebrow:'SC',appTitle:'Sorting Center Assessment',appSubtitle:'Instrumento de levantamiento · Primera visita',title:'Levantamiento Inicial de Información para Sorting Center',description:'Instrumento profesional para recopilar la información mínima necesaria para evaluar la factibilidad técnica, operativa y económica de una solución de clasificación automatizada.',sections:[
    {title:'Información general',subtitle:'Datos básicos de la visita.',blocks:[sb('',[sf('Cliente','text',{required:true}),sf('Centro de distribución / sitio','text',{required:true}),sf('Fecha','date',{required:true}),sf('Responsable del cliente'),sf('Puesto'),sf('Consultor responsable')])]},
    {title:'Entendimiento de la operación',subtitle:'Volumen, características físicas y calidad del proceso.',blocks:[
      sb('2.1 Volumen de operación',[sf('Volumen promedio diario','number',{required:true,unit:'Paquetes por día.'}),sf('Volumen pico diario','number',{required:true,unit:'Máximo procesado en un día.'}),sf('Volumen mínimo diario','number'),sf('Horas efectivas de operación por día','number',{unit:'Descontando descansos y paros programados.'}),sf('Turnos por día','number'),sf('Horas efectivas por turno','number'),sf('Crecimiento histórico'),sf('Crecimiento esperado para diseño','number',{unit:'Porcentaje adicional para dimensionar la solución.'}),sf('Proyección de volumen a 3 años')],'Capture el volumen realmente procesado, no sólo la capacidad nominal. Confirme si el pico corresponde a temporada alta, promociones o días específicos.'),
      {kind:'table',key:'initial_package_distribution',title:'2.2 Características de los paquetes',description:'Solicite una distribución porcentual por peso y dimensiones. Los valores mínimos y máximos por sí solos no bastan para dimensionar correctamente el equipo.',columns:[{label:'Característica',readOnly:true},{label:'Valor'},{label:'Unidad / referencia',readOnly:true}],initialRows:[['Peso mínimo','','kg'],['Peso máximo','','kg'],['Peso promedio','','kg'],['Dimensiones mínimas','','Largo × ancho × alto'],['Dimensiones máximas','','Largo × ancho × alto'],['Distribución por dimensiones','','% / archivo']]},
      sb('2.3 Calidad de la operación',[sf('Porcentaje de paquetes dañados durante la clasificación','number',{unit:'%'}),sf('¿Se manejan productos frágiles o delicados?','select',{options:['Sí','No']}),sf('Principales causas de daño y observaciones','textarea')])
    ]},
    {title:'Infraestructura',subtitle:'Planos, piso, energía y restricciones físicas.',blocks:[
      sc('3.1 Información del inmueble',[['cad','Plano CAD actualizado'],['arq','Plano arquitectónico'],['est','Plano estructural']]),
      sb('3.2 Piso',[sf('¿Existe estudio de planicidad?','select',{options:['Sí','No','Pendiente']}),sf('Capacidad de carga del piso'),sf('Espesor de la losa de concreto'),sf('Observaciones del piso','textarea')]),
      sb('3.3 Energía eléctrica',[sf('Voltaje disponible'),sf('Capacidad eléctrica disponible para nuevos equipos'),sf('¿Existe capacidad eléctrica suficiente?','select',{options:['Sí','No','Pendiente de validar']}),sf('Observaciones eléctricas','textarea')],'Se busca confirmar si el sitio puede alimentar el sistema de clasificación y sus equipos auxiliares sin una ampliación mayor.'),
      sb('3.4 Sistema contra incendio y restricciones físicas',[sf('Tipo de sistema contra incendio'),sf('Altura libre disponible'),sf('Restricciones para instalar bandas transportadoras o equipos','textarea'),sf('Elementos que limitan la altura','textarea')])
    ]},
    {title:'Sistemas e integración',subtitle:'Aplicaciones actuales, interfaces, identificación y manejo de excepciones.',blocks:[
      sc('4.1 Sistemas actuales',[['wms','WMS'],['erp','ERP'],['tms','TMS'],['oms','OMS'],['prop','Sistema propio']]),
      sb('Sistema principal',[sf('Nombre y descripción del sistema principal')]),
      sc('4.2 Método de integración disponible',[['rest','REST API'],['soap','SOAP'],['ws','Web Services'],['db','Base de datos'],['files','Archivos CSV / XML'],['ftp','FTP / SFTP'],['mqtt','MQTT'],['opc','OPC-UA'],['otroint','Otro']]),
      sb('Comentarios sobre integración',[sf('Comentarios sobre integración','textarea')],'Seleccione cómo puede intercambiar información el sistema actual con la solución de clasificación.'),
      {kind:'table',key:'initial_identification_mix',title:'4.3 Tecnologías de identificación utilizadas',description:'Distribuya el volumen según la forma en que actualmente se identifica cada paquete. La suma debe ser 100%.',columns:[{label:'Tecnología',readOnly:true},{label:'% del volumen',type:'number'},{label:'Comentarios'}],initialRows:[['Código de barras 1D','',''],['QR / Código 2D','',''],['OCR','',''],['RFID','',''],['Captura manual','','']],summary:'% del volumen'},
      sb('4.4 Tasa de lectura automática (Read Rate)',[sf('Read Rate actual','number',{unit:'%'}),sf('Porcentaje de No Read','number',{unit:'%'})],'Indique el porcentaje de lecturas automáticas exitosas en el primer intento. No incluya la captura manual.'),
      sb('4.5 Manejo de excepciones',[sf('¿Qué sucede cuando un paquete no puede leerse o clasificarse?','textarea')])
    ]},
    {title:'Requerimientos de clasificación',subtitle:'Flujo, capacidad requerida, destinos, alimentación y descarga.',blocks:[
      {kind:'flow',title:'5.1 Flujo operativo actual o requerido',items:[sf('Entrada / Alimentación','textarea',{help:'Describa cómo llegan los paquetes al sistema de clasificación.',placeholder:'Ej. descarga de camión, jaulas, tarimas o alimentación manual sobre banda'}),sf('Clasificación','textarea',{help:'Describa cómo se separan actualmente o cómo se espera separarlos.',placeholder:'Ej. manual por operador, manual con montacargas, por zonas, cross-belt, shoe sorter o tilt tray'}),sf('Salida / Consolidación','textarea',{help:'Describa cómo se agrupan y despachan los paquetes clasificados.',placeholder:'Ej. bolsas, jaulas, gaylords, tarimas, rutas o destinos'})]},
      sb('5.2 Capacidad requerida del sistema de clasificación',[sf('Capacidad mínima con volumen promedio','output',{key:'capProm'}),sf('Capacidad mínima con volumen pico','output',{key:'capPico'}),sf('Capacidad recomendada para diseño','output',{key:'capDiseno'}),sf('Capacidad estimada por turno','output',{key:'capTurno'}),sf('Capacidad estimada por día','output',{key:'capDia'}),sf('Capacidad definida por el cliente','number',{help:'Capture sólo si el cliente ya definió una capacidad contractual o de diseño.'})],'La aplicación calcula automáticamente la capacidad mínima y la capacidad recomendada para diseño con base en el volumen diario, las horas efectivas de operación y el crecimiento esperado.'),
      {kind:'note',text:'Fórmula: capacidad recomendada = (volumen pico diario ÷ horas efectivas de operación) × (1 + crecimiento esperado).'},
      sb('5.3 Destinos de clasificación',[sf('Destinos locales','number'),sf('Destinos regionales','number'),sf('Destinos nacionales','number'),sf('Destinos internacionales','number')]),
      sc('5.4 Método de alimentación',[['fm','Carga manual'],['fb','Banda transportadora'],['fr','Transportador de rodillos'],['fro','Robot'],['fmi','Mixto']]),
      sc('5.5 Método de descarga / consolidación',[['ob','Sacos o bolsas'],['oc','Contenedores'],['oj','Jaulas'],['og','Gaylords'],['ot','Tarimas'],['oo','Otro']])
    ]},
    {title:'Recorrido por la operación',subtitle:'Áreas observadas y evidencia fotográfica.',blocks:[sc('6.1 Áreas observadas',[['r1','Recibo'],['r2','Alimentación'],['r3','Identificación'],['r4','Clasificación'],['r5','Consolidación'],['r6','Embarques']]),sc('6.2 Fotografías requeridas',[['f1','Alimentación'],['f2','Clasificador actual'],['f3','Lectores'],['f4','Bandas y transportadores'],['f5','Salidas / chutes'],['f6','Áreas disponibles'],['f7','Columnas'],['f8','Restricciones físicas'],['f9','Tableros y cuartos eléctricos']]),sb('',[sf('Observaciones del recorrido','textarea')])]},
    {title:'Identificación de problemas',subtitle:'Principales retos actuales del cliente.',blocks:[sc('',[['p1','Capacidad insuficiente'],['p2','Dependencia de mano de obra'],['p3','Errores de clasificación'],['p4','Retrasos'],['p5','Daños'],['p6','Costos operativos'],['p7','Falta de espacio'],['p8','Falta de trazabilidad'],['p9','Otro']]),sb('',[sf('Descripción y prioridad de los problemas','textarea')])]},
    {title:'Expectativas del cliente',subtitle:'Resultados que espera obtener con la automatización.',blocks:[sc('',[['e1','Mayor capacidad'],['e2','Menor costo operativo'],['e3','Mayor precisión'],['e4','Menor tiempo de proceso'],['e5','Capacidad para crecimiento futuro'],['e6','Mayor visibilidad operativa']]),sb('',[sf('Comentarios del cliente','textarea')])]},
    {title:'Información indispensable para preparar la propuesta',subtitle:'Checklist final antes de concluir la visita.',blocks:[{kind:'checklist',key:'initial_closure',items:['Volumen diario','Volumen pico','Distribución de dimensiones','Distribución de pesos','Plano CAD','Plano del inmueble','Restricciones eléctricas','Sistema contra incendio','WMS identificado','Método de integración','Destinos','Capacidad requerida','Método de alimentación','Método de descarga','Fotografías']},sb('',[sf('Observaciones finales del consultor','textarea')]) ]}
  ]},
  sortingDetailed:{eyebrow:'CA',appTitle:'Engineering Design Input',appSubtitle:'Cuestionario de levantamiento y diseño',title:'Cuestionario de Ingeniería para Sorting Center',description:'Capture los parámetros físicos, operativos y de flujo requeridos para dimensionar una solución de clasificación automatizada.',sections:[
    {title:'Información general',subtitle:'Condiciones físicas y servicios disponibles en el sitio donde se implementará la solución.',blocks:[sb('',[sf('Dirección del centro de clasificación','textarea',{help:'Dirección completa del sitio donde se instalará la solución.'}),sf('Superficie total construida del inmueble','number',{unit:'m²'}),sf('Superficie disponible para este proyecto','number',{unit:'m²'}),sf('Altura libre del edificio','number',{unit:'m'}),sf('Variaciones de altura dentro del almacén','textarea'),sf('Rango anual de temperatura de operación'),sf('Suministro eléctrico disponible'),sf('Capacidad de carga del piso','number',{unit:'kN/m²'})])]},
    {title:'Datos de diseño',subtitle:'Parámetros operativos utilizados para dimensionar el sistema de clasificación y los procesos asociados.',blocks:[
      sb('Capacidad',[sf('Capacidad de clasificación por día','number',{unit:'unidades/día'}),sf('Capacidad de clasificación por hora','number',{unit:'unidades/h'}),sf('Turnos de operación por día','number',{unit:'turnos/día'}),sf('Horas efectivas por turno','number',{unit:'h/turno'}),sf('Coeficiente de pico','number',{unit:'factor'}),sf('Destinos de clasificación de salida','number',{unit:'destinos'}),sf('Rutas de embarque','number',{unit:'rutas'})]),
      sb('Excepciones del producto',[sf('Porcentaje de paquetes con forma irregular','number',{unit:'%'}),sf('Porcentaje de paquetes frágiles','number',{unit:'%'}),sf('Porcentaje de otras excepciones','number',{unit:'%'}),sf('Especifique otras excepciones','textarea')]),
      sb('Almacenamiento temporal / buffers',[sf('Capacidad requerida del buffer de recibo','number',{unit:'paquetes'}),sf('Capacidad requerida del buffer de embarques','number',{unit:'paquetes'})]),
      sc('Características de los paquetes · Materiales de empaque',[['carton','Cartón corrugado'],['bolsa','Bolsa plástica / sobre'],['plastico','Plástico rígido'],['madera','Madera'],['metal','Metal'],['otro','Otro']]),
      sb('',[sf('Colores de empaque'),sf('Dimensiones promedio del paquete'),sf('Peso promedio del paquete','number',{unit:'kg'}),sf('Dimensiones mínimas del paquete a clasificar'),sf('Dimensiones máximas del paquete a clasificar'),sf('Rango de peso de los paquetes','text')]),
      sc('Contenedores de recibo (Inbound)',[['in_saco','Saco / bolsa'],['in_caja','Caja'],['in_tarima','Tarima'],['in_carro','Carro / jaula'],['in_gaylord','Gaylord'],['in_otro','Otro']]),
      sb('',[sf('Dimensiones de los contenedores de recibo'),sf('Cantidad promedio de paquetes por saco o bolsa','number',{unit:'paquetes/saco'}),sf('Cantidad promedio de sacos o bolsas por tarima','number',{unit:'sacos/tarima'}),sf('Cantidad promedio de paquetes por tarima','number',{unit:'paquetes/tarima'}),sf('Cantidad promedio de paquetes por carro o Gaylord','number',{unit:'paquetes/unidad'})]),
      sc('Contenedores de embarque (Outbound)',[['out_saco','Saco / bolsa'],['out_caja','Caja'],['out_tarima','Tarima'],['out_carro','Carro / jaula'],['out_gaylord','Gaylord'],['out_otro','Otro']]),
      sb('',[sf('Dimensiones de los contenedores de embarque'),sf('Cantidad promedio de paquetes por saco, bolsa o caja','number',{unit:'paquetes/unidad'}),sf('Cantidad promedio de sacos, bolsas o cajas por tarima','number',{unit:'unidades/tarima'}),sf('Cantidad promedio de paquetes por tarima','number',{unit:'paquetes/tarima'}),sf('Cantidad promedio de paquetes por carro o Gaylord','number',{unit:'paquetes/unidad'})]),
      sb('Documentación requerida',['Plano del sitio en formato DWG','Datos masivos de dimensiones de paquetes','Datos masivos de peso de paquetes','Fotografías de paquetes','Fotografías del sitio','Diagrama de flujo operativo y/o SOP','Distribución porcentual por destino de clasificación','Hora límite de salida por ruta'].map((x)=>sf(x,'select',{options:['Disponible','No disponible','Pendiente de confirmar']}))),
      sb('Alcance del proceso',['¿Se requiere recibo automático de paquetes en los andenes?','¿Se requiere medir dimensiones o peso de cada paquete?','¿Se requiere escaneo y clasificación automática de sacos o bolsas en embarques?'].map(x=>sf(x,'select',{options:['Disponible','No disponible','Pendiente de confirmar']})))
    ]},
    {title:'Datos de dimensiones y peso',subtitle:'Pegue datos directamente desde Excel. Cada renglón representa un paquete.',blocks:[st('dim_weight',[{label:'Paquete'},{label:'Largo (mm)',type:'number'},{label:'Ancho (mm)',type:'number'},{label:'Alto (mm)',type:'number'},{label:'Peso (g)',type:'number'}],20,'Puede seleccionar una celda y pegar un bloque copiado desde Excel. Use Tab o las flechas para navegar.') ]},
    {title:'Proporción del flujo por destino',subtitle:'Capture cada destino y su participación porcentual. El total debe sumar 100 %.',blocks:[st('destination_flow',[{label:'Destino'},{label:'Proporción del volumen (%)',type:'number'}],20,'Puede seleccionar una celda y pegar un bloque copiado desde Excel. Use Tab o las flechas para navegar.') ]},
    {title:'Reglas de salida',subtitle:'Describa cómo se consolidan los destinos en tarimas u otras unidades de manejo y cómo se asignan a rutas, transportistas o vehículos.',blocks:[st('outbound_rules',[{label:'Destino'},{label:'Regla de consolidación / unidad de manejo'},{label:'Regla de carga / ruta / transportista'},{label:'Comentarios'}],24,'Puede seleccionar una celda y pegar un bloque copiado desde Excel. Use Tab o las flechas para navegar.') ]},
    {title:'SLA operativo opcional',subtitle:'Capture las ventanas de recibo y embarque, la proporción del volumen y las horas límite. Puede pegar desde Excel.',blocks:[st('sla_inbound',[{label:'Ventana'},{label:'Hora de recibo',type:'time'},{label:'Proporción (%)',type:'number'},{label:'Hora límite de embarque',type:'time'}],12,'Puede seleccionar una celda y pegar un bloque copiado desde Excel. Use Tab o las flechas para navegar.','Recepciones (Inbound)'),st('sla_outbound',[{label:'Ventana'},{label:'Hora de embarque',type:'time'},{label:'Proporción (%)',type:'number'}],12,'Puede seleccionar una celda y pegar un bloque copiado desde Excel. Use Tab o las flechas para navegar.','Embarques (Outbound)') ]}
  ]}
};

function SortingField({field,data,set}){
  const key=field.key||getKey(field.label),value=data[key]??'';
  const help=<details className="sortingHelp"><summary>ⓘ ¿Qué significa?</summary><p>{field.help||`Dato utilizado para definir ${field.label.toLowerCase()} en el diseño del centro de clasificación.`}</p></details>;
  if(field.type==='output')return <label className="wfField"><span>{field.label}</span><output className="sortingOutput">{sortingCalculatedValue(field.key,data)}</output>{help}</label>;
  if(field.type==='select')return <label className="wfField"><span>{field.label}{field.required&&' *'}</span><select value={value} onChange={e=>set(key,e.target.value)}><option value="">Seleccione</option>{(field.options||[]).map(x=><option key={x}>{x}</option>)}</select>{help}</label>;
  const wide=field.type==='textarea';
  return <label className={'wfField'+(wide?' wide':'')}><span>{field.label}{field.required&&' *'}</span><div className="sortingUnitField"><input type={field.type||'text'} value={value} required={field.required} onChange={e=>set(key,e.target.value)}/>{field.unit&&<small>{field.unit}</small>}</div>{field.unit&&field.type==='textarea'&&<small>{field.unit}</small>}{help}</label>;
}

function sortingCalculatedValue(which,data){
  const number=label=>Number(String(data[getKey(label)]||'').replace(',','.'))||0;
  const hours=number('Horas efectivas de operación por día');
  const peak=number('Volumen pico diario');
  const average=number('Volumen promedio diario');
  const growth=number('Crecimiento esperado para diseño')/100;
  const turns=number('Turnos por día');
  const value=which==='capProm'&&hours?average/hours:which==='capPico'&&hours?peak/hours:which==='capDiseno'&&hours?peak/hours*(1+growth):which==='capTurno'&&hours&&turns?peak/hours/turns:which==='capDia'?peak*(1+growth):null;
  return value===null?'—':`${Math.ceil(value).toLocaleString('es-MX')} ${which==='capDia'?'paquetes/día':'paquetes/h'}`;
}

function SortingBlock({block,data,set}){
  if(block.kind==='note')return <div className="sortingCallout">{block.text}</div>;
  if(block.kind==='checks')return <fieldset className="sortingCheckGroup"><legend>{block.title}</legend><div>{block.items.map(([key,label])=><label key={key}><input type="checkbox" checked={Boolean(data['check_'+key])} onChange={e=>set('check_'+key,e.target.checked)}/><span>{label}</span></label>)}</div></fieldset>;
  if(block.kind==='flow')return <div className="sortingFlowBlock">{block.title&&<h4>{block.title}</h4>}<div className="sortingFlowGrid">{block.items.map(field=>{const key=field.key||getKey(field.label),id='sorting-flow-'+key,helpId=id+'-help';return <article className="sortingFlowCard" key={key}><label htmlFor={id}>{field.label}</label><p id={helpId}>{field.help}</p><textarea id={id} rows={4} placeholder={field.placeholder||''} value={data[key]??''} required={field.required} aria-describedby={helpId} onChange={e=>set(key,e.target.value)}/></article>})}</div></div>;
  if(block.kind==='table')return <SortingTable block={block} data={data} set={set}/>;
  if(block.kind==='checklist')return <SortingChecklist block={block} data={data} set={set}/>;
  return <div className="sortingGroup">{block.title&&<h4>{block.title}</h4>}{block.description&&<p className="sortingHint">{block.description}</p>}<div className="wfGrid">{block.items.map(field=><SortingField key={field.label} field={field} data={data} set={set}/>)}</div></div>;
}

function sortingSectionProgress(section,data){
  const values=[];
  for(const block of section.blocks){
    if(block.kind==='checks'){
      block.items.forEach(([key])=>values.push(Boolean(data['check_'+key])));
    }else if(block.kind==='checklist'){
      block.items.forEach((_,index)=>values.push(Boolean(data[`${block.key}_${index}_answer`])));
    }else if(block.kind==='table'){
      const rows=data['sorting_'+block.key]||[];
      const editableColumns=block.columns.filter(column=>!column.readOnly).length;
      const activeRows=rows.filter(row=>Array.isArray(row)&&row.some(Boolean));
      const filled=activeRows.reduce((sum,row)=>sum+row.filter(Boolean).length,0);
      values.push(editableColumns&&activeRows.length?Math.min(1,filled/(activeRows.length*editableColumns)):0);
    }else if(block.kind!=='note'){
      block.items.filter(field=>field.type!=='output').forEach(field=>values.push(Boolean(data[field.key||getKey(field.label)])));
    }
  }
  return values.length?Math.round(values.reduce((sum,value)=>sum+(typeof value==='number'?value:Number(value)),0)/values.length*100):0;
}

function SortingTable({block,data,set}){
  const key='sorting_'+block.key;
  const rows=data[key]||block.initialRows||Array.from({length:block.rows||1},()=>block.columns.map(()=>''));
  const change=(r,c,value)=>set(key,rows.map((row,i)=>i===r?row.map((cell,j)=>j===c?value:cell):row));
  const add=(amount)=>set(key,[...rows,...Array.from({length:amount},()=>block.columns.map(()=>''))]);
  const clear=()=>set(key,block.initialRows||Array.from({length:block.rows||1},()=>block.columns.map(()=>'')));
  const percentColumn=block.columns.findIndex(c=>c.label.includes('%'));
  const total=percentColumn>=0?rows.reduce((sum,row)=>sum+(Number(row[percentColumn])||0),0):null;
  return <div className="sortingTableBlock"><div className="sortingBlockTitle"><div><h4>{block.title}</h4>{block.description&&<p>{block.description}</p>}</div><span>{percentColumn>=0?`${Math.round((rows.filter(row=>row.some(Boolean)).length/Math.max(rows.length,1))*100)}%`:' '}</span></div><div className="sortingTableActions"><button type="button" onClick={()=>add(5)}>＋ Agregar 5 filas</button><button type="button" onClick={()=>add(20)}>＋ Agregar 20 filas</button><button type="button" onClick={clear}>Limpiar tabla</button></div><div className="sortingTableWrap"><table><thead><tr><th>#</th>{block.columns.map(c=><th key={c.label}>{c.label}</th>)}<th></th></tr></thead><tbody>{rows.map((row,r)=><tr key={r}><td>{r+1}</td>{block.columns.map((col,c)=><td key={col.label}>{col.readOnly?<span>{row[c]}</span>:<input aria-label={`${col.label}, fila ${r+1}`} type={col.type||'text'} value={row[c]||''} onChange={e=>change(r,c,e.target.value)} onPaste={e=>{const pasted=e.clipboardData.getData('text');if(!pasted.includes('\t')&&!pasted.includes('\n'))return;e.preventDefault();const matrix=pasted.split(/\r?\n/).filter(Boolean).map(line=>line.split('\t'));const expanded=rows.map(x=>[...x]);matrix.forEach((line,ri)=>line.forEach((cell,ci)=>{const rr=r+ri,cc=c+ci;if(!expanded[rr])expanded[rr]=block.columns.map(()=> '');if(cc<block.columns.length)expanded[rr][cc]=cell;}));set(key,expanded);}}/>}</td>)}<td><button type="button" className="sortingDeleteRow" aria-label="Eliminar fila" onClick={()=>set(key,rows.filter((_,i)=>i!==r))}>×</button></td></tr>)}</tbody></table></div><p className="sortingPasteHint">{percentColumn>=0?<>Total porcentual: <strong>{total.toFixed(1)}%</strong></>:block.summary|| (block.description?.includes('Excel')?'Puede seleccionar una celda y pegar un bloque copiado desde Excel. Use Tab o las flechas para navegar.':'')}</p></div>;
}

function SortingChecklist({block,data,set}){
  const yesCount=block.items.filter((_,i)=>data[`${block.key}_${i}_answer`]).length;
  return <div className="sortingTableWrap"><table className="sortingClosure"><thead><tr><th>Información</th><th>Sí</th><th>No</th><th>Observación</th></tr></thead><tbody>{block.items.map((item,i)=><tr key={item}><td>{item}</td>{['yes','no'].map(answer=><td key={answer}><input type="radio" name={`${block.key}_${i}`} checked={data[`${block.key}_${i}_answer`]===answer} onChange={()=>set(`${block.key}_${i}_answer`,answer)}/></td>)}<td><input aria-label={`Observación: ${item}`} value={data[`${block.key}_${i}_note`]||''} onChange={e=>set(`${block.key}_${i}_note`,e.target.value)}/></td></tr>)}</tbody></table><div className="sortingClosureStatus"><span><b>Completitud</b>{yesCount} de {block.items.length} elementos confirmados</span><span><b>Estado de la visita</b><em className={yesCount===block.items.length?'ok':'warn'}>{yesCount===block.items.length?'Completa':'Información incompleta'}</em></span></div></div>;
}

function SortingFormSections({formId,data,setData,onSave}){
  const form=SORTING_FORMS[formId];
  const [activeSection,setActiveSection]=useState(0);
  const set=(key,value)=>setData(prev=>({...prev,[key]:value}));
  const progress=Math.min(100,Math.round(Object.values(data).filter(value=>Array.isArray(value)?value.some(row=>Array.isArray(row)?row.some(Boolean):Boolean(row)):Boolean(value)).length/Math.max(1,Object.keys(data).length+8)*100));
  const exportJson=()=>downloadSortingFile(`${formId}.json`,JSON.stringify({form:form.title,data},null,2),'application/json');
  const exportCsv=()=>{const tables=Object.entries(data).filter(([key,value])=>key.startsWith('sorting_')&&Array.isArray(value));const csv=tables.map(([key,rows])=>`"${key}"\n${rows.map(row=>row.map(cell=>`"${String(cell??'').replaceAll('"','""')}"`).join(',')).join('\n')}`).join('\n\n');downloadSortingFile(`${formId}-tablas.csv`,csv,'text/csv;charset=utf-8');};
  const goToSection=(index)=>{setActiveSection(index);document.getElementById(`sorting-section-${index}`)?.scrollIntoView({behavior:'smooth',block:'start'});};
  return <div className="sortingExperience">
    <div className="sortingAppHeader"><div className="sortingAppMark">{form.eyebrow}</div><div><strong>{form.appTitle}</strong><span>{form.appSubtitle}</span></div><div className="sortingAppActions"><button type="button" onClick={exportJson}>Exportar JSON</button>{formId==='sortingDetailed'&&<button type="button" onClick={exportCsv}>Exportar tablas CSV</button>}<button type="button" onClick={()=>window.print()}>PDF en español</button><button type="button" onClick={()=>window.print()}>PDF in English</button><button type="button" className="sortingClearButton" onClick={()=>window.confirm('¿Limpiar los datos capturados de este formulario?')&&setData({})}>Limpiar</button></div></div>
    <div className="sortingHero"><div><h2>{form.title}</h2><p>{form.description}</p></div><div className="sortingHeroMeta"><span>Documento<strong>{formId==='sortingInitial'?'Primera visita':'Engineering Input'}</strong></span><span>Instalación<strong>Centro de clasificación</strong></span><span>Estado<strong>En captura</strong></span></div></div>
    <div className="sortingLayout"><nav className="sortingProgress" aria-label="Secciones del formulario"><div>Avance <b>{progress}%</b></div><div className="sortingProgressBar"><i style={{width:`${progress}%`}}/></div>{form.sections.map((section,index)=><button key={section.title} className={activeSection===index?'active':''} onClick={()=>goToSection(index)}><b>{index+1}</b>{section.title}</button>)}</nav><div className="sortingSections">{form.sections.map((section,index)=><section className="wfCard sortingSection" id={`sorting-section-${index}`} key={section.title}><header><b>{index+1}</b><div><h3>{section.title}</h3><p>{section.subtitle}</p></div><span className="sortingSectionCompletion">{sortingSectionProgress(section,data)}%</span></header><div className="wfBody">{section.blocks.map((block,i)=><SortingBlock key={`${section.title}-${i}`} block={block} data={data} set={set}/>)}</div></section>)}</div></div>
  </div>;
}

function downloadSortingFile(name,content,type){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=name;link.click();URL.revokeObjectURL(url);}


const WAREHOUSE_DETAIL_SECTIONS=[
 {title:'Información clave',subtitle:'Documentación indispensable para entender y diseñar el proyecto.',fields:[
  {label:'SOP (Standard Operating Procedure) del proceso',type:'file',help:'Procedimiento operativo estándar actualizado. Puede cargarse al repositorio del proyecto.'},
  {label:'Comentarios sobre SOP',type:'textarea'},
  {label:'Planos arquitectónicos del almacén (DWG)',type:'file',help:'Plano general del inmueble en formato CAD.'},
  {label:'Comentarios sobre planos arquitectónicos',type:'textarea'},
  {label:'Diagrama de flujo de operación, sistemas y equipos',type:'file',help:'Indique entradas, almacenamiento, procesos y salidas.'},
  {label:'Comentarios sobre el diagrama de flujo',type:'textarea'}
 ]},
 {title:'Información general',subtitle:'Perfil, ubicación, uso y fechas objetivo del centro.',fields:[
  {label:'Industria / categorías de SKU',type:'checks',options:['Moda','Cosméticos','Electrodomésticos','Maquinado','Electrónica','Productos de consumo diario','Tabaco','Farmacéutica','Automotriz','Otra']},
  {label:'Especifique otra industria',type:'text'},
  {label:'Ubicación del proyecto',type:'textarea'},
  {label:'Uso previsto del almacén',type:'checks',options:['Almacenamiento','Fulfillment','Distribución','Cross-dock','Manufactura','Otro']},
  {label:'Fecha objetivo de inicio del proyecto',type:'date'},
  {label:'Fecha objetivo de entrega / puesta en marcha',type:'date'}
 ]},
 {title:'Operación actual',subtitle:'Calendario, equipos, unidades de manejo, volúmenes y recursos.',fields:[
  {label:'Días de operación por semana (normal)',type:'number'},
  {label:'Días de operación por semana (pico)',type:'number'},
  {label:'Turnos por día (normal)',type:'number'},
  {label:'Turnos por día (pico)',type:'number'},
  {label:'Horas efectivas por turno (normal)',type:'number'},
  {label:'Horas efectivas por turno (pico)',type:'number'},
  {label:'Equipos utilizados en recibo',type:'checks',options:['Montacargas','Patín','Transportador','Equipo manual','Otro']},
  {label:'Cantidad de equipos de recibo',type:'number'},
  {label:'Equipos utilizados en embarque',type:'checks',options:['Montacargas','Patín','Transportador','Equipo manual','Otro']},
  {label:'Cantidad de equipos de embarque',type:'number'},
  {label:'Sistemas actuales de almacenamiento',type:'checks',options:['Rack selectivo','Rack dinámico','Estantería','Piso','Mezzanine','Otro']},
  {label:'Unidades manejadas en recibo',type:'text',help:'Especifique tarimas, cajas, totes u otras unidades y el volumen.'},
  {label:'Unidades manejadas en embarque',type:'text'},
  {label:'Tipo de vehículo de recibo y longitud',type:'text'},
  {label:'Tipo de vehículo de embarque y longitud',type:'text'},
  {label:'Operadores en recibo',type:'number'},
  {label:'Operadores en embarque',type:'number'},
  {label:'Operadores totales en la operación',type:'number'}
 ]},
 {title:'Necesidades principales',subtitle:'Resultados de negocio que el proyecto debe alcanzar.',fields:[
  {label:'Objetivos principales del proyecto',type:'checks',options:['Aumentar capacidad','Mejorar productividad','Reducir costos','Mejorar nivel de servicio','Aprovechar espacio','Mejorar seguridad','Soportar crecimiento','Reducir errores','Otro']},
  {label:'Prioridades y criterios de éxito',type:'textarea'}
 ]},
 {title:'Condiciones del inmueble',subtitle:'Configuración física, planos y sistemas de protección.',fields:[
  {label:'Tipo de almacén',type:'select',options:['Nuevo','Existente']},
  {label:'Plano arquitectónico general',type:'file'},
  {label:'Comentarios del plano',type:'textarea'},
  {label:'Área designada para el proyecto en CAD',type:'file'},
  {label:'Comentarios sobre el área del proyecto',type:'textarea'},
  {label:'Requisitos de rociadores (sprinklers)',type:'select',options:['Sí','No','Por confirmar']},
  {label:'Clasificación de protección contra incendio',type:'text'},
  {label:'Dimensiones del área del proyecto: ancho (m)',type:'number'},
  {label:'Dimensiones del área del proyecto: largo (m)',type:'number'},
  {label:'Dimensiones del área del proyecto: altura (m)',type:'number'},
  {label:'Área total del proyecto incluyendo periféricos (m²)',type:'number'},
  {label:'Número de niveles del edificio',type:'number'},
  {label:'Capacidad de carga del piso (kg/m²)',type:'number'},
  {label:'Altura libre disponible (m)',type:'number'}
 ]},
 {title:'Condiciones básicas',subtitle:'Unidades de manejo, capacidades, productos y flujos.',fields:[
  {label:'¿Se utilizarán unidades de manejo existentes?',type:'select',options:['Existentes','Nuevas','Por definir']},
  {label:'Tipos de unidades existentes',type:'checks',options:['Tarima','Tote','Caja','Otra']},
  {label:'Fotografías de las unidades existentes',type:'file'},
  {label:'Ruta de circulación requerida',type:'select',options:['Sólo almacenamiento','Dentro del almacén','De extremo a extremo']},
  {label:'Número esperado de SKU',type:'number'},
  {label:'Capacidad total de almacenamiento requerida',type:'number'},
  {label:'Unidad de capacidad',type:'select',options:['Tarimas','Totes','Cajas','Ubicaciones','Otra']},
  {label:'Tipos de unidades de salida / embarque',type:'checks',options:['Tarima','Caja','Tote','Paquete','Otro']},
  {label:'¿Se conserva el empaque original o se usan totes?',type:'select',options:['Empaque original','Totes','Ambos','Por definir']},
  {label:'Material del tote',type:'text'},
  {label:'Dimensiones del tote (L × A × H)',type:'text'},
  {label:'Peso bruto y carga útil del tote',type:'text'},
  {label:'Apilable / encajable',type:'select',options:['Apilable','Encajable','Ambos','Ninguno']},
  {label:'Listado detallado de SKU / totes',type:'file'},
  {label:'Fotografías de producto, tote y empaque',type:'file'},
  {label:'Características del producto y manejo especial',type:'textarea'},
  {label:'Días de inventario por SKU / ciclo',type:'textarea'},
  {label:'Requerimientos de zonificación',type:'textarea'},
  {label:'Flujo de recibo (unidades por hora y por día)',type:'textarea'},
  {label:'Flujo de embarque (unidades por hora y por día)',type:'textarea'},
  {label:'Flujo de reabastecimiento (unidades por hora y por día)',type:'textarea'},
  {label:'Flujo de picking (unidades por hora y por día)',type:'textarea'}
 ]},
 {title:'Sistemas de control e información',subtitle:'Identificación, calidad de datos e integración con sistemas.',fields:[
  {label:'¿Se utilizan códigos de barras o QR?',type:'select',options:['Sí','No','Por confirmar']},
  {label:'Tipo de código',type:'select',options:['Código de barras','QR','Ambos','Otro']},
  {label:'Ubicación de etiqueta en la unidad',type:'text'},
  {label:'¿Se requiere integración con ERP/WMS u otros sistemas?',type:'select',options:['Sí','No','Por confirmar']},
  {label:'¿El sistema fuente proporciona un código único?',type:'select',options:['Sí','No','Por confirmar']},
  {label:'WMS actual y versión',type:'text'},
  {label:'Requisitos de integración WMS / ERP / solución automatizada',type:'textarea'},
  {label:'Comentarios sobre datos e interfaces',type:'textarea'}
 ]},
 {title:'Condiciones del ambiente de operación',subtitle:'Entorno, temperatura, humedad y calendario anual.',fields:[
  {label:'Clasificación del ambiente',type:'checks',options:['Normal','GMP','Libre de polvo','A prueba de explosión','Otro']},
  {label:'Especifique condiciones especiales',type:'textarea'},
  {label:'Rango de temperatura',type:'select',options:['0–40 °C','Otro']},
  {label:'Rango de temperatura (otro)',type:'text'},
  {label:'Rango de humedad relativa',type:'select',options:['10–90 %','Otro']},
  {label:'Rango de humedad (otro)',type:'text'},
  {label:'Horas por turno',type:'number'},
  {label:'Turnos por día',type:'number'},
  {label:'Días por semana',type:'number'},
  {label:'Días por año',type:'number'}
 ]},
 {title:'Otras condiciones especiales',subtitle:'Normativa aplicable, seguridad y requisitos adicionales.',fields:[
  {label:'Normativa local aplicable',type:'checks',options:['Seguridad','Protección contra incendios','Sanitaria','Ambiental','Construcción','Otra']},
  {label:'Describa normas, estándares o certificaciones',type:'textarea'},
  {label:'Otras condiciones especiales del proyecto',type:'textarea'},
  {label:'Comentarios finales',type:'textarea'}
 ]}
];

const AMR_INPUTS=[
 {key:'process_type',label:'Tipo de proceso',type:'select',options:['Picking AMR','Goods-to-person','Pallets/AGV','Totes/Bins','Mixta'],guide:'Opciones sugeridas: Picking AMR, Goods-to-person, Pallets/AGV, Totes/Bins, Mixta'},
 {key:'industry',label:'Industria / perfil',guide:'Ej. e-commerce, retail, CPG, pharma, manufactura, 3PL'},
 {key:'warehouse_size',label:'Tamaño aproximado del almacén (m²)',type:'number',guide:'Escala física; no determina por sí sola el dimensionamiento'},
 {key:'shifts_day',label:'Turnos por día',type:'number',guide:'Una mayor utilización mejora el ROI'},
 {key:'hours_shift',label:'Horas efectivas por turno',type:'number',guide:'Excluye comidas, juntas y paros'},
 {key:'days_month',label:'Días de operación por mes',type:'number',guide:'Se utiliza para anualizar beneficios'},
 {key:'avg_daily_volume',label:'Volumen promedio por día',type:'number',guide:'Picks, tarimas, cajas o misiones según el proceso'},
 {key:'peak_factor',label:'Factor pico vs. promedio',type:'number',guide:'1.1 bajo, 1.3 medio, 1.6 o más alto'},
 {key:'current_people',label:'Personas actuales en la actividad',type:'number',guide:'Personas directamente asociadas al proceso'},
 {key:'monthly_cost_person',label:'Costo mensual por persona',type:'number',guide:'Costo total o costo cargado, cuando se conozca'},
 {key:'capturable_labor',label:'Porcentaje de beneficio laboral capturable (%)',type:'number',guide:'Parte del costo que puede ahorrarse o reasignarse de forma defendible'},
 {key:'overtime_cost',label:'Horas extra / costo mensual actual',type:'number',guide:'Ahorro potencial por picos o falta de capacidad'},
 {key:'monthly_errors',label:'Merma, errores y retrabajo mensual',type:'number',guide:'Valor mensual estimado del problema'},
 {key:'error_reduction',label:'Porcentaje de reducción de merma y errores (%)',type:'number',guide:'Supuesto conservador en etapa Pre Scope'},
 {key:'monthly_sla_benefit',label:'Beneficio mensual por capacidad / SLA',type:'number',guide:'Ingresos retenidos, crecimiento o penalizaciones evitadas'},
 {key:'available_budget',label:'Presupuesto disponible',type:'number',guide:'Monto máximo preliminar del cliente'},
 {key:'target_roi',label:'ROI objetivo (meses)',type:'number',guide:'Política InnOv: ROI de 16 meses como referencia'},
 {key:'robot_productivity',label:'Productividad conservadora por robot/h',type:'number',guide:'Utilice rangos prudentes según el caso'},
 {key:'station_productivity',label:'Productividad conservadora por estación/h',type:'number',guide:'Sólo aplica para picking y Goods-to-Person'},
 {key:'robot_cost',label:'Costo unitario por robot',type:'number',guide:'USD u otra moneda; mantener la misma moneda en todo el modelo'},
 {key:'station_cost',label:'Costo unitario por estación',type:'number',guide:'Incluye estación, periféricos básicos y montaje'},
 {key:'software_cost',label:'Software / Fleet Manager / WCS',type:'number',guide:'Monto preliminar'},
 {key:'integration_cost',label:'Integración WMS / ERP',type:'number',guide:'APIs, pruebas y parametrización'},
 {key:'infrastructure_cost',label:'Infraestructura y adecuaciones',type:'number',guide:'WiFi, seguridad, señalización y ajustes menores al layout'},
 {key:'annual_maintenance',label:'Mantenimiento anual',type:'number',guide:'Estimación del costo anual posterior al proyecto'},
 {key:'contingency',label:'Contingencia (%)',type:'number',guide:'Riesgos de alcance en etapa Pre Scope'},
 {key:'wms_available',label:'WMS disponible',type:'select',options:['Sí','Básico','No'],guide:'Sí / Básico / No'},
 {key:'data_quality',label:'Calidad de datos',type:'select',options:['Alta','Media','Baja'],guide:'Alta / Media / Baja'},
 {key:'executive_urgency',label:'Urgencia ejecutiva',type:'select',options:['Alta','Media','Baja'],guide:'Alta / Media / Baja'}
];

function WarehouseDetailedForm({data,setData}){
 const [active,setActive]=useState(0);
 const set=(key,value)=>setData(prev=>({...prev,[key]:value}));
 const allFields=WAREHOUSE_DETAIL_SECTIONS.flatMap(s=>s.fields);
 const progress=Math.round(allFields.filter(f=>{const v=data['whd_'+getKey(f.label)];return Array.isArray(v)?v.length>0:Boolean(v)}).length/Math.max(1,allFields.length)*100);
 const go=i=>{setActive(i);document.getElementById('whd-section-'+i)?.scrollIntoView({behavior:'smooth',block:'start'})};
 return <div className="sortingExperience domainExperience warehouseDetailedExperience">
  <div className="sortingAppHeader"><div className="sortingAppMark">WH</div><div><strong>Warehouse Engineering Input</strong><span>Cuestionario para Soluciones de Almacén Inteligente · Levantamiento detallado</span></div><div className="sortingAppActions"><button type="button" onClick={()=>downloadSortingFile('warehouse-engineering-input.json',JSON.stringify({form:'Cuestionario de Ingeniería y Automatización',data},null,2),'application/json')}>Exportar JSON</button><button type="button" onClick={()=>window.print()}>PDF en español</button><button type="button" onClick={()=>window.print()}>PDF in English</button><button type="button" onClick={()=>window.print()}>Repositorio</button><button type="button" className="sortingClearButton" onClick={()=>window.confirm('¿Limpiar los datos capturados?')&&setData({})}>Limpiar</button></div></div>
  <div className="sortingHero"><div><h2>Cuestionario de Ingeniería y Automatización</h2><p>Capture la información operativa, física y tecnológica necesaria para evaluar y diseñar una solución de automatización de almacén.</p></div><div className="sortingHeroMeta"><span>Secciones<strong>9</strong></span><span>Documentos solicitados<strong>8</strong></span><span>Estado<strong>{progress===100?'Completo':'En captura'}</strong></span></div></div>
  <div className="sortingLayout"><nav className="sortingProgress" aria-label="Secciones del formulario"><div>Avance <b>{progress}%</b></div><div className="sortingProgressBar"><i style={{width:progress+'%'}}/></div>{WAREHOUSE_DETAIL_SECTIONS.map((s,i)=><button type="button" key={s.title} className={active===i?'active':''} onClick={()=>go(i)}><b>{i===0?'K':i}</b>{s.title}</button>)}</nav>
   <div className="sortingSections">{WAREHOUSE_DETAIL_SECTIONS.map((section,i)=><section className="wfCard sortingSection" id={'whd-section-'+i} key={section.title}><header><b>{i===0?'K':i}</b><div><h3>{section.title}</h3><p>{section.subtitle}</p></div><span className="sortingSectionCompletion">{Math.round(section.fields.filter(f=>{const v=data['whd_'+getKey(f.label)];return Array.isArray(v)?v.length>0:Boolean(v)}).length/section.fields.length*100)}%</span></header><div className="wfBody"><div className="wfGrid">{section.fields.map(field=>{const key='whd_'+getKey(field.label),value=data[key]??'';return <label className={'wfField'+(['textarea','checks'].includes(field.type)?' wide':'')} key={field.label}><span>{field.label}</span>{field.type==='select'?<select value={value} onChange={e=>set(key,e.target.value)}><option value="">Seleccione</option>{field.options.map(o=><option key={o}>{o}</option>)}</select>:field.type==='checks'?<div className="domainCheckGroup">{field.options.map(o=><label key={o}><input type="checkbox" checked={Array.isArray(value)&&value.includes(o)} onChange={e=>set(key,e.target.checked?[...(Array.isArray(value)?value:[]),o]:(value||[]).filter(x=>x!==o))}/>{o}</label>)}</div>:field.type==='file'?<div className="domainFile"><input type="file" onChange={e=>set(key,e.target.files?.[0]?.name||'')}/>{value&&<small>{value}</small>}</div>:field.type==='textarea'?<textarea rows={3} value={value} onChange={e=>set(key,e.target.value)}/>:<input type={field.type||'text'} value={value} onChange={e=>set(key,e.target.value)}/>}{field.help&&<small className="domainHelp">{field.help}</small>}</label>})}</div></div></section>)}</div>
  </div>
 </div>
}

function calculateAMR(data){
 const n=k=>Number(String(data[k]??'').replace(',','.'))||0;
 const volume=n('avg_daily_volume'),hours=n('hours_shift')*n('shifts_day'),peakHourly=hours?volume/hours*n('peak_factor'):0;
 const process=String(data.process_type||'');
 const robots=peakHourly&&n('robot_productivity')?Math.ceil(peakHourly/n('robot_productivity')):0;
 const stations=/Picking|Goods-to-person/i.test(process)&&peakHourly&&n('station_productivity')?Math.ceil(peakHourly/n('station_productivity')):0;
 const robotHardware=robots*n('robot_cost'),stationHardware=stations*n('station_cost');
 const subtotal=robotHardware+stationHardware+n('software_cost')+n('integration_cost')+n('infrastructure_cost');
 const contingency=subtotal*n('contingency')/100,total=subtotal+contingency;
 const monthlyBenefit=n('current_people')*n('monthly_cost_person')*n('capturable_labor')/100+n('overtime_cost')+n('monthly_errors')*n('error_reduction')/100+n('monthly_sla_benefit');
 const monthlyNet=monthlyBenefit-n('annual_maintenance')/12,payback=monthlyNet>0?total/monthlyNet:0,budgetGap=total-n('available_budget');
 const complete=Boolean(process&&volume&&hours&&n('robot_productivity')&&n('robot_cost'));
 const roiScore=payback?Math.max(0,Math.min(100,Math.round(100*(1-payback/Math.max(1,n('target_roi')||16))))):0;
 const budgetScore=total&&n('available_budget')?Math.max(0,Math.min(100,Math.round(100*n('available_budget')/total))):0;
 const volumeScore=volume?Math.min(100,Math.round(volume/100)):0;
 const dataScore=(data.wms_available==='Sí'?40:data.wms_available==='Básico'?25:0)+(data.data_quality==='Alta'?35:data.data_quality==='Media'?20:0)+(data.executive_urgency==='Alta'?25:data.executive_urgency==='Media'?15:0);
 const score=Math.round((roiScore+budgetScore+volumeScore+dataScore)/4);
 return {peakHourly,robots,stations,robotHardware,stationHardware,subtotal,contingency,total,monthlyBenefit,payback,budgetGap,roiScore,budgetScore,volumeScore,dataScore,score,complete};
}
function money(v){return v?new Intl.NumberFormat('es-MX',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(v):'—'}
function AMRCalculator({data,setData}){
 const result=calculateAMR(data),set=(key,value)=>setData(prev=>({...prev,[key]:value}));
 const missing=['process_type','avg_daily_volume','hours_shift','shifts_day','robot_productivity','robot_cost'].filter(k=>!data[k]).length;
 const status=!result.complete?'INCOMPLETO':result.score>=70?'VIABLE':result.score>=40?'REVISAR':'NO AVANZAR';
 const statusText=!result.complete?'Capture los datos mínimos requeridos para calcular la viabilidad preliminar.':result.score>=70?'Oportunidad atractiva para avanzar a un levantamiento Full Scope.':result.score>=40?'Solicite entre 3 y 5 datos críticos antes de decidir.':'Evite invertir en un levantamiento profundo hasta resolver las brechas.';
 const metric=(title,value)=> <article className="amrMetric"><span>{title}</span><strong>{value}</strong></article>;
 return <div className="sortingExperience domainExperience amrExperience">
  <div className="sortingAppHeader"><div className="sortingAppMark">AMR</div><div><strong>Calculadora AMR / AGV Pre Scope</strong><span>Calificación comercial rápida · Captura desde cero</span></div><div className="sortingAppActions"><button type="button" onClick={()=>downloadSortingFile('amr-pre-scope.json',JSON.stringify({form:'Calculadora AMR / AGV Pre Scope',data,result},null,2),'application/json')}>Exportar JSON</button><button type="button" onClick={()=>window.print()}>Exportar PDF</button><button type="button" className="sortingClearButton" onClick={()=>window.confirm('¿Restablecer la calculadora?')&&setData({})}>Restablecer</button></div></div>
  <div className="sortingHero"><div><h2>AMR / AGV Pre-Scope Calculator</h2><p>Capture la información del prospecto para estimar viabilidad, presupuesto, ROI y semáforo antes de invertir en un levantamiento profundo.</p></div><div className="sortingHeroMeta"><span>Modelo<strong>Pre Scope</strong></span><span>Tipo<strong>{data.process_type||'AMR / AGV'}</strong></span><span>Estado<strong>{result.complete?'Calculado':'En captura'}</strong></span></div></div>
  <div className="amrQuickGuide"><strong>Instructivo de uso rápido</strong><ol><li>Capture únicamente los datos que el cliente pueda compartir en una etapa temprana.</li><li>Utilice valores conservadores de productividad; no use máximos de ficha técnica.</li><li>El resultado no sustituye la ingeniería de detalle: ayuda a decidir si avanzar, rediseñar o descartar la oportunidad.</li><li>Si el semáforo es verde, avance a Full Scope. Si es amarillo, solicite entre 3 y 5 datos críticos. Si es rojo, evite invertir en un levantamiento profundo.</li></ol></div>
  <div className="amrKpis">{metric('Robots estimados',result.robots||'—')}{metric('Estaciones estimadas',result.stations||'—')}{metric('Inversión total estimada',money(result.total))}{metric('Payback estimado',result.payback?result.payback.toFixed(1)+' meses':'—')}</div>
  <section className="wfCard amrCapture"><header><b>1</b><div><h3>Formulario de captura mínima</h3><p>Dato, valor editable y guía para la estimación preliminar.</p></div><span className="sortingSectionCompletion">{missing} datos mínimos pendientes</span></header><div className="wfBody"><div className="domainTableWrap"><table className="domainTable amrInputTable"><thead><tr><th>Dato</th><th>Valor editable</th><th>Guía / comentario</th></tr></thead><tbody>{AMR_INPUTS.map(field=>{const value=data[field.key]??'';return <tr key={field.key}><th>{field.label}</th><td>{field.type==='select'?<select value={value} onChange={e=>set(field.key,e.target.value)}><option value="">Seleccione</option>{field.options.map(x=><option key={x}>{x}</option>)}</select>:<input type={field.type||'text'} value={value} onChange={e=>set(field.key,e.target.value)}/>}</td><td className="amrGuide">{field.guide}</td></tr>})}</tbody></table></div></div></section>
  <section className="wfCard amrResults"><header><b>2</b><div><h3>Resultado automático / Semáforo</h3><p>Estimación preliminar con supuestos editables y productividad conservadora.</p></div><span className={'amrStatus '+status.toLowerCase().replaceAll(' ','-')}>{status}</span></header><div className="wfBody"><div className="amrResultTables"><div><h4>Métrica</h4><dl>{[['Volumen pico por hora',result.peakHourly?Math.ceil(result.peakHourly).toLocaleString('es-MX'):'—'],['Robots estimados',result.robots||'—'],['Estaciones de picking estimadas',result.stations||'—'],['Inversión en hardware de robots',money(result.robotHardware)],['Inversión en estaciones',money(result.stationHardware)],['Inversión subtotal',money(result.subtotal)],['Contingencia',money(result.contingency)],['Inversión total estimada',money(result.total)],['Beneficio mensual estimado',money(result.monthlyBenefit)],['Payback estimado (meses)',result.payback?result.payback.toFixed(1):'—'],['Brecha contra presupuesto',result.budgetGap?money(result.budgetGap):'—']].map(x=><div key={x[0]}><dt>{x[0]}</dt><dd>{x[1]}</dd></div>)}</dl></div><div><h4>Score de oportunidad</h4><dl>{[['Score ROI',result.roiScore],['Score presupuesto',result.budgetScore],['Score volumen',result.volumeScore],['Score datos / WMS / urgencia',result.dataScore],['Score total de la oportunidad',result.score]].map(x=><div key={x[0]}><dt>{x[0]}</dt><dd>{result.complete?x[1]:'0'}</dd></div>)}</dl><div className={'amrRecommendation '+status.toLowerCase().replaceAll(' ','-')}><strong>{status}</strong><p>{statusText}</p></div></div></div></div></section>
  <section className="wfCard"><header><b>3</b><div><h3>Rangos conservadores para Pre Scope</h3><p>Referencias iniciales que deben validarse para cada caso de uso.</p></div></header><div className="wfBody"><div className="domainTableWrap"><table className="domainTable"><thead><tr><th>Caso de uso</th><th>Unidad</th><th>Rango conservador</th><th>Notas</th></tr></thead><tbody><tr><td>AMR colaborativo para picking</td><td>picks/robot/h</td><td>80–150</td><td>Depende del picker, batch y layout</td></tr><tr><td>Goods-to-Person</td><td>picks/estación/h</td><td>250–500</td><td>El cuello de botella puede ser la estación</td></tr><tr><td>AMR para totes/bins</td><td>misiones/robot/h</td><td>15–30</td><td>Depende de distancias y estaciones</td></tr><tr><td>AMR/AGV para movimiento de tarimas</td><td>tarimas/robot/h</td><td>8–18</td><td>Validar carga, descarga y tráfico</td></tr><tr><td>Fork AMR</td><td>tarimas/robot/h</td><td>6–14</td><td>Más lento por seguridad y maniobras</td></tr></tbody></table></div></div></section>
 </div>
}


const FIBER_SECTIONS=[
 {title:'Información general',subtitle:'Datos del proyecto, edificio y responsables del levantamiento.',fields:[
  {key:'client',label:'Cliente',type:'text',required:true},{key:'site',label:'Almacén / edificio / sitio',type:'text',required:true},
  {key:'address',label:'Dirección del proyecto',type:'textarea'},{key:'building_type',label:'Tipo de inmueble',type:'select',options:['Almacén','Centro de distribución','Edificio corporativo','Planta industrial','Campus / varios edificios','Otro']},
  {key:'project_stage',label:'Etapa del proyecto',type:'select',options:['Nuevo desarrollo','Ampliación','Modernización','Corrección / reemplazo','Levantamiento preliminar']},
  {key:'date',label:'Fecha del levantamiento',type:'date'},{key:'client_contact',label:'Responsable del cliente',type:'text'},{key:'consultant',label:'Responsable del levantamiento',type:'text'},
  {key:'objective',label:'Objetivo del proyecto',type:'textarea'}
 ]},
 {title:'Criterios de diseño y demanda',subtitle:'Aplicaciones, capacidad requerida, topología y crecimiento esperado.',fields:[
  {key:'network_use',label:'Aplicaciones a soportar',type:'checks',options:['Red de datos / LAN','Wi-Fi / access points','CCTV / video','Control de acceso','Telefonía / VoIP','BMS / IoT','Automatización industrial','Red de respaldo','Otra']},
  {key:'technology',label:'Tipo de fibra requerida o preferida',type:'select',options:['Monomodo OS2','Multimodo OM3','Multimodo OM4','Multimodo OM5','Por definir']},
  {key:'topology',label:'Topología requerida',type:'select',options:['Estrella','Anillo','Doble estrella / redundante','Malla','Por definir']},
  {key:'link_speed',label:'Velocidad objetivo por enlace',type:'select',options:['1 Gb/s','10 Gb/s','25 Gb/s','40 Gb/s','100 Gb/s','400 Gb/s','Otra / por definir']},
  {key:'link_speed_other',label:'Otra velocidad objetivo',type:'text'},
  {key:'total_links',label:'Número aproximado de enlaces / troncales',type:'number'},
  {key:'fibers_per_link',label:'Fibras requeridas por enlace',type:'number',help:'Capture fibras activas por enlace. La reserva de fibras se captura por separado.'},
  {key:'fiber_reserve_pct',label:'Reserva de crecimiento de fibras (%)',type:'number'},
  {key:'future_growth_pct',label:'Crecimiento previsto de puertos (%)',type:'number'},
  {key:'redundancy',label:'¿Se requieren rutas físicas redundantes?',type:'select',options:['Sí','No','Por confirmar']},
  {key:'redundancy_notes',label:'Criterio de redundancia / disponibilidad',type:'textarea'}
 ]},
 {title:'Rutas y volumetría de cable',subtitle:'Capture un renglón por cada tramo entre origen y destino; el sistema estima longitud instalada y metros-fibra.',fields:[
  {key:'route_basis',label:'Base de medición',type:'select',options:['Recorrido medido en sitio','Planos / CAD','Estimación preliminar','Combinada']},
  {key:'global_slack',label:'Reserva general adicional (%)',type:'number',help:'Factor adicional para variaciones de ruta, maniobras y reserva de instalación.'},
  {key:'route_notes',label:'Criterios de ruta y supuestos',type:'textarea'}
 ],table:'volumetry'},
 {title:'Canalizaciones y condiciones físicas',subtitle:'Medios de soporte, cruces, penetraciones y restricciones de instalación.',fields:[
  {key:'pathway_types',label:'Canalizaciones existentes / previstas',type:'checks',options:['Charola tipo escalera','Charola malla','Ducto / conduit','Tubería subterránea','Bandeja cerrada','Canaleta','Riser vertical','Nueva canalización requerida','Otra']},
  {key:'pathway_capacity',label:'Capacidad y ocupación disponible',type:'textarea'},
  {key:'pathway_separation',label:'Separación de potencia y fuentes de interferencia',type:'textarea'},
  {key:'vertical_routes',label:'Rutas verticales, montantes y cambios de nivel',type:'textarea'},
  {key:'penetrations',label:'Muros, losas, pasos y sellos cortafuego requeridos',type:'textarea'},
  {key:'outdoor_conditions',label:'Tramos exteriores / entre edificios y condiciones ambientales',type:'textarea'},
  {key:'physical_obstacles',label:'Obstáculos, áreas restringidas o cruces críticos',type:'textarea'},
  {key:'site_access',label:'Acceso a plafones, racks, techos y áreas técnicas',type:'textarea'}
 ]},
 {title:'Cuartos de telecomunicaciones y terminaciones',subtitle:'Ubicación y capacidad de MDF/IDF, racks, ODF, empalmes y conexiones.',fields:[
  {key:'main_room',label:'Ubicación del MDF / cuarto principal',type:'textarea'},
  {key:'closet_count',label:'Número de cuartos IDF / telecomunicaciones',type:'number'},
  {key:'closets',label:'Identificación, ubicación y nivel de cada MDF/IDF',type:'textarea'},
  {key:'rack_space',label:'Racks disponibles y espacio en unidades (U)',type:'textarea'},
  {key:'odf_type',label:'Tipo de ODF / panel de fibra preferido',type:'select',options:['Rack 19 pulgadas','Mural','ODF modular','Por definir']},
  {key:'odf_ports',label:'Puertos de terminación requeridos por cuarto',type:'textarea'},
  {key:'splice_count',label:'Empalmes previstos y ubicación de cajas',type:'textarea'},
  {key:'connector_type',label:'Conector óptico',type:'select',options:['LC/UPC','LC/APC','SC/UPC','SC/APC','Otro / por definir']},
  {key:'patch_cords',label:'Jumper / patch cord requerido por enlace y longitud',type:'textarea'},
  {key:'equipment',label:'Transceptores y equipos activos conocidos',type:'textarea'},
  {key:'power_grounding',label:'Energía, tierra y condiciones del cuarto',type:'textarea'}
 ]},
 {title:'Método y restricciones de instalación',subtitle:'Secuencia de obra, seguridad, permisos y condiciones de operación.',fields:[
  {key:'installation_mode',label:'Tipo de instalación',type:'select',options:['Nueva instalación','Reutilizar canalización','Reemplazo de cable','Ampliación de red','Mixta']},
  {key:'live_environment',label:'¿El sitio permanecerá operando durante los trabajos?',type:'select',options:['Sí','No','Parcialmente','Por confirmar']},
  {key:'work_window',label:'Ventanas de trabajo permitidas',type:'textarea'},
  {key:'safety_requirements',label:'Permisos, EPP y requisitos de seguridad',type:'textarea'},
  {key:'height_work',label:'Trabajos en altura, plataformas o elevadores',type:'textarea'},
  {key:'shutdowns',label:'Interrupciones / ventanas de migración autorizadas',type:'textarea'},
  {key:'cable_labeling',label:'Estándar de etiquetado y nomenclatura',type:'textarea'},
  {key:'fire_stopping',label:'Responsable de sellos y restauración de acabados',type:'textarea'}
 ]},
 {title:'Pruebas, certificación y entregables',subtitle:'Criterios de aceptación, mediciones y documentación de cierre.',fields:[
  {key:'test_methods',label:'Pruebas requeridas',type:'checks',options:['Inspección de conectores','Continuidad / polaridad','OLTS / pérdida de inserción','OTDR unidireccional','OTDR bidireccional','Medición de potencia','Otra']},
  {key:'acceptance_criteria',label:'Límites de pérdida / criterios de aceptación',type:'textarea'},
  {key:'test_wavelengths',label:'Longitudes de onda de prueba',type:'text'},
  {key:'certification',label:'Norma o estándar solicitado por el cliente',type:'text'},
  {key:'deliverables',label:'Entregables requeridos',type:'checks',options:['Planos as-built','Memoria de cálculo','Reporte OTDR','Reporte OLTS','Etiquetado de puertos','Inventario de enlaces','Fotografías','Certificado de materiales','Otro']},
  {key:'existing_docs',label:'Planos, diagramas o archivos disponibles (referencia / enlace)',type:'textarea'},
  {key:'acceptance_owner',label:'Responsable de revisión y aceptación',type:'text'}
 ]},
 {title:'Cierre y observaciones',subtitle:'Pendientes, riesgos y validación del alcance antes de cotizar.',fields:[
  {key:'risks',label:'Riesgos, interferencias o dependencias',type:'textarea'},
  {key:'pending_info',label:'Información pendiente por confirmar',type:'textarea'},
  {key:'scope_exclusions',label:'Exclusiones y límites del alcance',type:'textarea'},
  {key:'final_observations',label:'Observaciones finales del consultor',type:'textarea'}
 ]}
];

function fiberNum(value){return Number(String(value??'').replace(',','.'))||0}
function fiberRouteMetrics(row,globalReserve){
 const base=fiberNum(row.route_m)+fiberNum(row.vertical_m)+fiberNum(row.service_loop_m);
 const reserve=(row.reserve_pct!==undefined&&row.reserve_pct!==''?fiberNum(row.reserve_pct):fiberNum(globalReserve))/100;
 const cables=fiberNum(row.cable_count)||0;
 const length=Math.ceil(base*(1+reserve)*cables);
 return {length,coreMeters:length*fiberNum(row.fiber_count),cores:fiberNum(row.fiber_count)*cables,cables};
}
function FiberVolumetryTable({data,setData}){
 const rows=Array.isArray(data.fiber_routes)?data.fiber_routes:Array.from({length:5},()=>({}));
 const saveRows=next=>setData(prev=>({...prev,fiber_routes:next}));
 const patch=(index,key,value)=>saveRows(rows.map((r,i)=>i===index?{...r,[key]:value}:r));
 const totals=rows.reduce((sum,row)=>{const m=fiberRouteMetrics(row,data.fiber_global_slack);return {length:sum.length+m.length,coreMeters:sum.coreMeters+m.coreMeters,cores:sum.cores+m.cores,cables:sum.cables+m.cables}}, {length:0,coreMeters:0,cores:0,cables:0});
 const addRows=count=>saveRows([...rows,...Array.from({length:count},()=>({}))]);
 const clear=()=>{if(window.confirm('¿Limpiar todos los tramos de volumetría?'))saveRows(Array.from({length:5},()=>({})))};
 const fields=[['Origen','origin','text'],['Destino','destination','text'],['Edificio / nivel','floor','text'],['Tipo de fibra','fiber_type','select'],['Fibras por cable','fiber_count','number'],['Ruta medida (m)','route_m','number'],['Desnivel / vertical (m)','vertical_m','number'],['Loops y reserva de servicio (m)','service_loop_m','number'],['Reserva del tramo (%)','reserve_pct','number'],['Cables paralelos','cable_count','number']];
 return <div className="fiberVolume">
  <div className="fiberMetricRow"><div><span>Longitud estimada de cable</span><strong>{totals.length.toLocaleString('es-MX')} m</strong></div><div><span>Metros-fibra estimados</span><strong>{totals.coreMeters.toLocaleString('es-MX')} m-fibra</strong></div><div><span>Fibras instaladas</span><strong>{totals.cores.toLocaleString('es-MX')}</strong></div><div><span>Cables / tramos</span><strong>{totals.cables.toLocaleString('es-MX')}</strong></div></div>
  <p className="fiberFormula">Longitud por tramo = (ruta medida + desnivel + loops) × (1 + reserva %) × cables paralelos. Los resultados son una base de cuantificación; valida la ruta y los criterios de holgura en sitio.</p>
  <div className="fiberTableActions"><button type="button" onClick={()=>addRows(5)}>+ Agregar 5 tramos</button><button type="button" onClick={()=>addRows(20)}>+ Agregar 20 tramos</button><button type="button" onClick={clear}>Limpiar tabla</button></div>
  <div className="domainTableWrap"><table className="domainTable fiberTable"><thead><tr><th>#</th>{fields.map(f=><th key={f[1]}>{f[0]}</th>)}<th>Longitud estimada (m)</th><th>Metros-fibra</th><th></th></tr></thead><tbody>{rows.map((row,index)=>{const m=fiberRouteMetrics(row,data.fiber_global_slack);return <tr key={index}><td>{index+1}</td>{fields.map(f=><td key={f[1]}>{f[2]==='select'?<select aria-label={f[0]+' tramo '+(index+1)} value={row[f[1]]||''} onChange={e=>patch(index,f[1],e.target.value)}><option value="">Seleccione</option>{['OS2','OM3','OM4','OM5','Por definir'].map(x=><option key={x}>{x}</option>)}</select>:<input aria-label={f[0]+' tramo '+(index+1)} type={f[2]} value={row[f[1]]??''} onChange={e=>patch(index,f[1],e.target.value)}/>}</td>)}<td className="fiberComputed">{m.length?m.length.toLocaleString('es-MX'):'—'}</td><td className="fiberComputed">{m.coreMeters?m.coreMeters.toLocaleString('es-MX'):'—'}</td><td><button type="button" className="fiberRemove" aria-label={'Eliminar tramo '+(index+1)} onClick={()=>saveRows(rows.filter((_,i)=>i!==index))}>×</button></td></tr>})}</tbody><tfoot><tr><th colSpan="11">Total estimado</th><th>{totals.length.toLocaleString('es-MX')} m</th><th>{totals.coreMeters.toLocaleString('es-MX')} m-fibra</th><th></th></tr></tfoot></table></div>
 </div>
}

function FiberField({field,data,set,prefix='fiber_'}){
 const key=prefix+field.key,value=data[key]??'';
 if(field.type==='checks')return <fieldset className="wfField wide fiberFieldset"><legend>{field.label}</legend><div className="domainCheckGroup">{field.options.map(option=><label key={option}><input type="checkbox" checked={Array.isArray(value)&&value.includes(option)} onChange={e=>set(key,e.target.checked?[...(Array.isArray(value)?value:[]),option]:(Array.isArray(value)?value:[]).filter(v=>v!==option))}/>{option}</label>)}</div>{field.help&&<small className="domainHelp">{field.help}</small>}</fieldset>;
 return <label className={'wfField'+(field.type==='textarea'?' wide':'')}>
  <span>{field.label}{field.required?' *':''}</span>
  {field.type==='select'?<select value={value} required={field.required} onChange={e=>set(key,e.target.value)}><option value="">Seleccione</option>{(field.options||[]).map(option=><option key={option}>{option}</option>)}</select>:field.type==='textarea'?<textarea rows={3} value={value} onChange={e=>set(key,e.target.value)}/>:<input type={field.type||'text'} required={field.required} value={value} onChange={e=>set(key,e.target.value)}/>}
  {field.help&&<small className="domainHelp">{field.help}</small>}
 </label>
}
function FiberOpticForm({data,setData}){
 const [active,setActive]=useState(0);
 const set=(key,value)=>setData(prev=>({...prev,[key]:value}));
 const allFields=FIBER_SECTIONS.flatMap(s=>s.fields);
 const filled=allFields.filter(f=>{const v=data['fiber_'+f.key];return Array.isArray(v)?v.length>0:Boolean(v)}).length;
 const hasRoutes=Array.isArray(data.fiber_routes)&&data.fiber_routes.some(r=>r&&Object.values(r).some(Boolean));
 const progress=Math.round((filled+(hasRoutes?1:0))/Math.max(1,allFields.length+1)*100);
 const go=i=>{setActive(i);document.getElementById('fiber-section-'+i)?.scrollIntoView({behavior:'smooth',block:'start'})};
 const exportJson=()=>downloadSortingFile('volumetria-fibra-optica.json',JSON.stringify({form:'Volumetría de Fibra Óptica',data},null,2),'application/json');
 return <div className="sortingExperience domainExperience fiberExperience">
  <div className="sortingAppHeader"><div className="sortingAppMark">FO</div><div><strong>Fiber Optic Site Survey</strong><span>Levantamiento técnico · Almacenes y edificios</span></div><div className="sortingAppActions"><button type="button" onClick={exportJson}>Exportar JSON</button><button type="button" onClick={()=>window.print()}>PDF en español</button><button type="button" onClick={()=>window.print()}>PDF in English</button><button type="button" className="sortingClearButton" onClick={()=>window.confirm('¿Limpiar los datos de este levantamiento?')&&setData({})}>Limpiar</button></div></div>
  <div className="sortingHero"><div><h2>Levantamiento y Volumetría de Fibra Óptica</h2><p>Capture la demanda, las rutas, las canalizaciones y las terminaciones para definir una base de diseño y cuantificar cableado óptico en almacenes y edificios.</p></div><div className="sortingHeroMeta"><span>Documento<strong>Fiber Optic Site Survey</strong></span><span>Aplicación<strong>Almacén / Edificio</strong></span><span>Estado<strong>{progress===100?'Completo':'En captura'}</strong></span></div></div>
  <div className="sortingLayout"><nav className="sortingProgress" aria-label="Secciones del levantamiento"><div>Avance <b>{progress}%</b></div><div className="sortingProgressBar"><i style={{width:progress+'%'}}/></div>{FIBER_SECTIONS.map((section,index)=><button type="button" key={section.title} className={active===index?'active':''} onClick={()=>go(index)}><b>{index+1}</b>{section.title}</button>)}</nav>
   <div className="sortingSections">{FIBER_SECTIONS.map((section,index)=><section className="wfCard sortingSection" id={'fiber-section-'+index} key={section.title}><header><b>{index+1}</b><div><h3>{section.title}</h3><p>{section.subtitle}</p></div><span className="sortingSectionCompletion">{Math.round(section.fields.filter(f=>{const v=data['fiber_'+f.key];return Array.isArray(v)?v.length>0:Boolean(v)}).length/Math.max(1,section.fields.length)*100)}%</span></header><div className="wfBody">{section.table==='volumetry'&&<FiberVolumetryTable data={data} setData={setData}/>}<div className="wfGrid">{section.fields.map(field=><FiberField key={field.key} field={field} data={data} set={set}/>)}</div></div></section>)}</div>
  </div>
 </div>
}


const ELECTRICAL_SECTIONS=[
 {title:'Información general',subtitle:'Identificación del proyecto, inmueble y responsables.',fields:[
  {key:'client',label:'Cliente',type:'text',required:true},{key:'site',label:'Almacén / edificio / sitio',type:'text',required:true},
  {key:'address',label:'Dirección del proyecto',type:'textarea'},{key:'building_type',label:'Tipo de inmueble',type:'select',options:['Almacén','Centro de distribución','Edificio corporativo','Planta industrial','Campus / varios edificios','Otro']},
  {key:'project_stage',label:'Etapa del proyecto',type:'select',options:['Obra nueva','Ampliación','Modernización','Corrección / reemplazo','Levantamiento preliminar']},
  {key:'date',label:'Fecha del levantamiento',type:'date'},{key:'client_contact',label:'Responsable del cliente',type:'text'},
  {key:'consultant',label:'Responsable del levantamiento',type:'text'},{key:'scope',label:'Alcance eléctrico requerido',type:'checks',options:['Acometida / subestación','Distribución en media tensión','Distribución en baja tensión','Alumbrado','Contactos y fuerza','Equipos de almacén','Respaldo / UPS','Puesta a tierra','Otro']},
  {key:'objective',label:'Objetivo y descripción del proyecto',type:'textarea'}
 ]},
 {title:'Acometida y suministro',subtitle:'Capacidad, configuración y condiciones del suministro eléctrico disponible.',fields:[
  {key:'utility',label:'Compañía suministradora / fuente',type:'text'},
  {key:'service_voltage',label:'Tensión nominal disponible',type:'select',options:['120/208 V','127/220 V','220/380 V','277/480 V','Otro / por confirmar']},
  {key:'voltage_other',label:'Otra tensión nominal',type:'text'},
  {key:'phase',label:'Fases y conductores',type:'select',options:['1 fase, 2 hilos','1 fase, 3 hilos','3 fases, 3 hilos','3 fases, 4 hilos','Por confirmar']},
  {key:'frequency',label:'Frecuencia (Hz)',type:'number'},
  {key:'contract_capacity',label:'Capacidad contratada / disponible (kW o kVA)',type:'number'},
  {key:'transformer',label:'Transformador existente (kVA, tensión y ubicación)',type:'textarea'},
  {key:'medium_voltage',label:'Acometida de media tensión y equipo asociado',type:'textarea'},
  {key:'service_meter',label:'Medidor, demanda máxima y recibos disponibles',type:'textarea'},
  {key:'source_reliability',label:'Confiabilidad del suministro / fallas conocidas',type:'textarea'}
 ]},
 {title:'Demanda y volumetría de cargas',subtitle:'Inventario de equipos y estimación preliminar de carga conectada y demanda.',fields:[
  {key:'power_factor',label:'Factor de potencia global (0–1)',type:'number',help:'Utilizado sólo para estimar kVA a partir de kW demandados.'},
  {key:'global_reserve',label:'Reserva de crecimiento de carga (%)',type:'number'},
  {key:'load_profile',label:'Perfil de operación y simultaneidad',type:'textarea'}
 ],table:'loads'},
 {title:'Tableros y distribución',subtitle:'Tableros, alimentadores, espacios disponibles, protecciones y rutas principales.',fields:[
  {key:'switchboards',label:'Inventario de tableros (ID, ubicación, tensión y capacidad)',type:'textarea'},
  {key:'panel_capacity',label:'Capacidad nominal y carga actual por tablero',type:'textarea'},
  {key:'spare_breakers',label:'Espacios / interruptores disponibles',type:'textarea'},
  {key:'main_protection',label:'Interruptor principal y protecciones existentes',type:'textarea'},
  {key:'feeders',label:'Alimentadores, calibres conocidos y recorridos',type:'textarea'},
  {key:'riser',label:'Montantes, ductos verticales y distribución por nivel',type:'textarea'},
  {key:'panel_balance',label:'Balance de fases o mediciones por tablero',type:'textarea'},
  {key:'electrical_rooms',label:'Ubicación, dimensiones y acceso a cuartos eléctricos',type:'textarea'},
  {key:'single_line',label:'Diagrama unifilar disponible (referencia / enlace)',type:'textarea'}
 ]},
 {title:'Canalizaciones y condiciones físicas',subtitle:'Rutas de cableado, ocupación, separaciones y restricciones en sitio.',fields:[
  {key:'pathway_types',label:'Canalizaciones existentes / requeridas',type:'checks',options:['Charola tipo escalera','Charola malla','Conduit / tubería','Ducto subterráneo','Busway','Canaleta','Nueva canalización','Otra']},
  {key:'pathway_capacity',label:'Capacidad y ocupación disponible',type:'textarea'},
  {key:'route_lengths',label:'Recorridos horizontales y verticales principales',type:'textarea'},
  {key:'separation',label:'Separación de datos, fibra y circuitos sensibles',type:'textarea'},
  {key:'penetrations',label:'Muros, losas, pasos y sellos cortafuego',type:'textarea'},
  {key:'environment',label:'Ambiente (polvo, humedad, corrosión, temperatura)',type:'textarea'},
  {key:'physical_constraints',label:'Obstáculos, cruces, alturas y zonas restringidas',type:'textarea'},
  {key:'access',label:'Acceso para instalación y mantenimiento',type:'textarea'}
 ]},
 {title:'Puesta a tierra y protección',subtitle:'Sistema de tierra, unión equipotencial, sobretensiones y seguridad eléctrica.',fields:[
  {key:'grounding_system',label:'Sistema de puesta a tierra existente',type:'textarea'},
  {key:'ground_resistance',label:'Resistencia de tierra medida (Ω) y fecha',type:'text'},
  {key:'bonding',label:'Unión equipotencial de tableros, racks y estructuras',type:'textarea'},
  {key:'surge_protection',label:'Supresores de sobretensión (SPD) instalados / requeridos',type:'textarea'},
  {key:'lightning',label:'Pararrayos / protección contra descargas atmosféricas',type:'textarea'},
  {key:'protection_coordination',label:'Coordinación, selectividad y estudios disponibles',type:'textarea'},
  {key:'arc_flash',label:'Etiquetado / estudio de arco eléctrico disponible',type:'select',options:['Sí','No','Por confirmar']},
  {key:'electrical_incidents',label:'Incidentes, disparos o protecciones que operan con frecuencia',type:'textarea'}
 ]},
 {title:'Calidad de energía y respaldo',subtitle:'Mediciones, continuidad del servicio, UPS y generación de emergencia.',fields:[
  {key:'voltage_measurements',label:'Mediciones de tensión por fase y punto',type:'textarea'},
  {key:'current_measurements',label:'Corriente por fase / demanda máxima medida',type:'textarea'},
  {key:'power_quality',label:'Armónicos, factor de potencia y perturbaciones',type:'textarea'},
  {key:'outages',label:'Interrupciones, microcortes o variaciones registradas',type:'textarea'},
  {key:'ups',label:'UPS existente / requerida (kVA, autonomía y cargas)',type:'textarea'},
  {key:'generator',label:'Generador existente / requerido (kW/kVA y transferencia)',type:'textarea'},
  {key:'critical_loads',label:'Cargas críticas que no pueden perder alimentación',type:'textarea'},
  {key:'measurement_docs',label:'Reportes de medición disponibles (referencia / enlace)',type:'textarea'}
 ]},
 {title:'Cargas de operación y controles',subtitle:'Equipos de proceso, automatización, IT, iluminación y crecimiento.',fields:[
  {key:'warehouse_equipment',label:'Equipos de almacén (transportadores, sorter, elevadores, AMR)',type:'textarea'},
  {key:'motors_drives',label:'Motores, variadores, corrientes de arranque y regeneración',type:'textarea'},
  {key:'automation',label:'PLC, controles, redes industriales y fuentes 24 VDC',type:'textarea'},
  {key:'it_cctv',label:'Racks IT, switches, Wi-Fi, CCTV y control de acceso',type:'textarea'},
  {key:'lighting',label:'Alumbrado, niveles requeridos y controles',type:'textarea'},
  {key:'hvac',label:'HVAC, ventilación y cargas mecánicas relevantes',type:'textarea'},
  {key:'expansion',label:'Expansiones o cargas futuras previstas',type:'textarea'},
  {key:'load_priorities',label:'Prioridad y criticidad de las cargas',type:'textarea'}
 ]},
 {title:'Cierre y entregables',subtitle:'Seguridad, permisos, documentación, supuestos y pendientes.',fields:[
  {key:'work_windows',label:'Ventanas de trabajo y operación durante la instalación',type:'textarea'},
  {key:'safety',label:'LOTO, permisos, EPP y requisitos de seguridad',type:'textarea'},
  {key:'applicable_codes',label:'Normativa / criterios de diseño requeridos por el cliente',type:'textarea'},
  {key:'deliverables',label:'Entregables requeridos',type:'checks',options:['Levantamiento de cargas','Diagrama unifilar actualizado','Cuadro de cargas','Planos as-built','Reporte de calidad de energía','Estudio de cortocircuito','Coordinación de protecciones','Etiquetado','Otro']},
  {key:'documents',label:'Planos, recibos, estudios y fichas disponibles (referencia / enlace)',type:'textarea'},
  {key:'risks',label:'Riesgos, exclusiones y dependencias',type:'textarea'},
  {key:'pending',label:'Información pendiente por confirmar',type:'textarea'},
  {key:'observations',label:'Observaciones finales del consultor',type:'textarea'}
 ]}
];

function electricalNum(value){return Number(String(value??'').replace(',','.'))||0}
function ElectricalLoadTable({data,setData}){
 const rows=Array.isArray(data.electrical_loads)?data.electrical_loads:Array.from({length:5},()=>({}));
 const saveRows=next=>setData(prev=>({...prev,electrical_loads:next}));
 const patch=(index,key,value)=>saveRows(rows.map((r,i)=>i===index?{...r,[key]:value}:r));
 const metrics=row=>{
  const connected=electricalNum(row.quantity)*electricalNum(row.unit_kw);
  const demandFactor=row.demand_pct!==undefined&&row.demand_pct!==''?electricalNum(row.demand_pct):100;
  const demand=connected*demandFactor/100;
  const conductorMeters=electricalNum(row.route_m)*electricalNum(row.circuits)*electricalNum(row.conductors);
  return {connected,demand,conductorMeters};
 };
 const total=rows.reduce((sum,row)=>{const m=metrics(row);return {connected:sum.connected+m.connected,demand:sum.demand+m.demand,conductorMeters:sum.conductorMeters+m.conductorMeters,circuits:sum.circuits+electricalNum(row.circuits)}},{connected:0,demand:0,conductorMeters:0,circuits:0});
 const reserve=electricalNum(data.electrical_global_reserve);
 const demandWithReserve=total.demand*(1+reserve/100);
 const pf=electricalNum(data.electrical_power_factor);
 const kva=pf?demandWithReserve/pf:0;
 const add=count=>saveRows([...rows,...Array.from({length:count},()=>({}))]);
 const clear=()=>{if(window.confirm('¿Limpiar todos los renglones de cargas?'))saveRows(Array.from({length:5},()=>({})))};
 const fields=[['Área / equipo','equipment','text'],['Cantidad','quantity','number'],['Tensión (V)','voltage','text'],['Fases','phase','select'],['Carga unitaria (kW)','unit_kw','number'],['Demanda (%)','demand_pct','number'],['Ruta al tablero (m)','route_m','number'],['Circuitos','circuits','number'],['Conductores por circuito','conductors','number']];
 return <div className="electricalLoadBlock">
  <div className="fiberMetricRow"><div><span>Carga conectada estimada</span><strong>{total.connected.toFixed(2)} kW</strong></div><div><span>Demanda diversificada</span><strong>{total.demand.toFixed(2)} kW</strong></div><div><span>Demanda + reserva</span><strong>{demandWithReserve.toFixed(2)} kW</strong></div><div><span>Demanda aparente estimada</span><strong>{kva?kva.toFixed(2)+' kVA':'Captura FP'}</strong></div></div>
  <p className="fiberFormula">Cálculo preliminar: carga conectada = cantidad × kW unitarios; demanda = carga conectada × factor de demanda; kVA = demanda con reserva ÷ factor de potencia. No dimensiona calibres, interruptores ni protecciones.</p>
  <div className="fiberTableActions"><button type="button" onClick={()=>add(5)}>+ Agregar 5 cargas</button><button type="button" onClick={()=>add(20)}>+ Agregar 20 cargas</button><button type="button" onClick={clear}>Limpiar tabla</button></div>
  <div className="domainTableWrap"><table className="domainTable electricalTable"><thead><tr><th>#</th>{fields.map(f=><th key={f[1]}>{f[0]}</th>)}<th>Carga conectada (kW)</th><th>Demanda (kW)</th><th>Metros conductor (m)</th><th></th></tr></thead><tbody>{rows.map((row,index)=>{const m=metrics(row);return <tr key={index}><td>{index+1}</td>{fields.map(f=><td key={f[1]}>{f[2]==='select'?<select aria-label={f[0]+' renglón '+(index+1)} value={row[f[1]]||''} onChange={e=>patch(index,f[1],e.target.value)}><option value="">Seleccione</option>{['1F','2F','3F'].map(x=><option key={x}>{x}</option>)}</select>:<input aria-label={f[0]+' renglón '+(index+1)} type={f[2]} value={row[f[1]]??''} onChange={e=>patch(index,f[1],e.target.value)}/>}</td>)}<td className="fiberComputed">{m.connected?m.connected.toFixed(2):'—'}</td><td className="fiberComputed">{m.demand?m.demand.toFixed(2):'—'}</td><td className="fiberComputed">{m.conductorMeters?m.conductorMeters.toLocaleString('es-MX'):'—'}</td><td><button type="button" className="fiberRemove" aria-label={'Eliminar carga '+(index+1)} onClick={()=>saveRows(rows.filter((_,i)=>i!==index))}>×</button></td></tr>})}</tbody><tfoot><tr><th colSpan="10">Total estimado</th><th>{total.connected.toFixed(2)} kW</th><th>{demandWithReserve.toFixed(2)} kW</th><th>{total.conductorMeters.toLocaleString('es-MX')} m</th><th></th></tr></tfoot></table></div>
 </div>
}
function ElectricalSurveyForm({data,setData}){
 const [active,setActive]=useState(0);
 const set=(key,value)=>setData(prev=>({...prev,[key]:value}));
 const allFields=ELECTRICAL_SECTIONS.flatMap(s=>s.fields);
 const filled=allFields.filter(f=>{const v=data['elec_'+f.key];return Array.isArray(v)?v.length>0:Boolean(v)}).length;
 const hasLoads=Array.isArray(data.electrical_loads)&&data.electrical_loads.some(r=>r&&Object.values(r).some(Boolean));
 const progress=Math.round((filled+(hasLoads?1:0))/Math.max(1,allFields.length+1)*100);
 const go=i=>{setActive(i);document.getElementById('electrical-section-'+i)?.scrollIntoView({behavior:'smooth',block:'start'})};
 const exportJson=()=>downloadSortingFile('levantamiento-electrico.json',JSON.stringify({form:'Levantamiento Eléctrico',data},null,2),'application/json');
 return <div className="sortingExperience domainExperience fiberExperience electricalExperience">
  <div className="sortingAppHeader"><div className="sortingAppMark">EE</div><div><strong>Electrical Power Site Survey</strong><span>Levantamiento técnico · Almacenes y edificios</span></div><div className="sortingAppActions"><button type="button" onClick={exportJson}>Exportar JSON</button><button type="button" onClick={()=>window.print()}>PDF en español</button><button type="button" onClick={()=>window.print()}>PDF in English</button><button type="button" className="sortingClearButton" onClick={()=>window.confirm('¿Limpiar los datos de este levantamiento?')&&setData({})}>Limpiar</button></div></div>
  <div className="sortingHero"><div><h2>Levantamiento de Infraestructura Eléctrica</h2><p>Recopile suministro, tableros, cargas, canalizaciones, puesta a tierra, respaldo y condiciones de instalación para preparar una base técnica de diseño y volumetría.</p></div><div className="sortingHeroMeta"><span>Documento<strong>Electrical Site Survey</strong></span><span>Aplicación<strong>Almacén / Edificio</strong></span><span>Estado<strong>{progress===100?'Completo':'En captura'}</strong></span></div></div>
  <div className="sortingLayout"><nav className="sortingProgress" aria-label="Secciones del levantamiento"><div>Avance <b>{progress}%</b></div><div className="sortingProgressBar"><i style={{width:progress+'%'}}/></div>{ELECTRICAL_SECTIONS.map((section,index)=><button type="button" key={section.title} className={active===index?'active':''} onClick={()=>go(index)}><b>{index+1}</b>{section.title}</button>)}</nav>
   <div className="sortingSections">{ELECTRICAL_SECTIONS.map((section,index)=><section className="wfCard sortingSection" id={'electrical-section-'+index} key={section.title}><header><b>{index+1}</b><div><h3>{section.title}</h3><p>{section.subtitle}</p></div><span className="sortingSectionCompletion">{Math.round(section.fields.filter(f=>{const v=data['elec_'+f.key];return Array.isArray(v)?v.length>0:Boolean(v)}).length/Math.max(1,section.fields.length)*100)}%</span></header><div className="wfBody">{section.table==='loads'&&<ElectricalLoadTable data={data} setData={setData}/>}<div className="wfGrid">{section.fields.map(field=><FiberField key={field.key} prefix="elec_" field={field} data={data} set={set}/>)}</div></div></section>)}</div>
  </div>
 </div>
}

function FormRenderer({formId,data,setData,saveForm}){
  if(formId==='eligibility') return <EligibilityWixForm data={data} set={(key,value)=>setData(prev=>typeof key==='object'?key:{...prev,[key]:value})}/>;
  if(formId==='warehouseInitial') return <WarehouseInitialForm data={data} set={(key,value)=>setData(prev=>({...prev,[key]:value}))}/>;
  if(formId==='warehouseDetailed') return <WarehouseDetailedForm data={data} setData={setData}/>;
  if(formId==='amr') return <AMRCalculator data={data} setData={setData}/>;
  if(formId==='fiberVolumetry') return <FiberOpticForm data={data} setData={setData}/>;
  if(formId==='electricalSurvey') return <ElectricalSurveyForm data={data} setData={setData}/>;
  if(formId==='sortingInitial'||formId==='sortingDetailed') return <SortingFormSections formId={formId} data={data} setData={setData} onSave={saveForm}/>;
  const fields=fieldSets[formId]||fieldSets.sortingDetailed;
  const groups=[];
  for(let i=0;i<fields.length;i+=6)groups.push(fields.slice(i,i+6));
  const setField=(key,value)=>setData(prev=>({...prev,[key]:value}));
  return <div className="wfContent">
    {groups.map((group,index)=>
      <Card key={index} number={index+1} title={index===0?'Información general':'Sección '+(index+1)} subtitle="Información de levantamiento">
        <div className="wfGrid">
          {group.map(def=><FormField key={def[0]} def={def} value={data[getKey(def[0])]} onChange={value=>setField(getKey(def[0]),value)}/>)}
        </div>
      </Card>
    )}
    <Card number="✓" title="Cierre" subtitle="Confirmación y observaciones finales.">
      <label className="wfField wide"><span>Observaciones finales del consultor</span><textarea value={data.observaciones_finales||''} onChange={e=>setField('observaciones_finales',e.target.value)}/></label>
    </Card>
  </div>;
}

function FormWorkspace(){
  const [selected,setSelected]=useState('sortingDetailed');
  const [data,setData]=useState({});
  const [saved,setSaved]=useState('');
  const [clients,setClients]=useState([]);
  const [clientId,setClientId]=useState('');
  const [clientModal,setClientModal]=useState(false);
  const [clientForm,setClientForm]=useState({name:'',company:'',notes:''});
  const [clientLoading,setClientLoading]=useState(false);
  const current=useMemo(()=>FORMS.find(x=>x.id===selected)||FORMS[0],[selected]);
  const isWarehouse=selected==='warehouseInitial';
  const workspaceTitle=isWarehouse?'Warehouse First Visit Assessment':current.title;
  const workspaceSubtitle=isWarehouse?'Instrumento de levantamiento · Primera visita':current.subtitle;

  async function loadClients(){
    try{
      const response=await fetch('/api/admin/messages',{cache:'no-store'});
      const payload=await response.json().catch(()=>({}));
      if(!response.ok){
        setSaved(payload.error||'No fue posible cargar los clientes');
        return;
      }
      setClients(payload.clients||[]);
      if(!clientId && payload.clients?.[0]?.id)setClientId(payload.clients[0].id);
    }catch{
      setSaved('No fue posible cargar los clientes');
    }
  }

  async function loadForm(clientOverride=clientId,formOverride=selected){
    if(!clientOverride){
      setData({});
      return;
    }
    try{
      const response=await fetch('/api/admin/forms?clientId='+encodeURIComponent(clientOverride)+'&formId='+encodeURIComponent(formOverride),{cache:'no-store'});
      if(!response.ok){setData({});return;}
      const payload=await response.json();
      setData(payload.data||{});
      setSaved(payload.updated_at?'Último guardado · '+new Date(payload.updated_at).toLocaleString('es-MX'):'Sin guardado');
    }catch{setData({});}
  }

  useEffect(()=>{loadClients();},[]);
  useEffect(()=>{if(clientId)loadForm(clientId,selected);},[clientId,selected]);

  function set(key,value){setData(prev=>({...prev,[key]:value}));}

  async function save(){
    if(!clientId){
      setSaved('Selecciona o agrega un cliente antes de guardar');
      return;
    }
    try{
      const response=await fetch('/api/admin/forms',{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({clientId,formId:selected,data})
      });
      const payload=await response.json().catch(()=>({}));
      if(!response.ok){
        setSaved(payload.error||'No fue posible guardar');
        return;
      }
      setSaved('Guardado · '+new Date().toLocaleString('es-MX'));
    }catch{setSaved('No fue posible guardar');}
  }

  function clear(){
    if(!window.confirm('¿Limpiar los datos capturados de este formulario?'))return;
    setData({});
    setSaved('Formulario limpio · aún no guardado');
  }

  function print(){window.print();}

  async function createClient(event){
    event.preventDefault();
    if(!clientForm.name.trim())return;
    setClientLoading(true);
    try{
      const response=await fetch('/api/admin/messages',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(clientForm)
      });
      const payload=await response.json().catch(()=>({}));
      if(!response.ok){
        setSaved(payload.error||'No fue posible crear el cliente');
        setClientLoading(false);
        return;
      }
      const client=payload.client;
      setClients(prev=>[...prev,client].sort((a,b)=>a.name.localeCompare(b.name,'es')));
      setClientId(client.id);
      setClientForm({name:'',company:'',notes:''});
      setClientModal(false);
      setSaved('Cliente creado · listo para capturar');
    }catch{
      setSaved('No fue posible crear el cliente');
    }finally{
      setClientLoading(false);
    }
  }

  const activeClient=clients.find(x=>x.id===clientId);

  return <div className="wfApp">
    <aside className="wfSide">
      <div className="wfBrand">Inn<i>O</i>v<small>Logistic Solutions</small></div>
      <button className={selected==='eligibility'?'active sidePrimary':''} onClick={()=>setSelected('eligibility')}>Calificación de Elegibilidad</button>
      <strong>Levantamiento Inicial para:</strong>
      <div className="sidePair">
        <button className={selected==='warehouseInitial'?'active':''} onClick={()=>setSelected('warehouseInitial')}>Almacén</button>
        <button className={selected==='sortingInitial'?'active':''} onClick={()=>setSelected('sortingInitial')}>Sorting</button>
      </div>
      <strong>Cuestionario detallado para:</strong>
      <div className="sidePair">
        <button className={selected==='warehouseDetailed'?'active':''} onClick={()=>setSelected('warehouseDetailed')}>Almacén</button>
        <button className={selected==='sortingDetailed'?'active':''} onClick={()=>setSelected('sortingDetailed')}>Sorting</button>
      </div>
      <strong className="sideCalcTitle">Calculadoras x Solución</strong>
      <button className={selected==='amr'?'active':''} onClick={()=>setSelected('amr')}>Cálculo inicial de AMR's</button>
      <button className={selected==='fiberVolumetry'?'active':''} onClick={()=>setSelected('fiberVolumetry')}>Volumetría de Fibra Óptica</button>
      <button className={selected==='electricalSurvey'?'active':''} onClick={()=>setSelected('electricalSurvey')}>Levantamiento Eléctrico</button>
    </aside>

    <div className="wfMain">
      <div className="wfTop">
        <div><b>{workspaceTitle}</b><span>{workspaceSubtitle}</span></div>
        <div className="wfTopActions">
          <button className="clientAddButton" onClick={()=>setClientModal(true)}>+ AGREGAR CLIENTE</button>
          <button onClick={save} disabled={!clientId}>GUARDAR</button>
          <button onClick={print}>PDF</button>
          <button onClick={clear}>LIMPIAR</button>
        </div>
      </div>

      <div className="clientBar">
        <div className="clientBarLabel">CLIENTE ACTIVO</div>
        <select value={clientId} onChange={e=>setClientId(e.target.value)}>
          <option value="">Selecciona un cliente...</option>
          {clients.map(client=><option key={client.id} value={client.id}>{client.name}{client.company?' · '+client.company:''}</option>)}
        </select>
        {activeClient&&<span className="clientBarMeta">{activeClient.company||'Sin empresa'} · Los formularios se guardan por cliente</span>}
        {!clients.length&&<span className="clientBarEmpty">Aún no hay clientes. Usa “+ AGREGAR CLIENTE”.</span>}
      </div>

      {!isWarehouse&&<div className="wfTitleBand">
        <div><h1>{current.title}</h1><p>{current.subtitle} Captura la información mínima necesaria para evaluar la operación, la factibilidad técnica y las oportunidades de automatización.</p></div>
        <div className="wfMeta"><span>Cliente<strong>{activeClient?.name||'Sin seleccionar'}</strong></span><span>Tipo<strong>{selected.includes('sorting')?'Sorting':selected==='amr'?'AMR / AGV':'Warehouse'}</strong></span><span>Estado<strong>{clientId?'En captura':'Selecciona cliente'}</strong></span></div>
      </div>}

      {!clientId&&!isWarehouse&&<div className="clientRequiredNotice">Selecciona un cliente para cargar o guardar la información de este formulario.</div>}

      <FormRenderer formId={selected} data={data} setData={setData} saveForm={save}/>
      {!isWarehouse&&<div className="wfBottom">
        <span>{saved||'Los datos se guardan por cliente en este formulario.'}</span>
        <button onClick={save} disabled={!clientId}>GUARDAR AVANCE</button>
        <button onClick={print}>PDF EN ESPAÑOL</button>
        <button onClick={print}>PDF IN ENGLISH</button>
      </div>}

      {clientModal&&<div className="clientModalBackdrop" role="dialog" aria-modal="true">
        <form className="clientModal" onSubmit={createClient}>
          <div className="clientModalHead"><div><p>INNOV · CLIENTE</p><h2>Agregar cliente</h2></div><button type="button" className="clientModalClose" onClick={()=>setClientModal(false)}>×</button></div>
          <label><span>Nombre del cliente *</span><input value={clientForm.name} onChange={e=>setClientForm({...clientForm,name:e.target.value})} autoFocus required /></label>
          <label><span>Empresa</span><input value={clientForm.company} onChange={e=>setClientForm({...clientForm,company:e.target.value})} /></label>
          <label><span>Notas</span><textarea value={clientForm.notes} onChange={e=>setClientForm({...clientForm,notes:e.target.value})} /></label>
          <div className="clientModalActions"><button type="button" onClick={()=>setClientModal(false)}>CANCELAR</button><button type="submit" disabled={clientLoading}>{clientLoading?'GUARDANDO...':'GUARDAR CLIENTE'}</button></div>
        </form>
      </div>}
    </div>
  </div>;
}

export default function Admin(){
  const [logged,setLogged]=useState(false);
  const [password,setPassword]=useState('');
  const [messages,setMessages]=useState([]);
  const [error,setError]=useState('');
  const [tab,setTab]=useState('contacts');

  async function load(){
    try{
      const response=await fetch('/api/admin/messages',{cache:'no-store'});
      if(!response.ok){setLogged(false);return;}
      const payload=await response.json();
      setMessages(payload.messages||[]);
      setLogged(true);
    }catch{setLogged(false);}
  }

  useEffect(()=>{load();},[]);

  async function login(event){
    event.preventDefault();
    setError('');
    try{
      const response=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});
      if(!response.ok){setError('Contraseña incorrecta');return;}
      setPassword('');
      await load();
    }catch{setError('No fue posible iniciar sesión.');}
  }

  async function logout(){
    try{await fetch('/api/admin/login',{method:'DELETE'});}catch{}
    setLogged(false);
    setMessages([]);
  }

  async function changeStatus(id,status){
    try{
      await fetch('/api/admin/messages',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status})});
      await load();
    }catch{}
  }

  if(!logged){
    return <main className="adminPortal">
      <div className="adminLoginReplica">
        <p className="adminEyebrow">INNOV · ADMIN</p>
        <h1>Acceso a<br/>contactos</h1>
        <p>Ingresa la contraseña administrativa para consultar los prospectos.</p>
        <form onSubmit={login}>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Contraseña" required autoFocus/>
          <button type="submit">ENTRAR →</button>
          {error&&<small>{error}</small>}
        </form>
        <a href="/">← Volver al sitio</a>
      </div>
    </main>;
  }

  return <main className="adminPortal adminLogged">
    <div className="adminPortalShell">
      <div className="adminPortalHeader">
        <div><p className="adminEyebrow">INNOV · ADMIN</p><h1>{tab==='contacts'?'Contactos':'Formularios'}</h1><p>{tab==='contacts'?(messages.length===1?'1 registro reciente':messages.length+' registros recientes'):'Formularios internos de levantamiento.'}</p></div>
        <div className="adminPortalActions"><button className="adminPrimary" onClick={load}>ACTUALIZAR</button><button className="adminGhost" onClick={logout}>SALIR</button></div>
      </div>
      <div className="adminTabs">
        <button className={tab==='contacts'?'active':''} onClick={()=>setTab('contacts')}>CONTACTOS</button>
        <button className={tab==='forms'?'active':''} onClick={()=>setTab('forms')}>FORMULARIOS</button>
      </div>
      {tab==='contacts'
        ? <div className="adminContactList">{messages.length===0?<div className="adminEmpty">Todavía no hay contactos.</div>:messages.map(message=>
          <article className="adminContactCard" key={message.id}>
            <div className="adminContactTop"><div><b>{message.name}</b><span>{message.company||'Sin empresa'}</span></div>
              <select value={message.status||'new'} onChange={e=>changeStatus(message.id,e.target.value)}>
                <option value="new">{CONTACT_STATUS.new}</option><option value="read">{CONTACT_STATUS.read}</option><option value="contacted">{CONTACT_STATUS.contacted}</option><option value="closed">{CONTACT_STATUS.closed}</option>
              </select>
            </div>
            <div className="adminContactMeta"><a href={'mailto:'+message.email}>{message.email}</a>{message.phone&&<a href={'tel:'+message.phone}>{message.phone}</a>}<time>{new Date(message.created_at).toLocaleString('es-MX')}</time></div>
            <p>{message.message}</p>
          </article>
        )}</div>
        : <FormWorkspace />}
    </div>
  </main>;
}

