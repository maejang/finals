import React from 'react';
import PropTypes from 'prop-types';

export default function ProductDetail({ product, onBack, onAddToCart, onPreviewImage }) {
  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto bg-[#FFFDF6] border border-[#E6D5B8] rounded-3xl p-6 sm:p-8 shadow-sm">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-[#705E51] hover:text-[#4A3E3D] bg-[#F4EFEA] px-3.5 py-1.5 rounded-full transition-colors"
      >
        ← Back to Catalog
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="rounded-2xl overflow-hidden bg-[#1A1A1A] border border-[#E9E4D4] aspect-square flex items-center justify-center p-3 relative group">
          <img
            src={product.image}
            alt={product.name}
            onClick={() => onPreviewImage(product.image, product.name)}
            className="w-full h-full object-contain cursor-zoom-in group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute bottom-3 right-3 text-[10px] bg-black/60 text-white px-2 py-1 rounded-md backdrop-blur-sm">
            🔍 Click to enlarge
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#E7C6FF] text-[#4A3E3D] font-medium">
                {product.category}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FAEDCD] text-[#705E51] font-medium">
                {product.grade}
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#4A3E3D] font-serif leading-snug">
              {product.name}
            </h2>
            <p className="text-xs text-[#8C7A6B] mt-1">Character: {product.character}</p>
          </div>

          <div className="text-2xl font-extrabold text-[#2C2421]">
            ${product.price} <span className="text-xs font-normal text-gray-500">USD</span>
          </div>

          <p className="text-xs text-[#5C4F47] leading-relaxed border-t border-b border-[#F0EAE1] py-3">
            {product.fullDescription}
          </p>

          <div className="space-y-2 text-xs text-[#705E51]">
            <div className="flex justify-between">
              <span>Stock Status:</span>
              <span className={product.stock > 0 ? "text-emerald-700 font-bold" : "text-rose-600 font-bold"}>
                {product.stock > 0 ? `${product.stock} units left in Shibuya vault` : 'Sold Out'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Authenticity:</span>
              <span className="font-semibold text-amber-900">100% Official Licensed JJK Item</span>
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock <= 0}
            className={`w-full py-3 rounded-2xl font-bold text-sm transition-all shadow-sm ${
              product.stock > 0
                ? 'bg-[#CCD5AE] hover:bg-[#B5C296] text-[#2D3A1E]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {product.stock > 0 ? 'Add to Sorcerer Cart' : 'Currently Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
}

ProductDetail.propTypes = {
  product: PropTypes.object,
  onBack: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onPreviewImage: PropTypes.func.isRequired,
};