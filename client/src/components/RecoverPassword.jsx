import { useState } from 'react';
import * as authService from '../services/authService';
import { ResetPassword } from './ResetPassword';

export function RecoverPassword({ onBack }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('recover');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await authService.recoverPassword(email);
      setSuccess('Se envió un código de recuperación a tu correo.');
      setStep('reset');
    } catch (err) {
      setError(err.message || 'Error al recuperar contraseña');
    }
    setLoading(false);
  };

  if (step === 'recover') {
    return (
      <div>
        <h2 className="form-title">Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="recoverEmail">Correo electrónico</label>
            <input
              id="recoverEmail"
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Cargando...' : 'Enviar código'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onBack}>Volver</button>
          </div>
        </form>
      </div>
    );
  }

  if (step === 'reset') {
    return <ResetPassword email={email} onBack={onBack} />;
  }
}
