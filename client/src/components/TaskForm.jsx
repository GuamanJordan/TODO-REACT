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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setErrors(validate(newFormData));
  };

  const validate = (data = formData) => {
    const newErrors = {};
    if (!data.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    } else if (data.title.length > 100) {
      newErrors.title = 'Máximo 100 caracteres';
    }
    if (data.description.length > 500) {
      newErrors.description = 'Máximo 500 caracteres';
    }
    if (data.dueDate) {
      const today = new Date();
      const due = new Date(data.dueDate);
      today.setHours(0, 0, 0, 0);
      if (due < today) {
        newErrors.dueDate = 'La fecha no puede ser pasada';
      }
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    addTask(formData);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
    setErrors({});
    setIsOpen(false);
  };

  return (
    <div className="task-form-container">
      {!isOpen ? (
        <button className="add-task-btn" onClick={() => setIsOpen(true)}>
          Nueva Tarea
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="taskTitle">Título de la tarea *</label>
            <input
              id="taskTitle"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength={100}
              autoFocus
              placeholder="Título de la tarea *"
              className={errors.title ? 'input-error' : ''}
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="taskDesc">Descripción (opcional)</label>
            <textarea
              id="taskDesc"
              name="description"
              value={formData.description}
              onChange={handleChange}
              maxLength={500}
              rows={3}
              placeholder="Descripción (opcional)"
              className={errors.description ? 'input-error' : ''}
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="taskPriority">Prioridad</label>
              <select
                id="taskPriority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="taskDueDate">Fecha límite</label>
              <input
                id="taskDueDate"
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className={errors.dueDate ? 'input-error' : ''}
              />
              {errors.dueDate && <span className="form-error">{errors.dueDate}</span>}
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setIsOpen(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary submit-btn" disabled={Object.keys(errors).length > 0 || !formData.title.trim()}>
              Crear Tarea
            </button>
          </div>
        </form>
      )}
    </div>
  );
}