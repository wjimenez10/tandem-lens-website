import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, ArrowRight, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EventosProps {
  t: {
    title: string;
    banner: string;
    bannerDate: string;
    cta1: string;
    cta2: string;
    nextEvent: string;
    location: string;
    attendees: string;
    pastEvents: {
      title: string;
      date: string;
      type: string;
    }[];
  };
}

export default function Eventos({ t }: EventosProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
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
      id="eventos"
      className="relative w-full py-24 lg:py-32 z-20 bg-navy-300"
    >
      <div className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div ref={contentRef}>
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {t.title}
              </h2>
            </div>

            {/* Main Event Banner */}
            <div className="relative rounded-3xl overflow-hidden mb-12">
              <img
                src="/event_banner.jpg"
                alt="Cyber Shield Summit"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-200 via-navy-200/60 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/12 border border-cyan-500/25 mb-6">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-sm font-mono text-cyan-500 uppercase tracking-wider">
                      {t.nextEvent}
                    </span>
                  </div>

                  <h3 className="font-heading text-3xl lg:text-5xl font-bold mb-4">
                    {t.banner}
                  </h3>

                  <div className="flex flex-wrap items-center gap-6 mb-8">
                    <div className="flex items-center gap-2 text-slate-text">
                      <Calendar className="w-5 h-5 text-cyan-500" />
                      <span>{t.bannerDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-text">
                      <MapPin className="w-5 h-5 text-cyan-500" />
                      <span>{t.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-text">
                      <Users className="w-5 h-5 text-cyan-500" />
                      <span>{t.attendees}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button
                      size="lg"
                      className="bg-cyan-500 text-navy-200 hover:bg-cyan-400"
                    >
                      {t.cta1}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      <Play className="mr-2 w-5 h-5" />
                      {t.cta2}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Past Events */}
            <div className="grid md:grid-cols-3 gap-6">
              {t.pastEvents.map((event, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-navy-100 border border-white/5 hover:border-cyan-500/25 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-cyan-500 uppercase">
                      {event.type}
                    </span>
                    <span className="text-sm text-slate-text">{event.date}</span>
                  </div>
                  <h4 className="font-heading font-semibold text-lg group-hover:text-cyan-500 transition-colors">
                    {event.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
