import { useState, useEffect } from 'react';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already visited the site
    const hasVisited = localStorage.getItem('hasVisitedOzone');
    if (!hasVisited) {
      // Set a slight delay for a premium transition effect
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Prevent background scrolling while popup is open
        document.body.classList.add('no-scroll');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    localStorage.setItem('hasVisitedOzone', 'true');
    document.body.classList.remove('no-scroll');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-popup-fade transition-all duration-300" onClick={closePopup}>
      <div className="relative w-full max-w-[750px] min-h-[400px] rounded-xl overflow-hidden shadow-2xl animate-popup-scale flex flex-col justify-end p-8 text-center" onClick={(e) => e.stopPropagation()} style={{ backgroundImage: 'url("/assets/images/branding.png")', backgroundSize: 'cover', backgroundPosition: 'center' }} >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-black/80 to-black/40 z-0" />

        {/* Close Button */}
        <button onClick={closePopup} className="absolute top-4 right-4 text-white bg-black/60 hover:text-white hover:bg-primary transition-all p-1 rounded-full cursor-pointer hover:scale-110 close-btn-glow z-20 duration-300" aria-label="Close welcome message" style={{ border: '1px solid rgba(255,255,255,0.3)' }}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content on top of background */}
        <div className="relative z-10 flex flex-col items-center">

          <h2 className="text-2xl md:text-3xl font-bold font-heading text-white tracking-wider mb-3">
            Welcome to <br /><span style={{ color: 'var(--color-primary)' }}>Jitesh Petrochemicals</span>
          </h2>

          <p className="text-brand-muted capitalize text-xs md:text-sm font-body leading-relaxed mb-6 max-w-md">
            Discover our premium automotive lubricants, industrial fluids, and advanced specialty petrochemical products built for durability and peak performance.
          </p>
        </div>
      </div>
    </div>
  );
}
