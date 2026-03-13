import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, Quote, Download, TrendingDown, Clock, Shield, Award } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';
import { useAnalytics } from '@/hooks/useAnalytics';
import LeadMagnetModal from '@/components/LeadMagnetModal';

gsap.registerPlugin(ScrollTrigger);

interface CasosProps {
  t: {
    title: string;
    subtitle: string;
    cta: string;
    roiTitle: string;
    roiDesc: string;
    roiAmount: string;
    roiCTA: string;
    roiStats: {
      roi: string;
      payback: string;
    };
    metrics: {
      riesgo: string;
      mttd: string;
      respuesta: string;
      madurez: string;
    };
    metricsLabels: {
      riesgo: string;
      mttd: string;
      respuesta: string;
      madurez: string;
    };
    testimonials: {
      quote: string;
      author: string;
      role: string;
      company: string;
    }[];
  };
}

// Métricas con datos para contadores
const metricsData = [
  { key: 'riesgo', icon: TrendingDown, value: 75, suffix: '%' },
  { key: 'mttd', icon: Clock, value: 35, suffix: '%' },
  { key: 'respuesta', icon: Shield, value: 2.5, suffix: 'h', isDecimal: true },
  { key: 'madurez', icon: Award, value: 3, prefix: '+', suffix: '' },
];

// Testimonial metrics
const testimonialMetrics = [
  { value: 75, suffix: '%', prefix: '-' },
  { value: 35, suffix: '%', prefix: '' },
  { value: 3, suffix: '', prefix: '+' },
];

export default function Casos({ t }: CasosProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);
  const { trackCTAClick, trackSectionView } = useAnalytics();

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

      // Metrics animation
      gsap.fromTo(
        metricsRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: metricsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            onEnter: () => trackSectionView('casos_metrics'),
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [trackSectionView]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % t.testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + t.testimonials.length) % t.testimonials.length
    );
  };

  const handleDownloadCase = () => {
    trackCTAClick('download_case_study', 'casos');
    setIsLeadMagnetOpen(true);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="casos"
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
                onClick={handleDownloadCase}
                className="border-cyan-500/50 text-cyan-500 hover:bg-cyan-500/8 w-fit"
              >
                <Download className="mr-2 w-5 h-5" />
                {t.cta}
              </Button>
            </div>

            {/* KPIs Grid con Contadores Animados */}
            <div ref={metricsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {metricsData.map((metric) => {
                const Icon = metric.icon;
                const label = t.metricsLabels[metric.key as keyof typeof t.metricsLabels];
                return (
                  <div
                    key={metric.key}
                    className="p-6 rounded-2xl bg-navy-100 border border-white/5 text-center hover:border-cyan-500/25 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/8 flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-500/12 transition-colors">
                      <Icon className="w-6 h-6 text-cyan-500" />
                    </div>
                    <p className="font-heading text-3xl lg:text-4xl font-bold text-cyan-500 mb-2">
                      {metric.isDecimal ? (
                        <span>{metric.value}{metric.suffix}</span>
                      ) : (
                        <AnimatedCounter
                          value={metric.value}
                          prefix={metric.prefix}
                          suffix={metric.suffix}
                          duration={2}
                        />
                      )}
                    </p>
                    <p className="text-sm text-slate-text">{label}</p>
                  </div>
                );
              })}
            </div>

            {/* ROI Calculator Banner */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-16">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <h3 className="font-heading text-2xl font-bold mb-3">
                    {t.roiTitle}
                  </h3>
                  <p className="text-slate-text mb-4">
                    {t.roiDesc}{' '}
                    <span className="text-cyan-500 font-bold">{t.roiAmount}</span>. 
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      <span>{t.roiStats.roi}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span>{t.roiStats.payback}</span>
                    </div>
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <Button 
                    onClick={() => trackCTAClick('roi_calculator', 'casos')}
                    className="bg-cyan-500 text-navy-200 hover:bg-cyan-400"
                  >
                    {t.roiCTA}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Testimonials Slider */}
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {t.testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="relative p-8 lg:p-12 rounded-2xl bg-navy-100 border border-white/5">
                          <Quote className="w-12 h-12 text-cyan-500/30 mb-6" />
                          <p className="text-xl lg:text-2xl font-heading leading-relaxed mb-8">
                            "{testimonial.quote}"
                          </p>
                          <div>
                            <p className="font-semibold">{testimonial.author}</p>
                            <p className="text-sm text-slate-text">
                              {testimonial.role}, {testimonial.company}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-center">
                          <div className="text-center">
                            <p className="font-heading text-6xl lg:text-8xl font-bold text-cyan-500 mb-4">
                              {testimonialMetrics[index].prefix}
                              <AnimatedCounter
                                value={testimonialMetrics[index].value}
                                duration={2.5}
                              />
                              {testimonialMetrics[index].suffix}
                            </p>
                            <p className="text-xl text-slate-text">
                              {index === 0 && t.metricsLabels.riesgo}
                              {index === 1 && t.metricsLabels.mttd}
                              {index === 2 && t.metricsLabels.madurez}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-500 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex gap-2">
                  {t.testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentIndex
                          ? 'bg-cyan-400'
                          : 'bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:border-cyan-400 hover:text-cyan-500 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet Modal */}
      <LeadMagnetModal
        isOpen={isLeadMagnetOpen}
        onClose={() => setIsLeadMagnetOpen(false)}
      />
    </>
  );
}
