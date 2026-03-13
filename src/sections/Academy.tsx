import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Target, Siren, Users, Clock, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AcademyProps {
  t: {
    title: string;
    subtitle: string;
    cta: string;
    viewDetails: string;
    levels: {
      intermediate: string;
      advanced: string;
      executive: string;
    };
    banner: {
      title: string;
      desc: string;
      cta: string;
    };
    courses: {
      blue: string;
      red: string;
      ir: string;
      leadership: string;
    };
    durations: {
      blue: string;
      red: string;
      ir: string;
      leadership: string;
    };
  };
}

export default function Academy({ t }: AcademyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const courses = [
    { key: 'blue', icon: Shield, level: t.levels.intermediate, duration: t.durations.blue },
    { key: 'red', icon: Target, level: t.levels.advanced, duration: t.durations.red },
    { key: 'ir', icon: Siren, level: t.levels.intermediate, duration: t.durations.ir },
    { key: 'leadership', icon: Users, level: t.levels.executive, duration: t.durations.leadership },
  ] as const;

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
      id="academy"
      className="relative w-full py-24 lg:py-32 z-20 bg-navy-200"
    >
      <div className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div
            ref={titleRef}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
          >
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {t.title}
              </h2>
              <p className="text-lg text-slate-text">{t.subtitle}</p>
            </div>
            <Button
              variant="outline"
              className="border-cyan-500/50 text-cyan-500 hover:bg-cyan-500/8 w-fit"
            >
              {t.cta}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Courses Grid */}
          <div
            ref={cardsRef}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {courses.map((course) => {
              const Icon = course.icon;
              const title = t.courses[course.key as keyof typeof t.courses];

              return (
                <div
                  key={course.key}
                  className="group relative p-6 rounded-2xl bg-navy-100 border border-white/5 hover:border-cyan-500/25 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 rounded-xl bg-cyan-500/8 flex items-center justify-center mb-5 group-hover:bg-cyan-500/12 transition-colors">
                    <Icon className="w-7 h-7 text-cyan-500" />
                  </div>

                  <h3 className="font-heading font-semibold text-lg mb-3">
                    {title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-slate-text mb-4">
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {course.level}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                  </div>

                  <button className="inline-flex items-center gap-2 text-sm font-medium text-cyan-500 hover:text-cyan-300 transition-colors group/btn">
                    {t.viewDetails}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Banner */}
          <div className="mt-16 relative rounded-2xl overflow-hidden">
            <img
              src="/academy_classroom.jpg"
              alt="Academy Classroom"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-200/90 to-navy-200/40" />
            <div className="absolute inset-0 flex items-center p-8 lg:p-12">
              <div className="max-w-lg">
                <h3 className="font-heading text-2xl lg:text-3xl font-bold mb-4">
                  {t.banner.title}
                </h3>
                <p className="text-slate-text mb-6">
                  {t.banner.desc}
                </p>
                <Button className="bg-cyan-500 text-navy-200 hover:bg-cyan-400">
                  {t.banner.cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
