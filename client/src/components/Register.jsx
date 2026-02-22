import { useState } from 'react';
import * as authService from '../services/authService';

export function Register({ onRegister }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('register');
  const [code, setCode] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await authService.register(form.email, form.password);
      setSuccess('Se envió un código de verificación a tu correo.');
      setStep('verify');
    } catch (err) {
      setError(err.message || 'Error al registrar');
    }
    setLoading(false);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.verify(form.email, code);
      setSuccess('Usuario verificado correctamente. Ahora puedes iniciar sesión.');
      setStep('done');
      onRegister && onRegister();
    } catch (err) {
      setError(err.message || 'Error al verificar');
    }
    setLoading(false);
  };

  if (step === 'register') {
    return (
      <div>
        <h2 className="form-title">Registro</h2>
        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label htmlFor="regEmail">Correo electrónico</label>
            <input
              id="regEmail"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="regPassword">Contraseña</label>
            <input
              id="regPassword"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Cargando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    );
  }

  if (step === 'verify') {
    return (
      <div>
        <h2 className="form-title">Verifica tu correo</h2>
        <form onSubmit={handleVerify} className="auth-form">
          <div className="form-group">
            <label htmlFor="verifyCode">Código de verificación</label>
            <input
              id="verifyCode"
              type="text"
              name="code"
              value={code}
              onChange={e => setCode(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Cargando...' : 'Verificar'}
          </button>
        </form>
      </div>
    );
  }

  if (step === 'done') {
    return (
      <div className="alert alert-success">
        Usuario verificado correctamente. Ahora puedes iniciar sesión.
      </div>
    );
  }
}