import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaRupeeSign, FaArrowLeft, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { getParkingLot, getParkingSlots } from '../services/api';
import { useParking } from '../context/ParkingContext';
import { groupSlotsByFloor } from '../utils/slotHelpers';
import ParkingSlot from '../components/ParkingSlot';
import Loader from '../components/Loader';

const ParkingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedSlot, selectSlot, clearSelectedSlot } = useParking();

  const [lot, setLot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const [lotData, slotsData] = await Promise.all([
          getParkingLot(id),
          getParkingSlots(id),
        ]);
        setLot(lotData);
        setSlots(slotsData || []);
      } catch (err) {
        console.error('Error fetching parking details:', err);
        setError('Unable to load parking details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  // Statistics calculation
  const totalCount = slots.length;
  const availableCount = slots.filter((s) => s.status === 'Available').length;
  const occupiedCount = slots.filter((s) => s.status === 'Occupied').length;
  const reservedCount = slots.filter((s) => s.status === 'Reserved').length;

  const groupedSlots = useMemo(() => groupSlotsByFloor(slots), [slots]);

  const handleSlotClick = (slot) => {
    if (slot.status === 'Available') {
      if (selectedSlot && selectedSlot.id === slot.id) {
        clearSelectedSlot();
      } else {
        selectSlot(slot);
      }
    }
  };

  const handleProceedReserve = () => {
    if (selectedSlot) {
      navigate(`/reserve/${selectedSlot.id}`, {
        state: { slot: selectedSlot, lot },
      });
    }
  };

  if (loading) return <Loader message="Loading parking slots layout..." />;
  if (error || !lot) {
    return (
      <div className="section" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
        <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>{error || 'Parking facility not found'}</h2>
        <Link to="/parking" className="btn btn-primary">
          <FaArrowLeft /> Back to Parking Locations
        </Link>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="section-container">
        <Link to="/parking" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '1.5rem', fontWeight: '600' }}>
          <FaArrowLeft /> Back to Parking Locations
        </Link>

        {/* DETAILS HEADER CARD */}
        <div className="details-header-card">
          <div style={{ flex: '1', minWidth: '280px' }}>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>{lot.name}</h1>
            <p style={{ color: 'var(--slate-600)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1rem', marginBottom: '0.8rem' }}>
              <FaMapMarkerAlt style={{ color: '#ef4444' }} /> {lot.location}
            </p>
            <p style={{ color: 'var(--slate-600)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem' }}>
              <FaClock style={{ color: 'var(--primary-color)' }} /> Operating Hours: <strong>{lot.openingHours || '24/7 Open'}</strong>
            </p>
            {lot.description && (
              <p style={{ color: 'var(--slate-600)', marginTop: '0.8rem', fontSize: '0.95rem', maxWidth: '650px' }}>
                {lot.description}
              </p>
            )}
          </div>

          <div style={{ textAlign: 'right', background: 'var(--slate-100)', padding: '1.2rem 1.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--slate-600)', display: 'block', fontWeight: '600' }}>HOURLY RATE</span>
            <span style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--primary-dark)' }}>
              ₹{lot.pricePerHour}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--slate-600)', display: 'block' }}>per hour</span>
          </div>
        </div>

        {/* STATISTICS SUMMARY BAR */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.2rem',
            marginBottom: '2rem',
          }}
        >
          <div style={{ background: '#ffffff', padding: '1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)', fontWeight: '700', textTransform: 'uppercase' }}>Total Capacity</span>
            <h3 style={{ fontSize: '1.8rem', marginTop: '4px' }}>{totalCount} Slots</h3>
          </div>
          <div style={{ background: 'var(--success-bg)', padding: '1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--success-border)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#065f46', fontWeight: '700', textTransform: 'uppercase' }}>Available</span>
            <h3 style={{ fontSize: '1.8rem', marginTop: '4px', color: '#065f46' }}>{availableCount} Slots</h3>
          </div>
          <div style={{ background: 'var(--danger-bg)', padding: '1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--danger-border)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#991b1b', fontWeight: '700', textTransform: 'uppercase' }}>Occupied</span>
            <h3 style={{ fontSize: '1.8rem', marginTop: '4px', color: '#991b1b' }}>{occupiedCount} Slots</h3>
          </div>
          <div style={{ background: 'var(--warning-bg)', padding: '1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--warning-border)', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#92400e', fontWeight: '700', textTransform: 'uppercase' }}>Reserved</span>
            <h3 style={{ fontSize: '1.8rem', marginTop: '4px', color: '#92400e' }}>{reservedCount} Slots</h3>
          </div>
        </div>

        {/* LEGEND */}
        <div className="slot-legend">
          <span style={{ fontWeight: '700', color: 'var(--dark-navy)' }}>Slot Status Legend:</span>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#10b981' }}></span>
            <span>🟢 Available (Selectable)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#ef4444' }}></span>
            <span>🔴 Occupied (In Use)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: '#f59e0b' }}></span>
            <span>🟠 Reserved (Booked)</span>
          </div>
        </div>

        {/* PARKING LAYOUT / GRID */}
        {Object.keys(groupedSlots).map((floorName) => (
          <div key={floorName} className="floor-section">
            <h3 className="floor-title">📍 {floorName}</h3>
            <div className="slots-grid">
              {groupedSlots[floorName].map((slot) => (
                <ParkingSlot
                  key={slot.id}
                  slot={slot}
                  isSelected={selectedSlot && selectedSlot.id === slot.id}
                  onSelect={handleSlotClick}
                />
              ))}
            </div>
          </div>
        ))}

        {/* SELECTED SLOT CTA BAR */}
        {selectedSlot ? (
          <div className="selected-bar">
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--slate-400)', display: 'block' }}>SELECTED PARKING SLOT</span>
              <h3 style={{ fontSize: '1.5rem', color: '#ffffff' }}>
                Slot #{selectedSlot.slotNumber} ({selectedSlot.type}) - ₹{selectedSlot.price || lot.pricePerHour}/hr
              </h3>
            </div>
            <button className="btn btn-primary" onClick={handleProceedReserve} style={{ padding: '0.8rem 2rem', fontSize: '1.05rem' }}>
              <FaCheckCircle /> Reserve This Slot
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem', color: 'var(--slate-600)', fontStyle: 'italic' }}>
            💡 Click any green (Available) slot above to select and reserve it.
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkingDetails;
