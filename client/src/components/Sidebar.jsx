export function Sidebar({ onNavigate, view }) {
  return (
    <aside className="sidebar sidebar-modern">
      <div className="sidebar-header">
        <span className="sidebar-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#1976d2" />
            <path d="M16 8L20 24H12L16 8Z" fill="#fff" />
          </svg>
        </span>
        <span className="sidebar-title">TaskFlow</span>
      </div>
      <nav>
        <ul className="sidebar-list">
          <li>
            <button className={`sidebar-link${view === 'dashboard' ? ' active' : ''}`} onClick={() => onNavigate('dashboard')}>
              <span className="sidebar-link-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12L12 3l9 9" /><path d="M9 21V9h6v12" /></svg>
              </span> Dashboard
            </button>
          </li>
          <li>
            <button className={`sidebar-link${view === 'dashboard' ? ' active' : ''}`} onClick={() => onNavigate('dashboard')}>
              <span className="sidebar-link-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
              </span> Tareas
            </button>
          </li>
          <li>
            <button className={`sidebar-link${view === 'profile' ? ' active' : ''}`} onClick={() => onNavigate('profile')}>
              <span className="sidebar-link-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M2 20c0-4 8-6 10-6s10 2 10 6v2H2v-2z" /></svg>
              </span> Perfil
            </button>
          </li>
          <li>
            <button className={`sidebar-link${view === 'settings' ? ' active' : ''}`} onClick={() => onNavigate('settings')}>
              <span className="sidebar-link-icon">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.4a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 5 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 16 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19 8.6c.13.16.24.33.33.51.09.18.17.36.23.55.06.19.1.39.13.59.03.2.05.41.05.62s-.02.42-.05.62c-.03.2-.07.4-.13.59-.06.19-.14.37-.23.55-.09.18-.2.35-.33.51z" /></svg>
              </span> Configuración
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
