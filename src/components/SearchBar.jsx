import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ searchTerm, onSearchChange, placeholder = 'Search by parking name or location...' }) => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <FaSearch
        style={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--slate-400)',
          fontSize: '1rem',
        }}
      />
      <input
        type="text"
        className="form-control"
        style={{ paddingLeft: '44px', paddingRight: searchTerm ? '40px' : '16px' }}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'var(--slate-400)',
            cursor: 'pointer',
          }}
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
