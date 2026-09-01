import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (active) =>
    `text-sm font-medium transition-all duration-200 relative py-1 cursor-pointer ${
      active
        ? 'text-brand dark:text-brand-light font-semibold'
        : 'text-text-secondary hover:text-brand dark:hover:text-brand-light'
    }`;

  return (
    <>
      <nav className="glass-header sticky top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-dark to-brand flex items-center justify-center shadow-md shadow-brand/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
              VIBE
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={navLinkClass(isActive('/'))}>Home</Link>
            <Link to="/shop" className={navLinkClass(isActive('/shop'))}>Shop</Link>
            <Link to="/about" className={navLinkClass(isActive('/about'))}>About</Link>
            <Link to="/contact" className={navLinkClass(isActive('/contact'))}>Contact</Link>
          </div>

          {/* Search, Theme Toggle, Cart - Desktop */}
          <div className="hidden md:flex items-center gap-5">
            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 px-4 py-1.5 pl-10 text-xs rounded-full custom-input"
              />
              <svg
                className="absolute left-3.5 top-2.5 w-4 h-4 text-text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0x" />
              </svg>
            </form>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-text-secondary hover:text-brand dark:hover:text-brand-light transition-colors cursor-pointer"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-text-secondary hover:text-brand dark:hover:text-brand-light transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 bg-accent text-[10px] font-bold text-white rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Right Mobile Actions */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Dark Mode toggle for mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-full text-text-secondary cursor-pointer"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Cart Link for mobile */}
            <Link to="/cart" className="relative p-1.5 text-text-secondary cursor-pointer">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 min-w-4.5 h-4.5 bg-accent text-[9px] font-bold text-white rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Open */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 rounded-lg text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden animate-fade-in">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          
          {/* Content */}
          <div className="absolute top-0 right-0 w-80 h-full bg-secondary border-l border-border-color shadow-2xl p-6 flex flex-col justify-between">
            <div>
              {/* Logo */}
              <div className="flex items-center gap-2 mb-8 mt-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-dark to-brand flex items-center justify-center text-white">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
                  VIBE
                </span>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 text-xs rounded-full custom-input"
                />
                <svg
                  className="absolute left-3.5 top-2.5 w-4 h-4 text-text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </form>

              {/* Menu Links */}
              <div className="flex flex-col gap-4">
                <Link to="/" className={`px-2 py-1.5 rounded-lg ${isActive('/') ? 'bg-brand/10 text-brand font-semibold' : 'text-text-secondary'}`}>
                  Home
                </Link>
                <Link to="/shop" className={`px-2 py-1.5 rounded-lg ${isActive('/shop') ? 'bg-brand/10 text-brand font-semibold' : 'text-text-secondary'}`}>
                  Shop
                </Link>
                <Link to="/about" className={`px-2 py-1.5 rounded-lg ${isActive('/about') ? 'bg-brand/10 text-brand font-semibold' : 'text-text-secondary'}`}>
                  About
                </Link>
                <Link to="/contact" className={`px-2 py-1.5 rounded-lg ${isActive('/contact') ? 'bg-brand/10 text-brand font-semibold' : 'text-text-secondary'}`}>
                  Contact
                </Link>
              </div>
            </div>

            {/* Bottom Panel */}
            <div className="border-t border-border-color pt-6 text-center text-xs text-text-secondary">
              &copy; {new Date().getFullYear()} VIBE Shop. All rights reserved.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
