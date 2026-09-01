import React from 'react';
import { FaCar, FaMotorcycle, FaTruckMonster, FaCheckCircle, FaLock, FaTimesCircle } from 'react-icons/fa';

const ParkingSlot = ({ slot, isSelected, onSelect }) => {
  const { slotNumber, status, type, price } = slot;

  const renderVehicleIcon = () => {
    switch (type?.toLowerCase()) {
      case 'bike':
      case 'motorcycle':
        return <FaMotorcycle className="slot-type-icon" />;
      case 'suv':
        return <FaTruckMonster className="slot-type-icon" />;
      case 'car':
      default:
        return <FaCar className="slot-type-icon" />;
    }
  };

  const renderStatusIcon = () => {
    if (isSelected) return <FaCheckCircle style={{ color: '#3b82f6' }} />;
    switch (status?.toLowerCase()) {
      case 'available':
        return <span style={{ color: '#10b981', fontWeight: 'bold' }}>•</span>;
      case 'occupied':
        return <FaTimesCircle style={{ color: '#ef4444' }} />;
      case 'reserved':
        return <FaLock style={{ color: '#f59e0b' }} />;
      default:
        return null;
    }
  };

  const isAvailable = status === 'Available';

  const handleClick = () => {
    if (isAvailable && onSelect) {
      onSelect(slot);
    }
  };

  return (
    <div
      className={`slot-box status-${status?.toLowerCase()} ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      title={`${slotNumber} - ${status} (${type}) - ₹${price}/hr`}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
        <span className="slot-status-text">{type}</span>
        {renderStatusIcon()}
      </div>

      {renderVehicleIcon()}

      <span className="slot-number">{slotNumber}</span>

      <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--slate-600)' }}>
        ₹{price}/hr
      </span>
    </div>
  );
};

export default ParkingSlot;
