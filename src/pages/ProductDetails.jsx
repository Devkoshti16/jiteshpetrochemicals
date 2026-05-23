import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { products } from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

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
  }, [id, product]);

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

    const ownerNumber = "917698972036";
    const message = `*Jitesh Trading Delivery Request*\n\nHello, I would like to purchase:\n📦 *Product:* ${product.category} ${product.name}\n👤 *Name:* ${name}\n🔢 *Quantity:* ${qty}\n📍 *City:* ${city}\n\nPlease let me know the availability and payment details.`;
    window.open(`https://api.whatsapp.com/send?phone=${ownerNumber}&text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const renderIcon = (icon) => {
    if (icon === 'shield') return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2" className="mb-[15px]"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
    if (icon === 'thermometer') return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2" className="mb-[15px]"><path d="M17.5 19c2.5 0 4.5-2 4.5-4.5 0-3-4.5-8.5-4.5-8.5s-4.5 5.5-4.5 8.5c0 2.5 2 4.5 4.5 4.5z"></path><path d="M11.5 13.5c1.5 0 2.5-1 2.5-2.5 0-2-2.5-5.5-2.5-5.5s-2.5 3.5-2.5 5.5c0 1.5 1 2.5 2.5 2.5z"></path></svg>;
    return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF6600" strokeWidth="2" className="mb-[15px]"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
  };

  return (
    <section className="section-padding bg-brand-main pt-[120px] pb-24">
      <div className="container">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4 md:mb-6 font-body text-brand-muted text-[0.95rem] reveal">
          <Link to="/" className="text-brand-text hover:text-primary transition-colors">Home</Link>
          <span className="text-primary mx-1 lg:mx-2.5">/</span>
          <Link to="/#products" className="text-brand-text hover:text-primary transition-colors">Lubricants</Link>
          <span className="text-primary mx-1 lg:mx-2.5">/</span>
          <Link to={`/#ozone-${product.category.replace('OZONE ', '').toLowerCase()}`} className="text-brand-text hover:text-primary transition-colors capitalize">
            {product.category.replace('OZONE ', '').toLowerCase()}
          </Link>
          <span className="text-primary mx-1 lg:mx-2.5">/</span>
          <span className="text-primary">{product.name}</span>
        </div>

        {/* Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-[50px] items-start mb-20 reveal seq-1">
          <div className="bg-brand-panel border overflow-hidden border-brand-border rounded-lg p-0 lg:p-5 flex justify-center items-center lg:sticky lg:top-[100px]">
            <img src={product.image} alt={product.name} className="w-full max-w-[500px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]" />
          </div>

          <div className="modal-details">
            <div className="badge mb-2.5">{product.category}</div>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] mb-[15px]">
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
                order &nbsp;
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block align-middle">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 pt-[60px] border-t border-brand-border reveal">
          <h2 className="text-3xl mb-2.5">Product <span className="text-primary">Features</span></h2>
          <p className="text-brand-muted max-w-[600px]">Engineered specifically for maximum performance and longevity in high-stress environments.</p>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 lg:gap-[30px] mt-10">
            {product.features.map((feat, i) => (
              <div className={`bg-brand-panel p-[30px] border border-brand-border border-t-[3px] border-t-primary rounded-md transition-all duration-300 hover:border-primary hover:-translate-y-1.25 reveal seq-${i + 1}`} key={i}>
                {renderIcon(feat.icon)}
                <h4 className="text-[1.2rem] text-brand-text mb-[10px]">{feat.title}</h4>
                <p className="text-brand-muted text-[0.95rem]">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
