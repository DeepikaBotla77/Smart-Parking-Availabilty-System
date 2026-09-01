import React, { useState, useMemo } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  FaChartLine,
  FaParking,
  FaThList,
  FaTicketAlt,
  FaFilter,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import { useParking } from '../context/ParkingContext';
import Loader from '../components/Loader';

const ManageReservations = () => {
  const { reservations, updateReservationStatusAdmin, loading } = useParking();
  const [filterTab, setFilterTab] = useState('All');

  const filteredReservations = useMemo(() => {
    if (filterTab === 'All') return reservations;
    return reservations.filter((r) => r.status?.toLowerCase() === filterTab.toLowerCase());
  }, [reservations, filterTab]);

  const handleStatusChange = async (resId, newStatus, slotId, parkingId) => {
    await updateReservationStatusAdmin(resId, newStatus, slotId, parkingId);
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div style={{ paddingBottom: '1.2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h3 style={{ color: '#ffffff', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaParking style={{ color: 'var(--primary-color)' }} /> ParkEase Admin
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)' }}>Reservations Manager</span>
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
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '0.3rem' }}>System Reservations</h1>
            <p style={{ color: 'var(--slate-600)' }}>
              Monitor customer bookings, update ticket states, and process completions or cancellations.
            </p>
          </div>

          {/* FILTER TABS */}
          <div style={{ display: 'flex', gap: '6px', background: '#ffffff', padding: '6px', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
            {['All', 'Active', 'Completed', 'Cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className="btn"
                style={{
                  padding: '0.45rem 1rem',
                  fontSize: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: filterTab === tab ? 'var(--dark-navy)' : 'transparent',
                  color: filterTab === tab ? '#ffffff' : 'var(--slate-600)',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <Loader message="Loading system reservations..." />
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Customer Name & Phone</th>
                  <th>Parking Facility</th>
                  <th>Slot #</th>
                  <th>Vehicle Info</th>
                  <th>Entry & Duration</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((r) => (
                  <tr key={r.id}>
                    <td><strong>#{r.id}</strong></td>
                    <td>
                      <div>
                        <strong>{r.userName}</strong>
                        <div style={{ fontSize: '0.78rem', color: 'var(--slate-600)' }}>{r.userPhone}</div>
                      </div>
                    </td>
                    <td>{r.parkingName}</td>
                    <td><span className="badge badge-active">{r.slotNumber}</span></td>
                    <td>{r.vehicleNumber} ({r.vehicleType})</td>
                    <td>{r.entryTime} ({r.duration} hrs)</td>
                    <td><strong>₹{r.totalAmount}</strong></td>
                    <td>
                      <span className={`badge badge-${r.status?.toLowerCase()}`}>
                        {r.status}
                      </span>
                    </td>
                    <td>
                      <select
                        className="form-control"
                        style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem', width: 'auto' }}
                        value={r.status}
                        onChange={(e) =>
                          handleStatusChange(r.id, e.target.value, r.slotId, r.parkingId)
                        }
                      >
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageReservations;
