import React from 'react';
import { FaFilter, FaSortAmountDown } from 'react-icons/fa';

const FilterBar = ({
  sortBy,
  onSortChange,
  availabilityFilter,
  onAvailabilityChange,
  priceRange,
  onPriceChange,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--slate-200)',
        boxShadow: 'var(--card-shadow)',
        marginBottom: '2rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--slate-600)', fontWeight: '600' }}>
        <FaFilter style={{ color: 'var(--primary-color)' }} /> Filters:
      </div>

      <select
        className="form-control"
        style={{ width: 'auto', minWidth: '160px' }}
        value={availabilityFilter}
        onChange={(e) => onAvailabilityChange(e.target.value)}
      >
        <option value="all">All Parking Lots</option>
        <option value="availableOnly">Has Available Slots</option>
      </select>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--slate-600)', fontWeight: '600', marginLeft: 'auto' }}>
        <FaSortAmountDown style={{ color: 'var(--primary-color)' }} /> Sort by Price:
      </div>

      <select
        className="form-control"
        style={{ width: 'auto', minWidth: '160px' }}
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="default">Default Sorting</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
        <option value="slotsHighToLow">Most Available Slots</option>
      </select>
    </div>
  );
};

export default FilterBar;
