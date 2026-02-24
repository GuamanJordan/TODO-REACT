import React, { useState } from 'react';
import './ProfileForm.css';

export function ProfileForm({ user, onUpdate }) {
  const [form, setForm] = useState({
    name: user.name || '',
    lastname: user.lastname || '',
    email: user.email || '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSuccess('');
    setError('');
    // Aquí deberías llamar a tu API para actualizar el perfil
    if (!form.name || !form.lastname || !form.email) {
      setError('Todos los campos son obligatorios');
      return;
    }
    setSuccess('Perfil actualizado correctamente');
    onUpdate && onUpdate(form);
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <h3>Editar Perfil</h3>
      <div className="profile-form-group">
        <label>Nombre</label>
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div className="profile-form-group">
        <label>Apellido</label>
        <input name="lastname" value={form.lastname} onChange={handleChange} required />
      </div>
      <div className="profile-form-group">
        <label>Correo electrónico</label>
        <input name="email" value={form.email} onChange={handleChange} required type="email" />
      </div>
      {error && <div className="profile-form-error">{error}</div>}
      {success && <div className="profile-form-success">{success}</div>}
      <button className="profile-form-btn" type="submit">Guardar Cambios</button>
    </form>
  );
}
