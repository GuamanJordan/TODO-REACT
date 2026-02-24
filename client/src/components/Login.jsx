

import { useState } from 'react';
import * as authService from '../services/authService';
import { RecoverPassword } from './RecoverPassword';


import './LoginModern.css';

export function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRecover, setShowRecover] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await authService.login(email, password);
      onLogin && onLogin(response.user);
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
    setLoading(false);
  };

  if (showRecover) {
    return <RecoverPassword onBack={() => setShowRecover(false)} />;
  }

  return (
    <div className="login-modern-container">
      <form className="login-modern-form" onSubmit={handleSubmit}>
        <div className="login-modern-icon">
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#1976d2"/>
            <path d="M16 8L20 24H12L16 8Z" fill="#fff"/>
          </svg>
        </div>
        <h2 className="login-modern-title">Iniciar Sesión</h2>
        <div className="login-modern-group">
          <label htmlFor="loginEmail">Correo electrónico</label>
          <input
            id="loginEmail"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="login-modern-group">
          <label htmlFor="loginPassword">Contraseña</label>
          <input
            id="loginPassword"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        {error && <div className="login-modern-error">{error}</div>}
        <button type="submit" className="login-modern-btn" disabled={loading}>
          {loading ? 'Cargando...' : 'Ingresar'}
        </button>
        <div className="login-modern-links">
          <a href="#" onClick={e => { e.preventDefault(); setShowRecover(true); }}>Recuperar contraseña</a>
            {/* Removed duplicate registration link */}
        </div>
      </form>
    </div>
  );
}
