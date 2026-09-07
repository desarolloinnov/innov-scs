'use client';
import { useEffect } from 'react';

export default function CapabilityLinks(){
  useEffect(()=>{
    const first = document.querySelector('#capacidades .capGrid article:first-child');
    if(!first) return;
    const go = ()=>{ window.location.href='/intralogistica'; };
    first.style.cursor='pointer';
    first.setAttribute('aria-label','Abrir Automatización Intralogística');
    first.addEventListener('click',go);
    return ()=>first.removeEventListener('click',go);
  },[]);
  return null;
}
