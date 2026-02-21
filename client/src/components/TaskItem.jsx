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

  const handleSave = () => {
    if (!editData.title.trim()) {
      alert('El título es obligatorio');
      return;
    }
    updateTask(task.id, editData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('¿Eliminar esta tarea?')) {
      deleteTask(task.id);
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
        <textarea
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          rows={2}
        />
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
        </div>
        <div className="task-actions">
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
          <button onClick={handleSave} className="save-btn">Guardar</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
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