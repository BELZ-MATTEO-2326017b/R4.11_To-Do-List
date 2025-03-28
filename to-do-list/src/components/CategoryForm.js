import React, { useState } from 'react';

function CategoryForm({ onSubmit, onClose }) {
    const colorOptions = [
        '#FF5252', '#FF4081', '#E040FB', '#7C4DFF',
        '#536DFE', '#448AFF', '#40C4FF', '#18FFFF',
        '#64FFDA', '#69F0AE'
    ];

    const [category, setCategory] = useState({
        title: '',
        description: '',
        color: colorOptions[0]
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!category.title || category.title.length < 3) {
            newErrors.title = 'Le titre doit comporter au moins 3 caractères';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({
                ...category,
                id: Date.now().toString()
            });
            onClose();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value
        });
    };

    const handleColorSelect = (color) => {
        setCategory({
            ...category,
            color: color
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form onSubmit={handleSubmit} className="category-form">
                    <h2>Créer une nouvelle catégorie</h2>

                    <div className="form-group">
                        <label htmlFor="title">Titre</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={category.title}
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
                            value={category.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Couleur</label>
                        <div className="color-options">
                            {colorOptions.map((color, index) => (
                                <div
                                    key={index}
                                    className={`color-option ${category.color === color ? 'selected' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => handleColorSelect(color)}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <div className="form-buttons">
                        <button type="button" onClick={onClose}>Annuler</button>
                        <button type="submit">Créer la catégorie</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CategoryForm;