import { useTasks } from '../hooks/useTasks';

export function Header() {
  const { filter, setFilter, searchTerm, setSearchTerm } = useTasks();

  return (
    <header className="header">
      <h1>TaskFlow</h1>
      
      <div className="header-controls">
        <input
          type="text"
          placeholder="Buscar tareas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Todas
          </button>
          <button
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pendientes
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completadas
          </button>
        </div>
      </div>
    </header>
  );
}