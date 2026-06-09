import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    document.title = 'Products | Jitesh Trading Company';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Browse our full range of OZONE premium industrial lubricants, automotive oils, textile oils, and metalwork fluids by Jitesh Trading Company.');
    }

    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <main>
      <section className="section-padding bg-brand-main pt-[120px]">
        <div className="container">

          {/* Header */}
          <div className="text-center mb-[60px] reveal">
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] mb-4">
              Our <span className="text-primary">Products</span>
            </h1>
            <div className="w-[60px] h-1 bg-primary mx-auto my-5"></div>
            <p className="text-brand-muted text-[1.1rem] max-w-[600px] mx-auto">
              Explore our complete range of premium OZONE lubricants engineered for every industry.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-12 reveal">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-[0.85rem] font-heading uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-primary border-primary text-white'
                    : 'bg-transparent border-brand-border text-brand-muted hover:border-primary hover:text-white'
                }`}
              >
                {cat === 'All' ? 'All Products' : cat.replace('OZONE ', '')}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 md:gap-[30px]">
            {filtered.map((product, idx) => (
              <div
                key={product.id}
                className={`bg-brand-panel border border-brand-border group hover:border-primary hover:shadow-[0_15px_30px_rgba(255,102,0,0.1)] transition-all duration-300 flex flex-col reveal seq-${(idx % 3) + 1}`}
              >
                {/* Product Image */}
                <div className="h-[210px] overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:border-b-[3px] after:border-primary">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-primary/90 text-white text-[0.72rem] font-heading uppercase tracking-wider px-2.5 py-1">
                    {product.category}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-[25px] flex flex-col flex-1">
                  <h2 className="text-[1.25rem] mb-2 font-bold text-brand-text">{product.name}</h2>
                  <p className="text-brand-muted text-[0.9rem] mb-4 leading-relaxed line-clamp-3">{product.description}</p>

                  {/* Key Specs */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {product.specs.slice(0, 2).map((spec, i) => (
                      <div key={i} className="bg-white/[0.03] border border-white/[0.06] p-2.5 rounded">
                        <span className="block text-[0.72rem] text-brand-muted uppercase tracking-wider mb-0.5">{spec.label}</span>
                        <strong className="text-white text-[0.88rem] leading-tight block">{spec.value}</strong>
                      </div>
                    ))}
                  </div>

                  {/* Features Preview */}
                  <div className="mb-5 flex flex-col gap-2">
                    {product.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5 shrink-0">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        <span className="text-brand-muted text-[0.85rem]">{feat.title}</span>
                      </div>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <div className="mt-auto">
                    <Link
                      to={`/product/${product.id}`}
                      className="btn-primary w-full text-center block text-sm"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
};

export default Products;
