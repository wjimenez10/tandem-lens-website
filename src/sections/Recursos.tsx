import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Download, FileText, Shield, BarChart3, BookOpen, Clock } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import LeadMagnetModal from '@/components/LeadMagnetModal';

gsap.registerPlugin(ScrollTrigger);

interface RecursosProps {
  t?: {
    title: string;
    subtitle: string;
    badge: string;
    downloadBtn: string;
    downloads: string;
    rating: string;
    recommend: string;
    socialProof: string;
    resources: {
      cisoGuide: {
        title: string;
        desc: string;
        time: string;
        topics: string[];
      };
      ransomware: {
        title: string;
        desc: string;
        time: string;
        topics: string[];
      };
      hrmRoi: {
        title: string;
        desc: string;
        time: string;
        topics: string[];
      };
      nist: {
        title: string;
        desc: string;
        time: string;
        topics: string[];
      };
    };
  };
}

const resourcesData = [
  {
    id: 'ciso-guide',
    key: 'cisoGuide' as const,
    icon: FileText,
    downloads: '2,400+',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 'ransomware-playbook',
    key: 'ransomware' as const,
    icon: Shield,
    downloads: '1,800+',
    color: 'from-red-500/20 to-orange-500/20',
  },
  {
    id: 'hrm-roi',
    key: 'hrmRoi' as const,
    icon: BarChart3,
    downloads: '950+',
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    id: 'nist-checklist',
    key: 'nist' as const,
    icon: BookOpen,
    downloads: '3,200+',
    color: 'from-purple-500/20 to-pink-500/20',
  },
];

export default function Recursos({ t }: RecursosProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<string | undefined>();
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
              onEnter: () => trackSectionView('recursos'),
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [trackSectionView]);

  const handleDownload = (resourceId: string) => {
    trackCTAClick('download_resource', 'recursos', resourceId);
    setSelectedResource(resourceId);
    setIsLeadMagnetOpen(true);
  };

  // Default texts if translations not provided
  const defaultT = {
    title: 'Recursos exclusivos para líderes de seguridad',
    subtitle: 'Descarga guías, playbooks y herramientas probadas por CISOs de Fortune 500.',
    badge: 'Recursos Gratuitos',
    downloadBtn: 'Descargar gratis',
    downloads: 'descargas',
    rating: 'Rating promedio',
    recommend: 'Recomiendan',
    socialProof: 'por profesionales de seguridad',
  };

  const texts = t || defaultT;

  return (
    <>
      <section
        ref={sectionRef}
        id="recursos"
        className="relative w-full py-24 lg:py-32 z-20 bg-navy-300"
      >
        <div className="px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/8 border border-cyan-500/20 mb-6">
                <Download className="w-4 h-4 text-cyan-500" />
                <span className="text-sm font-mono text-cyan-500 uppercase tracking-wider">
                  {texts.badge}
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                {texts.title}
              </h2>
              <p className="text-lg text-slate-text">
                {texts.subtitle}
              </p>
            </div>

            {/* Resources Grid */}
            <div
              ref={cardsRef}
              className="grid md:grid-cols-2 gap-6"
            >
              {resourcesData.map((resource) => {
                const Icon = resource.icon;
                const resourceT = t?.resources?.[resource.key];
                
                // Default resource texts
                const defaultResource = {
                  title: resource.key === 'cisoGuide' ? "The CISO's Guide to Board Reporting" :
                         resource.key === 'ransomware' ? 'Ransomware Response Playbook 2025' :
                         resource.key === 'hrmRoi' ? 'HRM ROI Calculator' :
                         'NIST CSF 2.0 Implementation Checklist',
                  desc: 'Recurso exclusivo para líderes de seguridad.',
                  time: '15 min lectura',
                  topics: ['Seguridad', 'Cumplimiento'],
                };

                const r = resourceT || defaultResource;

                return (
                  <div
                    key={resource.id}
                    className="group relative p-6 lg:p-8 rounded-2xl bg-navy-100 border border-white/5 hover:border-cyan-500/25 transition-all duration-500"
                  >
                    {/* Gradient background on hover */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${resource.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-14 h-14 rounded-xl bg-cyan-500/8 flex items-center justify-center group-hover:bg-cyan-500/12 transition-colors">
                          <Icon className="w-7 h-7 text-cyan-500" />
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-text">
                          <span className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            {resource.downloads} {texts.downloads}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {r.time}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-heading font-semibold text-xl mb-3 group-hover:text-cyan-500 transition-colors">
                        {r.title}
                      </h3>

                      <p className="text-slate-text mb-6">
                        {r.desc}
                      </p>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {r.topics.map((topic: string) => (
                          <span
                            key={topic}
                            className="px-3 py-1 rounded-full text-xs bg-white/5 text-slate-text"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      <Button
                        onClick={() => handleDownload(resource.id)}
                        variant="outline"
                        className="w-full border-cyan-500/50 text-cyan-500 hover:bg-cyan-500/8"
                      >
                        <Download className="mr-2 w-4 h-4" />
                        {texts.downloadBtn}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Proof */}
            <div className="mt-16 p-8 rounded-2xl bg-navy-100 border border-white/5">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-navy-200 flex items-center justify-center text-xs font-bold"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold">+8,350 {texts.downloads}</p>
                    <p className="text-sm text-slate-text">{texts.socialProof}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="font-heading text-2xl font-bold text-cyan-500">4.9/5</p>
                    <p className="text-sm text-slate-text">{texts.rating}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-heading text-2xl font-bold text-cyan-500">94%</p>
                    <p className="text-sm text-slate-text">{texts.recommend}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet Modal */}
      <LeadMagnetModal
        isOpen={isLeadMagnetOpen}
        onClose={() => setIsLeadMagnetOpen(false)}
        selectedMagnet={selectedResource}
      />
    </>
  );
}
