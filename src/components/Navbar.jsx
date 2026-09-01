import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaParking, FaUserCircle, FaBars, FaTimes, FaSignOutAlt, FaUserShield } from 'react-icons/fa';
import { useParking } from '../context/ParkingContext';

const Navbar = () => {
  const { user, logout } = useParking();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/login');
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <FaParking className="logo-icon" />
          <span>ParkEase</span>
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`nav-menu ${mobileOpen ? 'open' : ''}`}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMobileMenu}
            end
          >
            Home
          </NavLink>

          <NavLink
            to="/parking"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMobileMenu}
          >
            Parking Lots
          </NavLink>

          <NavLink
            to="/my-reservations"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            onClick={closeMobileMenu}
          >
            My Reservations
          </NavLink>

          {user && user.role === 'admin' && (
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={closeMobileMenu}
            >
              <FaUserShield /> Admin Panel
            </NavLink>
          )}

          <div className="nav-auth">
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#ffffff', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', background: '#18181b', padding: '5px 12px', borderRadius: 'var(--radius-full)', border: '1px solid #3f3f46' }}>
                  <FaUserCircle style={{ color: '#ffffff', fontSize: '1.1rem' }} />
                  {user.name}
                </span>
                <button
                  className="btn btn-outline"
                  onClick={handleLogout}
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline" onClick={closeMobileMenu}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-white" onClick={closeMobileMenu}>
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
