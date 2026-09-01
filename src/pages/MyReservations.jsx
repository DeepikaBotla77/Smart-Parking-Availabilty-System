import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTicketAlt, FaFilter, FaArrowRight } from 'react-icons/fa';
import { useParking } from '../context/ParkingContext';
import ReservationCard from '../components/ReservationCard';
import Loader from '../components/Loader';
import Modal from '../components/Modal';

const MyReservations = () => {
  const { user, reservations, cancelUserReservation, loading, error } = useParking();
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedCancelRes, setSelectedCancelRes] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  // Filter user reservations
  const userReservations = user
    ? reservations.filter((r) => r.userId === user.id || r.userPhone === user.phone)
    : reservations;

  const filteredReservations = userReservations.filter((r) => {
    if (filterStatus === 'All') return true;
    return r.status?.toLowerCase() === filterStatus.toLowerCase();
  });

  const handleOpenCancelModal = (res) => {
    setSelectedCancelRes(res);
  };

  const handleConfirmCancel = async () => {
    if (!selectedCancelRes) return;
    setCancelling(true);
    await cancelUserReservation(
      selectedCancelRes.id,
      selectedCancelRes.slotId,
      selectedCancelRes.parkingId
    );
    setCancelling(false);
    setSelectedCancelRes(null);
  };

  return (
    <div className="section">
      <div className="section-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.4rem', marginBottom: '0.4rem' }}>My Reservations</h1>
            <p style={{ color: 'var(--slate-600)', fontSize: '1.05rem' }}>
              View active parking tickets, review past bookings, and manage your slots.
            </p>
          </div>

          {/* STATUS FILTER BUTTONS */}
          <div style={{ display: 'flex', gap: '8px', background: '#ffffff', padding: '6px', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
            {['All', 'Active', 'Completed', 'Cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className="btn"
                style={{
                  padding: '0.45rem 1rem',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: filterStatus === status ? 'var(--dark-navy)' : 'transparent',
                  color: filterStatus === status ? '#ffffff' : 'var(--slate-600)',
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <Loader message="Loading your reservation history..." />
        ) : error ? (
          <div style={{ textAlign: 'center', color: '#ef4444', padding: '3rem 0' }}>{error}</div>
        ) : filteredReservations.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              backgroundColor: '#ffffff',
              padding: '4rem 2rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--slate-200)',
            }}
          >
            <FaTicketAlt style={{ fontSize: '3rem', color: 'var(--slate-400)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No reservations found</h3>
            <p style={{ color: 'var(--slate-600)', marginBottom: '1.5rem' }}>
              {filterStatus === 'All'
                ? "You haven't made any parking slot reservations yet."
                : `No ${filterStatus.toLowerCase()} reservations found.`}
            </p>
            <Link to="/parking" className="btn btn-primary">
              Book a Parking Slot <FaArrowRight />
            </Link>
          </div>
        ) : (
          <div>
            {filteredReservations.map((res) => (
              <ReservationCard key={res.id} reservation={res} onCancel={handleOpenCancelModal} />
            ))}
          </div>
        )}

        {/* CANCEL CONFIRMATION MODAL */}
        <Modal
          isOpen={!!selectedCancelRes}
          onClose={() => setSelectedCancelRes(null)}
          title="Cancel Reservation"
        >
          <div style={{ padding: '0.5rem 0' }}>
            <p style={{ marginBottom: '1.2rem', color: 'var(--dark-slate)' }}>
              Are you sure you want to cancel reservation <strong>#{selectedCancelRes?.id}</strong> for slot{' '}
              <strong>{selectedCancelRes?.slotNumber}</strong>?
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={() => setSelectedCancelRes(null)} style={{ color: 'var(--dark-slate)', borderColor: 'var(--slate-400)' }}>
                Keep Reservation
              </button>
              <button className="btn btn-danger" onClick={handleConfirmCancel} disabled={cancelling}>
                {cancelling ? 'Cancelling...' : 'Yes, Cancel Reservation'}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MyReservations;
