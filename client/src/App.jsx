import { useState, useEffect } from 'react';
import { TaskProvider } from './context/TaskContext';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Sidebar } from './components/Sidebar';
import { WelcomeBanner } from './components/WelcomeBanner';
import { ProfileForm } from './components/ProfileForm';
import { SettingsForm } from './components/SettingsForm';
import { updateProfile, updateSettings } from './services/profileService';

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [view, setView] = useState('dashboard'); // dashboard | profile | settings
  const [loading, setLoading] = useState(false);
  // Modo oscuro
  const theme = user?.settings?.theme || 'light';

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleProfileUpdate = async (form) => {
    setLoading(true);
    try {
      const updated = await updateProfile(user.id, form);
      setUser({ ...user, ...updated.user });
      setView('dashboard');
    } catch (err) {
      alert(err.message || 'Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsUpdate = async (form) => {
    setLoading(true);
    try {
      const updated = await updateSettings(user.id, { settings: form });
      setUser({ ...user, settings: updated.settings });
      setView('dashboard');
      // Aplica el tema inmediatamente
      document.body.classList.toggle('dark', form.theme === 'dark');
    } catch (err) {
      alert(err.message || 'Error al actualizar configuración');
    } finally {
      setLoading(false);
    }
  };

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
        <Sidebar onNavigate={setView} view={view} />
        <div className="dashboard-main">
          <WelcomeBanner user={user} onSettings={() => setView('settings')} />
          {view === 'dashboard' && (
            <>
              <Header />
              <div className="dashboard-summary">
                <div className="summary-card">
                  <h3>Total tareas</h3>
                </div>
                <div className="summary-card">
                  <h3>Pendientes</h3>
                </div>
                <div className="summary-card">
                  <h3>Completadas</h3>
                </div>
              </div>
              <div className="dashboard-tasks">
                <TaskForm />
                <TaskList />
              </div>
            </>
          )}
          {view === 'profile' && (
            <div className="dashboard-tasks">
              <ProfileForm user={user} onUpdate={handleProfileUpdate} />
            </div>
          )}
          {view === 'settings' && (
            <div className="dashboard-tasks">
              <SettingsForm user={user} onUpdate={handleSettingsUpdate} />
            </div>
          )}
          {loading && <div className="loading-overlay">Guardando...</div>}
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;