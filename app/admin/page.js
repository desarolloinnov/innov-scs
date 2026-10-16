'use client';

import { useEffect, useMemo, useState } from 'react';

const FORMS = [
  { id:'eligibility', title:'Calificación de Elegibilidad', subtitle:'Preevaluación de la oportunidad.' },
  { id:'warehouseInitial', title:'Levantamiento Inicial para: Almacén', subtitle:'Primera visita y diagnóstico operativo.' },
  { id:'sortingInitial', title:'Levantamiento Inicial para: Sorting', subtitle:'Primera visita y diagnóstico del sistema de clasificación.' },
  { id:'warehouseDetailed', title:'Cuestionario detallado para: Almacén', subtitle:'Levantamiento técnico y operativo.' },
  { id:'sortingDetailed', title:'Cuestionario detallado para: Sorting', subtitle:'Assessment técnico del centro de clasificación.' },
  { id:'amr', title:"Cálculo inicial de AMR's", subtitle:'Captura inicial de datos para pre-scope.' }
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
    ['Read Rate actual','text'],['Porcentaje de No Read','text'],['Manejo de excepciones','textarea'],['Observaciones finales','textarea']
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
    ['Recorrido actual','textarea'],['Problemas observados','textarea'],['Expectativas del cliente','textarea'],['Observaciones finales','textarea']
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

function FormRenderer({formId,data,setData}){
  if(formId==='eligibility') return <EligibilityWixForm data={data} set={(key,value)=>setData(prev=>typeof key==='object'?key:{...prev,[key]:value})}/>;
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

  async function loadClients(){
    try{
      const response=await fetch('/api/admin/clients',{cache:'no-store'});
      if(!response.ok)return;
      const payload=await response.json();
      setClients(payload.clients||[]);
      if(!clientId && payload.clients?.[0]?.id)setClientId(payload.clients[0].id);
    }catch{}
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
      const response=await fetch('/api/admin/clients',{
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
    </aside>

    <div className="wfMain">
      <div className="wfTop">
        <div><b>{current.title}</b><span>{current.subtitle}</span></div>
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

      <div className="wfTitleBand">
        <div><h1>{current.title}</h1><p>{current.subtitle} Captura la información mínima necesaria para evaluar la operación, la factibilidad técnica y las oportunidades de automatización.</p></div>
        <div className="wfMeta"><span>Cliente<strong>{activeClient?.name||'Sin seleccionar'}</strong></span><span>Tipo<strong>{selected.includes('sorting')?'Sorting':selected==='amr'?'AMR / AGV':'Warehouse'}</strong></span><span>Estado<strong>{clientId?'En captura':'Selecciona cliente'}</strong></span></div>
      </div>

      {!clientId&&<div className="clientRequiredNotice">Selecciona un cliente para cargar o guardar la información de este formulario.</div>}

      <nav className="wfProgress">{['Información general','Operación','Infraestructura','Sistemas','Recorrido','Cierre'].map((item,index)=><button key={item}><b>{index+1}</b>{item}</button>)}</nav>
      <FormRenderer formId={selected} data={data} setData={setData}/>
      <div className="wfBottom">
        <span>{saved||'Listo para capturar'}</span>
        <button onClick={save} disabled={!clientId}>GUARDAR AVANCE</button>
        <button onClick={print}>PDF EN ESPAÑOL</button>
        <button onClick={print}>PDF IN ENGLISH</button>
      </div>

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
