export async function validateRecoveryCode(email, code) {
  const res = await fetch(`${API_URL}/auth/validate-recovery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Código incorrecto');
  return data;
}
export async function resetPassword(email, code, newPassword) {
  const res = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code, newPassword })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error al actualizar contraseña');
  return data;
}
export async function recoverPassword(email) {
  const res = await fetch(`${API_URL}/auth/recover`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error al recuperar contraseña');
  return data;
}
export async function verify(email, code) {
  const res = await fetch(`${API_URL}/auth/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error de verificación');
  return data;
}
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error de login');
  return data;
}

export async function register(name, lastname, email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, lastname, email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error de registro');
  return data;
}