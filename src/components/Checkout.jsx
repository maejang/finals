import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Checkout({ cart, onCompleteOrder, onBackToCart }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'Cash on Delivery',
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phone)) {
      errs.phone = 'Enter a valid phone number (digits only)';
    }

    if (!formData.address.trim()) errs.address = 'Delivery address is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto bg-[#FFFDF6] border border-[#E6D5B8] rounded-3xl p-8 text-center shadow-sm">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-[#4A3E3D] font-serif mb-2">Pact Sealed!</h2>
        <p className="text-xs text-[#705E51] mb-6">
          Your order has been placed successfully. Payment will be collected via Cash on Delivery upon arrival.
        </p>
        <div className="bg-[#F4EFEA] p-4 rounded-2xl text-left text-xs space-y-2 mb-6">
          <div><strong className="text-[#4A3E3D]">Name:</strong> {formData.fullName}</div>
          <div><strong className="text-[#4A3E3D]">Delivery To:</strong> {formData.address}</div>
          <div><strong className="text-[#4A3E3D]">Payment Method:</strong> {formData.paymentMethod}</div>
          <div><strong className="text-[#4A3E3D]">Total Amount:</strong> ${subtotal.toFixed(2)} USD</div>
        </div>
        <button
          onClick={() => {
            onCompleteOrder();
          }}
          className="px-8 py-3 bg-[#D4A373] text-white rounded-full text-xs font-bold hover:bg-[#C29263] transition-colors"
        >
          Return to Sorcerer Store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-[#FFFDF6] border border-[#E6D5B8] rounded-3xl p-6 sm:p-8 shadow-sm">
      <button
        onClick={onBackToCart}
        className="mb-6 inline-flex items-center text-xs font-medium text-[#705E51] hover:text-[#4A3E3D] bg-[#F4EFEA] px-3.5 py-1.5 rounded-full"
      >
        ← Back to Cart
      </button>

      <h2 className="text-xl font-bold text-[#4A3E3D] font-serif mb-6">Checkout & Delivery Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">Full Name *</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className={`w-full px-4 py-2.5 text-xs rounded-xl border bg-white focus:outline-none ${
              errors.fullName ? 'border-rose-500' : 'border-[#E0D8C3]'
            }`}
            placeholder="Satoru Gojo"
          />
          {errors.fullName && <p className="text-[10px] text-rose-500 mt-1">{errors.fullName}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">Email Address *</label>
            <input
              type="text"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-2.5 text-xs rounded-xl border bg-white focus:outline-none ${
                errors.email ? 'border-rose-500' : 'border-[#E0D8C3]'
              }`}
              placeholder="gojo@jujutsuhigh.edu"
            />
            {errors.email && <p className="text-[10px] text-rose-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">Phone Number *</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-4 py-2.5 text-xs rounded-xl border bg-white focus:outline-none ${
                errors.phone ? 'border-rose-500' : 'border-[#E0D8C3]'
              }`}
              placeholder="+1 555-0192"
            />
            {errors.phone && <p className="text-[10px] text-rose-500 mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">Delivery Address *</label>
          <textarea
            rows="3"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className={`w-full px-4 py-2.5 text-xs rounded-xl border bg-white focus:outline-none ${
              errors.address ? 'border-rose-500' : 'border-[#E0D8C3]'
            }`}
            placeholder="Tokyo Metropolitan Curse Technical College, Japan"
          />
          {errors.address && <p className="text-[10px] text-rose-500 mt-1">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#4A3E3D] mb-1">Payment Option</label>
          <div className="p-3 border border-[#E0D8C3] rounded-xl bg-[#F4EFEA] flex items-center gap-3">
            <input
              type="radio"
              checked
              readOnly
              className="accent-[#D4A373]"
            />
            <span className="text-xs font-medium text-[#4A3E3D]">Cash on Delivery (COD)</span>
          </div>
        </div>

        <div className="pt-4 border-t border-[#F0EAE1]">
          <button
            type="submit"
            className="w-full py-3.5 bg-[#CCD5AE] hover:bg-[#B5C296] text-[#2D3A1E] font-bold text-xs rounded-2xl transition-colors shadow-sm"
          >
            Confirm & Complete Order (${subtotal.toFixed(2)})
          </button>
        </div>
      </form>
    </div>
  );
}

Checkout.propTypes = {
  cart: PropTypes.array.isRequired,
  onCompleteOrder: PropTypes.func.isRequired,
  onBackToCart: PropTypes.func.isRequired,
};