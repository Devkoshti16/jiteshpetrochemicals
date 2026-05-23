import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    // Reset SEO title for Home
    document.title = "Jitesh Trading Company | Premium Industrial Lubricants & Oils";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', "Leading manufacturers and bulk suppliers of high-quality engine oils, industrial lubricants, textile oils, and specialty chemicals since 1981.");
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

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const ownerNumber = "917698972036";
    const waMessage = `*New Inquiry from Website*\n\n👤 *Name:* ${formData.name}\n📧 *Email:* ${formData.email}\n💬 *Message:* ${formData.message}`;
    window.open(`https://api.whatsapp.com/send?phone=${ownerNumber}&text=${encodeURIComponent(waMessage)}`, '_blank', 'noopener,noreferrer');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 bg-brand-panel overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="/assets/images/hero-bg.jpg"
          >
            <source src="https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Dark Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-brand-main/80 z-10"></div>

        <div className="container relative z-20 reveal">
          <div className="relative inline-block px-4 py-1.5 bg-brand-panel border-l-[3px] border-l-primary text-brand-text font-heading text-[0.9rem] uppercase tracking-[2px] mb-6 overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-[2px] before:h-full before:bg-primary before:shadow-[0_0_10px_#FF6600,0_0_20px_rgba(255,102,0,0.5)] before:animate-[rightleft_3s_cubic-bezier(0.4,0,0.2,1)_infinite]">
            Established 1981
          </div>
          <h1 className="text-[clamp(2rem,8vw,5.5rem)] mb-5 font-bold leading-tight">
            Premium Oil Making & <span className="text-primary">Bulk Supply.</span>
          </h1>
          <p className="text-lg text-brand-muted max-w-[600px] mb-10">
            Leading manufacturers and bulk suppliers of high-quality engine oils, industrial lubricants, and specialty chemicals since 1981.
          </p>
          <div className="flex gap-5 max-sm:flex-col">
            <Link to="/#lubricants" className="btn-primary">Explore Products</Link>
            <Link to="/#about" className="btn-secondary">Our Story</Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-brand-panel border-b border-brand-border">
        <div className="container grid md:grid-cols-2 gap-10 md:gap-[60px] items-center">
          <div className="reveal fade-left">
            <h2 className="text-[clamp(2rem,5vw,3.2rem)] mb-[30px]">
              Four Decades of <br /><span className="text-primary">Oil Manufacturing</span>
            </h2>
            <p className="text-brand-muted mb-6 text-[1.05rem]">Based in Surat, Gujarat, Jitesh Trading Company has been a trusted name in the manufacturing and bulk distribution of premium oils since 1981.</p>
            <p className="text-brand-muted mb-6 text-[1.05rem]">We craft the finest engine oils, gear fluids, and industrial lubricants, ensuring high-volume supply with unmatched quality through our flagship brands: <strong>OZONE</strong> and <strong>JITO</strong>.</p>
            <ul className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-5 mt-10 pt-10 border-t border-brand-border">
              <li>
                <h3 className="stat-number counter text-5xl mb-1" data-target="40" data-suffix="+">0+</h3>
                <p className="text-[0.9rem] text-primary uppercase tracking-wider font-heading font-semibold">Years Experience</p>
              </li>
              <li>
                <h3 className="stat-number counter text-5xl mb-1" data-target="500" data-suffix="+">0+</h3>
                <p className="text-[0.9rem] text-primary uppercase tracking-wider font-heading font-semibold">Industry Partners</p>
              </li>
              <li>
                <h3 className="stat-number counter text-5xl mb-1" data-target="100" data-suffix="%">0%</h3>
                <p className="text-[0.9rem] text-primary uppercase tracking-wider font-heading font-semibold">Quality Assured</p>
              </li>
            </ul>
          </div>
          <div className="reveal fade-right relative border-4 border-brand-border">
            <img src="/assets/images/about.png" alt="Industrial Manufacturing" className="w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="section-padding bg-brand-main">
        <div className="container">
          <div className="text-center mb-[70px] reveal">
            <h2 className="text-[clamp(2rem,5vw,3.5rem)]">Our <span className="text-primary">Brands & Products</span></h2>
            <div className="w-[60px] h-1 bg-primary mx-auto my-5"></div>
            <p className="text-brand-muted text-[1.1rem] max-w-[600px] mx-auto">Delivering high-volume excellence through our flagship brands: <strong>OZONE</strong> & <strong>JITO</strong>.</p>
          </div>

          <h3 className="brand-title reveal" id="lubricants">lubricants Categories</h3>
          <div className="grid mt-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 md:gap-[30px] mb-20">
            {[
              { id: 'ozone-auto', title: 'Auto', desc: 'High-performance engine oils and automotive lubricants engineered for maximum engine life.', img: 'ozone-auto-new.png' },
              { id: 'ozone-industrial', title: 'Industrial', desc: 'Hydraulic oils and compressor fluids perfectly suited for heavy manufacturing operations.', img: 'ozone-industrial.png' },
              { id: 'ozone-textile', title: 'Textile', desc: 'Specialty loom oils and textile lubricants crafted for high-speed weaving machinery.', img: 'ozone-textile.png' },
              { id: 'ozone-metalwork', title: 'Metalwork', desc: 'Premium cutting fluids and rust preventives designed for precision metalworking.', img: 'ozone-metal.png' }
            ].map((item, idx) => (
              <div key={item.id} className={`bg-brand-panel border border-brand-border transition-all duration-300 relative group hover:border-primary hover:shadow-[0_15px_30px_rgba(255,102,0,0.1)] reveal seq-${(idx % 3) + 1}`} id={item.id}>
                <div className="h-[220px] overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:border-b-[3px] after:border-primary">
                  <img src={`/assets/images/${item.img}`} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-[30px]">
                  <h3 className="text-[1.4rem] mb-3">{item.title}</h3>
                  <p className="text-brand-muted text-[0.95rem]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="brand-title reveal" id="chemicals">special chemicals</h3>
          <div className="grid mt-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 md:gap-[30px]">
            <div className="product-card reveal seq-1 min-h-[250px] flex items-center justify-center bg-gradient-to-br from-brand-panel to-black" id="jito-coming-soon">
              <div className="p-[30px] text-center">
                <h3 className="text-[2.2rem] text-primary mb-2.5">Coming Soon</h3>
                <p className="text-[1.1rem] text-brand-muted">Our premium JITO product line is currently under development. Stay tuned for exciting updates!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-brand-panel border-t border-brand-border">
        <div className="container grid md:grid-cols-2 gap-10 md:gap-[60px] items-start">
          <div className="reveal fade-left">
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] mb-[25px]">Get in <span className="text-primary">Touch</span></h2>
            <p className="text-brand-muted mb-10 text-[1.05rem]">Connect with us for inquiries and bulk orders.</p>
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
                  <p className="text-brand-muted">+91 92280 19999<br />+91 98983 55221</p>
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
    </main>
  );
};

export default Home;
