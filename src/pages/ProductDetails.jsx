import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { products as staticProducts } from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const found = staticProducts.find(p => p.id === id);
    setProduct(found || null);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    // Dynamic SEO
    if (product) {
      document.title = `${product.name} | Jitesh Trading Company`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', product.description.substring(0, 155) + '...');
      }
    }

    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    revealElements.forEach(el => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, [id, product]);

  if (loading) {
    return (
      <main className="min-h-screen bg-brand-main pt-[150px] pb-20 flex justify-center items-center text-brand-muted">
        Loading product details...
      </main>
    );
  }

  if (!product) return <Navigate to="/" />;

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const name = document.getElementById('wa-name')?.value.trim();
    const qty = document.getElementById('wa-qty')?.value.trim();
    const city = document.getElementById('wa-city')?.value.trim();

    if (!name || !qty || !city) {
      alert("Please fill in your Name, Quantity, and City before purchasing.");
      return;
    }

    const ownerNumber = "+919228019999";
    const message = `*Jitesh Trading Delivery Request*\n\nHello, I would like to purchase:\n📦 *Product:* ${product.category} ${product.name}\n👤 *Name:* ${name}\n🔢 *Quantity:* ${qty}\n📍 *City:* ${city}\n\nPlease let me know the availability and payment details.`;
    window.open(`https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const renderIcon = (icon) => {
    if (icon === 'shield') {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    }
    if (icon === 'thermometer') {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
          <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  };

  return (
    <section className="section-padding bg-brand-main md:py-24 py-5! pb-10!">
      <div className="container lg:pt-[10px]">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4 md:mb-6 font-body text-brand-muted text-[0.95rem] reveal">
          <Link to="/" className="text-brand-text hover:text-primary transition-colors">Home</Link>
          <span className="text-primary mx-1 lg:mx-2.5">/</span>
          <Link to="/#products" className="text-brand-text hover:text-primary transition-colors">Lubricants</Link>
          <span className="text-primary mx-1 lg:mx-2.5">/</span>
          <Link to={`/products?category=${product.category}`} className="text-brand-text hover:text-primary transition-colors capitalize">
            {product.category.replace('OZONE ', '').toLowerCase()}
          </Link>
          <span className="text-primary mx-1 lg:mx-2.5">/</span>
          <span className="text-primary">{product.name}</span>
        </div>

        {/* Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-[50px] items-start md:mb-10 xl:mb-20 reveal seq-1">
          <div className="bg-brand-panel border overflow-hidden border-brand-border rounded-lg p-0 lg:p-5 flex justify-center items-center lg:sticky lg:top-[100px]">
            <img src={product.image} alt={product.name} className="w-full max-w-[500px] object-contain rounded-lg drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]" />
          </div>

          <div className="modal-details">
            <div className="badge mb-3.5">{product.category}</div>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] text-ellipsis-two-line mb-2 lg:mb-[15px]">
              {product.name.split(' ')[0]} <span className="text-primary">{product.name.substring(product.name.indexOf(' ') + 1)}</span>
            </h1>

            <div className="flex flex-wrap items-baseline gap-2.5 mb-[25px]">
              <span className="lg:text-5xl text-4xl font-bold text-white font-heading">{product.price}</span>
              <span className="text-primary lg:text-[1.1rem] text-[0.9rem]">{product.priceUnit}</span>
            </div>

            <p className="lg:text-[1.1rem] text-[0.9rem] leading-[1.7] text-brand-muted mb-[30px]">
              {product.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[15px] mb-10">
              {product.specs.map((spec, i) => (
                <div className="bg-white/[0.03] border border-white/[0.08] p-[15px] rounded-md" key={i}>
                  <span className="block font-heading text-[0.8rem] text-brand-muted uppercase tracking-wider mb-1.25">{spec.label}</span>
                  <strong className="text-white text-[1.05rem] font-semibold">{spec.value}</strong>
                </div>
              ))}
            </div>

            <form onSubmit={handleWhatsApp} className="bg-transparent border border-primary p-5 sm:p-[30px] rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
              <h4 className="text-[1.1rem] text-primary font-heading mb-[15px] uppercase tracking-wide">Bulk Quote Request</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <input type="text" id="wa-name" placeholder="Your Name" required className="w-full p-3 bg-brand-main border border-brand-border text-white font-body outline-none focus:border-primary transition-all rounded" />
                <input type="number" id="wa-qty" placeholder="Qty (Liters)" required className="w-full p-3 bg-brand-main border border-brand-border text-white font-body outline-none focus:border-primary transition-all rounded" />
              </div>
              <input type="text" id="wa-city" placeholder="Delivery City / Area" required className="w-full p-3 bg-brand-main border border-brand-border text-white font-body outline-none focus:border-primary transition-all rounded mb-5" />
              <button type="submit" className="btn-primary w-full py-4 text-[1.1rem]">
                Get Quote &nbsp;
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block align-middle">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 xl:mt-24 pt-[20px] md:pt-[40px] lg:pt-[60px] xl:pt-[80px] border-t border-brand-border reveal">
          <span className="text-primary font-heading font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">Performance & Quality</span>
          <h2 className="xl:text-4xl lg:text-3xl md:text-3xl text-2xl sm:text-2xl mb-4 font-heading font-extrabold uppercase tracking-wide">
            Product <span className="text-primary">Features</span>
          </h2>
          <div className="w-16 h-[3px] bg-gradient-to-r from-primary to-transparent mb-6"></div>
          <p className="text-brand-muted max-w-[600px] leading-relaxed mb-12">
            Engineered specifically for maximum performance, protection, and longevity in demanding high-stress environments.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-10">
            {product.features.map((feat, i) => (
              <div className={`feature-card group/card reveal seq-${i + 1}`} key={i}>
                <div className="feature-card-glow" />
                <div className="feature-card-index">{`0${i + 1}`}</div>

                <div className="feature-icon-wrapper">
                  {renderIcon(feat.icon)}
                </div>

                <h4 className="text-[1.25rem] text-brand-text mb-3 transition-colors duration-300 group-hover/card:text-primary">
                  {feat.title}
                </h4>
                <p className="text-brand-muted text-[0.95rem] leading-relaxed group-hover/card:text-brand-text/90 transition-colors duration-300">
                  {feat.description}
                </p>

                <div className="feature-card-accent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
