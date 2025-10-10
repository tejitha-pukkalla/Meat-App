import React, { useState, useEffect } from 'react';
import '../App.css';

const API_BASE_URL = 'http://localhost:4000/api/auth'; 

const Icons = {
  User: () => (
    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  Eye: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  ),
  EyeOff: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  ),
  Spinner: () => (
    <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  )
};

const AdminLogin = ({ onLoginSuccess }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userRole = localStorage.getItem('userRole');

    if (token && userRole === 'admin') {
      onLoginSuccess();
    }
  }, [onLoginSuccess]);

  const clearMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const validateInputs = () => {
    if (!emailOrPhone.trim()) {
      setErrorMessage('Please enter your email or phone number');
      return false;
    }

    if (!password.trim()) {
      setErrorMessage('Please enter your password');
      return false;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrPhone: emailOrPhone.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

     
      if (data.user.role !== 'admin') {
        throw new Error('Access denied. Admin credentials required.');
      }

     
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userRole', data.user.role);

      setSuccessMessage('Login successful! Redirecting...');

      
      setTimeout(() => {
        onLoginSuccess();
      }, 1000);

    } catch (error) {
      setErrorMessage(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-icon">
            <Icons.User />
          </div>
          <h1>Admin Login</h1>
          <p>Access your meat shop dashboard</p>
        </div>

        {errorMessage && (
          <div className="message error-message">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="message success-message">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="emailOrPhone">Email or Phone</label>
            <input
              type="text"
              id="emailOrPhone"
              value={emailOrPhone}
              onChange={(e) => {
                setEmailOrPhone(e.target.value);
                clearMessages();
              }}
              placeholder="Enter your email or phone number"
              autoComplete="username"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearMessages();
                }}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
                disabled={loading}
              >
                {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <Icons.Spinner />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;