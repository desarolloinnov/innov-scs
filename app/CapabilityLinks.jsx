'use client';
import { useEffect } from 'react';

export default function CapabilityLinks(){
  useEffect(()=>{
    const cards = document.querySelectorAll('#capacidades .capGrid article');
    if(!cards.length) return;
    const handlers=[];
    cards.forEach((card,index)=>{
      const target = index===0 ? '/intralogistica' : index===1 ? '/gestion-orquestacion' : null;
      if(!target) return;
      const go=()=>{window.location.href=target;};
      card.style.cursor='pointer';
      card.setAttribute('role','link');
      card.setAttribute('tabindex','0');
      card.setAttribute('aria-label',index===0?'Abrir Automatización Intralogística':'Abrir Gestión y Orquestación');
      const key=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}};
      card.addEventListener('click',go);
      card.addEventListener('keydown',key);
      handlers.push(()=>{card.removeEventListener('click',go);card.removeEventListener('keydown',key);});
    });
    return ()=>handlers.forEach(fn=>fn());
  },[]);
  return null;
}
