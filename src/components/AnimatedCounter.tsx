import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const counter = counterRef.current;
    if (!counter || hasAnimated) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 80%',
        onEnter: () => {
          if (hasAnimated) return;
          setHasAnimated(true);

          const obj = { val: 0 };
          gsap.to(obj, {
            val: value,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
              setDisplayValue(Math.round(obj.val));
            },
          });
        },
      });
    });

    return () => ctx.revert();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={counterRef} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
