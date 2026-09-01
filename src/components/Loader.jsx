import React from 'react';

const Loader = ({ message = 'Loading parking spaces...' }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        width: '100%',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '4px solid var(--slate-200)',
          borderTop: '4px solid var(--primary-color)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          marginBottom: '1rem',
        }}
      />
      <p style={{ color: 'var(--slate-600)', fontWeight: '600', fontSize: '1rem' }}>{message}</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
