'use client';
import { useEffect } from 'react';

export default function CapabilityLinks(){
  useEffect(()=>{
    const cards = document.querySelectorAll('#capacidades .capGrid article');
    if(!cards.length) return;
    const handlers=[];
    cards.forEach((card,index)=>{
      const target = index===0 ? '/intralogistica' : index===1 ? '/gestion-orquestacion' : index===2 ? '/identificacion-trazabilidad' : index===3 ? '/visibilidad-inteligencia' : index===4 ? '/seguridad-continuidad' : index===5 ? '/analitica-optimizacion' : index===6 ? '/infraestructura-conectividad' : null;
      if(!target) return;
      const go=()=>{window.location.href=target;};
      card.style.cursor='pointer';
      card.setAttribute('role','link');
      card.setAttribute('tabindex','0');
      card.setAttribute('aria-label',index===0?'Abrir Automatización Intralogística':index===1?'Abrir Gestión y Orquestación':index===2?'Abrir Identificación y Trazabilidad':index===3?'Abrir Visibilidad e Inteligencia Operativa':index===4?'Abrir Seguridad y Continuidad Operativa':index===5?'Abrir Analítica y Optimización':'Abrir Infraestructura y Conectividad');
      const key=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}};
      card.addEventListener('click',go);
      card.addEventListener('keydown',key);
      handlers.push(()=>{card.removeEventListener('click',go);card.removeEventListener('keydown',key);});
    });
    return ()=>handlers.forEach(fn=>fn());
  },[]);
  return null;
}
