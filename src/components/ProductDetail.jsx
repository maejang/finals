import React from 'react';
import PropTypes from 'prop-types';

export default function ProductDetail({ product, onBack, onAddToCart, onPreviewImage }) {
  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto bg-[#181424] border border-[#2D2542] rounded-3xl p-6 sm:p-8 shadow-2xl">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white bg-[#26203B] hover:bg-[#332B4A] px-4 py-2 rounded-xl transition-colors border border-purple-500/20"
      >
        ← Back to Catalog
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="rounded-2xl overflow-hidden bg-[#0F0C18] border border-[#2D2542] aspect-square flex items-center justify-center p-4 relative group">
          <img
            src={product.image}
            alt={product.name}
            onClick={() => onPreviewImage(product.image, product.name)}
            className="w-full h-full object-contain cursor-zoom-in group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute bottom-3 right-3 text-[10px] bg-[#181424]/80 text-zinc-300 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10 font-bold">
            🔍 Click to enlarge
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-purple-900/60 text-purple-300 font-bold border border-purple-500/30">
                {product.category || 'Collectible'}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-rose-600/90 text-white font-black uppercase">
                {product.grade || 'SPECIAL GRADE'}
              </span>
            </div>
            <h2 className="text-2xl font-black text-white leading-snug tracking-wide">
              {product.name}
            </h2>
            <p className="text-xs text-rose-400 mt-1 font-bold">Character: {product.character}</p>
          </div>

          <div className="text-3xl font-black text-rose-400">
            ${product.price} <span className="text-xs font-semibold text-zinc-500">USD</span>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed border-t border-b border-[#26203B] py-3">
            {product.fullDescription || product.description}
          </p>

          <div className="space-y-2 text-xs text-zinc-400">
            <div className="flex justify-between">
              <span>Stock Status:</span>
              <span className={product.stock > 0 ? "text-emerald-400 font-extrabold" : "text-rose-500 font-extrabold"}>
                {product.stock > 0 ? `${product.stock} units left in Shibuya vault` : 'Sold Out'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Authenticity:</span>
              <span className="font-bold text-amber-400">100% Official Licensed JJK Item</span>
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock <= 0}
            className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg ${
              product.stock > 0
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-rose-600/30 active:scale-95'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
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