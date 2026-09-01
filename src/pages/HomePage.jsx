import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function HomePage() {
  const { addToCart } = useCart();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  const categoriesList = [
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
      description: "Smart audio, cinema projectors, and mechanical keyboards.",
      path: "/shop?category=Electronics"
    },
    {
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80",
      description: "Tailored overcoats, leather sneakers, and sleek daypacks.",
      path: "/shop?category=Fashion"
    },
    {
      name: "Home & Living",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80",
      description: "Ceramic diffusers, travertine lamps, and organic blankets.",
      path: "/shop?category=Home%20%26%20Living"
    },
    {
      name: "Fitness & Outdoors",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80",
      description: "Adjustable weights, vacuum bottles, and trekking gear.",
      path: "/shop?category=Fitness%20%26%20Outdoors"
    }
  ];

  return (
    <div className="page-transition min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative h-[650px] flex items-center justify-center bg-[#0b0f19] overflow-hidden">
        {/* Background Gradient/Graphic */}
        <div className="absolute inset-0 opacity-40 dark:opacity-30">
          <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[80%] rounded-full bg-brand blur-[120px]" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[70%] rounded-full bg-accent blur-[120px]" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-brand-light bg-brand/10 border border-brand/20 rounded-full uppercase">
            Summer Collection 2026
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            Elevate Your Everyday <br />
            <span className="bg-gradient-to-r from-brand-light to-accent-light bg-clip-text text-transparent">Lifestyle Vibe</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Discover a thoughtfully curated collection of design-driven products. Engineered for precision, built to last, and styled to complement the modern home.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-3.5 bg-brand hover:bg-brand-dark text-sm font-semibold rounded-xl transition-all shadow-lg shadow-brand/25 cursor-pointer text-center"
            >
              Explore Products
            </Link>
            <Link
              to="/shop?category=Electronics"
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/15 text-sm font-semibold rounded-xl transition-all border border-white/10 cursor-pointer text-center"
            >
              Shop Electronics
            </Link>
          </div>
        </div>
      </section>

      {/* Promobanner */}
      <section className="bg-gradient-to-r from-brand-dark to-accent py-4 text-white text-center text-xs font-semibold tracking-wider">
        🔥 USE CODE <span className="underline font-bold">VIBE10</span> FOR 10% OFF YOUR FIRST ORDER | FREE SHIPPING OVER $150
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
          <div className="w-12 h-1 bg-brand mx-auto mt-3 rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesList.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className="group relative h-80 rounded-2xl overflow-hidden glass-card flex flex-col justify-end p-6 cursor-pointer"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              {/* Dim overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300" />
              
              {/* Text content */}
              <div className="relative z-10 text-white">
                <h3 className="text-lg font-bold group-hover:text-brand-light transition-colors mb-1">{cat.name}</h3>
                <p className="text-xs text-slate-300 leading-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto overflow-hidden">
                  {cat.description}
                </p>
                <div className="flex items-center gap-1 text-xs font-semibold text-brand-light mt-2">
                  Browse category
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="bg-secondary py-20 border-t border-b border-border-color transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-center sm:text-left">Trending Products</h2>
              <p className="text-sm text-text-secondary mt-2">Our most popular designs this season, crafted to perfection.</p>
            </div>
            <Link
              to="/shop"
              className="mt-4 sm:mt-0 flex items-center gap-1.5 text-sm font-semibold text-brand dark:text-brand-light hover:underline"
            >
              View all products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col rounded-2xl glass-card overflow-hidden h-[420px]"
              >
                {/* Product Image */}
                <Link to={`/product/${product.id}`} className="relative h-64 overflow-hidden block">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.inStock === false && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded">
                      Out of stock
                    </span>
                  )}
                </Link>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-text-secondary tracking-widest block mb-1">
                      {product.category}
                    </span>
                    <Link
                      to={`/product/${product.id}`}
                      className="text-sm font-bold text-text-primary hover:text-brand transition-colors block line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <div className="flex items-center gap-1 mt-1.5">
                      {/* Stars */}
                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[11px] text-text-secondary">({product.reviewsCount})</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-base font-extrabold text-text-primary">${product.price.toFixed(2)}</span>
                    {product.inStock ? (
                      <button
                        onClick={() => addToCart(product, 1, product.colors[0] || '', product.sizes ? product.sizes[0] : '')}
                        className="p-2 rounded-xl bg-brand hover:bg-brand-dark text-white shadow-sm hover:shadow-brand/20 transition-all cursor-pointer"
                        title="Add to Cart"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    ) : (
                      <span className="text-xs text-text-secondary italic font-medium">Sold Out</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4 items-start p-6 rounded-2xl bg-secondary/50 border border-border-color">
            <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-base mb-1">Free Shipping</h3>
              <p className="text-xs text-text-secondary leading-normal">
                Standard free shipping automatically applied to all worldwide orders above $150.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start p-6 rounded-2xl bg-secondary/50 border border-border-color">
            <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-base mb-1">Secure Transactions</h3>
              <p className="text-xs text-text-secondary leading-normal">
                Shop with complete peace of mind. Every transaction is encrypted with standard SSL protocols.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start p-6 rounded-2xl bg-secondary/50 border border-border-color">
            <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-base mb-1">Hassle-Free Returns</h3>
              <p className="text-xs text-text-secondary leading-normal">
                If you aren't completely satisfied with your purchase, return it in original condition within 30 days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
