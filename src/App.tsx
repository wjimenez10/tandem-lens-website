import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Import sections
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Soluciones from './sections/Soluciones';
import WhyTandem from './sections/WhyTandem';
import Casos from './sections/Casos';
import HRMProduct from './sections/HRMProduct';
import Academy from './sections/Academy';
import Eventos from './sections/Eventos';
import Blog from './sections/Blog';
import VCISOSection from './sections/VCISOSection';
import Recursos from './sections/Recursos';
import Footer from './sections/Footer';
import NeuralBackground from './components/NeuralBackground';
import QuienesSomos from './sections/QuienesSomos';

gsap.registerPlugin(ScrollTrigger);

export type Language = 'es' | 'en';

export interface Translations {
  [key: string]: string | Translations;
}

const translations = {
  es: {
    nav: {
      solutions: 'Soluciones',
      platform: 'Plataforma',
      academy: 'Academy',
      insights: 'Insights',
      contact: 'Contacto',
      cta: 'Habla con un experto',
    },
    hero: {
      title: 'Seguridad real. Para el mundo real.',
      subtitle: 'Protegemos empresas en USA y Latinoamérica con ciberseguridad ofensiva y defensiva, administración Linux y criptografía post-cuántica. Operamos desde Buenos Aires y Estados Unidos.',
      cta1: 'Habla con un experto',
      cta2: 'Ver demo HRM',
      card1Title: 'Cobertura 24/7',
      card1Desc: 'SOC, threat intelligence y contención en minutos.',
      card2Title: 'Enfoque en el riesgo humano',
      card2Desc: 'Simulaciones, entrenamiento y métricas que reducen incidentes.',
      trustBadge: 'Especialistas en ciberseguridad · +10 años · USA & LATAM',
      partnersTitle: 'Partners & Certificaciones',
      soyLabel: 'Soy:',
      oLabel: 'o',
      urgencyBanner: 'Q2 2026: Cupos limitados para vCISO →',
      urgencyCTA: 'Reservar ahora',
      personaCTA: {
        ciso: 'CISO: Agenda consulta estratégica',
        cto: 'CTO: Ver integración con tu stack',
        compliance: 'Compliance: Evaluar gap analysis',
      },
    },
    soluciones: {
      title: 'Soluciones integrales',
      subtitle: 'Un solo socio para detectar, responder, gobernar y entrenar.',
      cards: {
        consultoria: {
          title: 'Consultoría & Auditorías',
          desc: 'Evaluamos y diseñamos defensas alineadas a ISO, NIST y CIS.',
          cta: 'Explorar',
        },
        soc: {
          title: 'SOC & Blue Team',
          desc: 'Monitoreo y respuesta 24/7 con inteligencia de amenazas.',
          cta: 'Ver capacidades SOC',
        },
        redteam: {
          title: 'Red Team & Pentesting',
          desc: 'Ataques controlados para evaluar tu resiliencia digital.',
          cta: 'Solicitar simulación',
        },
        threat: {
          title: 'Threat Intelligence',
          desc: 'Detectamos tendencias y campañas dirigidas a tu industria.',
          cta: 'Ver informes',
        },
        hrm: {
          title: 'HRM Platform',
          desc: 'IA para medir y reducir el riesgo humano en toda la organización.',
          cta: 'Ver demo',
        },
        academy: {
          title: 'Academy & Formación',
          desc: 'Entrenamos equipos y líderes en seguridad digital y resiliencia.',
          cta: 'Ver programas',
        },
        vciso: {
          title: 'vCISO as a Service',
          desc: 'Liderazgo CISO bajo demanda para definir estrategia, gobernanza, riesgo y cumplimiento.',
          cta: 'Explorar vCISO',
        },
      },
    },
    why: {
      title: 'Por qué Tandem Lens',
      subtitle: 'IA aplicada a la detección. Cobertura 360° Red/Blue. Enfoque humano medible.',
      cta: 'Descargar brochure corporativo',
      cards: {
        integracion: {
          title: 'Integración real',
          desc: 'No vendemos herramientas. Integramos procesos, datos y equipos para que todo funcione junto.',
        },
        metricas: {
          title: 'Métricas de negocio',
          desc: 'Traducimos seguridad en MTTD, MTTR, reducción de riesgo humano y ROI—listo para el board.',
        },
        escalabilidad: {
          title: 'Escalabilidad',
          desc: 'Desde startups reguladas hasta infraestructura crítica. Modelos flexibles: proyecto, suscripción o SOC gestionado.',
        },
      },
    },
    casos: {
      title: 'Casos y Métricas',
      subtitle: 'Resultados reales de nuestros clientes.',
      cta: 'Ver casos',
      roiTitle: 'Calcula el costo de un breach vs. inversión en prevención',
      roiDesc: 'Según IBM, el costo promedio de una brecha de datos en 2024 fue de',
      roiAmount: '$4.45M',
      roiCTA: 'Calcular mi ROI',
      roiStats: {
        roi: 'ROI típico: 300-400%',
        payback: 'Payback: 6-12 meses',
      },
      metrics: {
        riesgo: '-75% riesgo humano',
        mttd: 'Reducción MTTD 35%',
        respuesta: 'MTTR < 2.5 horas',
        madurez: '+3 niveles madurez NIST',
      },
      metricsLabels: {
        riesgo: 'reducción riesgo humano',
        mttd: 'reducción MTTD',
        respuesta: 'MTTR promedio',
        madurez: 'niveles madurez NIST',
      },
      testimonials: [
        {
          quote: 'El 60% de las PYMEs que sufren un ciberataque serio cierran dentro de los 6 meses siguientes al incidente.',
          author: 'National Cyber Security Alliance',
          role: 'Estudio de impacto',
          company: 'NCSA Report',
        },
        {
          quote: 'El costo promedio de una brecha de datos en América Latina alcanzó los USD 2.46 millones en 2024, un aumento del 11% respecto al año anterior.',
          author: 'IBM Security',
          role: 'Cost of a Data Breach Report 2024',
          company: 'IBM',
        },
        {
          quote: 'Se proyecta una escasez global de 3.5 millones de profesionales en ciberseguridad para 2025, dejando a miles de empresas sin cobertura especializada.',
          author: 'ISC² Cybersecurity Workforce Study',
          role: 'Informe anual',
          company: 'ISC²',
        },
      ],
    },
    hrm: {
      title: 'La plataforma que mide y reduce el riesgo humano con IA.',
      subtitle: 'Automatiza campañas de concienciación, simula ataques y entrena a tu equipo con escenarios reales.',
      cta: 'Solicitar demo',
      badge: 'AI-Powered',
      features: {
        phishing: {
          title: 'Phishing simulado',
          desc: 'Lanzamientos programados, análisis de clics y rutas de aprendizaje automáticas.',
        },
        metricas: {
          title: 'Métricas que convencen al board',
          desc: 'Risk score por equipo, reducción de MTTD/MTTR y ROI del programa.',
        },
      },
      stats: {
        riskScore: 'Risk Score',
        training: 'Training',
      },
    },
    academy: {
      title: 'Academy & Certificaciones',
      subtitle: 'Formamos equipos resilientes y líderes digitales.',
      cta: 'Calendario 2026',
      viewDetails: 'Ver detalles',
      levels: {
        intermediate: 'Intermedio',
        advanced: 'Avanzado',
        executive: 'Ejecutivo',
      },
      banner: {
        title: 'Certificaciones reconocidas por la industria',
        desc: 'Nuestros cursos incluyen certificaciones válidas internacionalmente y métricas de progreso en tiempo real.',
        cta: 'Explorar certificaciones',
      },
      courses: {
        blue: 'Blue Team Operations',
        red: 'Red Team Fundamentals',
        ir: 'Incident Response',
        leadership: 'Security Leadership',
      },
      durations: {
        blue: '40h',
        red: '60h',
        ir: '32h',
        leadership: '16h',
      },
    },
    eventos: {
      title: 'Eventos y Comunidad',
      banner: 'Cyber Shield Summit – Miami, FL',
      bannerDate: 'Próximamente — 2026',
      cta1: 'Participar',
      cta2: 'Ver grabaciones on-demand',
      nextEvent: 'Próximo evento',
      location: 'Miami Convention Center',
      attendees: 'USA & LATAM',
      pastEvents: [
        {
          title: 'Webinar: Threat Hunting Avanzado',
          date: 'Ene 2026',
          type: 'Webinar',
        },
        {
          title: 'Workshop: Respuesta a Incidentes',
          date: 'Feb 2026',
          type: 'Workshop',
        },
        {
          title: 'CISO Roundtable Buenos Aires',
          date: 'Mar 2026',
          type: 'Networking',
        },
      ],
    },
    blog: {
      title: 'Blog / Recursos',
      subtitle: 'Reportes descargables y análisis de amenazas.',
      cta: 'Descargar reporte',
      viewAll: 'Ver todos',
      tags: {
        report: 'REPORTE',
        guide: 'GUÍA',
        article: 'ARTÍCULO',
      },
      newsletter: {
        title: 'Suscríbete a nuestros reportes',
        desc: 'Recibe análisis de amenazas, guías prácticas y novedades de la industria directamente en tu inbox.',
        placeholder: 'tu@email.com',
        button: 'Suscribirme',
      },
      posts: {
        threat: {
          title: 'Threat Landscape 2025',
          desc: 'Análisis completo de amenazas emergentes y tendencias globales.',
        },
        human: {
          title: 'Cómo medir el riesgo humano',
          desc: 'Guía práctica para implementar métricas de comportamiento de seguridad.',
        },
        soc: {
          title: 'Del SOC al board: métricas que importan',
          desc: 'Cómo comunicar el valor de seguridad a la alta dirección.',
        },
      },
    },
    recursos: {
      title: 'Recursos exclusivos para líderes de seguridad',
      subtitle: 'Descarga guías, playbooks y herramientas probadas por CISOs de Fortune 500.',
      badge: 'Recursos Gratuitos',
      downloadBtn: 'Descargar gratis',
      downloads: 'descargas',
      rating: 'Rating promedio',
      recommend: 'Recomiendan',
      socialProof: 'por profesionales de seguridad',
      resources: {
        cisoGuide: {
          title: "The CISO's Guide to Board Reporting",
          desc: 'Plantillas y métricas para comunicar el valor de seguridad a la alta dirección. Incluye 5 templates listos para usar.',
          time: '15 min lectura',
          topics: ['KPIs ejecutivos', 'Dashboards', 'ROI de seguridad'],
        },
        ransomware: {
          title: 'Ransomware Response Playbook 2025',
          desc: 'Protocolo paso a paso para responder a incidentes de ransomware. Basado en NIST SP 800-61.',
          time: '45 min lectura',
          topics: ['IR Plan', 'Comunicación', 'Forensics'],
        },
        hrmRoi: {
          title: 'HRM ROI Calculator',
          desc: 'Hoja de cálculo interactiva para medir el retorno de inversión de tu programa de gestión de riesgo humano.',
          time: 'Excel + Guía',
          topics: ['Métricas', 'Benchmarks', 'Proyecciones'],
        },
        nist: {
          title: 'NIST CSF 2.0 Implementation Checklist',
          desc: 'Checklist completo para implementar el nuevo Cybersecurity Framework 2.0 en tu organización.',
          time: '30 min lectura',
          topics: ['GOV', 'ID', 'PR', 'DE', 'RS', 'RC'],
        },
      },
    },
    vciso: {
      title: 'vCISO as a Service',
      subtitle: 'Liderazgo estratégico en seguridad, bajo demanda',
      desc: 'Define el rumbo, prioriza inversiones y acelera la madurez de seguridad con un CISO virtual.',
      cta1: 'Habla con un vCISO',
      cta2: 'Descargar One-Pager vCISO',
      premiumBadge: 'Servicio Premium',
      packagesTitle: 'Paquetes y Precios',
      mostPopular: 'Más elegido',
      hoursPerMonth: 'horas/mes',
      perMonth: '/mes',
      priceDisclaimer: '*Precios orientativos; ajustar por tamaño, sector y compliance.',
      integrationTitle: 'vCISO + SOC + HRM = cobertura 360°',
      integrationDesc: 'El vCISO define prioridades y mide impacto; SOC ejecuta operaciones 24/7; HRM reduce riesgo humano con IA.',
      viewButtons: {
        soc: 'Ver SOC',
        hrm: 'Ver HRM',
        redTeam: 'Ver Red Team',
      },
      packages: {
        starter: {
          name: 'Starter',
          hours: '10–15',
          features: ['Gobernanza base', 'Risk Register', 'IRP básico'],
          price: 'USD 2,500',
        },
        growth: {
          name: 'Growth',
          hours: '20–30',
          features: ['Roadmap 12m', 'KPIs/C-level', 'Tabletop exercises'],
          price: 'USD 4,500',
          popular: true,
        },
        enterprise: {
          name: 'Enterprise',
          hours: '40–60',
          features: ['Master Plan', 'Auditorías', 'Board sessions'],
          price: 'USD 7,500',
        },
      },
      kpis: [
        '-35% MTTD en 6 meses',
        '+3 niveles de madurez NIST',
        '100% políticas críticas formalizadas',
        'MTTR < 2.5 horas',
        'Compliance 100%',
      ],
      highlights: {
        roadmap: 'Estrategia y Roadmap NIST/ISO',
        riesgo: 'Gestión de riesgo y cumplimiento',
        ir: 'IR/BCP y tabletop exercises',
        metricas: 'Métricas ejecutivas (MTTD/MTTR)',
        proveedores: 'Gobierno de proveedores y SOC',
        cultura: 'Cultura/HRM integrada',
      },
      faq: {
        title: 'Preguntas frecuentes',
        q1: '¿En qué se diferencia de una consultoría puntual?',
        a1: 'El vCISO asume rol continuo de liderazgo y gobierno, no solo un assessment.',
        q2: '¿Trabajan con nuestro SOC/proveedor actual?',
        a2: 'Sí, el vCISO orquesta proveedores y establece KPIs y SLAs.',
        q3: '¿Cuánto tarda el arranque?',
        a3: '2–4 semanas para Assessment+Plan 90 días (puede variar por tamaño).',
        q4: '¿Pueden apoyar auditorías y certificaciones?',
        a4: 'Sí, pre-auditoría, gap analysis y remediación (ISO, SOC2, PCI, GDPR).',
        q5: '¿Incluye respuesta a incidentes?',
        a5: 'El vCISO diseña/dirige IR y tabletop; ejecución operativa vía SOC/Blue Team.',
      },
      form: {
        name: 'Nombre',
        company: 'Empresa',
        email: 'Email corporativo',
        industry: 'Industria y tamaño',
        industryPlaceholder: 'Ej: Finanzas, 500 empleados',
        objective: 'Objetivo principal',
        objectives: ['Compliance', 'SOC/Monitoreo', 'Respuesta a incidentes', 'Roadmap estratégico'],
        message: 'Mensaje',
        messagePlaceholder: 'Cuéntanos más sobre tus necesidades...',
        privacy: 'Acepto la política de privacidad y el tratamiento de mis datos.',
        submit: 'Enviar mensaje',
        successTitle: '¡Mensaje enviado!',
        successDesc: 'Te contactaremos en menos de 24 horas.',
        successCTA: 'Mientras tanto, puedes agendar una llamada directamente:',
        calendlyBtn: 'Agendar en Calendly',
      },
    },
    footer: {
      direccion: 'Oficinas',
      usa: 'Miami, FL, USA',
      arg: 'Buenos Aires, Argentina',
      contacto: 'Contacto',
      email: 'contacto@tandemlens.com',
      telefono: 'contacto@tandemlens.com',
      links: 'Enlaces rápidos',
      legal: 'Legal',
      privacy: 'Privacidad',
      terms: 'Términos',
      cookies: 'Cookies',
      rights: 'All rights reserved.',
    },
  },
  en: {
    nav: {
      solutions: 'Solutions',
      platform: 'Platform',
      academy: 'Academy',
      insights: 'Insights',
      contact: 'Contact',
      cta: 'Talk to an expert',
    },
    hero: {
      title: 'Real security. For the real world.',
      subtitle: 'We protect businesses across the US and Latin America with offensive and defensive cybersecurity, Linux infrastructure, and post-quantum cryptography. Operating from Buenos Aires and the United States.',
      cta1: 'Talk to an expert',
      cta2: 'See HRM demo',
      card1Title: '24/7 Coverage',
      card1Desc: 'SOC, threat intelligence and containment in minutes.',
      card2Title: 'Human risk focus',
      card2Desc: 'Simulations, training and metrics that reduce incidents.',
      trustBadge: 'Cybersecurity specialists · 10+ years · USA & LATAM',
      partnersTitle: 'Partners & Certifications',
      soyLabel: 'I am:',
      oLabel: 'or',
      urgencyBanner: 'Q2 2026: Limited vCISO spots available →',
      urgencyCTA: 'Reserve now',
      personaCTA: {
        ciso: 'CISO: Schedule strategic consultation',
        cto: 'CTO: See stack integration',
        compliance: 'Compliance: Assess gap analysis',
      },
    },
    soluciones: {
      title: 'Comprehensive Solutions',
      subtitle: 'One partner to detect, respond, govern and train.',
      cards: {
        consultoria: {
          title: 'Consulting & Audits',
          desc: 'We evaluate and design defenses aligned with ISO, NIST and CIS.',
          cta: 'Explore',
        },
        soc: {
          title: 'SOC & Blue Team',
          desc: '24/7 monitoring and response with threat intelligence.',
          cta: 'See SOC capabilities',
        },
        redteam: {
          title: 'Red Team & Pentesting',
          desc: 'Controlled attacks to evaluate your digital resilience.',
          cta: 'Request simulation',
        },
        threat: {
          title: 'Threat Intelligence',
          desc: 'We detect trends and campaigns targeting your industry.',
          cta: 'View reports',
        },
        hrm: {
          title: 'HRM Platform',
          desc: 'AI to measure and reduce human risk across the organization.',
          cta: 'See demo',
        },
        academy: {
          title: 'Academy & Training',
          desc: 'We train teams and leaders in digital security and resilience.',
          cta: 'View programs',
        },
        vciso: {
          title: 'vCISO as a Service',
          desc: 'On-demand CISO leadership for strategy, governance, risk and compliance.',
          cta: 'Explore vCISO',
        },
      },
    },
    why: {
      title: 'Why Tandem Lens',
      subtitle: 'AI applied to detection. 360° Red/Blue coverage. Measurable human focus.',
      cta: 'Download corporate brochure',
      cards: {
        integracion: {
          title: 'Real integration',
          desc: 'We don\'t sell tools. We integrate processes, data and teams so everything works together.',
        },
        metricas: {
          title: 'Business metrics',
          desc: 'We translate security into MTTD, MTTR, human risk reduction and ROI—ready for the board.',
        },
        escalabilidad: {
          title: 'Scalability',
          desc: 'From regulated startups to critical infrastructure. Flexible models: project, subscription or managed SOC.',
        },
      },
    },
    casos: {
      title: 'Cases & Metrics',
      subtitle: 'Real results from our clients.',
      cta: 'View cases',
      roiTitle: 'Calculate breach cost vs. prevention investment',
      roiDesc: 'According to IBM, the average cost of a data breach in 2024 was',
      roiAmount: '$4.45M',
      roiCTA: 'Calculate my ROI',
      roiStats: {
        roi: 'Typical ROI: 300-400%',
        payback: 'Payback: 6-12 months',
      },
      metrics: {
        riesgo: '-75% human risk',
        mttd: 'MTTD reduction 35%',
        respuesta: 'MTTR < 2.5 hours',
        madurez: '+3 NIST maturity levels',
      },
      metricsLabels: {
        riesgo: 'human risk reduction',
        mttd: 'MTTD reduction',
        respuesta: 'average MTTR',
        madurez: 'NIST maturity levels',
      },
      testimonials: [
        {
          quote: '60% of small businesses that suffer a serious cyberattack close within 6 months of the incident.',
          author: 'National Cyber Security Alliance',
          role: 'Impact Study',
          company: 'NCSA Report',
        },
        {
          quote: 'The average cost of a data breach in Latin America reached USD 2.46 million in 2024, an 11% increase from the previous year.',
          author: 'IBM Security',
          role: 'Cost of a Data Breach Report 2024',
          company: 'IBM',
        },
        {
          quote: 'A global shortage of 3.5 million cybersecurity professionals is projected for 2025, leaving thousands of companies without specialized coverage.',
          author: 'ISC² Cybersecurity Workforce Study',
          role: 'Annual Report',
          company: 'ISC²',
        },
      ],
    },
    hrm: {
      title: 'The platform that measures and reduces human risk with AI.',
      subtitle: 'Automate awareness campaigns, simulate attacks and train your team with real scenarios.',
      cta: 'Request demo',
      badge: 'AI-Powered',
      features: {
        phishing: {
          title: 'Simulated phishing',
          desc: 'Scheduled launches, click analysis and automatic learning paths.',
        },
        metricas: {
          title: 'Metrics that convince the board',
          desc: 'Risk score by team, MTTD/MTTR reduction and program ROI.',
        },
      },
      stats: {
        riskScore: 'Risk Score',
        training: 'Training',
      },
    },
    academy: {
      title: 'Academy & Certifications',
      subtitle: 'We train resilient teams and digital leaders.',
      cta: '2026 Calendar',
      viewDetails: 'View details',
      levels: {
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        executive: 'Executive',
      },
      banner: {
        title: 'Industry-recognized certifications',
        desc: 'Our courses include internationally valid certifications and real-time progress metrics.',
        cta: 'Explore certifications',
      },
      courses: {
        blue: 'Blue Team Operations',
        red: 'Red Team Fundamentals',
        ir: 'Incident Response',
        leadership: 'Security Leadership',
      },
      durations: {
        blue: '40h',
        red: '60h',
        ir: '32h',
        leadership: '16h',
      },
    },
    eventos: {
      title: 'Events & Community',
      banner: 'Cyber Shield Summit – Miami, FL',
      bannerDate: 'Coming soon — 2026',
      cta1: 'Register',
      cta2: 'Watch on-demand',
      nextEvent: 'Next event',
      location: 'Miami Convention Center',
      attendees: 'USA & LATAM',
      pastEvents: [
        {
          title: 'Webinar: Advanced Threat Hunting',
          date: 'Jan 2026',
          type: 'Webinar',
        },
        {
          title: 'Workshop: Incident Response',
          date: 'Feb 2026',
          type: 'Workshop',
        },
        {
          title: 'CISO Roundtable Buenos Aires',
          date: 'Mar 2026',
          type: 'Networking',
        },
      ],
    },
    blog: {
      title: 'Blog / Resources',
      subtitle: 'Downloadable reports and threat analysis.',
      cta: 'Download report',
      viewAll: 'View all',
      tags: {
        report: 'REPORT',
        guide: 'GUIDE',
        article: 'ARTICLE',
      },
      newsletter: {
        title: 'Subscribe to our reports',
        desc: 'Receive threat analysis, practical guides and industry news directly in your inbox.',
        placeholder: 'you@company.com',
        button: 'Subscribe',
      },
      posts: {
        threat: {
          title: 'Threat Landscape 2025',
          desc: 'Complete analysis of emerging threats and global trends.',
        },
        human: {
          title: 'How to measure human risk',
          desc: 'Practical guide to implementing security behavior metrics.',
        },
        soc: {
          title: 'From SOC to board: metrics that matter',
          desc: 'How to communicate the value of security to senior management.',
        },
      },
    },
    recursos: {
      title: 'Exclusive resources for security leaders',
      subtitle: 'Download guides, playbooks and tools proven by Fortune 500 CISOs.',
      badge: 'Free Resources',
      downloadBtn: 'Download free',
      downloads: 'downloads',
      rating: 'Average rating',
      recommend: 'Recommend',
      socialProof: 'by security professionals',
      resources: {
        cisoGuide: {
          title: "The CISO's Guide to Board Reporting",
          desc: 'Templates and metrics to communicate security value to senior leadership. Includes 5 ready-to-use templates.',
          time: '15 min read',
          topics: ['Executive KPIs', 'Dashboards', 'Security ROI'],
        },
        ransomware: {
          title: 'Ransomware Response Playbook 2025',
          desc: 'Step-by-step protocol for responding to ransomware incidents. Based on NIST SP 800-61.',
          time: '45 min read',
          topics: ['IR Plan', 'Communication', 'Forensics'],
        },
        hrmRoi: {
          title: 'HRM ROI Calculator',
          desc: 'Interactive spreadsheet to measure the return on investment of your human risk management program.',
          time: 'Excel + Guide',
          topics: ['Metrics', 'Benchmarks', 'Projections'],
        },
        nist: {
          title: 'NIST CSF 2.0 Implementation Checklist',
          desc: 'Complete checklist to implement the new Cybersecurity Framework 2.0 in your organization.',
          time: '30 min read',
          topics: ['GOV', 'ID', 'PR', 'DE', 'RS', 'RC'],
        },
      },
    },
    vciso: {
      title: 'vCISO as a Service',
      subtitle: 'Strategic security leadership, on demand',
      desc: 'Define direction, prioritize investments and accelerate security maturity with a virtual CISO.',
      cta1: 'Talk to a vCISO',
      cta2: 'Download vCISO One-Pager',
      premiumBadge: 'Premium Service',
      packagesTitle: 'Packages & Pricing',
      mostPopular: 'Most popular',
      hoursPerMonth: 'hours/month',
      perMonth: '/month',
      priceDisclaimer: '*Indicative prices; adjust by size, sector and compliance.',
      integrationTitle: 'vCISO + SOC + HRM = 360° coverage',
      integrationDesc: 'The vCISO defines priorities and measures impact; SOC executes 24/7 operations; HRM reduces human risk with AI.',
      viewButtons: {
        soc: 'View SOC',
        hrm: 'View HRM',
        redTeam: 'View Red Team',
      },
      packages: {
        starter: {
          name: 'Starter',
          hours: '10–15',
          features: ['Base governance', 'Risk Register', 'Basic IRP'],
          price: 'USD 2,500',
        },
        growth: {
          name: 'Growth',
          hours: '20–30',
          features: ['12m Roadmap', 'KPIs/C-level', 'Tabletop exercises'],
          price: 'USD 4,500',
          popular: true,
        },
        enterprise: {
          name: 'Enterprise',
          hours: '40–60',
          features: ['Master Plan', 'Audits', 'Board sessions'],
          price: 'USD 7,500',
        },
      },
      kpis: [
        '-35% MTTD in 6 months',
        '+3 NIST maturity levels',
        '100% critical policies formalized',
        'MTTR < 2.5 hours',
        'Compliance 100%',
      ],
      highlights: {
        roadmap: 'Strategy & NIST/ISO Roadmap',
        riesgo: 'Risk & compliance management',
        ir: 'IR/BCP & tabletop exercises',
        metricas: 'Executive metrics (MTTD/MTTR)',
        proveedores: 'Vendor & SOC governance',
        cultura: 'Integrated culture/HRM',
      },
      faq: {
        title: 'Frequently asked questions',
        q1: 'How is it different from one-time consulting?',
        a1: 'The vCISO assumes a continuous leadership and governance role, not just an assessment.',
        q2: 'Do you work with our current SOC/provider?',
        a2: 'Yes, the vCISO orchestrates vendors and establishes KPIs and SLAs.',
        q3: 'How long does onboarding take?',
        a3: '2-4 weeks for Assessment+90-day Plan (may vary by size).',
        q4: 'Can you support audits and certifications?',
        a4: 'Yes, pre-audit, gap analysis and remediation (ISO, SOC2, PCI, GDPR).',
        q5: 'Does it include incident response?',
        a5: 'The vCISO designs/directs IR and tabletop; operational execution via SOC/Blue Team.',
      },
      form: {
        name: 'Name',
        company: 'Company',
        email: 'Corporate email',
        industry: 'Industry & size',
        industryPlaceholder: 'Ex: Finance, 500 employees',
        objective: 'Main objective',
        objectives: ['Compliance', 'SOC/Monitoring', 'Incident response', 'Strategic roadmap'],
        message: 'Message',
        messagePlaceholder: 'Tell us more about your needs...',
        privacy: 'I accept the privacy policy and the processing of my data.',
        submit: 'Send message',
        successTitle: 'Message sent!',
        successDesc: 'We will contact you within 24 hours.',
        successCTA: 'Meanwhile, you can schedule a call directly:',
        calendlyBtn: 'Schedule on Calendly',
      },
    },
    footer: {
      direccion: 'Offices',
      usa: 'Miami, FL, USA',
      arg: 'Buenos Aires, Argentina',
      contacto: 'Contact',
      email: 'contacto@tandemlens.com',
      telefono: 'contacto@tandemlens.com',
      links: 'Quick links',
      legal: 'Legal',
      privacy: 'Privacy',
      terms: 'Terms',
      cookies: 'Cookies',
      rights: 'All rights reserved.',
    },
  },
};

function App() {
  const [lang, setLang] = useState<Language>('es');
  const mainRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  useEffect(() => {
    // Initialize ScrollTrigger
    ScrollTrigger.refresh();
    
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-[#080b12] text-[#f1f5f9] overflow-x-hidden">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Neural background for hero */}
      <NeuralBackground />
      
      {/* Navigation */}
      <Navigation lang={lang} setLang={setLang} t={t.nav} />
      
      {/* Main content */}
      <main className="relative">
        <Hero t={t.hero} />
        <QuienesSomos lang={lang} />
        <WhyTandem t={t.why} />
        <Soluciones t={t.soluciones} />
        <VCISOSection t={t.vciso} />
        <Casos t={t.casos} />
        <Recursos t={t.recursos} />
        <HRMProduct t={t.hrm} />
        <Academy t={t.academy} />
        <Eventos t={t.eventos} />
        <Blog t={t.blog} />
      </main>
      
      {/* Footer */}
      <Footer t={t.footer} />
    </div>
  );
}

export default App;
