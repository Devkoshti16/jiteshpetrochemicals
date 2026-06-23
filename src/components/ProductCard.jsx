import { Link } from 'react-router-dom';

const ProductCard = ({ product, idx = 0 }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className={`bg-brand-panel/50 border border-brand-border/60 rounded-lg overflow-hidden hover:border-primary/60 transition-all duration-400 hover:shadow-[0_15px_35px_rgba(0,0,0,0.4),0_0_20px_rgba(255,102,0,0.07)] flex flex-col group/card reveal seq-${(idx % 5) + 1}`}
    >
      {/* Product Image */}
      <div className="flex items-center justify-center bg-black/25 aspect-square overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover/card:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
        />

        <div className="absolute text-left top-3 left-3 bg-primary text-white text-[0.65rem] font-heading font-bold uppercase tracking-widest px-2.5 py-1 rounded-md shadow-[0_4px_8px_rgba(255,102,0,0.3)]">
          {product.category.replace('OZONE ', '')}
        </div>
      </div>

      {/* Product Name */}
      <div className="px-2 sm:px-4 py-2 border-t border-white/[0.04]">
        <h2 className="md:text-[0.95rem] text-[0.85rem] text-ellipsis-two-line font-heading font-bold text-brand-text group-hover/card:text-primary transition-colors duration-300 leading-snug text-center">
          {product.name}
        </h2>
      </div>
    </Link>
  );
};

export default ProductCard;