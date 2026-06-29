import { useEffect } from 'react';
import { products as staticProducts } from '../data/products';
import ProductCard from '../components/ProductCard';

// Filter specialty products directly from static data — no API needed
const productsList = staticProducts.filter(p => p.category === 'OZONE SPECIALTY');

const SpecialtyChemicals = () => {

  // SEO - runs once
  useEffect(() => {
    document.title = 'Specialty Chemicals | Jitesh Trading Company';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Explore JITO Specialty Chemicals — premium rust preventives, anti-corrosion compounds, and specialty surface treatment products by Jitesh Trading Company.');
    }
  }, []);

  // Reveal observer
  useEffect(() => {
    const timeout = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal:not(.active)');
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.05 });
      revealElements.forEach(el => observer.observe(el));
      return () => observer.disconnect();
    }, 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="bg-brand-main">
      <section className="section-padding pt-[50px]! pb-24">
        <div className="container">

          {/* Header */}
          <div className="text-center mb-[20px] sm:mb-[40px] md:mb-[60px] reveal">
            <span className="text-primary font-heading font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">
              JITO Brand Products
            </span>
            <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] font-heading font-extrabold mb-4 uppercase tracking-wide">
              Specialty <span className="text-primary">Chemicals</span>
            </h1>
            <div className="w-16 h-[3px] bg-gradient-to-r from-primary to-transparent mx-auto mb-6"></div>
            <p className="text-brand-muted md:text-[1.1rem] text-[0.9rem] lg:max-w-[620px] md:max-w-[480px] sm:max-w-[440px] max-w-[400px] mx-auto leading-relaxed">
              Premium specialty chemical solutions engineered for industrial-grade rust prevention, anti-corrosion protection, and surface treatment under the trusted JITO brand.
            </p>
          </div>

          {/* Products Grid */}
          {productsList.length === 0 ? (
            <div className="text-center py-24 reveal">
              <div className="text-6xl mb-6">🧪</div>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">Coming Soon</h2>
              <p className="text-brand-muted">Specialty chemical products are being added. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
              {productsList.map((product, idx) => (
                <ProductCard key={product.id} product={product} idx={idx} />
              ))}
            </div>
          )}

        </div>
      </section>
    </main>
  );
};

export default SpecialtyChemicals;
