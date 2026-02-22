import { useState } from 'react';
import * as authService from '../services/authService';

export function ResetPassword({ email, onBack }) {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('validate');
  const [redirect, setRedirect] = useState(false);

  const handleValidate = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.validateRecoveryCode(email, code);
      setStep('change');
    } catch (err) {
      setError(err.message || 'Código incorrecto');
    }
    setLoading(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await authService.resetPassword(email, code, newPassword);
      setSuccess('Contraseña actualizada correctamente. Redirigiendo al login...');
      setTimeout(() => setRedirect(true), 1500);
    } catch (err) {
      setError(err.message || 'Error al actualizar contraseña');
    }
    setLoading(false);
  };

  if (step === 'validate') {
    return (
      <div>
        <h2 className="form-title">Validar Código de Recuperación</h2>
        <form onSubmit={handleValidate} className="auth-form">
          <div className="form-group">
            <label htmlFor="recCode">Código de recuperación</label>
            <input
              id="recCode"
              type="text"
              name="code"
              value={code}
              onChange={e => setCode(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Cargando...' : 'Validar'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onBack}>Volver</button>
          </div>
        </form>
      </div>
    );
  }

  if (step === 'change') {
    if (redirect) {
      onBack();
      return null;
    }
    return (
      <div>
        <h2 className="form-title">Restablecer Contraseña</h2>
        <form onSubmit={handleChangePassword} className="auth-form">
          <div className="form-group">
            <label htmlFor="newPass">Nueva contraseña</label>
            <input
              id="newPass"
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Cargando...' : 'Actualizar'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onBack}>Volver</button>
          </div>
        </form>
      </div>
    );
  }
}
