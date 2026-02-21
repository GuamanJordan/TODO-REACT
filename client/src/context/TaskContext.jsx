
import { createContext, useState, useEffect } from 'react';
import * as taskService from '../services/taskService';

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, completed
  const [searchTerm, setSearchTerm] = useState('');


  // Cargar tareas del backend al iniciar
  useEffect(() => {
    async function fetchTasks() {
      const data = await taskService.getTasks();
      setTasks(data);
    }
    fetchTasks();
  }, []);


  // Crear tarea
  const addTask = async (task) => {
    const newTask = await taskService.createTask(task);
    setTasks([newTask, ...tasks]);
  };

  // Actualizar tarea
  const updateTask = async (id, updatedFields) => {
    const updated = await taskService.updateTask(id, updatedFields);
    setTasks(tasks.map(task => task._id === id ? updated : task));
  };

  // Eliminar tarea
  const deleteTask = async (id) => {
    await taskService.deleteTask(id);
    setTasks(tasks.filter(task => task._id !== id));
  };

  // Toggle completado
  const toggleTask = async (id) => {
    const task = tasks.find(t => t._id === id);
    if (task) {
      const updated = await taskService.updateTask(id, { completed: !task.completed });
      setTasks(tasks.map(t => t._id === id ? updated : t));
    }
  };

  // Tareas filtradas
  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'pending') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

  return (
    <TaskContext.Provider value={{
      tasks: filteredTasks,
      filter,
      searchTerm,
      setFilter,
      setSearchTerm,
      addTask,
      updateTask,
      deleteTask,
      toggleTask
    }}>
      {children}
    </TaskContext.Provider>
  );
}