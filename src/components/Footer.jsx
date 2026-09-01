import React from 'react';
import { Link } from 'react-router-dom';
import { FaParking, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="navbar-logo">
            <FaParking className="logo-icon" />
            <span>ParkEase</span>
          </Link>
          <p>
            ParkEase is a smart parking slot availability system helping users locate, reserve,
            and navigate to parking spaces in real-time. Say goodbye to parking hassle.
          </p>
        </div>

        <div>
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/parking">Find Parking</Link></li>
            <li><Link to="/my-reservations">My Reservations</Link></li>
            <li><Link to="/login">Account Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Parking Locations</h4>
          <ul className="footer-links">
            <li><Link to="/parking">City Center Hub</Link></li>
            <li><Link to="/parking">Grand Mall Parking</Link></li>
            <li><Link to="/parking">Metro Airport T2</Link></li>
            <li><Link to="/parking">Business District</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Contact & Support</h4>
          <ul className="footer-links" style={{ gap: '0.8rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaMapMarkerAlt style={{ color: '#ffffff' }} /> Tech Park Towers, Floor 4, Hyderabad
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaPhoneAlt style={{ color: '#ffffff' }} /> +91 1800-PARK-EASE
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaEnvelope style={{ color: '#ffffff' }} /> support@parkease.com
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ParkEase Smart Parking System. Built with React 18, Spring Boot 3.2 & MySQL.</p>
      </div>
    </footer>
  );
};

export default Footer;
