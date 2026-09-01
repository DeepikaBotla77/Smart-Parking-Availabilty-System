import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="section" style={{ minHeight: 'calc(100vh - 140px)', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <div className="section-container" style={{ maxWidth: '600px' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '3.5rem 2rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--card-shadow)',
            border: '1px solid var(--slate-200)',
          }}
        >
          <FaExclamationTriangle style={{ fontSize: '4rem', color: 'var(--warning-color)', marginBottom: '1.2rem' }} />
          <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>404</h1>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.8rem' }}>Page Not Found</h2>
          <p style={{ color: 'var(--slate-600)', marginBottom: '2rem', fontSize: '1.05rem' }}>
            The parking page or resource you are searching for does not exist or has been relocated.
          </p>
          <Link to="/" className="btn btn-primary" style={{ padding: '0.8rem 1.8rem' }}>
            <FaHome /> Return to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
