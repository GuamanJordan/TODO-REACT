import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';

export function TaskForm() {
  const { addTask } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('El título es obligatorio');
      return;
    }

    addTask(formData);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
    setIsOpen(false);
  };

  return (
    <div className="task-form-container">
      {!isOpen ? (
        <button className="add-task-btn" onClick={() => setIsOpen(true)}>
          + Nueva Tarea
        </button>
      ) : (
        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Título de la tarea *"
            value={formData.title}
            onChange={handleChange}
            maxLength={100}
            autoFocus
          />
          
          <textarea
            name="description"
            placeholder="Descripción (opcional)"
            value={formData.description}
            onChange={handleChange}
            maxLength={500}
            rows={3}
          />
          
          <div className="form-row">
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
            
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={() => setIsOpen(false)}>
              Cancelar
            </button>
            <button type="submit" className="submit-btn">
              Crear Tarea
            </button>
          </div>
        </form>
      )}
    </div>
  );
}