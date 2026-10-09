'use client';

import { useEffect, useState } from 'react';

const formChoices = [
  { id:'eligibility', label:'Calificación de Elegibilidad', title:'Calificación de Elegibilidad', subtitle:'Evaluación inicial de la oportunidad.' },
  { id:'warehouseInitial', label:'Almacén · Inicial', title:'Levantamiento Inicial para: Almacén', subtitle:'Instrumento de primera visita para conocer la operación.' },
  { id:'sortingInitial', label:'Sorting · Inicial', title:'Levantamiento Inicial para: Sorting', subtitle:'Instrumento de primera visita para centros de clasificación.' },
  { id:'warehouseDetailed', label:'Almacén · Detallado', title:'Cuestionario detallado para: Almacén', subtitle:'Levantamiento técnico y operativo.' },
  { id:'sortingDetailed', label:'Sorting · Detallado', title:'Cuestionario detallado para: Sorting', subtitle:'Assessment técnico del centro de clasificación.' },
  { id:'amr', label:"Cálculo inicial de AMR's", title:"Cálculo inicial de AMR's", subtitle:'Captura inicial para evaluar una solución AMR / AGV.' },
];

const contactStatus = { new:'Nuevo', read:'Leído', contacted:'Contactado', closed:'Cerrado' };

function Input({ label, value, onChange, type='text', placeholder='' }) {
  return <label className="wfField"><span>{label}</span><input type={type} value={value ?? ''} placeholder={placeholder} onChange={e=>onChange(e.target.value)} /></label>;
}
function Select({ label, value, onChange, options }) {
  return <label className="wfField"><span>{label}</span><select value={value ?? ''} onChange={e=>onChange(e.target.value)}><option value="">Seleccione</option>{options.map(o=><option key={o}>{o}</option>)}</select></label>;
}
function Textarea({ label, value, onChange, wide=true, placeholder='' }) {
  return <label className={wide ? 'wfField wide' : 'wfField'}><span>{label}</span><textarea value={value ?? ''} placeholder={placeholder} onChange={e=>onChange(e.target.value)} /></label>;
}
function Card({ number, title, subtitle, children }) {
  return <section className="wfCard"><header><b>{number}</b><div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div></header><div className="wfBody">{children}</div></section>;
}
function Notice({ children }) {
  return <div className="wfNotice">{children}</div>;
}

function GeneralCard({ data, set }) {
  return <Card number="1" title="Información general" subtitle="Datos básicos de la visita.">
    <div className="wfGrid">
      <Input label="Cliente *" value={data.cliente} onChange={v=>set('cliente',v)} />
      <Input label="Centro de distribución / sitio *" value={data.sitio} onChange={v=>set('sitio',v)} />
      <Input label="Fecha *" type="date" value={data.fecha} onChange={v=>set('fecha',v)} />
      <Input label="Responsable del cliente" value={data.responsable} onChange={v=>set('responsable',v)} />
      <Input label="Puesto" value={data.puesto} onChange={v=>set('puesto',v)} />
      <Input label="Consultor responsable" value={data.consultor} onChange={v=>set('consultor',v)} />
    </div>
  </Card>;
}

function SortingCards({ data, set }) {
  return <>
    <GeneralCard data={data} set={set} />
    <Card number="2" title="Entendimiento de la operación" subtitle="Volumen, características físicas y calidad del proceso.">
      <h4>2.1 Volumen de operación</h4>
      <Notice>Capture el volumen realmente procesado, no sólo la capacidad nominal.</Notice>
      <div className="wfGrid four">
        <Input label="Volumen promedio diario" value={data.avg} onChange={v=>set('avg',v)} placeholder="Paquetes / día" />
        <Input label="Volumen pico diario" value={data.peak} onChange={v=>set('peak',v)} />
        <Input label="Volumen mínimo diario" value={data.min} onChange={v=>set('min',v)} />
        <Input label="Horas efectivas por día" value={data.hours} onChange={v=>set('hours',v)} />
      </div>
      <h4>2.2 Características del flujo</h4>
      <div className="wfGrid">
        <Select label="Unidad de manejo principal" value={data.unit} onChange={v=>set('unit',v)} options={['Tarima','Caja','Tote','Paquete','Mixta','Otra']} />
        <Input label="Peso típico" value={data.weight} onChange={v=>set('weight',v)} placeholder="kg" />
        <Input label="Dimensiones típicas" value={data.dimensions} onChange={v=>set('dimensions',v)} />
        <Select label="Variabilidad del producto" value={data.variability} onChange={v=>set('variability',v)} options={['Baja','Media','Alta']} />
        <Textarea label="Observaciones" value={data.flowNotes} onChange={v=>set('flowNotes',v)} />
      </div>
    </Card>
    <Card number="3" title="Infraestructura" subtitle="Condiciones físicas y disponibilidad de servicios.">
      <div className="wfSubgrid">
        <h4>3.1 Nave y espacio disponible</h4>
        <div className="wfGrid">
          <Input label="Altura libre disponible" value={data.height} onChange={v=>set('height',v)} placeholder="Ej. 8.5 m" />
          <Input label="Área aproximada" value={data.area} onChange={v=>set('area',v)} placeholder="m²" />
          <Textarea label="Restricciones físicas" value={data.constraints} onChange={v=>set('constraints',v)} />
        </div>
        <h4>3.2 Piso</h4>
        <div className="wfGrid three">
          <Select label="¿Existe estudio de planicidad?" value={data.flatness} onChange={v=>set('flatness',v)} options={['Sí','No','Por confirmar']} />
          <Input label="Capacidad de carga" value={data.floorLoad} onChange={v=>set('floorLoad',v)} placeholder="t/m²" />
          <Input label="Espesor de losa" value={data.floorThickness} onChange={v=>set('floorThickness',v)} placeholder="cm" />
        </div>
        <Textarea label="Observaciones del piso" value={data.floorNotes} onChange={v=>set('floorNotes',v)} />
        <h4>3.3 Energía eléctrica</h4>
        <div className="wfGrid three">
          <Input label="Voltaje disponible" value={data.voltage} onChange={v=>set('voltage',v)} />
          <Input label="Capacidad disponible" value={data.power} onChange={v=>set('power',v)} />
          <Select label="¿Existe capacidad suficiente?" value={data.powerOk} onChange={v=>set('powerOk',v)} options={['Sí','No','Por confirmar']} />
        </div>
        <Textarea label="Observaciones eléctricas" value={data.powerNotes} onChange={v=>set('powerNotes',v)} />
      </div>
    </Card>
    <Card number="4" title="Sistemas e integración" subtitle="Sistemas actuales y tecnologías de identificación.">
      <div className="checkGrid">
        {['WMS','ERP','TMS','OMS','Sistema propio'].map((x,i)=><label key={x} className="checkRow"><input type="checkbox" checked={!!data['sys'+i]} onChange={e=>set('sys'+i,e.target.checked)} /><span>{x}</span></label>)}
      </div>
      <div className="wfGrid">
        <Input label="Sistema principal" value={data.mainSystem} onChange={v=>set('mainSystem',v)} />
        <Select label="Método de integración" value={data.integration} onChange={v=>set('integration',v)} options={['REST API','SOAP','Web Services','Base de datos','CSV / XML','FTP / SFTP','MQTT','OPC-UA','Otro']} />
        <Textarea label="Comentarios de integración" value={data.integrationNotes} onChange={v=>set('integrationNotes',v)} />
      </div>
      <h4>4.1 Tecnologías de identificación</h4>
      <table className="wfTable"><thead><tr><th>Tecnología</th><th>% del volumen</th><th>Comentarios</th></tr></thead><tbody>
        {['Código de barras 1D','QR / Código 2D','OCR','RFID','Captura manual'].map((x,i)=><tr key={x}><td>{x}</td><td><input value={data['pct'+i] ?? ''} onChange={e=>set('pct'+i,e.target.value)} /></td><td><input value={data['note'+i] ?? ''} onChange={e=>set('note'+i,e.target.value)} /></td></tr>)}
      </tbody></table>
      <div className="wfSummary"><div><b>Read Rate</b><span>{data.readRate || '—'}%</span></div><div><b>No Read</b><span>{data.noRead || '—'}%</span></div></div>
      <Textarea label="Manejo de excepciones" value={data.exceptions} onChange={v=>set('exceptions',v)} placeholder="Recirculación, estación manual, reetiquetado..." />
    </Card>
    <Card number="5" title="Recorrido y observaciones" subtitle="Documente el flujo físico y los puntos de interés.">
      <div className="wfGrid">
        <Textarea label="Recorrido actual" value={data.route} onChange={v=>set('route',v)} />
        <Textarea label="Problemas observados" value={data.problems} onChange={v=>set('problems',v)} />
        <Textarea label="Expectativas del cliente" value={data.expectations} onChange={v=>set('expectations',v)} />
        <Textarea label="Recomendaciones preliminares" value={data.recommendations} onChange={v=>set('recommendations',v)} />
      </div>
    </Card>
    <Card number="6" title="Cierre" subtitle="Confirmación de entregables y pendientes.">
      <div className="wfTableWrap"><table className="wfTable"><thead><tr><th>Elemento</th><th>Confirmado</th><th>Pendiente</th><th>Notas</th></tr></thead><tbody>
        {['Plano CAD','Plano del inmueble','Sistema contra incendio','WMS identificado','Método de integración','Destinos','Capacidad requerida','Fotografías'].map((x,i)=><tr key={x}><td>{x}</td><td><input type="radio" name={'c'+i} onChange={()=>set('c'+i,'Sí')} checked={data['c'+i]==='Sí'} /></td><td><input type="radio" name={'c'+i} onChange={()=>set('c'+i,'No')} checked={data['c'+i]==='No'} /></td><td><input value={data['cn'+i] ?? ''} onChange={e=>set('cn'+i,e.target.value)} /></td></tr>)}
      </tbody></table></div>
      <Textarea label="Observaciones finales del consultor" value={data.finalNotes} onChange={v=>set('finalNotes',v)} />
    </Card>
  </>;
}

function EligibilityForm({ data, set }) {
  const score = ['e1','e2','e3','e4'].reduce((a,k)=>a+Number(data[k]||0),0);
  const status = score >= 8 ? 'Elegible' : score >= 5 ? 'Revisión requerida' : 'No elegible';
  return <>
    <Card number="1" title="Datos de elegibilidad" subtitle="Preevaluación de la oportunidad.">
      <div className="wfGrid">
        <Input label="Cliente" value={data.client} onChange={v=>set('client',v)} />
        <Input label="Operación" value={data.operation} onChange={v=>set('operation',v)} />
        <Input label="Volumen relevante" value={data.volume} onChange={v=>set('volume',v)} />
        <Select label="Nivel de automatización" value={data.automation} onChange={v=>set('automation',v)} options={['Bajo','Medio','Alto']} />
      </div>
    </Card>
    <Card number="2" title="Evaluación rápida" subtitle="Puntaje visual provisional.">
      <div className="wfGrid">
        {['Volumen suficiente','Problema claramente identificado','Datos disponibles','Viabilidad operativa'].map((x,i)=><Input key={x} label={x} type="number" value={data['e'+(i+1)]} onChange={v=>set('e'+(i+1),v)} placeholder="0–3" />)}
      </div>
      <div className="wfSummary"><div><b>Puntuación</b><span>{score} / 12</span></div><div><b>Resultado</b><span className={status==='Elegible'?'ok':status==='Revisión requerida'?'warn':'bad'}>{status}</span></div></div>
    </Card>
  </>;
}

function AmrForm({ data, set }) {
  const peak=Number(data.peak||0), cap=Number(data.capacity||0), util=Math.max(.1,Math.min(1,Number(data.util||75)/100));
  const robots=cap?Math.max(0,Math.ceil(peak/(cap*util))):0;
  return <>
    <Notice><b>Instructivo de uso rápido</b><br/>Esta vista se prepara para la captura inicial del cálculo. Las fórmulas finas se ajustarán después.</Notice>
    <div className="metricTiles"><div><span>Robots estimados</span><strong>{robots||'—'}</strong></div><div><span>Estaciones</span><strong>{data.stations||'—'}</strong></div><div><span>Inversión</span><strong>{data.investment ? '$'+data.investment : '—'}</strong></div><div><span>Payback</span><strong>{data.payback ? data.payback+' meses' : '—'}</strong></div></div>
    <Card number="1" title="Captura mínima" subtitle="Datos disponibles en pre-scope.">
      <div className="wfGrid">
        <Select label="Tipo de proceso" value={data.type} onChange={v=>set('type',v)} options={['Picking AMR','Goods-to-person','Pallets / AGV','Totes / Bins','Mixto']} />
        <Input label="Volumen pico por hora" type="number" value={data.peak} onChange={v=>set('peak',v)} />
        <Input label="Capacidad conservadora por robot / h" type="number" value={data.capacity} onChange={v=>set('capacity',v)} />
        <Input label="Utilización objetivo (%)" type="number" value={data.util} onChange={v=>set('util',v)} placeholder="75" />
        <Input label="Número de estaciones" type="number" value={data.stations} onChange={v=>set('stations',v)} />
        <Input label="Inversión estimada" value={data.investment} onChange={v=>set('investment',v)} />
        <Input label="Ahorro mensual estimado" value={data.saving} onChange={v=>set('saving',v)} />
        <Input label="Payback" value={data.payback} onChange={v=>set('payback',v)} />
      </div>
    </Card>
  </>;
}

function FormWorkspace() {
  const [selected,setSelected]=useState('sortingDetailed');
  const [data,setData]=useState({});
  const [saved,setSaved]=useState('');
  const current=formChoices.find(f=>f.id===selected) || formChoices[0];

  useEffect(()=>{
    try {
      const raw=localStorage.getItem('innov_form_'+selected);
      setData(raw ? JSON.parse(raw) : {});
    } catch {
      setData({});
    }
  },[selected]);

  const set=(key,value)=>setData(prev=>({...prev,[key]:value}));

  const save=()=>{
    try {
      localStorage.setItem('innov_form_'+selected,JSON.stringify(data));
      setSaved('Guardado localmente · '+new Date().toLocaleTimeString('es-MX'));
    } catch {}
  };

  const clear=()=>{
    setData({});
    try { localStorage.removeItem('innov_form_'+selected); } catch {}
  };

  const print=()=>window.print();

  const renderForm = selected==='eligibility'
    ? <EligibilityForm data={data} set={set} />
    : selected==='amr'
      ? <AmrForm data={data} set={set} />
      : <SortingCards data={data} set={set} />;

  const steps=['Información general','Operación','Infraestructura','Sistemas','Recorrido','Cierre'];

  return <div className="wfApp">
    <aside className="wfSide">
      <div className="wfBrand">Inn<i>O</i>v<small>Logistic Solutions</small></div>
      <button className={selected==='eligibility'?'active sidePrimary':''} onClick={()=>setSelected('eligibility')}>Calificación de Elegibilidad</button>
      <strong>Levantamiento Inicial para:</strong>
      <div className="sidePair"><button className={selected==='warehouseInitial'?'active':''} onClick={()=>setSelected('warehouseInitial')}>Almacén</button><button className={selected==='sortingInitial'?'active':''} onClick={()=>setSelected('sortingInitial')}>Sorting</button></div>
      <strong>Cuestionario detallado para:</strong>
      <div className="sidePair"><button className={selected==='warehouseDetailed'?'active':''} onClick={()=>setSelected('warehouseDetailed')}>Almacén</button><button className={selected==='sortingDetailed'?'active':''} onClick={()=>setSelected('sortingDetailed')}>Sorting</button></div>
      <strong className="sideCalcTitle">Calculadoras x Solución</strong>
      <button className={selected==='amr'?'active':''} onClick={()=>setSelected('amr')}>Cálculo inicial de AMR's</button>
    </aside>

    <div className="wfMain">
      <div className="wfTop">
        <div><b>{current.title}</b><span>{current.subtitle}</span></div>
        <div className="wfTopActions"><button onClick={save}>Guardar</button><button onClick={print}>PDF</button><button onClick={clear}>Limpiar</button></div>
      </div>

      <div className="wfTitleBand">
        <div><h1>{current.title}</h1><p>{current.subtitle} Captura la información mínima necesaria para evaluar la operación, la factibilidad técnica y las oportunidades de automatización.</p></div>
        <div className="wfMeta"><span>Documento<strong>Primera visita</strong></span><span>Tipo<strong>{selected.includes('sorting')?'Sorting':selected==='amr'?'AMR / AGV':'Warehouse'}</strong></span><span>Estado<strong>En captura</strong></span></div>
      </div>

      {selected!=='eligibility' && selected!=='amr' && <nav className="wfProgress"><div>Avance <b>0%</b></div>{steps.map((s,i)=><button key={s}><b>{i+1}</b>{s}</button>)}</nav>}

      <div className="wfContent">{renderForm()}</div>
      <div className="wfBottom"><span>{saved || 'Guardado local · listo para capturar'}</span><button onClick={save}>Guardar avance</button><button onClick={print}>PDF en español</button><button onClick={print}>PDF in English</button></div>
    </div>
  </div>;
}

export default function Admin() {
  const [logged,setLogged]=useState(false);
  const [password,setPassword]=useState('');
  const [messages,setMessages]=useState([]);
  const [error,setError]=useState('');
  const [tab,setTab]=useState('contacts');

  async function load() {
    const r=await fetch('/api/admin/messages',{cache:'no-store'});
    if(!r.ok){setLogged(false);return;}
    const data=await r.json();
    setMessages(data.messages||[]);
    setLogged(true);
  }
  useEffect(()=>{load();},[]);
  async function login(e){
    e.preventDefault(); setError('');
    const r=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})});
    if(!r.ok){setError('Contraseña incorrecta');return;}
    setPassword('');
    await load();
  }
  async function logout(){await fetch('/api/admin/login',{method:'DELETE'});setLogged(false);setMessages([]);}
  async function changeStatus(id,status){
    await fetch('/api/admin/messages',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status})});
    await load();
  }

  if(!logged) return <main className="adminPortal"><div className="adminLoginReplica"><p className="adminEyebrow">INNOV · ADMIN</p><h1>Acceso a<br/>contactos</h1><p>Ingresa la contraseña administrativa para consultar los prospectos.</p><form onSubmit={login}><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Contraseña" required autoFocus/><button>ENTRAR →</button>{error&&<small>{error}</small>}</form><a href="/">← Volver al sitio</a></div></main>;

  return <main className="adminPortal adminLogged">
    <div className="adminPortalShell">
      <div className="adminPortalHeader"><div><p className="adminEyebrow">INNOV · ADMIN</p><h1>{tab==='contacts'?'Contactos':'Formularios'}</h1><p>{tab==='contacts'?(messages.length===1?'1 registro reciente':messages.length+' registros recientes'):'Formularios internos de levantamiento.'}</p></div><div className="adminPortalActions"><button className="adminPrimary" onClick={()=>tab==='contacts'&&load}>ACTUALIZAR</button><button className="adminGhost" onClick={logout}>SALIR</button></div></div>
      <div className="adminTabs"><button className={tab==='contacts'?'active':''} onClick={()=>setTab('contacts')}>CONTACTOS</button><button className={tab==='forms'?'active':''} onClick={()=>setTab('forms')}>FORMULARIOS</button></div>
      {tab==='contacts'
        ? <div className="adminContactList">{messages.length===0?<div className="adminEmpty">Todavía no hay contactos.</div>:messages.map(m=><article className="adminContactCard" key={m.id}><div className="adminContactTop"><div><b>{m.name}</b><span>{m.company||'Sin empresa'}</span></div><select value={m.status} onChange={e=>changeStatus(m.id,e.target.value)}><option value="new">{contactStatus.new}</option><option value="read">{contactStatus.read}</option><option value="contacted">{contactStatus.contacted}</option><option value="closed">{contactStatus.closed}</option></select></div><div className="adminContactMeta"><a href={'mailto:'+m.email}>{m.email}</a>{m.phone&&<a href={'tel:'+m.phone}>{m.phone}</a>}<time>{new Date(m.created_at).toLocaleString('es-MX')}</time></div><p>{m.message}</p></article>)}</div>
        : <FormWorkspace />}
    </div>
  </main>;
}
