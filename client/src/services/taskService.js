 const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function getTasks() {
  const res = await fetch(`${API_URL}/tasks`);
  return await res.json();
}

export async function createTask(task) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  return await res.json();
}

export async function updateTask(id, updates) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  return await res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE'
  });
  return await res.json();
}