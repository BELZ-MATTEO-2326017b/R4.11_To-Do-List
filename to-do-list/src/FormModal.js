import React from 'react';
import TaskForm from './components/TaskForm';
import CategoryForm from './components/CategoryForm';
import ModalSelector from './components/ModalSelector';

function FormModal({ showModal, modalType, categories, selectModalType, addTask, addCategory, closeModal }) {
    if (!showModal) return null;

    return (
        <>
            {modalType === 'selector' && (
                <ModalSelector onSelectModal={selectModalType} onClose={closeModal} />
            )}

            {modalType === 'task' && (
                <TaskForm categories={categories} onSubmit={addTask} onClose={closeModal} />
            )}

            {modalType === 'category' && (
                <CategoryForm onSubmit={addCategory} onClose={closeModal} />
            )}
        </>
    );
}

export default FormModal;