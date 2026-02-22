import { useState } from 'react';
import * as authService from '../services/authService';
import { useEffect } from 'react';

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
      // Validar solo el código
      const res = await authService.validateRecoveryCode(email, code);
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
      <form className="reset-form" onSubmit={handleValidate}>
        <h2>Validar Código de Recuperación</h2>
        <input
          type="text"
          name="code"
          placeholder="Código de recuperación"
          value={code}
          onChange={e => setCode(e.target.value)}
          required
        />
        {error && <div className="form-error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Validando...' : 'Validar'}
        </button>
        <button type="button" onClick={onBack}>Volver</button>
      </form>
    );
  }
  if (step === 'change') {
    if (redirect) {
      onBack();
      return null;
    }
    return (
      <form className="reset-form" onSubmit={handleChangePassword}>
        <h2>Restablecer Contraseña</h2>
        <input
          type="password"
          name="newPassword"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Actualizando...' : 'Actualizar'}
        </button>
        <button type="button" onClick={onBack}>Volver</button>
      </form>
    );
  }
}
