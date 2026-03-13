import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Lock, Network, Server, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface QuienesSomosProps {
  lang: 'es' | 'en';
}

const content = {
  es: {
    badge: 'Equipo',
    title: 'Quiénes somos',
    subtitle: 'Un equipo especialista con más de 10 años de experiencia en ciberseguridad ofensiva y defensiva, administración Linux y criptografía avanzada. Operamos desde Buenos Aires y Estados Unidos.',
    founderTitle: 'Fundador & Lead Security Architect',
    founderBio: 'Más de 10 años protegiendo infraestructuras críticas en USA y Latinoamérica. Especialista en pentesting, hardening de servidores Linux, redes y criptografía post-cuántica (PQC), PKI, HSM y Vault. Con oficinas en Buenos Aires y Estados Unidos, ofrecemos cobertura real en ambos mercados: precios competitivos para LATAM, estándares enterprise para USA.',
    teamTitle: 'Equipo especializado',
    teamDesc: 'Tandem Lens es un equipo de profesionales con especialidades complementarias: Red Team, Blue Team, arquitectura de seguridad y gestión de riesgo humano. Cada proyecto es atendido por el especialista correcto.',
    differentiatorTitle: 'Lo que nos diferencia',
    differentiators: [
      {
        icon: 'lock',
        title: 'Criptografía Post-Cuántica (PQC)',
        desc: 'Una de las pocas empresas en el continente con expertise real en PQC, PKI, HSM y Vault. Preparamos tu infraestructura para la era post-cuántica antes de que sea urgente.',
      },
      {
        icon: 'server',
        title: 'Linux & Infraestructura Profunda',
        desc: 'Más de 10 años administrando servidores Linux en entornos críticos. Hardening, monitoreo y respuesta a incidentes a nivel de sistema operativo.',
      },
      {
        icon: 'network',
        title: 'Red Team + Blue Team',
        desc: 'Equipo completo que ataca y defiende. No vendemos solo auditorías: entendemos cómo piensan los atacantes porque somos atacantes controlados.',
      },
      {
        icon: 'shield',
        title: 'USA & Latinoamérica',
        desc: 'Oficinas en Buenos Aires y Estados Unidos. Atendemos PYMEs hispanas en USA, empresas medianas americanas y corporativos en LATAM con el mismo nivel de excelencia.',
      },
    ],
    frameworks: 'Frameworks y tecnologías',
  },
  en: {
    badge: 'Team',
    title: 'Who we are',
    subtitle: 'A specialist team with over 10 years of experience in offensive and defensive cybersecurity, Linux administration, and advanced cryptography. Operating from Buenos Aires and the United States.',
    founderTitle: 'Founder & Lead Security Architect',
    founderBio: 'Over 10 years protecting critical infrastructure across the US and Latin America. Specialist in pentesting, Linux server hardening, networks, and post-quantum cryptography (PQC), PKI, HSM, and Vault. With offices in Buenos Aires and the United States, we offer real coverage in both markets: competitive pricing for LATAM, enterprise standards for the US.',
    teamTitle: 'Specialized team',
    teamDesc: 'Tandem Lens is a team of professionals with complementary specialties: Red Team, Blue Team, security architecture, and human risk management. Each project is handled by the right specialist.',
    differentiatorTitle: 'What sets us apart',
    differentiators: [
      {
        icon: 'lock',
        title: 'Post-Quantum Cryptography (PQC)',
        desc: 'One of the few companies in the Americas with real expertise in PQC, PKI, HSM, and Vault. We prepare your infrastructure for the post-quantum era before it becomes urgent.',
      },
      {
        icon: 'server',
        title: 'Linux & Deep Infrastructure',
        desc: 'Over 10 years managing Linux servers in critical environments. Hardening, monitoring, and incident response at the OS level.',
      },
      {
        icon: 'network',
        title: 'Red Team + Blue Team',
        desc: 'A complete team that attacks and defends. We don\'t just sell audits: we understand how attackers think because we are controlled attackers.',
      },
      {
        icon: 'shield',
        title: 'USA & Latin America',
        desc: 'Offices in Buenos Aires and the United States. We serve Hispanic SMBs in the US, mid-size American companies, and enterprise clients across LATAM — same level of excellence across the board.',
      },
    ],
    frameworks: 'Frameworks & Technologies',
  },
};

const iconMap = {
  lock: Lock,
  server: Server,
  network: Network,
  shield: Shield,
};

const techStack = [
  'Kali Linux', 'Metasploit', 'Burp Suite', 'Nmap', 'Nessus',
  'OpenSSL', 'HashiCorp Vault', 'PKI / HSM', 'PQC / CRYSTALS',
  'NIST CSF', 'ISO 27001', 'OWASP',
];

export default function QuienesSomos({ lang }: QuienesSomosProps) {
  const t = content[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: titleRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo(founderRef.current, { x: -60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9,
        scrollTrigger: { trigger: founderRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
      });
      gsap.fromTo(cardsRef.current?.children || [], { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="nosotros" className="relative w-full py-24 lg:py-32 z-20 bg-navy-200">
      <div className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/8 border border-cyan-500/20 mb-4">
              <Award className="w-3.5 h-3.5 text-cyan-500" />
              <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest">{t.badge}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">{t.title}</h2>
            <p className="text-lg text-slate-text">{t.subtitle}</p>
          </div>

          {/* Founder card */}
          <div ref={founderRef} className="mb-20">
            <div className="relative p-8 lg:p-12 rounded-3xl bg-navy-100 border border-white/5 overflow-hidden">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start">
                {/* Avatar placeholder with initials */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-500/20 flex items-center justify-center">
                    <Shield className="w-10 h-10 text-cyan-500" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-2 py-0.5 rounded text-xs font-mono bg-cyan-500/8 text-cyan-500 border border-cyan-500/20">
                      {t.founderTitle}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-mono bg-white/5 text-slate-text border border-white/10">
                      +10 años exp.
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-mono bg-white/5 text-slate-text border border-white/10">
                      USA & LATAM
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold mb-4">Tandem Lens</h3>
                  <p className="text-slate-text leading-relaxed max-w-2xl">{t.founderBio}</p>
                </div>

                {/* Expertise tags */}
                <div className="flex-shrink-0 flex flex-col gap-2 lg:min-w-[180px]">
                  {['Pentesting', 'Linux Hardening', 'PQC / PKI', 'HashiCorp Vault', 'HSM', 'Red Team'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-300 text-center">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Differentiators */}
          <div className="mb-16">
            <h3 className="font-heading text-2xl font-semibold text-center mb-10">{t.differentiatorTitle}</h3>
            <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.differentiators.map((item) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap];
                return (
                  <div
                    key={item.title}
                    className="relative p-6 rounded-2xl bg-navy-100 border border-white/5 hover:border-cyan-500/25 transition-all duration-500 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/8 flex items-center justify-center mb-4 group-hover:bg-cyan-500/12 transition-colors">
                      <Icon className="w-6 h-6 text-cyan-500" />
                    </div>
                    <h4 className="font-heading font-semibold text-base mb-2 leading-snug">{item.title}</h4>
                    <p className="text-sm text-slate-text leading-relaxed">{item.desc}</p>
                    {/* PQC highlight */}
                    {item.icon === 'lock' && (
                      <div className="absolute top-4 right-4 px-1.5 py-0.5 rounded text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Americas
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tech stack */}
          <div className="text-center">
            <p className="text-xs font-mono text-slate-text uppercase tracking-widest mb-6">{t.frameworks}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map(tech => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-lg text-sm font-mono bg-white/5 border border-white/10 text-slate-300 hover:border-cyan-500/25 hover:text-cyan-500 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
