import React, { useState, useMemo } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  FaChartLine,
  FaParking,
  FaThList,
  FaTicketAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaFilter,
} from 'react-icons/fa';
import { useParking } from '../context/ParkingContext';
import Modal from '../components/Modal';
import Loader from '../components/Loader';

const ManageSlots = () => {
  const { parkingSlots, parkingLots, addSlotAdmin, editSlotAdmin, deleteSlotAdmin, loading } = useParking();

  const [statusFilter, setStatusFilter] = useState('All');
  const [areaFilter, setAreaFilter] = useState('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);

  // Form states
  const [parkingId, setParkingId] = useState('1');
  const [slotNumber, setSlotNumber] = useState('');
  const [type, setType] = useState('Car');
  const [status, setStatus] = useState('Available');
  const [floor, setFloor] = useState('Ground Floor');
  const [price, setPrice] = useState(40);
  const [saving, setSaving] = useState(false);

  const filteredSlots = useMemo(() => {
    return parkingSlots.filter((slot) => {
      const matchStatus = statusFilter === 'All' || slot.status === statusFilter;
      const matchArea = areaFilter === 'All' || slot.parkingId === areaFilter;
      return matchStatus && matchArea;
    });
  }, [parkingSlots, statusFilter, areaFilter]);

  const handleOpenAdd = () => {
    setEditingSlot(null);
    setParkingId('1');
    setSlotNumber(`A${Math.floor(10 + Math.random() * 90)}`);
    setType('Car');
    setStatus('Available');
    setFloor('Ground Floor');
    setPrice(40);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (slot) => {
    setEditingSlot(slot);
    setParkingId(slot.parkingId || '1');
    setSlotNumber(slot.slotNumber || '');
    setType(slot.type || 'Car');
    setStatus(slot.status || 'Available');
    setFloor(slot.floor || 'Ground Floor');
    setPrice(slot.price || 40);
    setIsModalOpen(true);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      parkingId,
      slotNumber,
      type,
      status,
      floor,
      price: Number(price),
    };

    if (editingSlot) {
      await editSlotAdmin(editingSlot.id, payload);
    } else {
      await addSlotAdmin({
        id: `slot-${parkingId}-${slotNumber}`,
        ...payload,
      });
    }

    setSaving(false);
    setIsModalOpen(false);
  };

  const handleStatusChangeInline = async (slotId, newStatus) => {
    await editSlotAdmin(slotId, { status: newStatus });
  };

  const handleDelete = async (slotId) => {
    if (window.confirm('Are you sure you want to delete this parking slot?')) {
      await deleteSlotAdmin(slotId);
    }
  };

  const getLotName = (pId) => {
    const found = parkingLots.find((l) => String(l.id) === String(pId));
    return found ? found.name : `Parking Facility #${pId}`;
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div style={{ paddingBottom: '1.2rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h3 style={{ color: '#ffffff', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaParking style={{ color: 'var(--primary-color)' }} /> ParkEase Admin
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)' }}>Slot Management</span>
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
            <h1 style={{ fontSize: '2.2rem', marginBottom: '0.3rem' }}>Manage Parking Slots</h1>
            <p style={{ color: 'var(--slate-600)' }}>
              Add, update slot status, edit pricing, or remove parking slots across facilities.
            </p>
          </div>

          <button className="btn btn-primary" onClick={handleOpenAdd}>
            <FaPlus /> Add New Slot
          </button>
        </div>

        {/* FILTERS */}
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
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ fontWeight: '600', color: 'var(--slate-600)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FaFilter style={{ color: 'var(--primary-color)' }} /> Filter Slots:
          </div>

          <select
            className="form-control"
            style={{ width: 'auto', minWidth: '160px' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Reserved">Reserved</option>
          </select>

          <select
            className="form-control"
            style={{ width: 'auto', minWidth: '200px' }}
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
          >
            <option value="All">All Parking Areas</option>
            {parkingLots.map((lot) => (
              <option key={lot.id} value={lot.id}>
                {lot.name}
              </option>
            ))}
          </select>

          <span style={{ marginLeft: 'auto', fontWeight: '700', color: 'var(--slate-600)', fontSize: '0.9rem' }}>
            Showing {filteredSlots.length} of {parkingSlots.length} slots
          </span>
        </div>

        {/* TABLE */}
        {loading ? (
          <Loader message="Updating slots..." />
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Slot #</th>
                  <th>Parking Facility</th>
                  <th>Floor Level</th>
                  <th>Vehicle Type</th>
                  <th>Hourly Price</th>
                  <th>Current Status</th>
                  <th>Quick Action</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {filteredSlots.map((slot) => (
                  <tr key={slot.id}>
                    <td>
                      <strong style={{ fontSize: '1.1rem', color: 'var(--primary-dark)' }}>{slot.slotNumber}</strong>
                    </td>
                    <td>{getLotName(slot.parkingId)}</td>
                    <td>{slot.floor || 'Ground Floor'}</td>
                    <td><span className="badge badge-active">{slot.type}</span></td>
                    <td><strong>₹{slot.price || 40}</strong></td>
                    <td>
                      <span className={`badge badge-${slot.status?.toLowerCase()}`}>
                        {slot.status}
                      </span>
                    </td>
                    <td>
                      <select
                        className="form-control"
                        style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem', width: 'auto' }}
                        value={slot.status}
                        onChange={(e) => handleStatusChangeInline(slot.id, e.target.value)}
                      >
                        <option value="Available">Available</option>
                        <option value="Occupied">Occupied</option>
                        <option value="Reserved">Reserved</option>
                      </select>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          className="btn btn-outline"
                          onClick={() => handleOpenEdit(slot)}
                          style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem', color: 'var(--dark-navy)', borderColor: 'var(--slate-400)' }}
                          title="Edit slot details"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(slot.id)}
                          style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                          title="Delete slot"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ADD / EDIT MODAL */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingSlot ? `Edit Slot ${editingSlot.slotNumber}` : 'Add New Parking Slot'}
        >
          <form onSubmit={handleSubmitForm}>
            <div className="form-group">
              <label className="form-label">Parking Area</label>
              <select
                className="form-control"
                value={parkingId}
                onChange={(e) => setParkingId(e.target.value)}
              >
                {parkingLots.map((lot) => (
                  <option key={lot.id} value={lot.id}>
                    {lot.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Slot Number (e.g. A06)</label>
              <input
                type="text"
                className="form-control"
                required
                value={slotNumber}
                onChange={(e) => setSlotNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Vehicle Type</label>
              <select
                className="form-control"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="SUV">SUV</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Initial Status</label>
              <select
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Reserved">Reserved</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Floor / Section</label>
              <input
                type="text"
                className="form-control"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                placeholder="Ground Floor, Basement 1..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Price per Hour (₹)</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setIsModalOpen(false)}
                style={{ color: 'var(--dark-slate)', borderColor: 'var(--slate-400)' }}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving...' : editingSlot ? 'Update Slot' : 'Create Slot'}
              </button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
};

export default ManageSlots;
