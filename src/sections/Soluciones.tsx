import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ClipboardCheck,
  Shield,
  Target,
  Brain,
  Cpu,
  GraduationCap,
  UserCog,
  ArrowRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SolucionesProps {
  t: {
    title: string;
    subtitle: string;
    cards: {
      consultoria: { title: string; desc: string; cta: string };
      soc: { title: string; desc: string; cta: string };
      redteam: { title: string; desc: string; cta: string };
      threat: { title: string; desc: string; cta: string };
      hrm: { title: string; desc: string; cta: string };
      academy: { title: string; desc: string; cta: string };
      vciso: { title: string; desc: string; cta: string };
    };
  };
}

const services = [
  {
    key: 'consultoria',
    icon: ClipboardCheck,
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    key: 'soc',
    icon: Shield,
    color: 'from-cyan-500/20 to-teal-500/20',
  },
  {
    key: 'redteam',
    icon: Target,
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    key: 'threat',
    icon: Brain,
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    key: 'hrm',
    icon: Cpu,
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    key: 'academy',
    icon: GraduationCap,
    color: 'from-yellow-500/20 to-amber-500/20',
  },
  {
    key: 'vciso',
    icon: UserCog,
    color: 'from-indigo-500/20 to-violet-500/20',
  },
] as const;

export default function Soluciones({ t }: SolucionesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title animation
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

      // Cards animation
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
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
      id="soluciones"
      className="relative w-full py-24 lg:py-32 z-20 bg-navy-200"
    >
      <div className="px-6 lg:px-12">
        {/* Header */}
        <div ref={titleRef} className="max-w-3xl mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {t.title}
          </h2>
          <p className="text-lg text-slate-text">{t.subtitle}</p>
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((service) => {
            const cardData = t.cards[service.key as keyof typeof t.cards];
            const Icon = service.icon;

            return (
              <div
                key={service.key}
                className="group relative bg-navy-100 rounded-2xl p-6 border border-white/5 hover:border-cyan-500/25 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow"
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-cyan-500/8 flex items-center justify-center mb-5 group-hover:bg-cyan-500/12 transition-colors">
                    <Icon className="w-7 h-7 text-cyan-500" />
                  </div>

                  {/* Content */}
                  <h3 className="font-heading font-semibold text-xl mb-3">
                    {cardData.title}
                  </h3>
                  <p className="text-sm text-slate-text mb-5 line-clamp-3">
                    {cardData.desc}
                  </p>

                  {/* CTA */}
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-cyan-500 hover:text-cyan-300 transition-colors group/btn">
                    {cardData.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
