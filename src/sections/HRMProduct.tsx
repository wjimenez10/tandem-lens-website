import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, BarChart3, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HRMProductProps {
  t: {
    title: string;
    subtitle: string;
    cta: string;
    badge: string;
    features: {
      phishing: { title: string; desc: string };
      metricas: { title: string; desc: string };
    };
    stats: {
      riskScore: string;
      training: string;
    };
  };
}

export default function HRMProduct({ t }: HRMProductProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="plataforma"
      className="relative w-full py-24 lg:py-32 z-20 bg-navy-300"
    >
      <div className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div ref={contentRef}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/8 border border-cyan-500/20 mb-6">
                <Brain className="w-4 h-4 text-cyan-500" />
                <span className="text-sm font-mono text-cyan-500 uppercase tracking-wider">
                  {t.badge}
                </span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                {t.title}
              </h2>

              <p className="text-lg text-slate-text mb-8">{t.subtitle}</p>

              <Button
                size="lg"
                className="bg-cyan-500 text-navy-200 hover:bg-cyan-400 font-medium mb-12"
              >
                {t.cta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              {/* Features */}
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-navy-100 border border-white/5">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/8 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      {t.features.phishing.title}
                    </h3>
                    <p className="text-sm text-slate-text">
                      {t.features.phishing.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl bg-navy-100 border border-white/5">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/8 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      {t.features.metricas.title}
                    </h3>
                    <p className="text-sm text-slate-text">
                      {t.features.metricas.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Image */}
            <div ref={imageRef} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-card">
                <img
                  src="/hrm_dashboard.jpg"
                  alt="HRM Dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-200/50 to-transparent" />
              </div>

              {/* Floating stats */}
              <div className="absolute -bottom-6 -left-6 p-4 rounded-xl bg-navy-100 border border-white/10 shadow-card">
                <p className="text-xs font-mono text-slate-text uppercase">
                  {t.stats.riskScore}
                </p>
                <p className="font-heading text-2xl font-bold text-cyan-500">
                  78%
                </p>
              </div>

              <div className="absolute -top-6 -right-6 p-4 rounded-xl bg-navy-100 border border-white/10 shadow-card">
                <p className="text-xs font-mono text-slate-text uppercase">
                  {t.stats.training}
                </p>
                <p className="font-heading text-2xl font-bold text-green-400">
                  +24%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
