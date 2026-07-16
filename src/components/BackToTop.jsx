import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentScroll = window.scrollY;
        setScrollProgress((currentScroll / totalScroll) * 100);
        setIsVisible(currentScroll > 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/70 hover:bg-black/90 text-white shadow-2xl transition-all duration-300 border border-white/10 hover:scale-110 active:scale-95 cursor-pointer group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      {/* Circular Progress Ring */}
      <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 60 60">
        <circle
          cx="30"
          cy="30"
          r={radius}
          className="stroke-white/10 fill-none"
          strokeWidth="3"
        />
        <circle
          cx="30"
          cy="30"
          r={radius}
          className="stroke-[var(--color-primary)] fill-none transition-[stroke-dashoffset] duration-75"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      {/* Arrow Icon */}
      <svg
        className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:-translate-y-1 relative z-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
