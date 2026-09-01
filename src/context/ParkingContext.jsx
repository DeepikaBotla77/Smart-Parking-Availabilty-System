import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import {
  getParkingLots as apiGetParkingLots,
  getAllParkingSlots as apiGetAllParkingSlots,
  getReservations as apiGetReservations,
  getUserReservations as apiGetUserReservations,
  createReservation as apiCreateReservation,
  updateSlot as apiUpdateSlot,
  createSlot as apiCreateSlot,
  deleteSlot as apiDeleteSlot,
  cancelReservation as apiCancelReservation,
  loginUserApi,
  createUser as apiCreateUser,
  updateReservationStatus as apiUpdateReservationStatus,
  getParkingLot as apiGetParkingLot,
  updateParkingLot as apiUpdateParkingLot
} from '../services/api';

const ParkingContext = createContext();

export const ParkingProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('parkease_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [parkingLots, setParkingLots] = useState([]);
  const [parkingSlots, setParkingSlots] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshParkingData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [lotsData, slotsData, reservationsData] = await Promise.all([
        apiGetParkingLots(),
        apiGetAllParkingSlots(),
        apiGetReservations(),
      ]);

      setParkingLots(lotsData || []);
      setParkingSlots(slotsData || []);
      setReservations(reservationsData || []);
    } catch (err) {
      console.error('Failed to fetch parking data:', err);
      setError('Unable to load parking data. Please ensure JSON Server is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshParkingData();
  }, [refreshParkingData]);

  // Sync user state with localStorage
  const handleSetUser = (userData) => {
    if (userData) {
      localStorage.setItem('parkease_user', JSON.stringify(userData));
      setUser(userData);
    } else {
      localStorage.removeItem('parkease_user');
      setUser(null);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const users = await loginUserApi(email, password);
      if (users && users.length > 0) {
        const loggedUser = users[0];
        handleSetUser(loggedUser);
        return { success: true, user: loggedUser };
      } else {
        const fallbackMsg = 'Invalid email or password.';
        setError(fallbackMsg);
        return { success: false, message: fallbackMsg };
      }
    } catch (err) {
      console.error('Login error:', err);
      const msg = 'Login failed. Check server connection.';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    handleSetUser(null);
    setSelectedSlot(null);
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await apiCreateUser({
        ...userData,
        role: 'user',
      });
      handleSetUser(newUser);
      return { success: true, user: newUser };
    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Try again.');
      return { success: false, message: 'Registration failed.' };
    } finally {
      setLoading(false);
    }
  };

  const selectSlot = useCallback((slot) => {
    if (slot.status !== 'Available') return;
    setSelectedSlot(slot);
  }, []);

  const clearSelectedSlot = useCallback(() => {
    setSelectedSlot(null);
  }, []);

  const reserveSlot = async (reservationPayload) => {
    setLoading(true);
    try {
      // 1. Create reservation record
      const newReservation = await apiCreateReservation({
        ...reservationPayload,
        status: 'Active',
        createdAt: new Date().toISOString(),
      });

      // 2. Update slot status from Available -> Reserved
      await apiUpdateSlot(reservationPayload.slotId, { status: 'Reserved' });

      // 3. Update parking lot availableSlots count
      if (reservationPayload.parkingId) {
        const lot = await apiGetParkingLot(reservationPayload.parkingId);
        if (lot && lot.availableSlots > 0) {
          const updatedAvailable = lot.availableSlots - 1;
          await apiUpdateParkingLot(lot.id, { ...lot, availableSlots: updatedAvailable });
        }
      }

      // 4. Refresh local data & clear selection
      setSelectedSlot(null);
      await refreshParkingData();
      return { success: true, reservation: newReservation };
    } catch (err) {
      console.error('Reservation error:', err);
      return { success: false, message: 'Reservation failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const cancelUserReservation = async (reservationId, slotId, parkingId) => {
    setLoading(true);
    try {
      // 1. Change reservation status to Cancelled
      await apiCancelReservation(reservationId);

      // 2. Change slot status back to Available
      if (slotId) {
        await apiUpdateSlot(slotId, { status: 'Available' });
      }

      // 3. Increment lot availableSlots count
      if (parkingId) {
        const lot = await apiGetParkingLot(parkingId);
        if (lot) {
          const updatedAvailable = Math.min(lot.totalSlots, (lot.availableSlots || 0) + 1);
          await apiUpdateParkingLot(lot.id, { ...lot, availableSlots: updatedAvailable });
        }
      }

      await refreshParkingData();
      return { success: true };
    } catch (err) {
      console.error('Cancel reservation error:', err);
      return { success: false, message: 'Failed to cancel reservation.' };
    } finally {
      setLoading(false);
    }
  };

  const updateReservationStatusAdmin = async (reservationId, newStatus, slotId, parkingId) => {
    setLoading(true);
    try {
      await apiUpdateReservationStatus(reservationId, newStatus);

      // If status completed or cancelled, make slot Available
      if (newStatus === 'Completed' || newStatus === 'Cancelled') {
        if (slotId) {
          await apiUpdateSlot(slotId, { status: 'Available' });
        }
        if (parkingId) {
          const lot = await apiGetParkingLot(parkingId);
          if (lot) {
            const updatedAvailable = Math.min(lot.totalSlots, (lot.availableSlots || 0) + 1);
            await apiUpdateParkingLot(lot.id, { ...lot, availableSlots: updatedAvailable });
          }
        }
      } else if (newStatus === 'Active' && slotId) {
        await apiUpdateSlot(slotId, { status: 'Occupied' });
      }

      await refreshParkingData();
      return { success: true };
    } catch (err) {
      console.error('Admin reservation update error:', err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const addSlotAdmin = async (slotData) => {
    setLoading(true);
    try {
      const newSlot = await apiCreateSlot(slotData);
      await refreshParkingData();
      return { success: true, slot: newSlot };
    } catch (err) {
      console.error('Add slot error:', err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const editSlotAdmin = async (id, slotData) => {
    setLoading(true);
    try {
      const updated = await apiUpdateSlot(id, slotData);
      await refreshParkingData();
      return { success: true, slot: updated };
    } catch (err) {
      console.error('Edit slot error:', err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const deleteSlotAdmin = async (id) => {
    setLoading(true);
    try {
      await apiDeleteSlot(id);
      await refreshParkingData();
      return { success: true };
    } catch (err) {
      console.error('Delete slot error:', err);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParkingContext.Provider
      value={{
        user,
        parkingLots,
        parkingSlots,
        reservations,
        selectedSlot,
        loading,
        error,
        login,
        logout,
        register,
        selectSlot,
        clearSelectedSlot,
        refreshParkingData,
        reserveSlot,
        cancelUserReservation,
        addSlotAdmin,
        editSlotAdmin,
        deleteSlotAdmin,
        updateReservationStatusAdmin,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};

export const useParking = () => useContext(ParkingContext);
export default ParkingContext;
