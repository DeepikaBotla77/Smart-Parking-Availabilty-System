import React from 'react';

const StatsCard = ({ title, count, icon: Icon, color = '#3b82f6', bg = '#dbeafe', trend }) => {
  return (
    <div className="stats-card">
      <div className="stats-icon-wrapper" style={{ backgroundColor: bg, color: color }}>
        {Icon && <Icon />}
      </div>
      <div className="stats-info">
        <h3>{count}</h3>
        <p>{title}</p>
        {trend && (
          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: color, marginTop: '2px', display: 'block' }}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
