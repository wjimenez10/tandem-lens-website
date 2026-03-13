import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Map,
  Shield,
  Siren,
  BarChart3,
  Users,
  Heart,
  ArrowRight,
  Check,
  Star,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface VCISOSectionProps {
  t: {
    title: string;
    subtitle: string;
    desc: string;
    cta1: string;
    cta2: string;
    premiumBadge: string;
    packagesTitle: string;
    mostPopular: string;
    hoursPerMonth: string;
    perMonth: string;
    priceDisclaimer: string;
    integrationTitle: string;
    integrationDesc: string;
    viewButtons: {
      soc: string;
      hrm: string;
      redTeam: string;
    };
    packages: {
      starter: {
        name: string;
        hours: string;
        features: string[];
        price: string;
      };
      growth: {
        name: string;
        hours: string;
        features: string[];
        price: string;
        popular?: boolean;
      };
      enterprise: {
        name: string;
        hours: string;
        features: string[];
        price: string;
      };
    };
    kpis: string[];
    highlights: {
      roadmap: string;
      riesgo: string;
      ir: string;
      metricas: string;
      proveedores: string;
      cultura: string;
    };
    faq: {
      title: string;
      q1: string;
      a1: string;
      q2: string;
      a2: string;
      q3: string;
      a3: string;
      q4: string;
      a4: string;
      q5: string;
      a5: string;
    };
    form: {
      name: string;
      company: string;
      email: string;
      industry: string;
      industryPlaceholder: string;
      objective: string;
      objectives: string[];
      message: string;
      messagePlaceholder: string;
      privacy: string;
      submit: string;
      successTitle: string;
      successDesc: string;
      successCTA: string;
      calendlyBtn: string;
    };
  };
}

const highlights = [
  { key: 'roadmap', icon: Map },
  { key: 'riesgo', icon: Shield },
  { key: 'ir', icon: Siren },
  { key: 'metricas', icon: BarChart3 },
  { key: 'proveedores', icon: Users },
  { key: 'cultura', icon: Heart },
] as const;

export default function VCISOSection({ t }: VCISOSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const packages = [
    { key: 'starter', ...t.packages.starter },
    { key: 'growth', ...t.packages.growth },
    { key: 'enterprise', ...t.packages.enterprise },
  ];

  return (
    <>
      <section
        ref={sectionRef}
        id="vciso"
        className="relative w-full py-24 lg:py-32 z-20 bg-navy-300"
      >
        <div className="px-6 lg:px-12">
          <div ref={contentRef} className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/8 border border-cyan-500/20 mb-6">
                  <Star className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm font-mono text-cyan-500 uppercase tracking-wider">
                    {t.premiumBadge}
                  </span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  {t.title}
                </h2>
                <p className="text-xl text-cyan-500 mb-6">{t.subtitle}</p>
                <p className="text-slate-text leading-relaxed">{t.desc}</p>
              </div>

              <div className="flex flex-col justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-cyan-500 text-navy-200 hover:bg-cyan-400 font-medium"
                  onClick={() => setIsDialogOpen(true)}
                >
                  {t.cta1}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  {t.cta2}
                </Button>
              </div>
            </div>

            {/* KPIs Marquee */}
            <div className="relative overflow-hidden py-6 mb-16 border-y border-white/10">
              <div className="flex animate-marquee whitespace-nowrap">
                {[...t.kpis, ...t.kpis].map((kpi, i) => (
                  <span
                    key={i}
                    className="mx-8 text-lg font-heading font-semibold text-cyan-500"
                  >
                    {kpi} •
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {highlights.map((item) => {
                const Icon = item.icon;
                const text = t.highlights[item.key as keyof typeof t.highlights];

                return (
                  <div
                    key={item.key}
                    className="flex items-start gap-4 p-5 rounded-xl bg-navy-100 border border-white/5 hover:border-cyan-500/25 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/8 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-cyan-500" />
                    </div>
                    <span className="font-medium">{text}</span>
                  </div>
                );
              })}
            </div>

            {/* Packages */}
            <div className="mb-16">
              <h3 className="font-heading text-2xl font-bold mb-8 text-center">
                {t.packagesTitle}
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <div
                    key={pkg.key}
                    className={`relative rounded-2xl p-6 border ${
                      pkg.popular
                        ? 'border-cyan-500 bg-cyan-500/5'
                        : 'border-white/10 bg-navy-100'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="px-3 py-1 rounded-full bg-cyan-500 text-navy-200 text-xs font-mono font-medium">
                          {t.mostPopular}
                        </span>
                      </div>
                    )}
                    <h4 className="font-heading font-bold text-xl mb-2">
                      {pkg.name}
                    </h4>
                    <p className="text-sm text-slate-text mb-4">
                      {pkg.hours} {t.hoursPerMonth}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Check className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-white/10">
                      <span className="text-2xl font-heading font-bold text-cyan-500">
                        {pkg.price}
                      </span>
                      <span className="text-sm text-slate-text">{t.perMonth}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-slate-text mt-4">
                {t.priceDisclaimer}
              </p>
            </div>

            {/* Integration Banner */}
            <div className="rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 p-8 mb-16">
              <h3 className="font-heading text-xl font-bold mb-4 text-center">
                {t.integrationTitle}
              </h3>
              <p className="text-center text-slate-text mb-6">
                {t.integrationDesc}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" size="sm">
                  {t.viewButtons.soc}
                </Button>
                <Button variant="outline" size="sm">
                  {t.viewButtons.hrm}
                </Button>
                <Button variant="outline" size="sm">
                  {t.viewButtons.redTeam}
                </Button>
              </div>
            </div>

            {/* FAQ */}
            <div className="max-w-3xl mx-auto">
              <h3 className="font-heading text-2xl font-bold mb-8 text-center">
                {t.faq.title}
              </h3>
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="q1" className="border-white/10">
                  <AccordionTrigger className="hover:text-cyan-500">
                    {t.faq.q1}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-text">
                    {t.faq.a1}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2" className="border-white/10">
                  <AccordionTrigger className="hover:text-cyan-500">
                    {t.faq.q2}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-text">
                    {t.faq.a2}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3" className="border-white/10">
                  <AccordionTrigger className="hover:text-cyan-500">
                    {t.faq.q3}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-text">
                    {t.faq.a3}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q4" className="border-white/10">
                  <AccordionTrigger className="hover:text-cyan-500">
                    {t.faq.q4}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-text">
                    {t.faq.a4}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q5" className="border-white/10">
                  <AccordionTrigger className="hover:text-cyan-500">
                    {t.faq.q5}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-text">
                    {t.faq.a5}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-navy-100 border-white/10 max-w-lg max-h-[90vh] overflow-y-auto">
          {!formSubmitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-xl">
                  {t.cta1}
                </DialogTitle>
                <DialogDescription className="text-slate-text">
                  Cuéntanos sobre tu organización y necesidades.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {t.form.name}
                    </label>
                    <Input
                      placeholder={t.form.name}
                      className="bg-navy-200 border-white/10"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      {t.form.company}
                    </label>
                    <Input
                      placeholder={t.form.company}
                      className="bg-navy-200 border-white/10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">{t.form.email}</label>
                  <Input
                    type="email"
                    placeholder={t.form.email}
                    className="bg-navy-200 border-white/10"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    {t.form.industry}
                  </label>
                  <Input
                    placeholder={t.form.industryPlaceholder}
                    className="bg-navy-200 border-white/10"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t.form.objective}
                  </label>
                  <div className="space-y-2">
                    {t.form.objectives.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Checkbox id={item} />
                        <label htmlFor={item} className="text-sm">
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">{t.form.message}</label>
                  <Textarea
                    placeholder={t.form.messagePlaceholder}
                    className="bg-navy-200 border-white/10 min-h-[100px]"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox id="privacy" />
                  <label htmlFor="privacy" className="text-xs text-slate-text">
                    {t.form.privacy}
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-cyan-500 text-navy-200 hover:bg-cyan-400"
                >
                  {t.form.submit}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <DialogTitle className="font-heading text-xl mb-2">
                {t.form.successTitle}
              </DialogTitle>
              <DialogDescription className="text-slate-text mb-6">
                {t.form.successDesc}
              </DialogDescription>
              <p className="text-slate-text mb-4">
                {t.form.successCTA}
              </p>
              <Button
                className="bg-cyan-500 text-navy-200 hover:bg-cyan-400"
                onClick={() =>
                  window.open('https://calendly.com', '_blank')
                }
              >
                {t.form.calendlyBtn}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
