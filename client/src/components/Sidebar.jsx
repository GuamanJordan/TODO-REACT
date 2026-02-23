import React from 'react';

export function Sidebar() {
  return (
    <aside className="sidebar">
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
