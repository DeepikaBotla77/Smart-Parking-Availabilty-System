import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartCount, shipping, tax, cartTotal, clearCart } = useCart();

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  // Validation Errors
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if cart is empty
  if (cart.length === 0 && !isProcessing) {
    return (
      <div className="page-transition max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold">Your cart is empty</h2>
        <p className="text-xs text-text-secondary mt-1 mb-6">You need items in your cart to checkout.</p>
        <Link to="/shop" className="px-6 py-2.5 bg-brand hover:bg-brand-dark text-xs font-semibold text-white rounded-xl transition-all cursor-pointer">
          Go to Shop
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP/Postal code is required';
    
    // Simple Card Validation
    const cardDigits = formData.cardNumber.replace(/\s?/g, '');
    if (!cardDigits) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardDigits.length < 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!formData.cardExpiry.trim()) {
      newErrors.cardExpiry = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = 'Use MM/YY format';
    }

    if (!formData.cardCvv.trim()) {
      newErrors.cardCvv = 'CVV is required';
    } else if (formData.cardCvv.length < 3) {
      newErrors.cardCvv = 'Must be 3-4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate Payment Gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      const mockOrderNumber = 'VB-' + Math.floor(100000 + Math.random() * 900000);
      const orderSummary = {
        orderNumber: mockOrderNumber,
        itemsCount: cartCount,
        total: cartTotal,
        customerName: formData.fullName,
        deliveryAddress: `${formData.address}, ${formData.city}, ${formData.zipCode}, ${formData.country}`,
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toDateString()
      };

      // Clear the cart
      clearCart();

      // Redirect to success route passing orderDetails in state
      navigate('/success', { state: { orderSummary } });
    }, 1800);
  };

  return (
    <div className="page-transition max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Secure Checkout</h1>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Details Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Shipping Address */}
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-extrabold pb-3 border-b border-border-color flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand/10 text-brand flex items-center justify-center text-[10px] font-bold">1</span>
              Shipping Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-text-secondary mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-xs rounded-xl custom-input"
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="text-[10px] text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-text-secondary mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-xs rounded-xl custom-input"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-text-secondary mb-1">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-xs rounded-xl custom-input"
                  placeholder="123 Luxury Ave, Ste 4"
                />
                {errors.address && <p className="text-[10px] text-red-500 mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-text-secondary mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-xs rounded-xl custom-input"
                  placeholder="New York"
                />
                {errors.city && <p className="text-[10px] text-red-500 mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-text-secondary mb-1">ZIP / Postal Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-xs rounded-xl custom-input"
                  placeholder="10001"
                />
                {errors.zipCode && <p className="text-[10px] text-red-500 mt-1">{errors.zipCode}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-text-secondary mb-1">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-border-color bg-primary text-text-primary custom-input"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-extrabold pb-3 border-b border-border-color flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand/10 text-brand flex items-center justify-center text-[10px] font-bold">2</span>
              Payment Details
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <label className="block text-xs font-bold uppercase text-text-secondary mb-1">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => {
                    // Auto-format card number chunks
                    const val = e.target.value.replace(/\D/g, '').substring(0, 16);
                    const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
                    setFormData(prev => ({ ...prev, cardNumber: formatted }));
                    if (errors.cardNumber) setErrors(prev => ({ ...prev, cardNumber: '' }));
                  }}
                  className="w-full px-4 py-2 text-xs rounded-xl custom-input"
                  placeholder="4111 2222 3333 4444"
                />
                {errors.cardNumber && <p className="text-[10px] text-red-500 mt-1">{errors.cardNumber}</p>}
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-bold uppercase text-text-secondary mb-1">Expiration Date</label>
                <input
                  type="text"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-xs rounded-xl custom-input"
                  placeholder="MM/YY"
                  maxLength="5"
                />
                {errors.cardExpiry && <p className="text-[10px] text-red-500 mt-1">{errors.cardExpiry}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-text-secondary mb-1">CVV / CVC</label>
                <input
                  type="password"
                  name="cardCvv"
                  value={formData.cardCvv}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').substring(0, 4);
                    setFormData(prev => ({ ...prev, cardCvv: val }));
                    if (errors.cardCvv) setErrors(prev => ({ ...prev, cardCvv: '' }));
                  }}
                  className="w-full px-4 py-2 text-xs rounded-xl custom-input"
                  placeholder="123"
                />
                {errors.cardCvv && <p className="text-[10px] text-red-500 mt-1">{errors.cardCvv}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Order Items Review & Submission */}
        <div>
          <div className="glass-card p-6 rounded-2xl space-y-5 sticky top-24">
            <h3 className="text-base font-extrabold pb-3 border-b border-border-color">Review Order</h3>
            
            {/* Minimal Items List */}
            <div className="max-h-56 overflow-y-auto divide-y divide-border-color pr-1">
              {cart.map((item, index) => (
                <div key={index} className="py-3 flex justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <h4 className="font-bold text-text-primary truncate">{item.product.name}</h4>
                    <p className="text-[10px] text-text-secondary mt-0.5">
                      Qty: {item.quantity} {item.selectedColor && `| Color: ${item.selectedColor}`}
                    </p>
                  </div>
                  <span className="font-bold text-text-primary flex-shrink-0">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="border-t border-border-color pt-4 space-y-2 text-xs text-text-secondary">
              <div className="flex justify-between">
                <span>Shipping cost</span>
                {shipping === 0 ? <span className="text-green-500 font-semibold uppercase">Free</span> : <span>${shipping.toFixed(2)}</span>}
              </div>
              <div className="flex justify-between">
                <span>Sales Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-border-color pt-3 mt-3 flex justify-between text-sm font-extrabold text-text-primary">
                <span>Grand Total</span>
                <span className="text-base">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-3 text-xs font-semibold text-white rounded-xl transition-all shadow-md shadow-brand/20 flex items-center justify-center gap-2 cursor-pointer ${
                isProcessing ? 'bg-brand/70 cursor-not-allowed' : 'bg-brand hover:bg-brand-dark'
              }`}
            >
              {isProcessing ? (
                <>
                  {/* Loading Spinner */}
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing Payment...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Place Order &amp; Pay
                </>
              )}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
