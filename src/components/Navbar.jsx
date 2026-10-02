import React from 'react';

export default function Navbar({ currentView, setCurrentView, cartCount, totalItemsInCart }) {
  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F0]/90 backdrop-blur-md border-b border-[#E9E4D4]">
      <div className="bg-[#FFD1DC] text-[#7A3E4D] text-[11px] font-medium text-center py-1 tracking-wide">
        ✦ Free Cursed Express Shipping On Orders over $150 ✦
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-[#D4A373] text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
            ☯
          </div>
          <div>
            <span className="font-serif font-bold text-base tracking-tight text-[#4A3E3D] block leading-none">
              JUJUTSU <span className="font-sans text-xs text-[#8C7A6B] font-light">FIGURES</span>
            </span>
            <span className="text-[9px] tracking-widest text-[#A39284] uppercase">Cursed Collectibles</span>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('home')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              currentView === 'home' || currentView === 'detail'
                ? 'bg-[#E7C6FF] text-[#4A3E3D] shadow-sm'
                : 'text-[#705E51] hover:bg-[#E9E4D4]/50'
            }`}
          >
            Catalog
          </button>

          <button
            onClick={() => setCurrentView('cart')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              currentView === 'cart'
                ? 'bg-[#E7C6FF] text-[#4A3E3D] shadow-sm'
                : 'text-[#705E51] hover:bg-[#E9E4D4]/50'
            }`}
          >
            <span>Cart</span>
            {totalItemsInCart > 0 && (
              <span className="bg-[#D4A373] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItemsInCart}
              </span>
            )}
          </button>
        </nav>

        <button
          onClick={() => setCurrentView('cart')}
          className="relative p-2 rounded-full bg-[#F4EFEA] hover:bg-[#E0D8C3] transition-colors text-[#4A3E3D]"
          aria-label="View Cart"
        >
          🛒
          {totalItemsInCart > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#CCD5AE] text-[#2D3A1E] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              {totalItemsInCart}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}