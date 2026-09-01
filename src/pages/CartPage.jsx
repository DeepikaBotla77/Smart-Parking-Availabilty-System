import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cart,
    cartCount,
    cartSubtotal,
    discountAmount,
    discountPercent,
    shipping,
    tax,
    cartTotal,
    promoCode,
    updateQuantity,
    removeFromCart,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState({ text: '', success: false });

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      const result = applyPromoCode(promoInput);
      setPromoMessage({ text: result.message, success: result.success });
      if (result.success) {
        setPromoInput('');
      }
    }
  };

  const handleRemovePromo = () => {
    removePromoCode();
    setPromoMessage({ text: 'Promo code removed.', success: false });
  };

  if (cart.length === 0) {
    return (
      <div className="page-transition max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-secondary border border-border-color flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
        <p className="text-sm text-text-secondary mt-2 mb-8 max-w-sm mx-auto leading-relaxed">
          Looks like you haven't added anything to your cart yet. Head over to the shop to find something beautiful.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-brand hover:bg-brand-dark text-xs font-semibold text-white rounded-xl transition-all shadow-md cursor-pointer"
        >
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="page-transition max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item, idx) => (
            <div
              key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
              className="glass-card p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative"
            >
              {/* Product Info Group */}
              <div className="flex gap-4 items-center">
                {/* Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary border border-border-color flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {/* Text Details */}
                <div>
                  <Link
                    to={`/product/${item.product.id}`}
                    className="text-sm font-bold text-text-primary hover:text-brand transition-colors line-clamp-1"
                  >
                    {item.product.name}
                  </Link>
                  <span className="text-[10px] text-text-secondary uppercase font-semibold tracking-wider block mt-0.5">
                    {item.product.category}
                  </span>
                  
                  {/* Variations */}
                  <div className="flex gap-3 text-xs text-text-secondary mt-1">
                    {item.selectedColor && (
                      <span>
                        Color: <span className="font-semibold text-text-primary">{item.selectedColor}</span>
                      </span>
                    )}
                    {item.selectedSize && (
                      <span>
                        Size: <span className="font-semibold text-text-primary">{item.selectedSize}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Price Group */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-border-color">
                {/* Quantity Controls */}
                <div className="flex items-center border border-border-color rounded-xl overflow-hidden bg-secondary">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                    className="px-2.5 py-1.5 text-xs font-bold text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                  >
                    &minus;
                  </button>
                  <span className="px-3 text-xs font-bold min-w-[24px] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                    className="px-2.5 py-1.5 text-xs font-bold text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal of item */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-extrabold text-text-primary">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                    className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Promocodes */}
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-base font-extrabold mb-5 border-b border-border-color pb-3">Order Summary</h3>
            
            <div className="space-y-3.5 text-xs text-text-secondary">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} items)</span>
                <span className="font-bold text-text-primary">${cartSubtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-brand dark:text-brand-light font-medium">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                {shipping === 0 ? (
                  <span className="text-green-500 font-semibold uppercase">Free</span>
                ) : (
                  <span className="font-bold text-text-primary">${shipping.toFixed(2)}</span>
                )}
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-bold text-text-primary">${tax.toFixed(2)}</span>
              </div>

              <div className="border-t border-border-color pt-4 mt-4 flex justify-between text-sm font-extrabold text-text-primary">
                <span>Estimated Total</span>
                <span className="text-base">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full mt-6 py-3 bg-brand hover:bg-brand-dark text-xs font-semibold text-white rounded-xl transition-all shadow-md shadow-brand/25 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Secure Checkout
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Promo Code Card */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3.5 text-text-secondary">Promo Code</h3>
            {promoCode ? (
              <div className="flex items-center justify-between bg-brand/10 border border-brand/20 p-3 rounded-xl">
                <div>
                  <span className="text-xs font-bold text-brand uppercase">{promoCode}</span>
                  <span className="text-[10px] text-text-secondary block mt-0.5">Applied successfully!</span>
                </div>
                <button
                  onClick={handleRemovePromo}
                  className="text-xs text-red-500 font-bold hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. VIBE10, SAVE20"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl custom-input uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-secondary hover:bg-black/5 dark:hover:bg-white/5 border border-border-color text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
            )}
            
            {promoMessage.text && (
              <p className={`text-[10px] font-medium mt-2 animate-fade-in ${
                promoMessage.success ? 'text-brand dark:text-brand-light' : 'text-red-500'
              }`}>
                {promoMessage.text}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
