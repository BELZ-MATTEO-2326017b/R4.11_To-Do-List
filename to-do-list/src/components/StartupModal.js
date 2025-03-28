import React from 'react';

function StartupModal({ loadBackup, startFresh }) {
    return (
        <div className="startup-modal">
            <h1>Application de liste de tâches</h1>
            <div className="startup-buttons">
                <button onClick={loadBackup}>Charger une sauvegarde</button>
                <button onClick={startFresh}>Démarrer de zéro</button>
            </div>
        </div>
    );
}

export default StartupModal;