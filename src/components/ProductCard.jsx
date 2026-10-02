import React from 'react';
import PropTypes from 'prop-types';

export default function ProductCard({ product, onViewDetails, onAddToCart, onPreviewImage }) {
  return (
    <div className="group bg-[#FFFDF6] rounded-2xl p-3 border border-[#E9E4D4] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      
      <div className="relative overflow-hidden rounded-xl bg-[#1A1A1A] aspect-square mb-3 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          onClick={() => onPreviewImage(product.image, product.name)}
          className="w-full h-full object-contain p-2 cursor-zoom-in group-hover:scale-105 transition-transform duration-300"
        />
        
        <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-sm border border-white/20">
          {product.grade}
        </span>

        <span className="absolute bottom-2 left-2 text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-[#D4A373] text-white shadow-sm">
          {product.character}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 
            onClick={() => onViewDetails(product)}
            className="text-xs font-semibold text-[#4A3E3D] line-clamp-2 hover:text-amber-800 cursor-pointer mb-1 leading-snug"
          >
            {product.name}
          </h3>
          <p className="text-[11px] text-[#8C7A6B] line-clamp-2 mb-2 font-light">
            {product.shortDescription}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#F0EAE1] mt-auto">
          <div className="text-sm font-bold text-[#4A3E3D]">
            ${product.price}
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={() => onViewDetails(product)}
              className="text-xs px-2.5 py-1 rounded-full bg-[#E9E4D4] hover:bg-[#D8D2BE] text-[#4A3E3D] transition-colors"
            >
              Info
            </button>
            <button
              onClick={() => onAddToCart(product)}
              disabled={product.stock <= 0}
              className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                product.stock > 0
                  ? 'bg-[#CCD5AE] hover:bg-[#B5C296] text-[#2D3A1E]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
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
  onViewDetails: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onPreviewImage: PropTypes.func.isRequired,
};