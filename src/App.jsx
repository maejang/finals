import React, { useState } from 'react';
import { initialProducts } from './data/products';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import ImageModal from './components/ImageModal';

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

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
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#4A3E3D] font-sans antialiased pb-12 relative">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 bg-[#CCD5AE] text-[#2D3A1E] text-xs font-bold px-5 py-3 rounded-2xl shadow-xl border border-[#B5C296] transition-all duration-300 animate-bounce">
          <span className="text-sm">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={cart.length}
        totalItemsInCart={totalItemsInCart}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentView === 'home' && (
          <ProductList
            products={products}
            onViewDetails={(product) => {
              setSelectedProduct(product);
              setCurrentView('detail');
            }}
            onAddToCart={handleAddToCart}
            onPreviewImage={(img, alt) => setModalImage({ src: img, alt })}
          />
        )}

        {currentView === 'detail' && (
          <ProductDetail
            product={selectedProduct}
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