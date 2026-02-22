import { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { Login } from './components/Login';
import { Register } from './components/Register';

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
      <div className="app-container">
        <Header />
        <div className="user-bar">
          <span>Bienvenido, {user.email}</span>
          <button className="btn btn-danger" onClick={() => setUser(null)}>Salir</button>
        </div>
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;