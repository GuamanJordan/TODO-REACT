import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';

export function TaskItem({ task }) {
  const { updateTask, deleteTask, toggleTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    priority: task.priority,
    dueDate: task.dueDate || ''
  });
  const [errors, setErrors] = useState({});


  // Validación de campos al editar
  const validate = () => {
    const newErrors = {};
    if (!editData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    } else if (editData.title.length > 100) {
      newErrors.title = 'Máximo 100 caracteres';
    }
    if (editData.description.length > 500) {
      newErrors.description = 'Máximo 500 caracteres';
    }
    if (editData.dueDate) {
      const today = new Date();
      const due = new Date(editData.dueDate);
      today.setHours(0,0,0,0);
      if (due < today) {
        newErrors.dueDate = 'La fecha no puede ser pasada';
      }
    }
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    updateTask(task._id, editData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('¿Eliminar esta tarea?')) {
      deleteTask(task._id);
    }
  };

  const priorityLabels = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta'
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          autoFocus
        />
        {errors.title && <div className="form-error">{errors.title}</div>}
        <textarea
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          rows={2}
        />
        {errors.description && <div className="form-error">{errors.description}</div>}
        <div className="form-row">
          <select
            value={editData.priority}
            onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
          <input
            type="date"
            value={editData.dueDate}
            onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
          />
          {errors.dueDate && <div className="form-error">{errors.dueDate}</div>}
        </div>
        <div className="task-actions">
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
          <button onClick={handleSave} className="save-btn" disabled={Object.keys(errors).length > 0}>Guardar</button>
        </div>
      </div>
    );
  }
/* Agrega este estilo en tu CSS para los errores visuales:
.form-error {
  color: #d32f2f;
  font-size: 0.95em;
  margin-top: 2px;
  margin-bottom: 4px;
}
*/

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task._id)}
        />
      </div>
      
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-description">{task.description}</p>}
        <div className="task-meta">
          <span className={`priority priority-${task.priority}`}>
            {priorityLabels[task.priority]}
          </span>
          {task.dueDate && (
            <span className="due-date">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      
      <div className="task-actions">
        <button onClick={() => setIsEditing(true)} title="Editar">✏️</button>
        <button onClick={handleDelete} title="Eliminar">🗑️</button>
      </div>
    </div>
  );
}