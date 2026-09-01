import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  FaChartLine,
  FaParking,
  FaThList,
  FaTicketAlt,
  FaUsers,
  FaSignOutAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaRupeeSign,
} from 'react-icons/fa';
import { useParking } from '../context/ParkingContext';
import StatsCard from '../components/StatsCard';

const AdminDashboard = () => {
  const { parkingSlots, reservations, parkingLots, user, logout } = useParking();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Metrics calculation
  const totalSlotsCount = parkingSlots.length;
  const availableCount = parkingSlots.filter((s) => s.status === 'Available').length;
  const occupiedCount = parkingSlots.filter((s) => s.status === 'Occupied').length;
  const reservedCount = parkingSlots.filter((s) => s.status === 'Reserved').length;

  const totalReservationsCount = reservations.length;
  const totalRevenue = reservations.reduce((acc, r) => acc + (Number(r.totalAmount) || 0), 0);

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div style={{ paddingBottom: '1.2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h3 style={{ color: '#ffffff', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaParking style={{ color: 'var(--primary-color)' }} /> ParkEase Admin
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)' }}>Manager Control Panel</span>
        </div>

        <ul className="sidebar-nav">
          <li>
            <NavLink to="/admin" end className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}>
              <FaChartLine /> Dashboard Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/slots" className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}>
              <FaThList /> Manage Slots
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/reservations" className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}>
              <FaTicketAlt /> Manage Reservations
            </NavLink>
          </li>
          <li>
            <Link to="/parking" className="sidebar-link">
              <FaParking /> View Public Lots
            </Link>
          </li>
        </ul>

        <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--slate-400)', marginBottom: '8px' }}>
            Logged as: <strong>{user?.name || 'Admin'}</strong>
          </div>
          <button className="btn btn-outline" onClick={handleLogout} style={{ width: '100%', padding: '0.5rem', fontSize: '0.85rem' }}>
            <FaSignOutAlt /> Admin Logout
          </button>
        </div>
      </aside>

      {/* MAIN DASHBOARD CONTENT */}
      <main className="admin-main">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.3rem' }}>System Dashboard</h1>
          <p style={{ color: 'var(--slate-600)', fontSize: '1rem' }}>
            Real-time occupancy statistics, facility metrics, and revenue analytics.
          </p>
        </div>

        {/* METRICS CARDS */}
        <div className="stats-grid" style={{ marginBottom: '2.5rem' }}>
          <StatsCard
            title="Total Parking Slots"
            count={totalSlotsCount}
            icon={FaParking}
            color="#3b82f6"
            bg="#dbeafe"
          />
          <StatsCard
            title="Available Slots"
            count={availableCount}
            icon={FaCheckCircle}
            color="#10b981"
            bg="#d1fae5"
          />
          <StatsCard
            title="Occupied Slots"
            count={occupiedCount}
            icon={FaTimesCircle}
            color="#ef4444"
            bg="#fee2e2"
          />
          <StatsCard
            title="Reserved Slots"
            count={reservedCount}
            icon={FaClock}
            color="#f59e0b"
            bg="#fef3c7"
          />
          <StatsCard
            title="Total Reservations"
            count={totalReservationsCount}
            icon={FaTicketAlt}
            color="#6366f1"
            bg="#e0e7ff"
          />
          <StatsCard
            title="Estimated Revenue"
            count={`₹${totalRevenue}`}
            icon={FaRupeeSign}
            color="#059669"
            bg="#ecfdf5"
          />
        </div>

        {/* RECENT RESERVATION OVERVIEW TABLE */}
        <div style={{ backgroundColor: '#ffffff', padding: '1.8rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--card-shadow)', border: '1px solid var(--slate-200)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <h3 style={{ fontSize: '1.3rem' }}>Recent Reservations Overview</h3>
            <Link to="/admin/reservations" className="btn btn-outline" style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem', color: 'var(--dark-navy)', borderColor: 'var(--slate-400)' }}>
              View All Reservations
            </Link>
          </div>

          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Customer Name</th>
                  <th>Parking Facility</th>
                  <th>Slot Number</th>
                  <th>Vehicle Number</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reservations.slice(0, 5).map((r) => (
                  <tr key={r.id}>
                    <td><strong>#{r.id}</strong></td>
                    <td>{r.userName}</td>
                    <td>{r.parkingName}</td>
                    <td><span className="badge badge-active">{r.slotNumber}</span></td>
                    <td>{r.vehicleNumber} ({r.vehicleType})</td>
                    <td><strong>₹{r.totalAmount}</strong></td>
                    <td>
                      <span className={`badge badge-${r.status?.toLowerCase()}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
