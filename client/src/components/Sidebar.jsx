import React from 'react';

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#1976d2"/>
            <path d="M16 8L20 24H12L16 8Z" fill="#fff"/>
          </svg>
        </span>
        <span className="sidebar-title">TaskFlow</span>
      </div>
      <nav>
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#tasks">Tareas</a></li>
          <li><a href="#profile">Perfil</a></li>
        </ul>
      </nav>
    </aside>
  );
}
