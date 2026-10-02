import React from 'react';
import PropTypes from 'prop-types';

export default function Navbar({ 
  currentView, 
  setCurrentView, 
  totalItemsInCart = 0, 
  favoritesCount = 0,
  searchQuery, 
  setSearchQuery 
}) {
  return (
    <header className="sticky top-0 z-50 bg-[#0c0914] border-b border-[#231b36] text-white">
      <div className="bg-gradient-to-r from-purple-900 via-fuchsia-800 to-pink-700 py-1.5 text-center text-[11px] font-bold tracking-wide text-pink-100 flex items-center justify-center gap-1.5 shadow-inner">
        <svg className="w-3.5 h-3.5 fill-current text-pink-300" viewBox="0 0 24 24">
          <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.2-6.3-4.6-6.3 4.6 2.3-7.2-6-4.6h7.6z" />
        </svg>
        <span>Free Shipping On Jujutsu Orders over $50.00 • Worldwide Cursed Express Delivery</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div 
          onClick={() => setCurrentView('home')} 
          className="flex items-center gap-2.5 cursor-pointer select-none"
        >
          <div className="bg-[#881337] border border-rose-500/30 text-white font-extrabold text-sm px-2.5 py-1 rounded-md shadow-md">
            呪
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wider leading-none text-white">
              JJK STORE
            </h1>
            <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold mt-0.5">
              Grade 1 Collectibles & Figures
            </p>
          </div>
        </div>

        <div className="relative flex-1 max-w-md hidden md:block">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
            <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search Gojo, Sukuna, Nendoroid..."
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-[#150f24] border border-[#2b2042] text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-pink-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('home')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
              currentView === 'home' || currentView === 'detail'
                ? 'bg-[#221838] text-pink-400'
                : 'text-zinc-300 hover:text-white hover:bg-[#150f24]'
            }`}
          >
            Catalog
          </button>

          <button
            onClick={() => setCurrentView('favorites')}
            className={`relative p-2 transition-colors ${
              currentView === 'favorites' ? 'text-pink-500' : 'text-zinc-300 hover:text-pink-400'
            }`}
            title="Favorites"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#e11d48] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* <button
            onClick={() => setCurrentView('cart')}
            className={`relative p-2 transition-colors ${
              currentView === 'cart' ? 'text-pink-500' : 'text-zinc-300 hover:text-pink-400'
            }`}
            title="Cart"
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItemsInCart > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#e11d48] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                {totalItemsInCart}
              </span>
            )}
          </button> */}

          <button
            onClick={() => setCurrentView('cart')}
            className="bg-[#e11d48] hover:bg-[#be123c] text-white text-xs font-black uppercase tracking-wider px-4 py-2 rounded-lg shadow-lg shadow-rose-950/50 transition-all active:scale-95 flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
            </svg>
            <span>VIEW CART</span>
          </button>
        </div>
      </div>
    </header>
  );
}

Navbar.propTypes = {
  currentView: PropTypes.string.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  totalItemsInCart: PropTypes.number,
  favoritesCount: PropTypes.number,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
};