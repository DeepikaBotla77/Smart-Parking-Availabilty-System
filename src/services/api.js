import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JSON Server v1 may return { data: [...] } or a plain array.
// This helper normalizes the response so we always get an array.
const normalizeArray = (data) => {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    // Single object returned by id lookup
    return data;
  }
  return [];
};

// Parking Lots API
export const getParkingLots = async () => {
  const response = await api.get('/parkingLots');
  return normalizeArray(response.data);
};

export const getParkingLot = async (id) => {
  const response = await api.get(`/parkingLots/${id}`);
  return response.data;
};

export const createParkingLot = async (lotData) => {
  const response = await api.post('/parkingLots', lotData);
  return response.data;
};

export const updateParkingLot = async (id, lotData) => {
  const response = await api.put(`/parkingLots/${id}`, lotData);
  return response.data;
};

export const deleteParkingLot = async (id) => {
  const response = await api.delete(`/parkingLots/${id}`);
  return response.data;
};

// Parking Slots API
export const getAllParkingSlots = async () => {
  const response = await api.get('/parkingSlots');
  return normalizeArray(response.data);
};

// Fetch slots filtered by parkingId (client-side filter for JSON Server v1 compat)
export const getParkingSlots = async (parkingId) => {
  const allSlots = await getAllParkingSlots();
  return allSlots.filter((slot) => String(slot.parkingId) === String(parkingId));
};

export const getParkingSlot = async (id) => {
  const response = await api.get(`/parkingSlots/${id}`);
  return response.data;
};

export const createSlot = async (slotData) => {
  const response = await api.post('/parkingSlots', slotData);
  return response.data;
};

export const updateSlot = async (id, slotData) => {
  const response = await api.patch(`/parkingSlots/${id}`, slotData);
  return response.data;
};

export const deleteSlot = async (id) => {
  const response = await api.delete(`/parkingSlots/${id}`);
  return response.data;
};

// Reservations API
export const getReservations = async () => {
  const response = await api.get('/reservations');
  return normalizeArray(response.data);
};

// Fetch user reservations (client-side filter for JSON Server v1 compat)
export const getUserReservations = async (userId) => {
  const allReservations = await getReservations();
  return allReservations.filter((r) => String(r.userId) === String(userId));
};

export const createReservation = async (reservationData) => {
  const response = await api.post('/reservations', reservationData);
  return response.data;
};

export const updateReservationStatus = async (id, status) => {
  const response = await api.patch(`/reservations/${id}`, { status });
  return response.data;
};

export const cancelReservation = async (id) => {
  const response = await api.patch(`/reservations/${id}`, { status: 'Cancelled' });
  return response.data;
};

// Users API
export const getUsers = async () => {
  const response = await api.get('/users');
  return normalizeArray(response.data);
};

export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

// Login (client-side filter for JSON Server v1 compat)
export const loginUserApi = async (email, password) => {
  const allUsers = await getUsers();
  return allUsers.filter(
    (u) => u.email === email && u.password === password
  );
};

export default api;
