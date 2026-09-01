import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ShopPage() {
  const { addToCart } = useCart();
  const location = useLocation();

  // Parse search query and category from URL
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      search: params.get('search') || '',
      category: params.get('category') || 'All'
    };
  };

  const { search: urlSearch, category: urlCategory } = getQueryParams();

  // State
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [priceRange, setPriceRange] = useState(1000);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync state with URL params when they change
  useEffect(() => {
    setSearchQuery(urlSearch);
    setSelectedCategory(urlCategory);
  }, [location.search, urlSearch, urlCategory]);

  // Handle filter resets
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange(1000);
    setSortBy('featured');
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price <= priceRange;
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default / Featured
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
      }
      return 0;
    });

  return (
    <div className="page-transition max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title & Page Header */}
      <div className="border-b border-border-color pb-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Shop Collection</h1>
          <p className="text-xs text-text-secondary mt-1.5">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
        
        {/* Sort selector & Mobile filter trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-2 border border-border-color rounded-xl text-xs font-semibold hover:bg-secondary transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-secondary hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-xs border border-border-color rounded-xl custom-input"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden md:block space-y-6">
          {/* Search */}
          <div className="glass-card p-5 rounded-2xl">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3">Search</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-9 text-xs rounded-xl custom-input"
              />
              <svg className="absolute left-3.5 top-3 w-3.5 h-3.5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Categories */}
          <div className="glass-card p-5 rounded-2xl">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3">Categories</h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left text-xs py-1.5 px-3 rounded-lg transition-colors cursor-pointer font-medium ${
                    selectedCategory === cat
                      ? 'bg-brand/10 text-brand font-semibold'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-text-secondary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="glass-card p-5 rounded-2xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider">Max Price</h3>
              <span className="text-xs font-bold text-brand dark:text-brand-light">${priceRange}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-brand h-1.5 bg-border-color rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text-secondary mt-1">
              <span>$0</span>
              <span>$1000</span>
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={handleResetFilters}
            className="w-full py-2.5 bg-secondary hover:bg-black/5 dark:hover:bg-white/5 border border-border-color text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center"
          >
            Clear All Filters
          </button>
        </aside>

        {/* Product Grid */}
        <main className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-secondary/30 border border-border-color rounded-2xl p-8">
              <svg className="w-12 h-12 text-text-secondary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-bold">No Products Found</h3>
              <p className="text-xs text-text-secondary mt-1 max-w-sm mx-auto leading-relaxed">
                Your filters are too restrictive. Try adjusting the search term, expanding the price slider, or choosing another category.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 px-6 py-2.5 bg-brand hover:bg-brand-dark text-xs font-semibold text-white rounded-xl transition-all shadow-md cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative flex flex-col rounded-2xl glass-card overflow-hidden h-[410px] animate-fade-in"
                >
                  {/* Image */}
                  <Link to={`/product/${product.id}`} className="relative h-56 overflow-hidden block">
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
                  <div className="p-4 flex-1 flex flex-col justify-between">
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
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'
                              }`}
                              viewBox="0 0 20 20;0"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-[10px] text-text-secondary">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm font-extrabold text-text-primary">${product.price.toFixed(2)}</span>
                      {product.inStock ? (
                        <button
                          onClick={() => addToCart(product, 1, product.colors[0] || '', product.sizes ? product.sizes[0] : '')}
                          className="p-2 rounded-xl bg-brand hover:bg-brand-dark text-white shadow-sm hover:shadow-brand/20 transition-all cursor-pointer text-xs font-semibold flex items-center justify-center gap-1.5"
                          title="Add to Cart"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                          </svg>
                          Add
                        </button>
                      ) : (
                        <span className="text-xs text-text-secondary italic font-medium">Sold Out</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Drawer Filters */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 md:hidden animate-fade-in">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          
          {/* Sidebar Drawer */}
          <div className="absolute top-0 left-0 w-80 h-full bg-secondary border-r border-border-color shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-border-color pb-4">
                <h2 className="text-base font-extrabold">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1.5 text-text-secondary cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Search */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-2.5">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-9 text-xs rounded-xl custom-input"
                  />
                  <svg className="absolute left-3.5 top-3 w-3.5 h-3.5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-2.5">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs py-1.5 px-3 rounded-lg transition-colors cursor-pointer font-medium ${
                        selectedCategory === cat
                          ? 'bg-brand/10 text-brand font-semibold'
                          : 'bg-primary/5 hover:bg-black/5 dark:hover:bg-white/5 text-text-secondary'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider">Max Price</h3>
                  <span className="text-xs font-bold text-brand dark:text-brand-light">${priceRange}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-brand h-1.5 bg-border-color rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-text-secondary mt-1">
                  <span>$0</span>
                  <span>$1000</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 border-t border-border-color pt-6 flex gap-3">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2.5 bg-secondary text-xs font-semibold rounded-xl border border-border-color text-center cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-2.5 bg-brand hover:bg-brand-dark text-xs font-semibold text-white rounded-xl text-center cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
