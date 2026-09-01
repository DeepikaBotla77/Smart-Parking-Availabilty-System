export const getAvailableSlots = (slots = []) => {
  return slots.filter((slot) => slot.status === 'Available');
};

export const getOccupiedSlots = (slots = []) => {
  return slots.filter((slot) => slot.status === 'Occupied');
};

export const getReservedSlots = (slots = []) => {
  return slots.filter((slot) => slot.status === 'Reserved');
};

export const getStatusBadgeClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'available':
      return 'badge-available';
    case 'occupied':
      return 'badge-occupied';
    case 'reserved':
      return 'badge-reserved';
    case 'active':
      return 'badge-active';
    case 'completed':
      return 'badge-completed';
    case 'cancelled':
      return 'badge-cancelled';
    default:
      return 'badge-default';
  }
};

export const groupSlotsByFloor = (slots = []) => {
  return slots.reduce((acc, slot) => {
    const floor = slot.floor || 'General Level';
    if (!acc[floor]) acc[floor] = [];
    acc[floor].push(slot);
    return acc;
  }, {});
};
