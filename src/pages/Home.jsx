import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const slides = [
  // {
  //   image: '/assets/images/branding.png',
  //   tag: 'Flagship Brands: OZONE & JITO',
  //   title: (
  //     <>
  //       {/* OZONE <span className="text-primary">JITO.</span> */}
  //     </>
  //   ),
  //   desc: 'Premium quality engine oils, gear fluids, and specialty industrial lubricants for peak machinery performance.',
  //   link1: '/products?category=OZONE BRAND',
  //   link1Text: 'Explore Lubricants',
  //   link2: '/specialty-chemicals',
  //   link2Text: 'Explore Specialtys'
  // },
  {
    image: '/assets/images/slider_industrial.png',
    tag: 'Established 1981',
    title: (
      <>
        Premium Industrial <span className="text-primary">Lubricants.</span>
      </>
    ),
    desc: 'Crafting high-quality  hydraulic fluid, gear fluids, and specialty industrial lubricants for peak machinery performance.',
    link1: '/products?category=OZONE INDUSTRIAL',
    link1Text: 'Industrial Products',
    link2: '/#about',
    link2Text: 'Our Story'
  },
  {
    image: '/assets/images/slider_automotive.png',
    tag: 'Flagship Brands: OZONE',
    title: (
      <>
        High-Performance <span className="text-primary">Automotive Oils.</span>
      </>
    ),
    desc: 'Advanced formula engine oils engineered for maximum performance, fuel efficiency, and engine longevity under tough conditions.',
    link1: '/products?category=OZONE AUTOMOTIVE',
    link1Text: 'Explore Lubricants',
    link2: '/#contact',
    link2Text: 'Bulk Inquiry'
  },
  {
    image: '/assets/images/slider_textile.png',
    tag: 'Specialty Formulations',
    title: (
      <>
        Textile & Specialty <span className="text-primary">Chemicals.</span>
      </>
    ),
    desc: 'Premium Quality Auxiliaries & Machinery Fluids Designed For Filaments & High Speed Operations.',
    link1: '/products?category=OZONE TEXTILE',
    link1Text: 'Special Chemicals',
    link2: '/#contact',
    link2Text: 'Get in Touch'
  },
  {
    image: '/assets/images/slider_metalwork.png',
    tag: 'Premium Metalworking',
    title: (
      <>
        Metalworking <span className="text-primary">Lubricants.</span>
      </>
    ),
    desc: 'Premium quality Metalworking lubricants designed for precision operations and high-speed machinery.',
    link1: '/products?category=OZONE METALWORK',
    link1Text: 'Explore Lubricants',
    link2: '/#contact',
    link2Text: 'Bulk Inquiry'
  }
];

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Reset SEO title for Home
    document.title = "Jitesh Petrochemicals | Premium Industrial Lubricants & Oils";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', "Jitesh Petrochemicals is a leading manufacturer and bulk supplier of high-quality engine oils, industrial lubricants, textile oils, and specialty chemicals since 1981.");
    }

    // Reveal Observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      });
    }, revealOptions);
    revealElements.forEach(el => revealObserver.observe(el));

    // Counter Observer
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const targetAttr = entry.target.getAttribute('data-target');
        const target = targetAttr ? +targetAttr : 0;
        const suffix = entry.target.getAttribute('data-suffix') || '';
        const duration = 2000;
        const step = Math.max(10, Math.floor(duration / target));
        let current = 0;
        const timer = setInterval(() => {
          current += Math.ceil(target / (duration / step));
          if (current >= target) {
            entry.target.innerText = target + suffix;
            clearInterval(timer);
          } else {
            entry.target.innerText = current + suffix;
          }
        }, step);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    // Instant reveal for hero
    const heroElements = document.querySelectorAll('#home .reveal');
    heroElements.forEach(el => el.classList.add('active'));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);


  const handleContactSubmit = (e) => {
    e.preventDefault();
    const ownerNumber = "+919228019999";
    const waMessage = `*New Inquiry from Website*\n\n👤 *Name:* ${formData.name}\n📧 *Email:* ${formData.email}\n💬 *Message:* ${formData.message}`;
    window.open(`https://api.whatsapp.com/send?phone=${ownerNumber}&text=${encodeURIComponent(waMessage)}`, '_blank', 'noopener,noreferrer');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      {/* Hero Section Start Here */}
      <section id="home" className="relative min-h-[95dvh] flex items-center md:pt-20 bg-brand-panel overflow-hidden">

        {/* Slider Backgrounds */}
        <div className="absolute inset-0 z-0">
          {slides.map((slide, idx) => (
            <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>

              {/* Background Image with slight zoom transition */}
              <img src={slide.image} alt={slide.tag} className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-out ${idx === currentSlide ? 'scale-110' : 'scale-100'}`} />

              {/* Dark Overlay to ensure text readability */}
              <div className="absolute inset-0 bg-brand-main/75"></div>
            </div>
          ))}
        </div>

        {/* Slider Content */}
        <div className="container relative z-20 w-full grid grid-cols-1 grid-rows-1 lg:py-12 md:py-20 py-0">
          {slides.map((slide, idx) => (
            <div key={idx} className={`col-start-1 row-start-1 w-full transition-all duration-[800ms] ease-in-out transform ${idx === currentSlide
              ? 'opacity-100 translate-y-0 pointer-events-auto z-10'
              : 'opacity-0 translate-y-10 pointer-events-none z-0'}`}>
              <div className="max-w-[850px]">
                <div className="relative inline-block px-4 py-1.5 bg-brand-panel border-l-[3px] border-l-primary text-brand-text font-heading text-[0.9rem] uppercase tracking-[2px] mb-4 sm:mb-6 overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-[2px] before:h-full before:bg-primary before:shadow-[0_0_10px_#FF6600,0_0_20px_rgba(255,102,0,0.5)] before:animate-[rightleft_3s_cubic-bezier(0.4,0,0.2,1)_infinite]">
                  {slide.tag}
                </div>
                <h1 className="text-[clamp(1.6rem,6vw,4rem)] mb-4 sm:mb-5 font-bold leading-tight tracking-wide text-brand-text uppercase">
                  {slide.title}
                </h1>
                <p className="text-sm capitalize sm:text-base md:text-lg text-brand-muted max-w-[650px] mb-8 sm:mb-10 leading-relaxed">
                  {slide.desc}
                </p>
                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1 w-full max-w-[420px] sm:flex sm:gap-5 sm:max-w-none">
                  <Link to={slide.link1} className="btn-primary w-full sm:w-auto text-center">{slide.link1Text}</Link>
                  <Link to={slide.link2} className="btn-secondary w-full sm:w-auto text-center">{slide.link2Text}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicator Dots */}
        <div className="absolute md:bottom-8 bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentSlide(idx)} className="p-2 -m-2 cursor-pointer group" aria-label={`Go to slide ${idx + 1}`}>
              <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide
                ? 'bg-primary w-6 shadow-[0_0_10px_rgba(255,102,0,0.8)]'
                : 'bg-brand-muted/40 group-hover:bg-brand-muted'
                }`}
              />
            </button>
          ))}
        </div>
      </section>
      {/* Hero Section End Here */}

      {/* About Section Start Here */}
      <section id="about" className="section-padding bg-brand-panel border-b border-brand-border">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[60px] items-center">
          <div className="reveal fade-left">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-3xl xl:text-5xl mb-2 sm:mb-4 md:mb-6 lg:mb-[30px]">
              Four Decades of <br /><span className="text-primary">Oil Manufacturing</span>
            </h2>
            <p className="text-brand-muted text-sm sm:text-base md:text-lg">Based in Surat, Gujarat, Jitesh Trading Company has been a trusted name in the manufacturing and bulk distribution of premium oils since 1981.</p>
            <p className="text-brand-muted capitalize my-3 sm:my-4 md:my-6 text-sm sm:text-base md:text-lg">We craft the finest engine oils, gear fluids, and industrial lubricants, ensuring high-volume supply with unmatched quality through our flagship brands: <strong>Ozone+</strong> and <strong>Jito</strong>.</p>
            <ul className="grid grid-cols-3 sm:grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-5 mt-10 pt-10 border-t border-brand-border">
              <li>
                <h3 className="stat-number counter md:text-5xl text-3xl mb-1" data-target="40" data-suffix="+">0+</h3>
                <p className="md:text-[0.9rem] text-sm text-primary uppercase tracking-wider font-heading font-semibold">Years Experience</p>
              </li>
              <li>
                <h3 className="stat-number counter md:text-5xl text-3xl mb-1" data-target="500" data-suffix="+">0+</h3>
                <p className="md:text-[0.9rem] text-sm text-primary uppercase tracking-wider font-heading font-semibold">Industry Partners</p>
              </li>
              <li>
                <h3 className="stat-number counter md:text-5xl text-3xl mb-1" data-target="100" data-suffix="%">0%</h3>
                <p className="md:text-[0.9rem] text-sm text-primary uppercase tracking-wider font-heading font-semibold">Quality Assured</p>
              </li>
            </ul>
          </div>
          <div className="reveal fade-right relative border-4 border-brand-border">
            <img src="/assets/images/about.png" alt="Industrial Manufacturing" className="w-full h-auto" />
          </div>
        </div>
      </section>
      {/* About Section End Here */}

      {/* Lubricants Products Section Start Here */}
      <section className="section-padding pb-0! bg-brand-main">
        <div className="container">
          <div className="text-center mb-[70px] reveal">
            <h2 className="text-[clamp(2rem,5vw,3.5rem)]">Our <span className="text-primary">Brands & Products</span></h2>
            <div className="w-[60px] h-1 bg-primary mx-auto my-5"></div>
            <p className="text-brand-muted capitalize text-[1.1rem] max-w-[600px] mx-auto">Delivering high-volume excellence through our flagship brands: <strong>Ozone+</strong> & <strong>Jito</strong>.</p>
          </div>
          <h3 className="brand-title reveal">lubricants Categories</h3>
          <div className="grid mt-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 md:gap-[30px]">
            {[
              { id: 'ozone-auto', title: 'Auto', desc: 'High-performance engine oils and automotive lubricants engineered for maximum engine life.', img: 'slider_automotive.png' },
              { id: 'ozone-industrial', title: 'Industrial', desc: 'Hydraulic oils and compressor fluids perfectly suited for heavy manufacturing operations.', img: 'slider_industrial.png' },
              { id: 'ozone-metalwork', title: 'Metalwork', desc: 'Premium cutting fluids and rust preventives designed for precision metalworking.', img: 'slider_metalwork.png' },
              { id: 'ozone-textile', title: 'Textile', desc: 'Specialty loom oils and textile lubricants crafted for high-speed weaving machinery.', img: 'slider_textile.png' },

            ].map((item, idx) => (
              <Link to={`/products?category=${item.id.replace('-', ' ').toUpperCase()}`} key={item.id} className={`bg-brand-panel border border-brand-border transition-all duration-300 relative group block hover:border-primary hover:shadow-[0_15px_30px_rgba(255,102,0,0.1)] reveal seq-${(idx % 3) + 1}`} id={item.id} >
                <div className="h-[220px] overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:border-b-[3px] after:border-primary">
                  <img src={`/assets/images/${item.img}`} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="md:p-[20px] p-4">
                  <h3 className="md:text-[1.4rem] text-lg mb-3">{item.title}</h3>
                  <p className="md:text-[0.95rem] capitalize text-sm text-brand-muted">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Lubricants Products Section End Here */}

      {/* Special Chemicals Products Section Start Here */}
      <section className="section-padding bg-brand-main">
        <div className="container">
          <h3 className="brand-title reveal">Special Chemicals</h3>
          <div className="grid mt-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 md:gap-[30px]">
            <Link to="/specialty-chemicals" className="bg-brand-panel border border-brand-border transition-all duration-300 relative group block hover:border-primary hover:shadow-[0_15px_30px_rgba(255,102,0,0.1)] reveal seq-1">
              <div className="h-[220px] overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:border-b-[3px] after:border-primary flex items-center justify-center bg-black/20">
                <img src="/assets/images/logo2.png" alt="JITO Specialty Chemicals" className="max-h-full max-w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="md:p-[30px] p-4">
                <span className="text-primary text-xs font-heading font-bold uppercase tracking-widest mb-2 block">JITO Brand</span>
                <h3 className="md:text-[1.4rem] text-lg mb-3">Specialty Chemicals</h3>
                <p className="md:text-[0.95rem] capitalize text-sm text-brand-muted mb-4">Engineered Chemistry for Auto, Industrial & all types of Consumer Solution.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* Special Chemicals Products Section End Here */}

      {/* Contact Section Start Here */}
      <section id="contact" className="section-padding bg-brand-panel border-t border-brand-border">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[60px] items-start">
          <div className="reveal fade-left">
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] mb-[25px]">Get in <span className="text-primary">Touch</span></h2>
            <p className="text-brand-muted capitalize mb-10 text-[1.05rem]">Connect with us for inquiries and bulk orders.</p>
            <div className="flex flex-col gap-[30px]">
              <div className="flex gap-5">
                <svg className="w-7 h-7 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <div>
                  <h4 className="text-[1.2rem] mb-1">Location</h4>
                  <p className="text-brand-muted">27/A, Plot No. 147, Rupal Industrial Estate-2, Opp. Manhar Dyeing, Bamroli Road, Surat -394210.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <svg className="w-7 h-7 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <div>
                  <h4 className="text-[1.2rem] mb-1">Phone / WhatsApp</h4>
                  <a className="text-brand-muted hover:text-primary transition-all" href="tel:+919228019999">+91 922 801 9999</a>
                </div>
              </div>
              <div className="flex gap-5">
                <svg className="w-7 h-7 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <div>
                  <h4 className="text-[1.2rem] mb-1">Email</h4>
                  <a className="text-brand-muted hover:text-primary transition-all" href="mailto:chintan@jiteshpetrochemicals.com">chintan@jiteshpetrochemicals.com</a>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-brand-main p-6 sm:p-10 border border-brand-border reveal fade-right">
            <form className="flex flex-col gap-5" onSubmit={handleContactSubmit}>
              <input type="text" placeholder="Your Name" required className="w-full p-4 bg-brand-panel border border-brand-border text-brand-text font-body text-base outline-none focus:border-primary transition-all" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <input type="email" placeholder="Your Email" required className="w-full p-4 bg-brand-panel border border-brand-border text-brand-text font-body text-base outline-none focus:border-primary transition-all" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <textarea placeholder="Your Message" rows="5" required className="w-full p-4 bg-brand-panel border border-brand-border text-brand-text font-body text-base outline-none focus:border-primary transition-all" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
              <button type="submit" className="btn-primary w-full">Send Inquiry</button>
            </form>
          </div>
        </div>
      </section>
      {/* Contact Section End Here */}
    </>
  );
};

export default Home;
