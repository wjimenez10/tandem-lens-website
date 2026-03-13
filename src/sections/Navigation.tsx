import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import type { Language } from '../App';

interface NavigationProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: { solutions: string; platform: string; academy: string; insights: string; contact: string; cta: string; };
}

export default function Navigation({ lang, setLang, t }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#nosotros', label: lang === 'es' ? 'Nosotros' : 'About' },
    { href: '#soluciones', label: t.solutions },
    { href: '#vciso', label: 'vCISO' },
    { href: '#plataforma', label: t.platform },
    { href: '#academy', label: t.academy },
    { href: '#insights', label: t.insights },
  ];

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          marginTop: '36px',
          background: isScrolled ? 'rgba(8,11,18,0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        }}
      >
        <div className="w-full px-6 lg:px-16">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:'rgba(0,255,135,0.12)',border:'1px solid rgba(0,255,135,0.25)'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z" fill="#00ff87"/>
                </svg>
              </div>
              <span className="font-heading font-bold text-lg" style={{color:'#f1f5f9',letterSpacing:'-0.03em'}}>Tandem Lens</span>
            </a>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm transition-colors relative group"
                  style={{color:'#8892a0'}}
                  onMouseEnter={e=>(e.currentTarget.style.color='#f1f5f9')}
                  onMouseLeave={e=>(e.currentTarget.style.color='#8892a0')}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{background:'#00ff87'}} />
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center rounded-full overflow-hidden" style={{border:'1px solid rgba(255,255,255,0.1)'}}>
                <button onClick={() => setLang('es')} className="px-3 py-1.5 text-xs font-mono transition-all" style={{background: lang==='es' ? 'rgba(0,255,135,0.15)' : 'transparent', color: lang==='es' ? '#00ff87' : '#8892a0'}}>ES</button>
                <button onClick={() => setLang('en')} className="px-3 py-1.5 text-xs font-mono transition-all" style={{background: lang==='en' ? 'rgba(0,255,135,0.15)' : 'transparent', color: lang==='en' ? '#00ff87' : '#8892a0'}}>EN</button>
              </div>
              <button
                onClick={() => document.getElementById('vciso')?.scrollIntoView({behavior:'smooth'})}
                className="px-5 py-2.5 rounded-full font-heading font-bold text-sm transition-all duration-200"
                style={{background:'#00ff87',color:'#080b12'}}
                onMouseEnter={e=>(e.currentTarget.style.background='#20ff95')}
                onMouseLeave={e=>(e.currentTarget.style.background='#00ff87')}
              >
                {t.cta}
              </button>
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden" style={{color:'#f1f5f9'}}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col pt-32 px-6 pb-8" style={{background:'rgba(8,11,18,0.98)',backdropFilter:'blur(20px)'}}>
          <div className="flex flex-col gap-6">
            {navLinks.map(link => (
              <button key={link.href} onClick={() => scrollTo(link.href)} className="text-left font-heading font-bold text-2xl" style={{color:'#f1f5f9'}}>
                {link.label}
              </button>
            ))}
          </div>
          <div className="mt-auto flex items-center gap-4">
            <div className="flex items-center rounded-full overflow-hidden" style={{border:'1px solid rgba(255,255,255,0.1)'}}>
              <button onClick={() => setLang('es')} className="px-4 py-2 text-sm font-mono" style={{background: lang==='es' ? 'rgba(0,255,135,0.15)' : 'transparent', color: lang==='es' ? '#00ff87' : '#8892a0'}}>ES</button>
              <button onClick={() => setLang('en')} className="px-4 py-2 text-sm font-mono" style={{background: lang==='en' ? 'rgba(0,255,135,0.15)' : 'transparent', color: lang==='en' ? '#00ff87' : '#8892a0'}}>EN</button>
            </div>
            <button onClick={() => { document.getElementById('vciso')?.scrollIntoView({behavior:'smooth'}); setIsMobileMenuOpen(false); }} className="flex-1 py-3 rounded-full font-heading font-bold text-sm" style={{background:'#00ff87',color:'#080b12'}}>
              {t.cta}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
