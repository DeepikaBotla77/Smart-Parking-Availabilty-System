import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'vibe-cart-items';
const PROMO_STORAGE_KEY = 'vibe-cart-promo';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Failed to load cart from localStorage', e);
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState(() => {
    try {
      const saved = localStorage.getItem(PROMO_STORAGE_KEY);
      return saved || '';
    } catch (e) {
      return '';
    }
  });

  const [discountPercent, setDiscountPercent] = useState(0);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Sync promo to localStorage & recalculate discount percent
  useEffect(() => {
    try {
      localStorage.setItem(PROMO_STORAGE_KEY, promoCode);
    } catch (e) {}

    // Simple promo codes
    if (promoCode.toUpperCase() === 'VIBE10') {
      setDiscountPercent(10);
    } else if (promoCode.toUpperCase() === 'SAVE20') {
      setDiscountPercent(20);
    } else if (promoCode.toUpperCase() === 'FREE50') {
      setDiscountPercent(50);
    } else {
      setDiscountPercent(0);
    }
  }, [promoCode]);

  const addToCart = (product, quantity = 1, color = '', size = '') => {
    setCart((prevCart) => {
      // Find index of existing item with same id, color, and size
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, quantity, selectedColor: color, selectedSize: size }];
      }
    });
  };

  const removeFromCart = (productId, color = '', size = '') => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );
  };

  const updateQuantity = (productId, color = '', size = '', newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, color, size);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId &&
        item.selectedColor === color &&
        item.selectedSize === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
  };

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (['VIBE10', 'SAVE20', 'FREE50'].includes(cleanCode)) {
      setPromoCode(cleanCode);
      return { success: true, message: `Promo code ${cleanCode} applied successfully!` };
    }
    return { success: false, message: 'Invalid promo code. Try VIBE10, SAVE20, or FREE50.' };
  };

  const removePromoCode = () => {
    setPromoCode('');
  };

  // Derive cart details
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  
  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const subtotalAfterDiscount = cartSubtotal - discountAmount;
  
  // Free shipping on orders over $150
  const shipping = cartSubtotal > 150 || cartSubtotal === 0 ? 0 : 15.00;
  
  // 8% Sales Tax
  const tax = subtotalAfterDiscount * 0.08;
  const cartTotal = subtotalAfterDiscount + shipping + tax;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        discountPercent,
        discountAmount,
        shipping,
        tax,
        cartTotal,
        promoCode,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
