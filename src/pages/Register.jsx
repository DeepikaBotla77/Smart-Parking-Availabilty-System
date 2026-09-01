import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaParking, FaUserPlus } from 'react-icons/fa';
import { useParking } from '../context/ParkingContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { register } = useParking();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password || !confirmPassword) {
      setErrorMsg('All fields are required.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    const res = await register({
      name,
      email,
      phone,
      password,
    });

    setSubmitting(false);

    if (res.success) {
      navigate('/parking');
    } else {
      setErrorMsg(res.message || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="section" style={{ minHeight: 'calc(100vh - 140px)', display: 'flex', alignItems: 'center' }}>
      <div className="section-container" style={{ maxWidth: '500px' }}>
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
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>Create an Account</h2>
            <p style={{ color: 'var(--slate-600)', fontSize: '0.9rem' }}>
              Join ParkEase for instant smart slot reservations
            </p>
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
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-control"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="form-control"
                required
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                className="form-control"
                required
                placeholder="+91 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                className="form-control"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <input
                type="password"
                className="form-control"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
              style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', marginTop: '0.5rem' }}
            >
              <FaUserPlus /> {submitting ? 'Creating Account...' : 'Register Account'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.8rem', fontSize: '0.9rem', color: 'var(--slate-600)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ fontWeight: '700' }}>
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
