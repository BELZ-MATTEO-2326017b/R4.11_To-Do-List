import React from 'react';
import FilterDropdown from './FilterDropdown';

function Header({
                    viewMode,
                    setViewMode,
                    setSortBy,
                    downloadBackup,
                    resetApp,
                    searchTerm,
                    setSearchTerm,
                    filterCategory,
                    setFilterCategory,
                    categories
                }) {
    return (
        <header className="App-header">
            <div className="header-controls">
                <div className="app-title">
                    <h2>TODO List App</h2>
                </div>
                <div className="view-buttons">
                    <button onClick={() => setViewMode(viewMode === 'all' ? 'current' : 'all')}>
                        {viewMode === 'all' ? 'Tâches actuelles' : 'Toutes les tâches'}
                    </button>
                </div>
                <div className="right-controls">
                    <FilterDropdown
                        setSortBy={setSortBy}
                        downloadBackup={downloadBackup}
                        resetApp={resetApp}
                    />
                </div>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Rechercher des tâches..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filterCategory && (
                <div className="active-filter">
          <span>
            Filtrage par : {categories.find(cat => cat.id === filterCategory)?.title}
          </span>
                    <button onClick={() => setFilterCategory(null)}>Effacer le filtre</button>
                </div>
            )}
        </header>
    );
}

export default Header;