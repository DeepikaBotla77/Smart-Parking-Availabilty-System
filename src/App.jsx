import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ParkingProvider, useParking } from './context/ParkingContext';

// Components & Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import ParkingLots from './pages/ParkingLots';
import ParkingDetails from './pages/ParkingDetails';
import ReserveSlot from './pages/ReserveSlot';
import MyReservations from './pages/MyReservations';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import ManageSlots from './pages/ManageSlots';
import ManageReservations from './pages/ManageReservations';
import NotFound from './pages/NotFound';

import './App.css';

// Admin Protected Route Guard
const AdminRoute = ({ children }) => {
  const { user } = useParking();
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Main App Layout
const AppContent = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/parking" element={<ParkingLots />} />
          <Route path="/parking/:id" element={<ParkingDetails />} />
          <Route path="/reserve/:slotId" element={<ReserveSlot />} />
          <Route path="/my-reservations" element={<MyReservations />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/slots"
            element={
              <AdminRoute>
                <ManageSlots />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/reservations"
            element={
              <AdminRoute>
                <ManageReservations />
              </AdminRoute>
            }
          />

          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ParkingProvider>
        <AppContent />
      </ParkingProvider>
    </Router>
  );
}

export default App;
