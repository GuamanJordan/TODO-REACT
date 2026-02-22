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
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Registro</h2>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    );
  }
  if (step === 'verify') {
    return (
      <form className="verify-form" onSubmit={handleVerify}>
        <h2>Verifica tu correo</h2>
        <input
          type="text"
          name="code"
          placeholder="Código de verificación"
          value={code}
          onChange={e => setCode(e.target.value)}
          required
        />
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Verificando...' : 'Verificar'}
        </button>
      </form>
    );
  }
  if (step === 'done') {
    return <div className="form-success">Usuario verificado correctamente. Ahora puedes iniciar sesión.</div>;
  }
}