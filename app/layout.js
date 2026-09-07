import './globals.css';
import './capabilities-overrides.css';
import './industry-overrides.css';
import './about-overrides.css';
import './ecosystem-overrides.css';
import './methodology-overrides.css';
import './intralogistica/polish.css';
import './intralogistica/cainiao-fix.css';
import './intralogistica/alignment-fix.css';
import './gestion-orquestacion/pill-fix.css';
import './gestion-orquestacion/dashboard-real-fix.css';
import './gestion-orquestacion/logo-fix.css';
import './gestion-orquestacion/partners-section-fix.css';
import './gestion-orquestacion/partner-section-exact.css';
import CapabilityLinks from './CapabilityLinks';
import OrchestrationSystemCallout from './OrchestrationSystemCallout';
export const metadata={title:'Innov | Supply Chain Solutions',description:'Soluciones integrales de WMS, automatización e integración tecnológica.'};
export default function RootLayout({children}){return <html lang="es"><body>{children}<CapabilityLinks/><OrchestrationSystemCallout/></body></html>}