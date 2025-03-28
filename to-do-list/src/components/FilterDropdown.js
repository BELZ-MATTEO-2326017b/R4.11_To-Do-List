import React from 'react';
import filtreIcon from '../assets/images/filtre.png';
import parametresIcon from '../assets/images/parametres.png';

function FilterDropdown({ setSortBy, downloadBackup, resetApp }) {
    return (
        <>
            <div className="filter-container">
                <button className="filter-button" title="Options de tri">
                    <img src={filtreIcon} alt="Trier" />
                </button>
                <div className="filter-dropdown">
                    <button onClick={() => setSortBy('dueDate')}>Date d'échéance</button>
                    <button onClick={() => setSortBy('title')}>Titre</button>
                    <button onClick={() => setSortBy('creationDate')}>Date de création</button>
                    <button onClick={() => setSortBy('category')}>Catégorie</button>
                </div>
            </div>

            <div className="filter-container">
                <button className="filter-button" title="Paramètres de l'app">
                    <img src={parametresIcon} alt="Options" />
                </button>
                <div className="filter-dropdown">
                    <button onClick={downloadBackup}>Télécharger une sauvegarde</button>
                    <button onClick={resetApp}>Réinitialiser l'application</button>
                </div>
            </div>
        </>
    );
}

export default FilterDropdown;