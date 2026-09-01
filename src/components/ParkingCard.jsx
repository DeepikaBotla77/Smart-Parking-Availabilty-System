import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';

const ParkingCard = ({ parking }) => {
  const { id, name, location, totalSlots, availableSlots, pricePerHour, image } = parking;

  return (
    <div className="parking-card">
      <div className="parking-card-img-wrapper">
        <img src={image} alt={name} className="parking-card-img" />
        <div className="parking-card-price-badge">₹{pricePerHour}/hr</div>
      </div>

      <div className="parking-card-body">
        <h3 className="parking-card-title">{name}</h3>
        <p className="parking-card-location">
          <FaMapMarkerAlt style={{ color: '#ef4444' }} /> {location}
        </p>

        <div className="parking-card-stats">
          <div className="parking-card-stats-item">
            <span className="parking-card-stats-label">Available</span>
            <span className="parking-card-stats-val" style={{ color: '#10b981' }}>
              {availableSlots} slots
            </span>
          </div>
          <div className="parking-card-stats-item">
            <span className="parking-card-stats-label">Total Capacity</span>
            <span className="parking-card-stats-val">{totalSlots} slots</span>
          </div>
        </div>

        <Link to={`/parking/${id}`} className="btn btn-primary" style={{ marginTop: 'auto', width: '100%' }}>
          View Slots <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default ParkingCard;
