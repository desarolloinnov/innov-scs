'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function OrchestrationSystemCallout(){
  const pathname = usePathname();

  useEffect(()=>{
    if(pathname !== '/gestion-orquestacion') return;

    const grid = document.querySelector('.goOrchGrid');
    if(!grid || grid.nextElementSibling?.classList?.contains('goSystemCalloutInjected')) return;

    const bar = document.createElement('div');
    bar.className = 'goSystemCalloutInjected';
    bar.innerHTML = '<strong>El sistema conoce lo que debería ocurrir.</strong><span>La ejecución hace que ocurra y la visibilidad permite comprobar lo que realmente ocurrió.</span>';
    bar.style.cssText = [
      'margin-top:26px',
      'background:#f1e8f4',
      'border:1px solid #dbcbe1',
      'border-radius:16px',
      'padding:21px 28px',
      'display:flex',
      'align-items:center',
      'gap:25px',
      'color:#241a39',
      'box-sizing:border-box',
      'transition:transform .25s,box-shadow .25s,border-color .25s'
    ].join(';');

    const strong = bar.querySelector('strong');
    const span = bar.querySelector('span');
    if(strong) strong.style.cssText='font-size:17px;line-height:1.25;color:#241a39';
    if(span) span.style.cssText='font-size:12px;line-height:1.55;color:#675f6d';

    const addResponsiveStyle = document.createElement('style');
    addResponsiveStyle.dataset.orchestrationCallout = 'true';
    addResponsiveStyle.textContent = `
      .goSystemCalloutInjected:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(39,24,63,.10);border-color:#cbb6d6}
      @media(max-width:800px){
        .goSystemCalloutInjected{display:block!important;padding:18px 20px!important}
        .goSystemCalloutInjected strong{display:block;margin-bottom:7px}
        .goSystemCalloutInjected span{display:block}
      }
    `;
    document.head.appendChild(addResponsiveStyle);
    grid.insertAdjacentElement('afterend', bar);

    return ()=>{
      bar.remove();
      addResponsiveStyle.remove();
    };
  },[pathname]);

  return null;
}
