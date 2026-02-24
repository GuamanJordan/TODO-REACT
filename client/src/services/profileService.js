const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Actualiza el perfil del usuario
export async function updateProfile(userId, profileData) {
  const res = await fetch(`${API_URL}/auth/profile/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error al actualizar perfil');
  return data;
}

// Actualiza la configuración del usuario
export async function updateSettings(userId, settingsData) {
  const res = await fetch(`${API_URL}/auth/settings/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settingsData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error al actualizar configuración');
  return data;
}
