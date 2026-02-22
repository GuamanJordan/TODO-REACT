
import { useState } from 'react';
import * as authService from '../services/authService';
import { RecoverPassword } from './RecoverPassword';

export function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRecover, setShowRecover] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authService.login(form.email, form.password);
      setLoading(false);
      onLogin && onLogin(data.user);
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
      setLoading(false);
    }
  };

  if (showRecover) {
    return <RecoverPassword onBack={() => setShowRecover(false)} />;
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
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
      <button type="submit" disabled={loading}>
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>
      <button type="button" onClick={() => setShowRecover(true)}>
        ¿Olvidaste tu contraseña?
      </button>
    </form>
  );
}
