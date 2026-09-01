import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Find the product
  const product = products.find((p) => p.id === id);

  // Fallback if product doesn't exist
  if (!product) {
    return (
      <div className="page-transition max-w-7xl mx-auto px-4 py-20 text-center">
        <svg className="w-16 h-16 text-text-secondary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <p className="text-sm text-text-secondary mt-2 mb-8 max-w-sm mx-auto leading-relaxed">
          The product you are trying to view does not exist or has been removed from our catalog.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-brand hover:bg-brand-dark text-xs font-semibold text-white rounded-xl transition-all shadow-md cursor-pointer"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  // Active States
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Reset active states when product ID changes
  useEffect(() => {
    setActiveImage(product.images[0]);
    setSelectedColor(product.colors[0] || '');
    setSelectedSize(product.sizes ? product.sizes[0] : '');
    setQuantity(1);
    setAddedFeedback(false);
  }, [product, id]);

  const handleQuantityChange = (val) => {
    if (val < 1) return;
    setQuantity(val);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 3000);
  };

  // Get related products (same category, excluding current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="page-transition max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Breadcrumbs */}
      <nav className="flex text-xs text-text-secondary mb-8 gap-1.5 items-center">
        <Link to="/" className="hover:text-brand">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-brand">Shop</Link>
        <span>/</span>
        <span className="text-text-primary font-medium truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        
        {/* Images Column */}
        <div className="space-y-4">
          <div className="h-[400px] sm:h-[500px] w-full rounded-2xl overflow-hidden bg-secondary border border-border-color shadow-sm">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
          </div>
          {/* Thumbnails grid */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden bg-secondary border-2 flex-shrink-0 cursor-pointer transition-all ${
                  activeImage === img ? 'border-brand scale-95' : 'border-transparent hover:border-border-color'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover object-center" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Column */}
        <div className="flex flex-col justify-between">
          <div className="space-y-5">
            {/* Category & Badge */}
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase font-bold text-text-secondary tracking-widest">
                {product.category}
              </span>
              {product.inStock ? (
                <span className="px-2.5 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase rounded border border-green-500/20">
                  In Stock
                </span>
              ) : (
                <span className="px-2.5 py-0.5 bg-red-500/10 text-red-500 text-[10px] font-bold uppercase rounded border border-red-500/20">
                  Out Of Stock
                </span>
              )}
            </div>

            {/* Product Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{product.name}</h1>

            {/* Price & Rating */}
            <div className="flex items-center gap-6 border-b border-border-color pb-5">
              <span className="text-2xl font-extrabold text-text-primary">${product.price.toFixed(2)}</span>
              <div className="w-px h-6 bg-border-color" />
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs font-semibold text-text-primary">{product.rating}</span>
                <span className="text-xs text-text-secondary">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Variations */}
            <div className="space-y-4 py-2">
              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-text-secondary">Color: <span className="text-text-primary font-semibold">{selectedColor}</span></h3>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                          selectedColor === color
                            ? 'border-brand bg-brand/5 font-semibold text-brand'
                            : 'border-border-color hover:border-text-secondary text-text-secondary'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-text-secondary">Size: <span className="text-text-primary font-semibold">{selectedSize}</span></h3>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 text-xs font-bold rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'border-brand bg-brand/5 text-brand'
                            : 'border-border-color hover:border-text-secondary text-text-secondary'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity and Actions */}
            {product.inStock && (
              <div className="flex items-center gap-4 py-4">
                <div className="flex items-center border border-border-color rounded-xl overflow-hidden bg-secondary">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-3 py-2.5 text-xs font-bold text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                  >
                    &minus;
                  </button>
                  <span className="px-4 text-xs font-bold min-w-[32px] text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-3 py-2.5 text-xs font-bold text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-brand hover:bg-brand-dark text-xs font-semibold text-white rounded-xl transition-all shadow-md shadow-brand/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Shopping Cart
                </button>
              </div>
            )}

            {/* Added Feedback Toast */}
            {addedFeedback && (
              <div className="bg-brand/10 border border-brand/20 text-brand text-xs font-medium px-4 py-3 rounded-xl flex items-center justify-between animate-fade-in mt-2">
                <span>Success! Added {quantity}x item(s) to your cart.</span>
                <Link to="/cart" className="underline font-bold hover:text-brand-dark cursor-pointer">View Cart</Link>
              </div>
            )}
          </div>

          {/* Key Trust Note */}
          <div className="border-t border-border-color pt-6 mt-6">
            <div className="flex gap-3 text-xs text-text-secondary">
              <svg className="w-5 h-5 text-brand flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Authenticity guaranteed. Free 30-day exchange and returns on all unopened collections.</span>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs Section: Description, Specs, Reviews */}
      <section className="mt-16">
        <div className="border-b border-border-color flex gap-6">
          {['description', 'specifications', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-sm font-bold uppercase tracking-wider relative cursor-pointer ${
                activeTab === tab
                  ? 'text-brand dark:text-brand-light border-b-2 border-brand'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="py-6 min-h-[150px] text-sm text-text-secondary leading-relaxed">
          {activeTab === 'description' && (
            <p className="animate-fade-in max-w-4xl">{product.description}</p>
          )}

          {activeTab === 'specifications' && (
            <div className="animate-fade-in max-w-xl border border-border-color rounded-2xl overflow-hidden bg-secondary/50">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 px-5 py-3 border-b border-border-color last:border-b-0">
                  <span className="font-semibold text-text-primary">{key}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="animate-fade-in space-y-6">
              {/* Sample Reviews */}
              <div className="border-b border-border-color pb-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-text-primary">Sarah K.</h4>
                    <div className="flex text-amber-400 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] text-text-secondary">2 weeks ago</span>
                </div>
                <p className="text-xs leading-relaxed max-w-2xl">
                  Absolutely stunning design. It fits perfectly in my space, and the build quality exceeds all my expectations. Worth every single penny!
                </p>
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-text-primary">Marcus L.</h4>
                    <div className="flex text-amber-400 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3.5 h-3.5 ${i < 4 ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] text-text-secondary">1 month ago</span>
                </div>
                <p className="text-xs leading-relaxed max-w-2xl">
                  Very pleased with this purchase. Premium materials, functions exactly as described. Delivery was prompt and packaging was solid. Highly recommend.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 border-t border-border-color pt-16">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                className="group relative flex flex-col rounded-2xl glass-card overflow-hidden h-[380px]"
              >
                {/* Image */}
                <Link to={`/product/${p.id}`} className="relative h-52 overflow-hidden block">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-text-secondary tracking-widest block mb-1">
                      {p.category}
                    </span>
                    <Link
                      to={`/product/${p.id}`}
                      className="text-xs font-bold text-text-primary hover:text-brand transition-colors block line-clamp-1"
                    >
                      {p.name}
                    </Link>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-extrabold text-text-primary">${p.price.toFixed(2)}</span>
                    <span className="text-[10px] text-brand dark:text-brand-light font-bold">View details</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
