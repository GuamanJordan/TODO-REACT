import { useTasks } from '../hooks/useTasks';

export function Header() {
  const { filter, setFilter, searchTerm, setSearchTerm } = useTasks();

  return (
    <div className="header">
      <h1>TaskFlow</h1>
      <div className="header-controls">
        <input
          type="search"
          className="search-input"
          placeholder="Buscar tareas..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className="filter-buttons">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Todas</button>
          <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>Pendientes</button>
          <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completadas</button>
        </div>
      </div>
    </div>
  );
}