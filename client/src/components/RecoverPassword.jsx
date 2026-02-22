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
      <form className="recover-form" onSubmit={handleSubmit}>
        <h2>Recuperar Contraseña</h2>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar código'}
        </button>
        <button type="button" onClick={onBack}>Volver</button>
      </form>
    );
  }
  if (step === 'reset') {
    return <ResetPassword email={email} onBack={onBack} />;
  }
}
