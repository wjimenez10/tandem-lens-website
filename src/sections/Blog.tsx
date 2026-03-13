import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, BookOpen, Newspaper } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BlogProps {
  t: {
    title: string;
    subtitle: string;
    cta: string;
    viewAll: string;
    tags: {
      report: string;
      guide: string;
      article: string;
    };
    newsletter: {
      title: string;
      desc: string;
      placeholder: string;
      button: string;
    };
    posts: {
      threat: { title: string; desc: string };
      human: { title: string; desc: string };
      soc: { title: string; desc: string };
    };
  };
}

export default function Blog({ t }: BlogProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const posts = [
    {
      key: 'threat',
      tag: t.tags.report,
      icon: FileText,
      image: '/resource_thumb_1.jpg',
    },
    {
      key: 'human',
      tag: t.tags.guide,
      icon: BookOpen,
      image: '/resource_thumb_2.jpg',
    },
    {
      key: 'soc',
      tag: t.tags.article,
      icon: Newspaper,
      image: '/resource_thumb_3.jpg',
    },
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
      id="insights"
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
              {t.viewAll}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Posts Grid */}
          <div
            ref={cardsRef}
            className="grid md:grid-cols-3 gap-8"
          >
            {posts.map((post) => {
              const Icon = post.icon;
              const postData = t.posts[post.key as keyof typeof t.posts];

              return (
                <article
                  key={post.key}
                  className="group cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative rounded-2xl overflow-hidden mb-6">
                    <img
                      src={post.image}
                      alt={postData.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-200/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-200/80 backdrop-blur-sm text-xs font-mono">
                        <Icon className="w-3 h-3" />
                        {post.tag}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-heading font-semibold text-xl mb-3 group-hover:text-cyan-500 transition-colors">
                    {postData.title}
                  </h3>
                  <p className="text-slate-text text-sm mb-4 line-clamp-2">
                    {postData.desc}
                  </p>
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-cyan-500 hover:text-cyan-300 transition-colors group/btn">
                    {t.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </article>
              );
            })}
          </div>

          {/* Newsletter */}
          <div className="mt-16 p-8 lg:p-12 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-heading text-2xl font-bold mb-3">
                  {t.newsletter.title}
                </h3>
                <p className="text-slate-text">
                  {t.newsletter.desc}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder={t.newsletter.placeholder}
                  className="flex-1 px-4 py-3 rounded-xl bg-navy-200 border border-white/10 focus:border-cyan-500 focus:outline-none transition-colors"
                />
                <Button className="bg-cyan-500 text-navy-200 hover:bg-cyan-400 whitespace-nowrap">
                  {t.newsletter.button}
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
