import { useTasks } from '../hooks/useTasks';
import { TaskItem } from './TaskItem';

export function TaskList() {
  const { tasks } = useTasks();

  if (tasks.length === 0) {
    return (
      <div className="task-list empty">
        <p>No hay tareas para mostrar.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
}