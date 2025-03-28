import React from 'react';

function CategoryList({ categories, deleteCategory, filterCategory, filterByCategory }) {
    return (
        <div className="categories-list">
            <h3>Catégories</h3>
            <div className="category-list-items">
                {categories.map(category => (
                    <div
                        key={category.id}
                        className={`category-list-item ${filterCategory === category.id ? 'active' : ''}`}
                        onClick={() => filterByCategory(category.id)}
                    >
                        <div className="category-color" style={{ backgroundColor: category.color }}></div>
                        <span className="category-title">{category.title}</span>
                        <button
                            className="category-delete"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteCategory(category.id);
                            }}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryList;