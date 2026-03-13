import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, AlertTriangle } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import LeadMagnetModal from '@/components/LeadMagnetModal';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  t: {
    title: string; subtitle: string; cta1: string; cta2: string;
    card1Title: string; card1Desc: string; card2Title: string; card2Desc: string;
    trustBadge: string; partnersTitle: string; soyLabel: string; oLabel: string;
    urgencyBanner: string; urgencyCTA: string;
    personaCTA: { ciso: string; cto: string; compliance: string };
  };
}

const threatMessages = [
  { es: 'Ransomware dirigido al sector financiero LATAM — detectado 6h', en: 'Ransomware targeting LATAM financial sector detected — 6h ago' },
  { es: 'Nueva campaña de phishing contra PYMEs en Argentina — 12h', en: 'New phishing campaign against SMBs in Argentina — 12h ago' },
  { es: 'Vulnerabilidad crítica en infraestructura Linux sin parchear — 1d', en: 'Critical unpatched Linux infrastructure vulnerability — 1d ago' },
  { es: 'Filtración de datos en empresa mediana Miami — 2d', en: 'Data breach at mid-size company in Miami — 2d ago' },
];

export default function Hero({ t }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);
  const [threatIdx, setThreatIdx] = useState(0);
  const { trackCTAClick } = useAnalytics();

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatIdx(i => (i + 1) % threatMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(headlineRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1 });
      tl.fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.6');
      tl.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5');
      tl.fromTo(statsRef.current?.children || [], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.12 }, '-=0.4');

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section, start: 'top top', end: '+=130%', pin: true, scrub: 0.6,
        },
      });
      scrollTl.fromTo(section.querySelector('.hero-bg'), { y: 0, scale: 1 }, { y: '-3vh', scale: 1.04, ease: 'none' }, 0);
      scrollTl.fromTo(headlineRef.current, { x: 0, opacity: 1 }, { x: '-16vw', opacity: 0, ease: 'power2.in' }, 0.65);
      scrollTl.fromTo(subtitleRef.current, { x: 0, opacity: 1 }, { x: '-12vw', opacity: 0, ease: 'power2.in' }, 0.68);
      scrollTl.fromTo(ctaRef.current, { x: 0, opacity: 1 }, { x: '-10vw', opacity: 0, ease: 'power2.in' }, 0.71);
      scrollTl.fromTo(statsRef.current?.children || [], { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, ease: 'power2.in', stagger: 0.02 }, 0.72);
    }, section);
    return () => ctx.revert();
  }, []);

  const titleParts = t.title.split('.');
  const line1 = titleParts[0] ? titleParts[0].trim() : 'Seguridad real';
  const line2 = titleParts[1] ? titleParts[1].trim() : 'Para el mundo real';

  return (
    <>
      <section ref={sectionRef} className="relative w-full h-screen overflow-hidden z-10">
        <div className="hero-bg absolute inset-0 z-0">
          <img src="/hero_cyber.jpg" alt="Cybersecurity" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080b12]/97 via-[#080b12]/80 to-[#080b12]/55" />
          <div className="absolute inset-0 grid-pattern opacity-30" />
        </div>

        {/* Threat ticker */}
        <div className="absolute top-0 left-0 right-0 z-20 border-b border-red-500/20 py-2 px-6" style={{background:'rgba(255,45,85,0.06)'}}>
          <div className="flex items-center gap-3 max-w-7xl mx-auto">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 animate-pulse" style={{color:'#ff2d55'}} />
            <span className="font-mono text-xs transition-all duration-700" style={{color:'#ff8099'}}>
              {threatMessages[threatIdx].es}
            </span>
            <span className="ml-auto font-mono text-xs px-2 py-0.5 rounded" style={{background:'rgba(255,45,85,0.12)',color:'#ff2d55',border:'1px solid rgba(255,45,85,0.25)'}}>LIVE</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16 pt-16">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.09)'}}>
              <Shield className="w-3.5 h-3.5" style={{color:'#00ff87'}} />
              <span className="text-xs font-mono" style={{color:'#8892a0'}}>{t.trustBadge}</span>
            </div>

            <h1 ref={headlineRef} className="font-heading font-bold leading-none mb-6" style={{fontSize:'clamp(2.8rem,7vw,5.5rem)'}}>
              <span className="block" style={{color:'#f1f5f9'}}>{line1}.</span>
              <span className="block" style={{background:'linear-gradient(135deg,#00ff87,#00cc6a)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{line2}.</span>
            </h1>

            <p ref={subtitleRef} className="text-lg lg:text-xl max-w-2xl mb-10 leading-relaxed" style={{color:'#8892a0'}}>
              {t.subtitle}
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <button
                onClick={() => { trackCTAClick('hero_primary','hero','main'); document.getElementById('vciso')?.scrollIntoView({behavior:'smooth'}); }}
                className="group inline-flex items-center gap-3 rounded-full font-heading font-bold text-base transition-all duration-300"
                style={{padding:'14px 32px',background:'#00ff87',color:'#080b12',boxShadow:'0 0 40px rgba(0,255,135,0.2)'}}
                onMouseEnter={e=>(e.currentTarget.style.background='#20ff95')}
                onMouseLeave={e=>(e.currentTarget.style.background='#00ff87')}
              >
                {t.cta1}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => setIsLeadMagnetOpen(true)} className="text-sm transition-colors" style={{color:'#8892a0',textDecoration:'underline',textUnderlineOffset:'4px'}}>
                {t.cta2}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="absolute bottom-8 left-6 right-6 lg:left-16 lg:right-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
              {[
                { val: '$2.46M', label: 'Costo breach LATAM 2024', color: '#ff2d55' },
                { val: '60%', label: 'PYMEs cierran post-ataque', color: '#ff2d55' },
                { val: '<5min', label: 'MTTD con nuestro SOC', color: '#00ff87' },
                { val: '+10 años', label: 'Experiencia en el campo', color: '#00ff87' },
              ].map((s) => (
                <div key={s.label} className="card-glass rounded-2xl p-4 md:p-5">
                  <p className="font-heading font-bold text-2xl md:text-3xl" style={{color:s.color}}>{s.val}</p>
                  <p className="text-xs mt-1 font-mono" style={{color:'#8892a0'}}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <LeadMagnetModal isOpen={isLeadMagnetOpen} onClose={() => setIsLeadMagnetOpen(false)} />
    </>
  );
}
