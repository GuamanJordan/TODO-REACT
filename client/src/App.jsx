import { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Sidebar } from './components/Sidebar';

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  if (!user) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          {showRegister ? (
            <>
              <Register onRegister={() => setShowRegister(false)} />
              <button className="link-btn" onClick={() => setShowRegister(false)}>
                ¿Ya tienes cuenta? Inicia sesión
              </button>
            </>
          ) : (
            <>
              <Login onLogin={setUser} />
              <button className="link-btn" onClick={() => setShowRegister(true)}>
                ¿No tienes cuenta? Regístrate
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <TaskProvider>
      <div className="dashboard-layout">
        <Sidebar />
        <div className="dashboard-main">
          <Header />
          <div className="user-bar">
            <span>Bienvenido, {user.name ? `${user.name} ${user.lastname}` : user.email}</span>
            <button className="btn btn-danger" onClick={() => setUser(null)}>Salir</button>
          </div>
          <div className="dashboard-summary">
            <div className="summary-card">
              <h3>Total tareas</h3>
              {/* Aquí puedes mostrar el total de tareas */}
            </div>
            <div className="summary-card">
              <h3>Pendientes</h3>
              {/* Aquí puedes mostrar el total de tareas pendientes */}
            </div>
            <div className="summary-card">
              <h3>Completadas</h3>
              {/* Aquí puedes mostrar el total de tareas completadas */}
            </div>
          </div>
          <div className="dashboard-tasks">
            <TaskForm />
            <TaskList />
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;