import React, { useState } from 'react';

export default function Cart({ cart, onUpdateQuantity, onRemoveItem, onCompleteOrder, onContinueShopping }) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccessName, setOrderSuccessName] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'COD',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    ewalletNumber: ''
  });

  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    // Email address: Must end with @gmail.com or @yahoo.com
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/i;
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Email must be a valid @gmail.com or @yahoo.com address.';
    }

    // PH Phone Number: starts with 09 and exactly 11 digits
    const phPhoneRegex = /^09\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!phPhoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Must be a valid PH mobile number (11 digits starting with 09).';
    }

    // Delivery Address
    if (!formData.address.trim()) {
      newErrors.address = 'Delivery Address is required.';
    }

    // Payment Option specific validation
    if (formData.paymentMethod === 'CARD') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'Enter a valid 16-digit card number.';
      }
      if (!formData.cardExpiry) {
        newErrors.cardExpiry = 'Expiry required.';
      }
      if (!formData.cardCvc || formData.cardCvc.length < 3) {
        newErrors.cardCvc = 'CVC required.';
      }
    } else if (formData.paymentMethod === 'EWALLET') {
      if (!formData.ewalletNumber || !phPhoneRegex.test(formData.ewalletNumber.trim())) {
        newErrors.ewalletNumber = 'Enter a valid 11-digit account number starting with 09.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (validateForm()) {
      const name = formData.fullName || 'Sorcerer';
      setIsCheckoutOpen(false);
      setOrderSuccessName(name);
    }
  };

  const handleCloseSuccessModal = () => {
    setOrderSuccessName(null);
    onCompleteOrder();
  };

  if (cart.length === 0 && !orderSuccessName) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 bg-[#FFFDF6] border border-[#E9E4D4] rounded-3xl p-8 shadow-sm">
        <div className="text-4xl mb-3">🛒</div>
        <h2 className="text-lg font-bold text-[#4A3E3D] mb-2 font-serif">Your Sorcerer Cart is Empty</h2>
        <p className="text-xs text-[#8C7A6B] mb-6">Looks like you haven't added any cursed artifacts yet.</p>
        <button
          onClick={onContinueShopping}
          className="px-6 py-2.5 rounded-full bg-[#CCD5AE] hover:bg-[#B5C296] text-[#2D3A1E] font-bold text-xs transition-colors"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-[#FFFDF6] border border-[#E9E4D4] rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-[#4A3E3D] font-serif mb-6 border-b border-[#F0EAE1] pb-3">
          Your Cart Items ({cart.length})
        </h2>

        <div className="divide-y divide-[#F0EAE1]">
          {cart.map((item) => (
            <div key={item.id} className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-16 h-16 rounded-xl bg-[#1A1A1A] border border-[#E9E4D4] p-1 flex-shrink-0 flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#4A3E3D]">{item.name}</h3>
                  <p className="text-[11px] text-[#8C7A6B]">${item.price} each</p>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                <div className="flex items-center border border-[#E0D8C3] rounded-full bg-[#F4EFEA]">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="px-2.5 py-1 text-xs font-bold text-[#705E51] hover:text-[#4A3E3D]"
                  >
                    -
                  </button>
                  <span className="px-2 text-xs font-semibold text-[#4A3E3D]">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="px-2.5 py-1 text-xs font-bold text-[#705E51] hover:text-[#4A3E3D]"
                  >
                    +
                  </button>
                </div>

                <div className="text-sm font-bold text-[#4A3E3D] min-w-[60px] text-right">
                  ${item.price * item.quantity}
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-xs text-rose-500 hover:text-rose-700 font-medium ml-2"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-[#F0EAE1] space-y-2 text-xs">
          <div className="flex justify-between text-[#705E51]">
            <span>Subtotal:</span>
            <span className="font-semibold text-[#4A3E3D]">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[#705E51]">
            <span>Shipping:</span>
            <span>{shipping === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-[#4A3E3D] pt-2 border-t border-[#F0EAE1]">
            <span>Total Amount:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full mt-4 py-3 rounded-2xl bg-[#CCD5AE] hover:bg-[#B5C296] text-[#2D3A1E] font-bold text-xs transition-colors shadow-sm"
          >
            Proceed to Checkout (${total.toFixed(2)})
          </button>
        </div>
      </div>

      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#FFFDF6] border border-[#E9E4D4] rounded-3xl p-6 sm:p-8 shadow-2xl w-full max-w-xl relative my-8">
            <div className="flex justify-between items-center border-b border-[#F0EAE1] pb-3 mb-4">
              <h3 className="text-lg font-bold text-[#4A3E3D] font-serif">
                Checkout & Delivery Details
              </h3>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="text-[#8C7A6B] hover:text-[#4A3E3D] text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#5C4F47] mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Satoru Gojo"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 text-xs rounded-xl bg-[#F4EFEA] border text-[#4A3E3D] focus:outline-none ${
                    errors.fullName ? 'border-rose-500 bg-rose-50' : 'border-[#E0D8C3] focus:ring-2 focus:ring-[#D4A373]'
                  }`}
                />
                {errors.fullName && <p className="text-rose-500 text-[11px] mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5C4F47] mb-1">Email Address (@gmail / @yahoo) *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="gojo@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 text-xs rounded-xl bg-[#F4EFEA] border text-[#4A3E3D] focus:outline-none ${
                      errors.email ? 'border-rose-500 bg-rose-50' : 'border-[#E0D8C3] focus:ring-2 focus:ring-[#D4A373]'
                    }`}
                  />
                  {errors.email && <p className="text-rose-500 text-[11px] mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5C4F47] mb-1">Phone Number (PH) *</label>
                  <input
                    type="tel"
                    name="phone"
                    maxLength={11}
                    placeholder="09123456789"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 text-xs rounded-xl bg-[#F4EFEA] border text-[#4A3E3D] focus:outline-none ${
                      errors.phone ? 'border-rose-500 bg-rose-50' : 'border-[#E0D8C3] focus:ring-2 focus:ring-[#D4A373]'
                    }`}
                  />
                  {errors.phone && <p className="text-rose-500 text-[11px] mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C4F47] mb-1">Delivery Address *</label>
                <textarea
                  name="address"
                  rows="2"
                  placeholder="Tokyo Metropolitan Curse Technical College, Japan"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 text-xs rounded-xl bg-[#F4EFEA] border text-[#4A3E3D] focus:outline-none ${
                    errors.address ? 'border-rose-500 bg-rose-50' : 'border-[#E0D8C3] focus:ring-2 focus:ring-[#D4A373]'
                  }`}
                ></textarea>
                {errors.address && <p className="text-rose-500 text-[11px] mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C4F47] mb-2">Payment Option</label>
                <div className="space-y-2">
                  <label className="p-3 bg-[#F4EFEA] border border-[#E0D8C3] rounded-xl flex items-center gap-2 text-xs text-[#4A3E3D] cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === 'COD'}
                      onChange={handleInputChange}
                      className="accent-[#D4A373]"
                    />
                    <span>Cash on Delivery (COD)</span>
                  </label>

                  <label className="p-3 bg-[#F4EFEA] border border-[#E0D8C3] rounded-xl flex items-center gap-2 text-xs text-[#4A3E3D] cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="CARD"
                      checked={formData.paymentMethod === 'CARD'}
                      onChange={handleInputChange}
                      className="accent-[#D4A373]"
                    />
                    <span>Credit / Debit Card</span>
                  </label>

                  {formData.paymentMethod === 'CARD' && (
                    <div className="pl-6 space-y-2 border-l-2 border-[#D4A373]">
                      <input
                        type="text"
                        name="cardNumber"
                        maxLength={16}
                        placeholder="1234 5678 9101 1121"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#E0D8C3] bg-[#F4EFEA]"
                      />
                      {errors.cardNumber && <p className="text-rose-500 text-[10px]">{errors.cardNumber}</p>}
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          name="cardExpiry"
                          placeholder="MM/YY"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          className="px-3 py-1.5 text-xs rounded-lg border border-[#E0D8C3] bg-[#F4EFEA]"
                        />
                        <input
                          type="text"
                          name="cardCvc"
                          maxLength={4}
                          placeholder="CVC"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          className="px-3 py-1.5 text-xs rounded-lg border border-[#E0D8C3] bg-[#F4EFEA]"
                        />
                      </div>
                    </div>
                  )}

                  <label className="p-3 bg-[#F4EFEA] border border-[#E0D8C3] rounded-xl flex items-center gap-2 text-xs text-[#4A3E3D] cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="EWALLET"
                      checked={formData.paymentMethod === 'EWALLET'}
                      onChange={handleInputChange}
                      className="accent-[#D4A373]"
                    />
                    <span>E-Wallet (GCash / Maya)</span>
                  </label>

                  {formData.paymentMethod === 'EWALLET' && (
                    <div className="pl-6 border-l-2 border-[#D4A373]">
                      <input
                        type="tel"
                        name="ewalletNumber"
                        maxLength={11}
                        placeholder="09123456789"
                        value={formData.ewalletNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#E0D8C3] bg-[#F4EFEA]"
                      />
                      {errors.ewalletNumber && <p className="text-rose-500 text-[10px]">{errors.ewalletNumber}</p>}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-2xl bg-[#CCD5AE] hover:bg-[#B5C296] text-[#2D3A1E] font-bold text-xs transition-colors shadow-sm"
              >
                Confirm & Complete Order (${total.toFixed(2)})
              </button>
            </form>
          </div>
        </div>
      )}

      {orderSuccessName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#FFFDF6] border border-[#E9E4D4] rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center">
            <h3 className="text-sm font-semibold text-[#5C4F47] mb-6">
              Order Placed Successfully! Thank you, {orderSuccessName}!
            </h3>
            <button
              onClick={handleCloseSuccessModal}
              className="px-6 py-2 rounded-full bg-[#E9E4D4] hover:bg-[#D8D2BE] text-[#4A3E3D] font-bold text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}