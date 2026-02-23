import { useState } from 'react';
import * as authService from '../services/authService';
import { RecoverPassword } from './RecoverPassword';

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
    <div>
      <h2 className="form-title">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="loginEmail">Correo electrónico</label>
          <input
            id="loginEmail"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Contraseña</label>
          <input
            id="loginPassword"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Cargando...' : 'Ingresar'}
          </button>
          <button type="button" className="link-btn" onClick={() => setShowRecover(true)}>
            Recuperar contraseña
          </button>
        </div>
      </form>
    </div>
  );
}
