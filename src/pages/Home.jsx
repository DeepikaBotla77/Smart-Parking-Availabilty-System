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
  FaArrowRight,
  FaServer,
  FaCode,
  FaDatabase,
  FaCloudUploadAlt,
  FaLock,
  FaExchangeAlt,
} from 'react-icons/fa';
import { useParking } from '../context/ParkingContext';
import StatsCard from '../components/StatsCard';
import ParkingCard from '../components/ParkingCard';
import Loader from '../components/Loader';

const Home = () => {
  const { parkingLots, parkingSlots, loading, error } = useParking();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Dynamic statistics calculation from API data
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
              Find Your Spot. <span>Park With Zero Friction.</span>
            </h1>
            <p className="hero-subtitle">
              Discover available parking spaces in real time, reserve your spot in advance, and
              arrive at your destination stress-free.
            </p>

            <div className="hero-actions">
              <Link to="/parking" className="btn btn-white" style={{ padding: '0.8rem 1.8rem', fontSize: '1rem' }}>
                Find Parking <FaArrowRight />
              </Link>
              <Link to="/my-reservations" className="btn btn-outline" style={{ padding: '0.8rem 1.8rem', fontSize: '1rem' }}>
                View My Reservations
              </Link>
            </div>

            <form onSubmit={handleHeroSearch} className="hero-search-card">
              <input
                type="text"
                className="hero-search-input"
                placeholder="Where do you want to park? (e.g. City Center, Grand Mall...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-white">
                <FaSearch /> Search
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
              color="#000000"
              bg="#f4f4f5"
              trend="Monitored 24/7"
            />
            <StatsCard
              title="Available Slots"
              count={availableSlotsCount}
              icon={FaCheckCircle}
              color="#16a34a"
              bg="#f0fdf4"
              trend="Ready to Reserve"
            />
            <StatsCard
              title="Occupied Slots"
              count={occupiedSlotsCount}
              icon={FaCar}
              color="#dc2626"
              bg="#fef2f2"
              trend="In Use Now"
            />
            <StatsCard
              title="Reserved Slots"
              count={reservedSlotsCount}
              icon={FaClock}
              color="#d97706"
              bg="#fffbeb"
              trend="Booked by Users"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW PARKEASE WORKS */}
      <section className="section section-alt" style={{ borderTop: '1px solid var(--slate-200)', borderBottom: '1px solid var(--slate-200)' }}>
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
            <div style={{ textAlign: 'center', color: '#dc2626', padding: '2rem' }}>{error}</div>
          ) : (
            <div className="parking-grid">
              {parkingLots.slice(0, 4).map((parking) => (
                <ParkingCard key={parking.id} parking={parking} />
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/parking" className="btn btn-outline-dark" style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>
              View All Parking Facilities <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE PARKEASE? */}
      <section className="section section-alt" style={{ borderTop: '1px solid var(--slate-200)', borderBottom: '1px solid var(--slate-200)' }}>
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Why Choose ParkEase?</h2>
            <p className="section-subtitle">Built for reliability, speed, and absolute peace of mind.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ width: '48px', height: '48px', background: '#000000', color: '#ffffff', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1.2rem' }}>
                <FaClock />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#000000' }}>Real-Time Availability</h3>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.95rem' }}>
                Live slot sensors and database synchronization reflect exact spot status instantly.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ width: '48px', height: '48px', background: '#000000', color: '#ffffff', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1.2rem' }}>
                <FaCheckCircle />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#000000' }}>Instant Reservation</h3>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.95rem' }}>
                Seamless 3-step booking flow guarantees your parking spot before you depart.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ width: '48px', height: '48px', background: '#000000', color: '#ffffff', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1.2rem' }}>
                <FaShieldAlt />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#000000' }}>Secure & Monitored</h3>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.95rem' }}>
                Facilities monitored 24/7 with camera surveillance, access control, and user auth.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ width: '48px', height: '48px', background: '#000000', color: '#ffffff', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '1.2rem' }}>
                <FaMoneyBillWave />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#000000' }}>Transparent Pricing</h3>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.95rem' }}>
                No hidden fees or surprise charges. Upfront hourly rates and instant fee estimation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: TECHNOLOGY STACK & ARCHITECTURE (Interviews & Deployment Showcase) */}
      <section className="tech-section">
        <div className="section-container">
          <div className="section-header">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#18181b', padding: '6px 16px', borderRadius: 'var(--radius-full)', border: '1px solid #3f3f46', fontSize: '0.85rem', color: '#ffffff', marginBottom: '1rem' }}>
              <FaCode /> Full-Stack Architecture
            </div>
            <h2 className="section-title" style={{ color: '#ffffff' }}>Technologies Used in This Project</h2>
            <p className="section-subtitle" style={{ color: '#a1a1aa' }}>
              Enterprise-grade tech stack powering the frontend client, backend REST services, and deployment pipeline.
            </p>
          </div>

          <div className="tech-grid">
            {/* FRONTEND */}
            <div className="tech-category-card">
              <div className="tech-category-header">
                <div className="tech-category-icon">
                  <FaCode />
                </div>
                <div>
                  <h3 className="tech-category-title">Frontend Stack</h3>
                  <span className="tech-category-badge">Client Layer (SPA)</span>
                </div>
              </div>
              <div className="tech-list">
                <div className="tech-item">
                  <div className="tech-item-icon">⚛️</div>
                  <div>
                    <div className="tech-item-name">React 18</div>
                    <div className="tech-item-desc">Component-based UI with Hooks & Context API</div>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-item-icon">⚡</div>
                  <div>
                    <div className="tech-item-name">Vite 8</div>
                    <div className="tech-item-desc">Next-generation blazing fast build tool & dev server</div>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-item-icon">🧭</div>
                  <div>
                    <div className="tech-item-name">React Router v7</div>
                    <div className="tech-item-desc">Client-side declarative routing & protected admin guards</div>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-item-icon">📡</div>
                  <div>
                    <div className="tech-item-name">Axios</div>
                    <div className="tech-item-desc">Promise-based HTTP client for RESTful API calls</div>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-item-icon">🎨</div>
                  <div>
                    <div className="tech-item-name">Vanilla CSS & Tokens</div>
                    <div className="tech-item-desc">Custom responsive design system with monochrome styling</div>
                  </div>
                </div>
              </div>
            </div>

            {/* BACKEND */}
            <div className="tech-category-card">
              <div className="tech-category-header">
                <div className="tech-category-icon">
                  <FaServer />
                </div>
                <div>
                  <h3 className="tech-category-title">Backend Stack</h3>
                  <span className="tech-category-badge">API & Business Logic</span>
                </div>
              </div>
              <div className="tech-list">
                <div className="tech-item">
                  <div className="tech-item-icon">☕</div>
                  <div>
                    <div className="tech-item-name">Java 17 (LTS)</div>
                    <div className="tech-item-desc">Core enterprise object-oriented programming language</div>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-item-icon">🍃</div>
                  <div>
                    <div className="tech-item-name">Spring Boot 3.2</div>
                    <div className="tech-item-desc">REST API controllers, Dependency Injection, Services</div>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-item-icon">🗄️</div>
                  <div>
                    <div className="tech-item-name">Spring Data JPA / Hibernate</div>
                    <div className="tech-item-desc">Object-Relational Mapping (ORM) and repository queries</div>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-item-icon">🛡️</div>
                  <div>
                    <div className="tech-item-name">Spring Security & JWT</div>
                    <div className="tech-item-desc">Stateless token authentication, BCrypt password hashing</div>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-item-icon">📦</div>
                  <div>
                    <div className="tech-item-name">Lombok & Maven</div>
                    <div className="tech-item-desc">Code boilerplate reduction and project dependency build</div>
                  </div>
                </div>
              </div>
            </div>

            {/* DATABASE & DEPLOYMENT */}
            <div className="tech-category-card">
              <div className="tech-category-header">
                <div className="tech-category-icon">
                  <FaCloudUploadAlt />
                </div>
                <div>
                  <h3 className="tech-category-title">Database & Deployment</h3>
                  <span className="tech-category-badge">Infrastructure & Cloud</span>
                </div>
              </div>
              <div className="tech-list">
                <div className="tech-item">
                  <div className="tech-item-icon">🐬</div>
                  <div>
                    <div className="tech-item-name">MySQL 8.0 / H2</div>
                    <div className="tech-item-desc">Relational database with schema relations and indexing</div>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-item-icon">🚀</div>
                  <div>
                    <div className="tech-item-name">Frontend: Vercel / Netlify</div>
                    <div className="tech-item-desc">Global Edge CDN hosting with continuous Git deployment</div>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-item-icon">☁️</div>
                  <div>
                    <div className="tech-item-name">Backend: Railway / Render / AWS</div>
                    <div className="tech-item-desc">Containerized Spring Boot jar hosting with auto-scaling</div>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-item-icon">🗃️</div>
                  <div>
                    <div className="tech-item-name">Cloud DB: AWS RDS / PlanetScale</div>
                    <div className="tech-item-desc">Managed cloud MySQL instance with SSL connections</div>
                  </div>
                </div>
                <div className="tech-item">
                  <div className="tech-item-icon">🔄</div>
                  <div>
                    <div className="tech-item-name">JSON Server (Dev Mode)</div>
                    <div className="tech-item-desc">Rapid development and real-time frontend prototyping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE ARCHITECTURE FLOW */}
          <div className="tech-architecture-banner">
            <h3 style={{ fontSize: '1.2rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaExchangeAlt /> End-to-End System Dataflow
            </h3>
            <div className="arch-flow">
              <div className="arch-node">
                <div className="arch-node-title">Client Browser</div>
                <div className="arch-node-sub">React 18 + UI Components</div>
              </div>
              <div className="arch-arrow">➔</div>
              <div className="arch-node">
                <div className="arch-node-title">REST API Layer</div>
                <div className="arch-node-sub">Axios JSON + JWT Auth</div>
              </div>
              <div className="arch-arrow">➔</div>
              <div className="arch-node">
                <div className="arch-node-title">Spring Boot App</div>
                <div className="arch-node-sub">Controllers & Services</div>
              </div>
              <div className="arch-arrow">➔</div>
              <div className="arch-node">
                <div className="arch-node-title">MySQL Database</div>
                <div className="arch-node-sub">Slots & Reservations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CALL TO ACTION */}
      <section className="section" style={{ background: '#000000', color: '#ffffff', textAlign: 'center' }}>
        <div className="section-container" style={{ maxWidth: '720px' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '1rem' }}>
            Ready to Experience Smart Parking?
          </h2>
          <p style={{ color: '#a1a1aa', fontSize: '1.1rem', marginBottom: '2.2rem' }}>
            Reserve your parking spot now and enjoy a smooth, hassle-free journey every time.
          </p>
          <Link to="/parking" className="btn btn-white" style={{ padding: '0.9rem 2.4rem', fontSize: '1.1rem' }}>
            Find My Parking <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
