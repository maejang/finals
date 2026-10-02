import React, { useState, useMemo } from 'react';
import { initialProducts } from './data/products';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import ImageModal from './components/ImageModal';

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'detail' | 'cart' | 'favorites'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Toggle Favorites
  const handleToggleFavorite = (productId) => {
    setFavorites((prev) => {
      const isFav = prev.includes(productId);
      const product = products.find((p) => p.id === productId);
      
      if (isFav) {
        triggerToast(`Removed "${product?.name || 'item'}" from favorites`);
        return prev.filter((id) => id !== productId);
      } else {
        triggerToast(`Added "${product?.name || 'item'}" to favorites`);
        return [...prev, productId];
      }
    });
  };

  // Filter Products by global Search Header
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        (p.character && p.character.toLowerCase().includes(query)) ||
        (p.grade && p.grade.toLowerCase().includes(query))
    );
  }, [products, searchQuery]);

  // Favorite Items List
  const favoriteProducts = useMemo(() => {
    return products.filter((p) => favorites.includes(p.id));
  }, [products, favorites]);

  const handleAddToCart = (product) => {
    if (product.stock <= 0) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p
      )
    );

    triggerToast(`Added "${product.name}" to cart!`);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    const currentCartItem = cart.find((item) => item.id === productId);
    const diff = newQuantity - currentCartItem.quantity;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, stock: p.stock - diff } : p
      )
    );
  };

  const handleRemoveItem = (productId) => {
    const itemToRemove = cart.find((item) => item.id === productId);
    if (!itemToRemove) return;

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, stock: p.stock + itemToRemove.quantity } : p
      )
    );

    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleCompleteOrder = () => {
    setCart([]);
    triggerToast('Order placed successfully!');
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-[#0D0B14] text-zinc-100 font-sans antialiased pb-12 relative selection:bg-rose-500 selection:text-white">
      {/* Toast Notification with SVG */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2.5 bg-[#DC2626] text-white text-xs font-bold px-5 py-3 rounded-xl shadow-2xl border border-rose-500/40 transition-all duration-300">
          <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={cart.length}
        totalItemsInCart={totalItemsInCart}
        favoritesCount={favorites.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentView === 'home' && (
          <ProductList
            products={filteredProducts}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onViewDetails={(product) => {
              setSelectedProduct(product);
              setCurrentView('detail');
            }}
            onAddToCart={handleAddToCart}
            onPreviewImage={(img, alt) => setModalImage({ src: img, alt })}
          />
        )}

        {currentView === 'favorites' && (
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2B233C]">
              <h2 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-2">
                <svg className="w-5 h-5 fill-current text-rose-500" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                Favorite Sorcerer Figures ({favorites.length})
              </h2>
              <button
                onClick={() => setCurrentView('home')}
                className="text-xs text-rose-400 font-bold hover:underline"
              >
                ← Back to Catalog
              </button>
            </div>

            {favoriteProducts.length > 0 ? (
              <ProductList
                products={favoriteProducts}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onViewDetails={(product) => {
                  setSelectedProduct(product);
                  setCurrentView('detail');
                }}
                onAddToCart={handleAddToCart}
                onPreviewImage={(img, alt) => setModalImage({ src: img, alt })}
              />
            ) : (
              <div className="text-center py-20 bg-[#171122] rounded-2xl border border-dashed border-[#2B233C]">
                <p className="text-sm font-medium text-zinc-400 mb-4">You have no saved favorite items.</p>
                <button
                  onClick={() => setCurrentView('home')}
                  className="bg-[#DC2626] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#B91C1C] transition-colors"
                >
                  Browse Catalog
                </button>
              </div>
            )}
          </div>
        )}

        {currentView === 'detail' && (
          <ProductDetail
            product={selectedProduct}
            isFavorite={favorites.includes(selectedProduct?.id)}
            onToggleFavorite={handleToggleFavorite}
            onBack={() => setCurrentView('home')}
            onAddToCart={handleAddToCart}
            onPreviewImage={(img, alt) => setModalImage({ src: img, alt })}
          />
        )}

        {currentView === 'cart' && (
          <Cart
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCompleteOrder={handleCompleteOrder}
            onContinueShopping={() => setCurrentView('home')}
          />
        )}
      </main>

      <ImageModal
        image={modalImage?.src}
        alt={modalImage?.alt}
        onClose={() => setModalImage(null)}
      />
    </div>
  );
}