import React from 'react';
import './WelcomeBanner.css';

export function WelcomeBanner({ user, onSettings }) {
  return (
    <div className="welcome-banner">
      <div className="welcome-banner-content">
        <div className="welcome-banner-icon">
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#1976d2"/>
            <path d="M16 8L20 24H12L16 8Z" fill="#fff"/>
          </svg>
        </div>
        <div>
          <div className="welcome-banner-title">¡Bienvenido!</div>
          <div className="welcome-banner-user">{user.name} {user.lastname}</div>
        </div>
      </div>
      <button className="welcome-banner-settings" onClick={onSettings} title="Configuración">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.4a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 5 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 16 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19 8.6c.13.16.24.33.33.51.09.18.17.36.23.55.06.19.1.39.13.59.03.2.05.41.05.62s-.02.42-.05.62c-.03.2-.07.4-.13.59-.06.19-.14.37-.23.55-.09.18-.2.35-.33.51z"/></svg>
      </button>
    </div>
  );
}
