import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaParking,
  FaSearch,
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
  FaMoneyBillWave,
  FaCar,
  FaMapMarkerAlt,
  FaArrowRight,
} from 'react-icons/fa';
import { useParking } from '../context/ParkingContext';
import StatsCard from '../components/StatsCard';
import ParkingCard from '../components/ParkingCard';
import Loader from '../components/Loader';

const Home = () => {
  const { parkingLots, parkingSlots, loading, error } = useParking();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Dynamic statistics calculation from API data (Requirement 27)
  const totalSlotsCount = parkingSlots.length || 60;
  const availableSlotsCount = parkingSlots.filter((s) => s.status === 'Available').length;
  const occupiedSlotsCount = parkingSlots.filter((s) => s.status === 'Occupied').length;
  const reservedSlotsCount = parkingSlots.filter((s) => s.status === 'Reserved').length;

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/parking?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/parking');
    }
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-container">
          <div>
            <div className="hero-badge">
              <FaParking /> Smart Real-Time Parking System
            </div>
            <h1 className="hero-title">
              Find Your Parking Spot. <span>Park Without The Hassle.</span>
            </h1>
            <p className="hero-subtitle">
              Discover available parking spaces in real time, reserve your spot in advance, and
              arrive at your destination stress-free.
            </p>

            <div className="hero-actions">
              <Link to="/parking" className="btn btn-primary" style={{ padding: '0.8rem 1.8rem', fontSize: '1.05rem' }}>
                Find Parking <FaArrowRight />
              </Link>
              <Link to="/my-reservations" className="btn btn-outline" style={{ padding: '0.8rem 1.8rem', fontSize: '1.05rem' }}>
                View My Reservations
              </Link>
            </div>

            <form onSubmit={handleHeroSearch} className="hero-search-card">
              <input
                type="text"
                className="hero-search-input"
                placeholder="Where do you want to park? (e.g. City Center, Mall...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <FaSearch /> Search Parking
              </button>
            </form>
          </div>

          <div className="hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1000&q=80"
              alt="ParkEase Smart Parking System"
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* SECTION 1: LIVE PARKING AVAILABILITY */}
      <section className="section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Live Parking Availability</h2>
            <p className="section-subtitle">Real-time status updates across all connected parking facilities.</p>
          </div>

          <div className="stats-grid">
            <StatsCard
              title="Total Slots"
              count={totalSlotsCount}
              icon={FaParking}
              color="#3b82f6"
              bg="#dbeafe"
              trend="Monitored 24/7"
            />
            <StatsCard
              title="Available Slots"
              count={availableSlotsCount}
              icon={FaCheckCircle}
              color="#10b981"
              bg="#d1fae5"
              trend="Ready to Reserve"
            />
            <StatsCard
              title="Occupied Slots"
              count={occupiedSlotsCount}
              icon={FaCar}
              color="#ef4444"
              bg="#fee2e2"
              trend="In Use Now"
            />
            <StatsCard
              title="Reserved Slots"
              count={reservedSlotsCount}
              icon={FaClock}
              color="#f59e0b"
              bg="#fef3c7"
              trend="Booked by Users"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW PARKEASE WORKS */}
      <section className="section section-alt">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">How ParkEase Works</h2>
            <p className="section-subtitle">Get your guaranteed parking spot in four easy steps.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Find Parking</h3>
              <p>Search for parking locations near your intended destination or venue.</p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Choose Slot</h3>
              <p>Inspect the live layout grid and select your preferred available slot.</p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Reserve</h3>
              <p>Enter your vehicle details, estimated duration, and confirm booking.</p>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Park & Go</h3>
              <p>Drive directly to your reserved slot without wasting a single minute.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: POPULAR PARKING AREAS */}
      <section className="section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Popular Parking Areas</h2>
            <p className="section-subtitle">Explore top-rated parking facilities with live availability status.</p>
          </div>

          {loading ? (
            <Loader message="Loading popular parking spaces..." />
          ) : error ? (
            <div style={{ textAlign: 'center', color: '#ef4444', padding: '2rem' }}>{error}</div>
          ) : (
            <div className="parking-grid">
              {parkingLots.slice(0, 4).map((parking) => (
                <ParkingCard key={parking.id} parking={parking} />
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/parking" className="btn btn-outline" style={{ color: 'var(--dark-navy)', borderColor: 'var(--slate-400)' }}>
              View All Parking Facilities <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE PARKEASE? */}
      <section className="section section-alt">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Why Choose ParkEase?</h2>
            <p className="section-subtitle">Built for reliability, speed, and absolute peace of mind.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)' }}>
              <div style={{ width: '48px', height: '48px', background: '#dbeafe', color: '#3b82f6', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>
                <FaClock />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Real-Time Availability</h3>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.95rem' }}>
                Live sensors and database synchronization reflect exact slot statuses instantly.
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)' }}>
              <div style={{ width: '48px', height: '48px', background: '#d1fae5', color: '#10b981', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>
                <FaCheckCircle />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Easy Reservation</h3>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.95rem' }}>
                Seamless 3-step booking flow guarantees your parking spot before you leave home.
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)' }}>
              <div style={{ width: '48px', height: '48px', background: '#fee2e2', color: '#ef4444', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>
                <FaShieldAlt />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Secure Parking</h3>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.95rem' }}>
                Monitored facilities equipped with 24/7 security cameras and access control.
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)' }}>
              <div style={{ width: '48px', height: '48px', background: '#fef3c7', color: '#f59e0b', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1rem' }}>
                <FaMoneyBillWave />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Transparent Pricing</h3>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.95rem' }}>
                No hidden costs or surge fees. See exact hourly rates and total estimate upfront.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CALL TO ACTION */}
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--dark-navy) 0%, #1e293b 100%)', color: '#ffffff', textAlign: 'center' }}>
        <div className="section-container" style={{ maxWidth: '700px' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '1rem' }}>
            Don't Waste Time Looking For Parking
          </h2>
          <p style={{ color: 'var(--slate-400)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Reserve your parking spot now and enjoy a smooth, stress-free journey every time.
          </p>
          <Link to="/parking" className="btn btn-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '1.1rem' }}>
            Find My Parking <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
