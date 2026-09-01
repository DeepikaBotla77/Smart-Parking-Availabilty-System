import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { FaArrowLeft, FaCar, FaClock, FaCheckCircle, FaUser, FaPhoneAlt, FaIdCard } from 'react-icons/fa';
import { useParking } from '../context/ParkingContext';
import { getParkingSlot, getParkingLot } from '../services/api';
import { calculateParkingFee } from '../utils/calculateFee';
import Loader from '../components/Loader';

const ReserveSlot = () => {
  const { slotId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, reserveSlot, selectedSlot: contextSelectedSlot } = useParking();

  // Priority: navigation state > context > API fetch
  const initialSlot = location.state?.slot || contextSelectedSlot || null;
  const initialLot = location.state?.lot || null;

  const [slot, setSlot] = useState(initialSlot);
  const [lot, setLot] = useState(initialLot);
  const [loading, setLoading] = useState(!initialSlot);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Form state
  const [name, setName] = useState(user ? user.name : '');
  const [phone, setPhone] = useState(user ? user.phone || '' : '');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState(initialSlot?.type || 'Car');
  const [entryTime, setEntryTime] = useState('10:30');
  const [duration, setDuration] = useState(2);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  // Load slot data from API if not available from nav state or context
  useEffect(() => {
    const loadSlotData = async () => {
      if (slot && lot) return; // Already have both

      setLoading(true);
      try {
        let currentSlot = slot;
        if (!currentSlot) {
          currentSlot = await getParkingSlot(slotId);
          setSlot(currentSlot);
          if (currentSlot?.type) setVehicleType(currentSlot.type);
        }
        if (!lot && currentSlot?.parkingId) {
          const lotData = await getParkingLot(currentSlot.parkingId);
          setLot(lotData);
        }
      } catch (err) {
        console.error('Error loading slot:', err);
        setError('Selected slot could not be found.');
      } finally {
        setLoading(false);
      }
    };

    loadSlotData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slotId]);

  const pricePerHour = slot?.price || lot?.pricePerHour || 40;
  const estimatedTotal = calculateParkingFee(pricePerHour, duration);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !vehicleNumber) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload = {
      userId: user ? user.id : 'guest',
      userName: name,
      userPhone: phone,
      parkingId: slot.parkingId,
      parkingName: lot ? lot.name : 'Parking Lot',
      slotId: slot.id,
      slotNumber: slot.slotNumber,
      vehicleNumber: vehicleNumber.toUpperCase(),
      vehicleType,
      entryTime,
      duration: Number(duration),
      totalAmount: estimatedTotal,
    };

    try {
      const res = await reserveSlot(payload);
      setSubmitting(false);

      if (res.success) {
        setSuccessMessage(`Parking slot ${slot.slotNumber} reserved successfully!`);
        setTimeout(() => {
          navigate('/my-reservations');
        }, 1200);
      } else {
        setError(res.message || 'Failed to complete reservation.');
      }
    } catch (err) {
      setSubmitting(false);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  if (loading) return <Loader message="Loading slot details..." />;
  if (error && !slot) {
    return (
      <div className="section" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
        <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</h2>
        <Link to="/parking" className="btn btn-primary">
          <FaArrowLeft /> Back to Parking Locations
        </Link>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="section-container">
        <Link
          to={lot ? `/parking/${lot.id}` : '/parking'}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '1.5rem', fontWeight: '600' }}
        >
          <FaArrowLeft /> Back to Slot Selection
        </Link>

        <div className="reservation-container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>Reserve Parking Slot</h1>
            <p style={{ color: 'var(--slate-600)' }}>
              Complete the reservation details below to secure your parking spot.
            </p>
          </div>

          {successMessage && (
            <div
              style={{
                backgroundColor: 'var(--success-bg)',
                color: '#065f46',
                border: '1px solid var(--success-border)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                textAlign: 'center',
                fontWeight: '700',
              }}
            >
              🎉 {successMessage}
            </div>
          )}

          {error && (
            <div
              style={{
                backgroundColor: 'var(--danger-bg)',
                color: '#991b1b',
                border: '1px solid var(--danger-border)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.5rem',
                textAlign: 'center',
                fontWeight: '600',
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* SUMMARY HEADER BOX */}
          <div
            style={{
              background: 'linear-gradient(135deg, var(--dark-navy) 0%, var(--dark-slate) 100%)',
              color: '#ffffff',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)', textTransform: 'uppercase', fontWeight: '700' }}>
                LOCATION & SLOT
              </span>
              <h3 style={{ fontSize: '1.4rem', color: '#ffffff', margin: '2px 0' }}>{lot?.name || 'Parking Facility'}</h3>
              <span style={{ color: '#93c5fd', fontWeight: '600' }}>
                Slot #{slot?.slotNumber} ({slot?.floor || 'Ground Level'})
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)', textTransform: 'uppercase', fontWeight: '700' }}>
                HOURLY RATE
              </span>
              <h3 style={{ fontSize: '1.6rem', color: '#ffffff', margin: '2px 0' }}>₹{pricePerHour}/hr</h3>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  className="form-control"
                  required
                  placeholder="e.g. +91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Vehicle Registration Number *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="e.g. TS09AB1234"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Vehicle Type</label>
                <select
                  className="form-control"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                  <option value="SUV">SUV</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Expected Entry Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={entryTime}
                  onChange={(e) => setEntryTime(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Expected Duration (Hours)</label>
                <select
                  className="form-control"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                >
                  <option value={1}>1 Hour</option>
                  <option value={2}>2 Hours</option>
                  <option value={3}>3 Hours</option>
                  <option value={4}>4 Hours</option>
                  <option value={5}>5 Hours</option>
                  <option value={8}>8 Hours (Full Day)</option>
                </select>
              </div>
            </div>

            {/* FEE BREAKDOWN CARD */}
            <div className="fee-breakdown-card">
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.8rem', color: 'var(--dark-navy)' }}>
                Estimated Fee Summary
              </h4>
              <div className="fee-row">
                <span>Selected Slot:</span>
                <strong>{slot?.slotNumber}</strong>
              </div>
              <div className="fee-row">
                <span>Rate per hour:</span>
                <span>₹{pricePerHour}/hr</span>
              </div>
              <div className="fee-row">
                <span>Selected duration:</span>
                <span>{duration} hour(s)</span>
              </div>
              <div className="fee-row total">
                <span>Estimated Total:</span>
                <span>₹{estimatedTotal}</span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
              style={{ width: '100%', padding: '0.9rem', fontSize: '1.1rem' }}
            >
              {submitting ? 'Processing Reservation...' : 'Confirm Reservation'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReserveSlot;
