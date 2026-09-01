import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useParking } from '../context/ParkingContext';
import ParkingCard from '../components/ParkingCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import Loader from '../components/Loader';

const ParkingLots = () => {
  const { parkingLots, loading, error } = useParking();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('default');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  useEffect(() => {
    if (initialQuery) {
      setSearchTerm(initialQuery);
    }
  }, [initialQuery]);

  const filteredParkingLots = useMemo(() => {
    let result = [...parkingLots];

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (lot) =>
          lot.name.toLowerCase().includes(q) ||
          lot.location.toLowerCase().includes(q)
      );
    }

    // Availability filter
    if (availabilityFilter === 'availableOnly') {
      result = result.filter((lot) => lot.availableSlots > 0);
    }

    // Sorting
    if (sortBy === 'lowToHigh') {
      result.sort((a, b) => a.pricePerHour - b.pricePerHour);
    } else if (sortBy === 'highToLow') {
      result.sort((a, b) => b.pricePerHour - a.pricePerHour);
    } else if (sortBy === 'slotsHighToLow') {
      result.sort((a, b) => b.availableSlots - a.availableSlots);
    }

    return result;
  }, [parkingLots, searchTerm, availabilityFilter, sortBy]);

  return (
    <div className="section">
      <div className="section-container">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>All Parking Locations</h1>
          <p style={{ color: 'var(--slate-600)', fontSize: '1.05rem' }}>
            Find, filter, and compare smart parking facilities near your location.
          </p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search by facility name or location (e.g. Main Street, Mall, Airport)..."
          />
        </div>

        <FilterBar
          sortBy={sortBy}
          onSortChange={setSortBy}
          availabilityFilter={availabilityFilter}
          onAvailabilityChange={setAvailabilityFilter}
        />

        {loading ? (
          <Loader message="Loading parking locations..." />
        ) : error ? (
          <div style={{ textAlign: 'center', color: '#ef4444', padding: '3rem 0' }}>
            <h3>{error}</h3>
          </div>
        ) : filteredParkingLots.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              backgroundColor: '#ffffff',
              padding: '4rem 2rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--slate-200)',
            }}
          >
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No parking slots found</h3>
            <p style={{ color: 'var(--slate-600)' }}>
              Try adjusting your search query or filter settings.
            </p>
          </div>
        ) : (
          <div className="parking-grid">
            {filteredParkingLots.map((parking) => (
              <ParkingCard key={parking.id} parking={parking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkingLots;
