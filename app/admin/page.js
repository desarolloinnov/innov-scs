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

function FormRenderer({formId,data,setData}){
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
  const current=useMemo(()=>FORMS.find(x=>x.id===selected)||FORMS[0],[selected]);

  useEffect(()=>{
    try{
      const raw=localStorage.getItem('innov_form_'+selected);
      setData(raw?JSON.parse(raw):{});
    }catch{setData({});}
  },[selected]);

  function save(){
    try{
      localStorage.setItem('innov_form_'+selected,JSON.stringify(data));
      setSaved('Guardado localmente · '+new Date().toLocaleTimeString('es-MX'));
    }catch{}
  }
  function clear(){
    setData({});
    try{localStorage.removeItem('innov_form_'+selected);}catch{}
  }
  function print(){window.print();}

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
        <div className="wfTopActions"><button onClick={save}>Guardar</button><button onClick={print}>PDF</button><button onClick={clear}>Limpiar</button></div>
      </div>
      <div className="wfTitleBand">
        <div><h1>{current.title}</h1><p>{current.subtitle} Captura la información mínima necesaria para evaluar la operación, la factibilidad técnica y las oportunidades de automatización.</p></div>
        <div className="wfMeta"><span>Documento<strong>Primera visita</strong></span><span>Tipo<strong>{selected.includes('sorting')?'Sorting':selected==='amr'?'AMR / AGV':'Warehouse'}</strong></span><span>Estado<strong>En captura</strong></span></div>
      </div>
      <nav className="wfProgress">{['Información general','Operación','Infraestructura','Sistemas','Recorrido','Cierre'].map((item,index)=><button key={item}><b>{index+1}</b>{item}</button>)}</nav>
      <FormRenderer formId={selected} data={data} setData={setData}/>
      <div className="wfBottom"><span>{saved||'Guardado local · listo para capturar'}</span><button onClick={save}>Guardar avance</button><button onClick={print}>PDF en español</button><button onClick={print}>PDF in English</button></div>
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
