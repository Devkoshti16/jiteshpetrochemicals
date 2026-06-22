import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products as staticProducts } from '../data/products';

const categories = ['All', 'OZONE AUTO', 'OZONE INDUSTRIAL', 'OZONE TEXTILE', 'OZONE METALWORK'];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryCat = searchParams.get('category');

  const [productsList, setProductsList] = useState(staticProducts);

  // Safe validation check to initialize active category state
  const getInitialCategory = () => {
    if (queryCat && categories.includes(queryCat)) {
      return queryCat;
    }
    return 'All';
  };

  const [activeCategory, setActiveCategory] = useState(getInitialCategory);

  // Sync state when URL query parameter changes (e.g., clicks from Navbar or Home)
  useEffect(() => {
    const urlCat = searchParams.get('category');
    if (urlCat && categories.includes(urlCat)) {
      setActiveCategory(urlCat);
    } else if (!urlCat) {
      setActiveCategory('All');
    }
  }, [searchParams]);

  // Fetch live products from API with static fallback
  useEffect(() => {
    fetch(`/api/products?t=${Date.now()}`)
      .then(res => {
        if (!res.ok) throw new Error('API server returned error');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProductsList(data);
        }
      })
      .catch(err => {
        console.warn('Backend API offline or database empty. Using static products fallback.', err);
      });
  }, []);

  const [vehicleFilter, setVehicleFilter] = useState('All Vehicles');
  const vehicleTypes = [
    'Two Wheeler',
    'Three Wheeler',
    'Four Wheeler'
  ];

  // Sync search params with state when category button is clicked
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);

    // reset vehicle filter
    setVehicleFilter('All Vehicles');

    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  // SEO - runs once
  useEffect(() => {
    document.title = 'Products | Jitesh Trading Company';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Browse our full range of OZONE premium industrial lubricants, automotive oils, textile oils, and metalwork fluids by Jitesh Trading Company.');
    }
  }, []);

  // Reveal observer - re-runs on every category change so new cards animate in
  useEffect(() => {
    // Small delay to let React flush the new DOM before observing
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
  }, [activeCategory, productsList]);

  let filtered = activeCategory === 'All'
    ? productsList
    : productsList.filter(p => p.category === activeCategory);

  if (
    activeCategory === 'OZONE AUTO' &&
    vehicleFilter !== 'All Vehicles'
  ) {
    filtered = filtered.filter(
      p => p.vehicleType === vehicleFilter
    );
  }
  const twoWheelers = filtered.filter(
    p => p.vehicleType === 'Two Wheeler'
  );

  const threeWheelers = filtered.filter(
    p => p.vehicleType === 'Three Wheeler'
  );

  const fourWheelers = filtered.filter(
    p => p.vehicleType === 'Four Wheeler'
  );

  const Hevay = filtered.filter(
    p => p.vehicleType === 'Hevay'
  );

  return (
    <main className="bg-brand-main">
      <section className="section-padding pt-[100px]! sm:pt-[130px]! md:pt-[120px]! pb-24">
        <div className="container">

          {/* Header */}
          <div className="text-center mb-[20px] sm:mb-[40px] md:mb-[60px] reveal">
            <span className="text-primary font-heading font-semibold text-xs tracking-[0.2em] uppercase mb-2 block">
              Flagship Lubricants
            </span>
            <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] font-heading font-extrabold mb-4 uppercase tracking-wide">
              Our <span className="text-primary">Products</span>
            </h1>
            <div className="w-16 h-[3px] bg-gradient-to-r from-primary to-transparent mx-auto mb-6"></div>
            <p className="text-brand-muted text-[1.1rem] max-w-[620px] mx-auto leading-relaxed">
              Explore our complete range of premium OZONE lubricants engineered for every industrial, textile, and automotive need.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap md:gap-3.5 gap-2 justify-center lg:mb-16 mb-10 reveal">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 md:py-2.5 py-1.5 sm:py-1.5 md:px-6 px-4 md:text-[0.85rem] text-[0.75rem] font-heading font-semibold uppercase tracking-wider border rounded-md transition-all duration-300 cursor-pointer ${activeCategory === cat
                  ? 'bg-primary border-primary text-white shadow-[0_4px_12px_rgba(255,102,0,0.35)]'
                  : 'bg-brand-panel/40 border-brand-border text-brand-muted hover:border-primary hover:text-white hover:bg-brand-panel/80'
                  }`}
              >
                {cat === 'All' ? 'All Products' : cat.replace('OZONE ', '')}
              </button>
            ))}
          </div>

          {activeCategory === 'OZONE AUTO' ? (
            <>
              <h2 className="badge mb-8 md:text-xl text-lg">
                Two Wheeler Oils
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6 mb-12">
                {twoWheelers.map((product, idx) => (
                  <Link key={product.id} to={`/product/${product.id}`} className={`bg-brand-panel/50 border border-brand-border/60 rounded-lg overflow-hidden hover:border-primary/60 transition-all duration-400 hover:shadow-[0_15px_35px_rgba(0,0,0,0.4),0_0_20px_rgba(255,102,0,0.07)] flex flex-col group/card reveal seq-${(idx % 5) + 1}`} > {/* Product Image */} <div className="flex items-center justify-center bg-black/25 aspect-square overflow-hidden relative"> <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover/card:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" /> <div className="absolute text-left top-3 left-3 bg-primary text-white text-[0.65rem] font-heading font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-[0_4px_8px_rgba(255,102,0,0.3)]"> {product.category.replace('OZONE ', '')} </div> </div> {/* Product Name */} <div className="px-4 py-4 border-t border-white/[0.04]"> <h2 className="text-[0.95rem] text-ellipsis-two-line font-heading font-bold text-brand-text group-hover/card:text-primary transition-colors duration-300 leading-snug text-center"> {product.name} </h2> </div> </Link>
                ))}
              </div>

              <h2 className="badge mb-8 md:text-xl text-lg">
                Three Wheeler Oils
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6 mb-12">
                {threeWheelers.map((product, idx) => (
                  <Link key={product.id} to={`/product/${product.id}`} className={`bg-brand-panel/50 border border-brand-border/60 rounded-lg overflow-hidden hover:border-primary/60 transition-all duration-400 hover:shadow-[0_15px_35px_rgba(0,0,0,0.4),0_0_20px_rgba(255,102,0,0.07)] flex flex-col group/card reveal seq-${(idx % 5) + 1}`} > {/* Product Image */} <div className="flex items-center justify-center bg-black/25 aspect-square overflow-hidden relative"> <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover/card:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" /> <div className="absolute text-left top-3 left-3 bg-primary text-white text-[0.65rem] font-heading font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-[0_4px_8px_rgba(255,102,0,0.3)]"> {product.category.replace('OZONE ', '')} </div> </div> {/* Product Name */} <div className="px-4 py-4 border-t border-white/[0.04]"> <h2 className="text-[0.95rem] text-ellipsis-two-line font-heading font-bold text-brand-text group-hover/card:text-primary transition-colors duration-300 leading-snug text-center"> {product.name} </h2> </div> </Link>
                ))}
              </div>

              <h2 className="badge mb-8 md:text-xl text-lg">
                Four Wheeler Oils
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6 mb-12">
                {fourWheelers.map((product, idx) => (
                  <Link key={product.id} to={`/product/${product.id}`} className={`bg-brand-panel/50 border border-brand-border/60 rounded-lg overflow-hidden hover:border-primary/60 transition-all duration-400 hover:shadow-[0_15px_35px_rgba(0,0,0,0.4),0_0_20px_rgba(255,102,0,0.07)] flex flex-col group/card reveal seq-${(idx % 5) + 1}`} > {/* Product Image */} <div className="flex items-center justify-center bg-black/25 aspect-square overflow-hidden relative"> <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover/card:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" /> <div className="absolute text-left top-3 left-3 bg-primary text-white text-[0.65rem] font-heading font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-[0_4px_8px_rgba(255,102,0,0.3)]"> {product.category.replace('OZONE ', '')} </div> </div> {/* Product Name */} <div className="px-4 py-4 border-t border-white/[0.04]"> <h2 className="text-[0.95rem] text-ellipsis-two-line font-heading font-bold text-brand-text group-hover/card:text-primary transition-colors duration-300 leading-snug text-center"> {product.name} </h2> </div> </Link>
                ))}
              </div>

              <h2 className="badge mb-8 md:text-xl text-lg">
                Heavy vehicle Oils
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
                {Hevay.map((product, idx) => (
                  <Link key={product.id} to={`/product/${product.id}`} className={`bg-brand-panel/50 border border-brand-border/60 rounded-lg overflow-hidden hover:border-primary/60 transition-all duration-400 hover:shadow-[0_15px_35px_rgba(0,0,0,0.4),0_0_20px_rgba(255,102,0,0.07)] flex flex-col group/card reveal seq-${(idx % 5) + 1}`} > {/* Product Image */} <div className="flex items-center justify-center bg-black/25 aspect-square overflow-hidden relative"> <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover/card:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" /> <div className="absolute text-left top-3 left-3 bg-primary text-white text-[0.65rem] font-heading font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-[0_4px_8px_rgba(255,102,0,0.3)]"> {product.category.replace('OZONE ', '')} </div> </div> {/* Product Name */} <div className="px-4 py-4 border-t border-white/[0.04]"> <h2 className="text-[0.95rem] text-ellipsis-two-line font-heading font-bold text-brand-text group-hover/card:text-primary transition-colors duration-300 leading-snug text-center"> {product.name} </h2> </div> </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
              {filtered.map((product, idx) => (
                <Link key={product.id} to={`/product/${product.id}`} className={`bg-brand-panel/50 border border-brand-border/60 rounded-lg overflow-hidden hover:border-primary/60 transition-all duration-400 hover:shadow-[0_15px_35px_rgba(0,0,0,0.4),0_0_20px_rgba(255,102,0,0.07)] flex flex-col group/card reveal seq-${(idx % 5) + 1}`} > {/* Product Image */} <div className="flex items-center justify-center bg-black/25 aspect-square overflow-hidden relative"> <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover/card:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" /> <div className="absolute text-left top-3 left-3 bg-primary text-white text-[0.65rem] font-heading font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-[0_4px_8px_rgba(255,102,0,0.3)]"> {product.category.replace('OZONE ', '')} </div> </div> {/* Product Name */} <div className="px-4 py-4 border-t border-white/[0.04]"> <h2 className="text-[0.95rem] text-ellipsis-two-line font-heading font-bold text-brand-text group-hover/card:text-primary transition-colors duration-300 leading-snug text-center"> {product.name} </h2> </div> </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Products;
