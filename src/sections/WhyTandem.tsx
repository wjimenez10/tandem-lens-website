import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Puzzle, TrendingUp, Scale, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface WhyTandemProps {
  t: {
    title: string;
    subtitle: string;
    cta: string;
    cards: {
      integracion: { title: string; desc: string };
      metricas: { title: string; desc: string };
      escalabilidad: { title: string; desc: string };
    };
  };
}

const cardData = [
  { key: 'integracion', icon: Puzzle },
  { key: 'metricas', icon: TrendingUp },
  { key: 'escalabilidad', icon: Scale },
] as const;

export default function WhyTandem({ t }: WhyTandemProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      className="relative w-full py-24 lg:py-32 z-20 bg-navy-200"
    >
      <div className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {t.title}
            </h2>
            <p className="text-lg text-slate-text mb-8">{t.subtitle}</p>
            <Button
              variant="outline"
              className="border-cyan-500/50 text-cyan-500 hover:bg-cyan-500/8"
            >
              <Download className="mr-2 w-5 h-5" />
              {t.cta}
            </Button>
          </div>

          {/* Cards */}
          <div
            ref={cardsRef}
            className="grid md:grid-cols-3 gap-8"
          >
            {cardData.map((item) => {
              const Icon = item.icon;
              const cardContent = t.cards[item.key as keyof typeof t.cards];

              return (
                <div
                  key={item.key}
                  className="relative p-8 rounded-2xl bg-navy-100 border border-white/5 hover:border-cyan-500/25 transition-all duration-500 group"
                >
                  {/* Dot pattern */}
                  <div className="absolute inset-0 rounded-2xl dot-pattern opacity-30" />

                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/8 flex items-center justify-center mb-6 group-hover:bg-cyan-500/12 transition-colors">
                      <Icon className="w-8 h-8 text-cyan-500" />
                    </div>

                    <h3 className="font-heading font-semibold text-xl mb-4">
                      {cardContent.title}
                    </h3>

                    <p className="text-slate-text leading-relaxed">
                      {cardContent.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
