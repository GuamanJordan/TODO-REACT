import React, { useState } from 'react';
import './SettingsForm.css';

export function SettingsForm({ user, onUpdate }) {
  const [form, setForm] = useState({
    notifications: true,
    theme: 'light',
    ...user.settings
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setSuccess('Configuración guardada');
    onUpdate && onUpdate(form);
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <h3>Configuración</h3>
      <div className="settings-form-group">
        <label>
          <input type="checkbox" name="notifications" checked={form.notifications} onChange={handleChange} />
          Recibir notificaciones
        </label>
      </div>
      <div className="settings-form-group">
        <label>Tema</label>
        <select name="theme" value={form.theme} onChange={handleChange}>
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
        </select>
      </div>
      {error && <div className="settings-form-error">{error}</div>}
      {success && <div className="settings-form-success">{success}</div>}
      <button className="settings-form-btn" type="submit">Guardar Configuración</button>
    </form>
  );
}
