import React from 'react';
import PropTypes from 'prop-types';

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  onAddToCart,
  onPreviewImage
}) {
  return (
    <div className="group bg-[#171122] rounded-2xl p-3 border border-[#2B233C] hover:border-rose-500/50 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
      
      <div className="relative overflow-hidden rounded-xl bg-[#0E0A17] aspect-square mb-3 flex items-center justify-center p-2">
        <img
          src={product.image}
          alt={product.name}
          onClick={() => onPreviewImage(product.image, product.name)}
          className="w-full h-full object-contain cursor-zoom-in group-hover:scale-105 transition-transform duration-300"
        />
        
        <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded bg-[#DC2626] text-white shadow-md">
          {product.grade || 'SPECIAL GRADE'}
        </span>

        <button
          onClick={() => onToggleFavorite && onToggleFavorite(product.id)}
          className={`absolute top-2 right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 transition-transform active:scale-90 ${
            isFavorite ? 'text-rose-500' : 'text-zinc-400 hover:text-white'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>

        <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-[#231A34] text-rose-300 border border-purple-500/20">
          {product.character}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 
            onClick={() => onViewDetails(product)}
            className="text-xs font-bold text-white line-clamp-2 hover:text-rose-400 cursor-pointer mb-1 leading-snug transition-colors"
          >
            {product.name}
          </h3>
          <p className="text-[11px] text-zinc-400 line-clamp-2 mb-2 font-normal leading-relaxed">
            {product.shortDescription || product.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#231A34] mt-auto">
          <div className="text-sm font-black text-rose-400">
            ${product.price}
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={() => onViewDetails(product)}
              className="text-xs px-2.5 py-1 rounded-md bg-[#231A34] hover:bg-[#322649] text-zinc-300 font-bold transition-colors"
            >
              Info
            </button>
            <button
              onClick={() => onAddToCart(product)}
              disabled={product.stock <= 0}
              className={`text-xs px-3 py-1 rounded-md font-bold transition-all shadow-md ${
                product.stock > 0
                  ? 'bg-[#DC2626] hover:bg-[#B91C1C] text-white active:scale-95'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
              }`}
            >
              {product.stock > 0 ? '+ Add' : 'Out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
  onViewDetails: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onPreviewImage: PropTypes.func.isRequired,
};