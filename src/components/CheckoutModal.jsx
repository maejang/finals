import React, { useState } from 'react';

const CheckoutModal = ({ isOpen, onClose, totalAmount, onOrderSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'cod',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    ewalletNumber: ''
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    let tempErrors = {};

    // Name Validation
    if (!formData.fullName.trim()) {
      tempErrors.fullName = 'Full Name is required.';
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'Email Address is required.';
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }

    // PH Phone Number Validation: Starts with 09 and exactly 11 digits
    const phPhoneRegex = /^09\d{9}$/;
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone Number is required.';
    } else if (!phPhoneRegex.test(formData.phone)) {
      tempErrors.phone = 'Must be a valid PH number (11 digits starting with 09).';
    }

    // Address Validation
    if (!formData.address.trim()) {
      tempErrors.address = 'Delivery Address is required.';
    }

    // Payment Specific Validations
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
        tempErrors.cardNumber = 'Enter a valid 16-digit card number.';
      }
      if (!formData.cardExpiry) {
        tempErrors.cardExpiry = 'Expiry date required.';
      }
      if (!formData.cardCvc || formData.cardCvc.length < 3) {
        tempErrors.cardCvc = 'CVC required.';
      }
    } else if (formData.paymentMethod === 'ewallet') {
      if (!formData.ewalletNumber || !phPhoneRegex.test(formData.ewalletNumber)) {
        tempErrors.ewalletNumber = 'Enter a valid 11-digit e-wallet account number starting with 09.';
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onOrderSuccess(formData.fullName);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 relative border border-gray-100 my-8">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Checkout & Delivery Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-semibold leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Satoru Gojo"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition ${
                errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-stone-600'
              }`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-stone-600'
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Phone Number (PH) *
              </label>
              <input
                type="text"
                name="phone"
                maxLength={11}
                value={formData.phone}
                onChange={handleChange}
                placeholder="09123456789"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition ${
                  errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-stone-600'
                }`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Delivery Address *
            </label>
            <textarea
              name="address"
              rows="2"
              value={formData.address}
              onChange={handleChange}
              placeholder="House/Unit No., Street, Barangay, City, Province"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none transition ${
                errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-stone-600'
              }`}
            ></textarea>
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
              Payment Option *
            </label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                  className="text-stone-700 focus:ring-stone-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">Cash on Delivery (COD)</span>
              </label>

              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                  className="text-stone-700 focus:ring-stone-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">Credit / Debit Card</span>
              </label>

              {formData.paymentMethod === 'card' && (
                <div className="pl-6 pt-2 space-y-2 border-l-2 border-stone-400">
                  <input
                    type="text"
                    name="cardNumber"
                    maxLength={16}
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9101 1121"
                    className="w-full px-3 py-1.5 text-sm border rounded"
                  />
                  {errors.cardNumber && <p className="text-red-500 text-xs">{errors.cardNumber}</p>}
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      className="px-3 py-1.5 text-sm border rounded"
                    />
                    <input
                      type="text"
                      name="cardCvc"
                      maxLength={4}
                      placeholder="CVC"
                      value={formData.cardCvc}
                      onChange={handleChange}
                      className="px-3 py-1.5 text-sm border rounded"
                    />
                  </div>
                </div>
              )}

              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="ewallet"
                  checked={formData.paymentMethod === 'ewallet'}
                  onChange={handleChange}
                  className="text-stone-700 focus:ring-stone-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">E-Wallet (GCash / Maya)</span>
              </label>

              {formData.paymentMethod === 'ewallet' && (
                <div className="pl-6 pt-2 border-l-2 border-stone-400">
                  <input
                    type="text"
                    name="ewalletNumber"
                    maxLength={11}
                    value={formData.ewalletNumber}
                    onChange={handleChange}
                    placeholder="09123456789"
                    className="w-full px-3 py-1.5 text-sm border rounded"
                  />
                  {errors.ewalletNumber && <p className="text-red-500 text-xs">{errors.ewalletNumber}</p>}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-stone-700 hover:bg-stone-800 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-200"
          >
            Confirm & Complete Order (${totalAmount.toFixed(2)})
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;