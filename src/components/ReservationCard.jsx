import React from 'react';
import { FaTicketAlt, FaCar, FaClock, FaRupeeSign, FaCalendarAlt, FaTimesCircle } from 'react-icons/fa';
import { getStatusBadgeClass } from '../utils/slotHelpers';

const ReservationCard = ({ reservation, onCancel }) => {
  const {
    id,
    parkingName,
    slotNumber,
    vehicleNumber,
    vehicleType,
    entryTime,
    duration,
    totalAmount,
    status,
    createdAt,
  } = reservation;

  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString() : 'Today';

  return (
    <div className="reservation-card">
      <div style={{ flex: '1', minWidth: '260px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-color)' }}>
            Ticket #{id}
          </span>
          <span className={`badge ${getStatusBadgeClass(status)}`}>{status}</span>
        </div>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>{parkingName}</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', marginTop: '1rem' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>
            <strong>Slot:</strong> <span style={{ color: 'var(--dark-navy)', fontWeight: '700' }}>{slotNumber}</span>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>
            <strong>Vehicle:</strong> <span style={{ color: 'var(--dark-navy)', fontWeight: '700' }}>{vehicleNumber} ({vehicleType})</span>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>
            <strong>Time:</strong> {entryTime} ({duration} hrs)
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--slate-600)' }}>
            <strong>Date:</strong> {formattedDate}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', minWidth: '160px' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)', display: 'block' }}>Total Paid</span>
          <span style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary-dark)' }}>
            ₹{totalAmount}
          </span>
        </div>

        {status === 'Active' && onCancel && (
          <button
            className="btn btn-outline"
            onClick={() => onCancel(reservation)}
            style={{ color: '#ef4444', borderColor: '#fca5a5', padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
          >
            <FaTimesCircle /> Cancel Reservation
          </button>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
