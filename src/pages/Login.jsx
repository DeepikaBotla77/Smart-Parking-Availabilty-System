import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaParking, FaEnvelope, FaLock, FaUserShield, FaSignInAlt } from 'react-icons/fa';
import { useParking } from '../context/ParkingContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useParking();
  const navigate = useNavigate();

  const handleDemoAdmin = () => {
    setEmail('admin@parkease.com');
    setPassword('admin123');
  };

  const handleDemoUser = () => {
    setEmail('rahul@example.com');
    setPassword('user123');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter email and password.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    const res = await login(email, password);
    setSubmitting(false);

    if (res.success) {
      if (res.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/parking');
      }
    } else {
      setErrorMsg(res.message || 'Invalid credentials');
    }
  };

  return (
    <div className="section" style={{ minHeight: 'calc(100vh - 140px)', display: 'flex', alignItems: 'center' }}>
      <div className="section-container" style={{ maxWidth: '460px' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '2.5rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--card-shadow)',
            border: '1px solid var(--slate-200)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="navbar-logo" style={{ justifyContent: 'center', marginBottom: '0.8rem' }}>
              <FaParking className="logo-icon" />
              <span>ParkEase</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>Account Login</h2>
            <p style={{ color: 'var(--slate-600)', fontSize: '0.9rem' }}>
              Sign in to manage your parking reservations
            </p>
          </div>

          {/* DEMO CREDENTIALS QUICK BUTTONS */}
          <div
            style={{
              backgroundColor: 'var(--slate-100)',
              padding: '0.8rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--slate-600)', display: 'block', marginBottom: '6px' }}>
              ⚡ DEMO CREDENTIALS
            </span>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleDemoAdmin}
                style={{ padding: '0.35rem 0.7rem', fontSize: '0.78rem', color: 'var(--dark-navy)', borderColor: 'var(--slate-400)' }}
              >
                <FaUserShield /> Admin Demo
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleDemoUser}
                style={{ padding: '0.35rem 0.7rem', fontSize: '0.78rem', color: 'var(--dark-navy)', borderColor: 'var(--slate-400)' }}
              >
                User Demo
              </button>
            </div>
          </div>

          {errorMsg && (
            <div
              style={{
                backgroundColor: 'var(--danger-bg)',
                color: '#991b1b',
                padding: '0.8rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.2rem',
                fontSize: '0.9rem',
                textAlign: 'center',
              }}
            >
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                required
                placeholder="admin@parkease.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
              style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', marginTop: '0.5rem' }}
            >
              <FaSignInAlt /> {submitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.8rem', fontSize: '0.9rem', color: 'var(--slate-600)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ fontWeight: '700' }}>
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
