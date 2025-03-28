import React from 'react';

function ModalSelector({ onSelectModal, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content modal-selector">
                <h2>Que souhaitez-vous ajouter ?</h2>
                <div className="modal-selector-buttons">
                    <button onClick={() => onSelectModal('task')}>Nouvelle tâche</button>
                    <button onClick={() => onSelectModal('category')}>Nouvelle catégorie</button>
                </div>
                <button onClick={onClose} className="close-button">Annuler</button>
            </div>
        </div>
    );
}

export default ModalSelector;