import React, { useState } from 'react';

function TaskForm({ categories, onSubmit, onClose }) {
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        urgent: false,
        categories: [],
        contacts: [''],
        done: false
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!task.title || task.title.length < 3) {
            newErrors.title = 'Le titre doit comporter au moins 3 caractères';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({
                ...task,
                id: Date.now().toString(),
                creationDate: new Date().toISOString()
            });
            onClose();
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTask({
            ...task,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleCategoryToggle = (categoryId) => {
        const categoryIndex = task.categories.indexOf(categoryId);
        if (categoryIndex === -1) {
            setTask({
                ...task,
                categories: [...task.categories, categoryId]
            });
        } else {
            setTask({
                ...task,
                categories: task.categories.filter(id => id !== categoryId)
            });
        }
    };

    const handleContactChange = (index, value) => {
        const updatedContacts = [...task.contacts];
        updatedContacts[index] = value;
        setTask({
            ...task,
            contacts: updatedContacts
        });
    };

    const addContact = () => {
        setTask({
            ...task,
            contacts: [...task.contacts, '']
        });
    };

    const removeContact = (index) => {
        const updatedContacts = [...task.contacts];
        updatedContacts.splice(index, 1);
        setTask({
            ...task,
            contacts: updatedContacts
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form onSubmit={handleSubmit} className="task-form">
                    <h2>Créer une nouvelle tâche</h2>

                    <div className="form-group">
                        <label htmlFor="title">Titre</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                            required
                        />
                        {errors.title && <span className="error">{errors.title}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dueDate">Date d'échéance</label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={task.dueDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group checkbox">
                        <input
                            type="checkbox"
                            id="urgent"
                            name="urgent"
                            checked={task.urgent}
                            onChange={handleChange}
                        />
                        <label htmlFor="urgent">Urgent</label>
                    </div>

                    <div className="form-group">
                        <label>Catégories</label>
                        <div className="category-options">
                            {categories.map(category => (
                                <label key={category.id} className="category-option">
                                    <input
                                        type="checkbox"
                                        checked={task.categories.includes(category.id)}
                                        onChange={() => handleCategoryToggle(category.id)}
                                    />
                                    <span>{category.title}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Contacts</label>
                        {task.contacts.map((contact, index) => (
                            <div key={index} className="contact-input">
                                <input
                                    type="text"
                                    value={contact}
                                    onChange={(e) => handleContactChange(index, e.target.value)}
                                    placeholder="Nom ou email du contact"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeContact(index)}
                                    disabled={task.contacts.length === 1}
                                >
                                    Supprimer
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addContact}>
                            Ajouter un contact
                        </button>
                    </div>

                    <div className="form-buttons">
                        <button type="button" onClick={onClose}>Annuler</button>
                        <button type="submit">Créer la tâche</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;