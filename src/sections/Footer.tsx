import { Shield, MapPin, Mail, Linkedin, Twitter, Github } from 'lucide-react';

interface FooterProps {
  t: {
    direccion: string; usa: string; arg: string; contacto: string;
    email: string; telefono: string; links: string; legal: string;
    privacy: string; terms: string; cookies: string; rights: string;
  };
}

const quickLinks = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'vCISO', href: '#vciso' },
  { label: 'Plataforma HRM', href: '#plataforma' },
  { label: 'Academy', href: '#academy' },
  { label: 'Blog', href: '#insights' },
];

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter/X' },
  { icon: Github, href: '#', label: 'GitHub' },
];

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="relative w-full z-20" style={{background:'#060912',borderTop:'1px solid rgba(255,255,255,0.05)'}}>
      <div className="px-6 lg:px-16 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">

          {/* CTA Banner */}
          <div className="rounded-3xl p-8 lg:p-12 mb-16 relative overflow-hidden" style={{background:'rgba(0,255,135,0.04)',border:'1px solid rgba(0,255,135,0.12)'}}>
            <div className="absolute inset-0 grid-pattern opacity-20 rounded-3xl" />
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <h3 className="font-heading font-bold text-2xl lg:text-3xl mb-2" style={{color:'#f1f5f9'}}>¿Tu empresa está expuesta?</h3>
                <p className="text-sm" style={{color:'#8892a0'}}>El 60% de las PYMEs no sobrevive un ciberataque. Evaluá tu exposición ahora.</p>
              </div>
              <button
                onClick={() => document.getElementById('vciso')?.scrollIntoView({behavior:'smooth'})}
                className="flex-shrink-0 px-7 py-3.5 rounded-full font-heading font-bold text-sm transition-all"
                style={{background:'#00ff87',color:'#080b12'}}
                onMouseEnter={e=>(e.currentTarget.style.background='#20ff95')}
                onMouseLeave={e=>(e.currentTarget.style.background='#00ff87')}
              >
                Hablar con un experto →
              </button>
            </div>
          </div>

          {/* Footer grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
            {/* Brand */}
            <div className="lg:col-span-1">
              <a href="#" className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:'rgba(0,255,135,0.12)',border:'1px solid rgba(0,255,135,0.25)'}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z" fill="#00ff87"/>
                  </svg>
                </div>
                <span className="font-heading font-bold text-lg" style={{color:'#f1f5f9',letterSpacing:'-0.03em'}}>Tandem Lens</span>
              </a>
              <p className="text-sm mb-6 leading-relaxed" style={{color:'#64748b'}}>
                Ciberseguridad ofensiva y defensiva para empresas en USA y Latinoamérica.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map(s => {
                  const Icon = s.icon;
                  return (
                    <a key={s.label} href={s.href} aria-label={s.label}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                      style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#64748b'}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(0,255,135,0.3)';(e.currentTarget as HTMLElement).style.color='#00ff87';}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.08)';(e.currentTarget as HTMLElement).style.color='#64748b';}}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Offices */}
            <div>
              <h4 className="font-heading font-semibold mb-5 text-sm" style={{color:'#f1f5f9',letterSpacing:'0.05em',textTransform:'uppercase',fontSize:'11px',fontFamily:'IBM Plex Mono'}}>{t.direccion}</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{background:'rgba(0,255,135,0.08)',border:'1px solid rgba(0,255,135,0.15)'}}>
                    <MapPin className="w-3.5 h-3.5" style={{color:'#00ff87'}} />
                  </div>
                  <div>
                    <p className="font-medium text-sm" style={{color:'#e2e8f0'}}>{t.usa}</p>
                    <p className="text-xs mt-0.5" style={{color:'#64748b'}}>Brickell Ave, Suite 400</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{background:'rgba(0,255,135,0.08)',border:'1px solid rgba(0,255,135,0.15)'}}>
                    <MapPin className="w-3.5 h-3.5" style={{color:'#00ff87'}} />
                  </div>
                  <div>
                    <p className="font-medium text-sm" style={{color:'#e2e8f0'}}>{t.arg}</p>
                    <p className="text-xs mt-0.5" style={{color:'#64748b'}}>Av. Corrientes 1234, Piso 8</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{background:'rgba(0,255,135,0.08)',border:'1px solid rgba(0,255,135,0.15)'}}>
                    <Mail className="w-3.5 h-3.5" style={{color:'#00ff87'}} />
                  </div>
                  <a href={`mailto:${t.email}`} className="text-sm transition-colors" style={{color:'#8892a0'}}
                    onMouseEnter={e=>(e.currentTarget.style.color='#00ff87')}
                    onMouseLeave={e=>(e.currentTarget.style.color='#8892a0')}
                  >{t.email}</a>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest mb-5" style={{color:'#f1f5f9',letterSpacing:'0.1em'}}>{t.links}</h4>
              <ul className="space-y-3">
                {quickLinks.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm transition-colors" style={{color:'#64748b'}}
                      onMouseEnter={e=>(e.currentTarget.style.color='#00ff87')}
                      onMouseLeave={e=>(e.currentTarget.style.color='#64748b')}
                    >{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech badge */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest mb-5" style={{color:'#f1f5f9',letterSpacing:'0.1em'}}>Especialidades</h4>
              <div className="flex flex-wrap gap-2">
                {['PQC','PKI','HSM','Vault','Red Team','Blue Team','Linux','Pentesting'].map(s => (
                  <span key={s} className="text-xs font-mono px-2.5 py-1 rounded-md" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#8892a0'}}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{borderTop:'1px solid rgba(255,255,255,0.05)'}}>
            <p className="text-xs font-mono" style={{color:'#475569'}}>© {new Date().getFullYear()} Tandem Lens. {t.rights}</p>
            <div className="flex items-center gap-6">
              {[t.privacy, t.terms, t.cookies].map(l => (
                <a key={l} href="#" className="text-xs transition-colors" style={{color:'#475569'}}
                  onMouseEnter={e=>(e.currentTarget.style.color='#00ff87')}
                  onMouseLeave={e=>(e.currentTarget.style.color='#475569')}
                >{l}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
