import React from 'react';

function TaskList({ tasks, categories, toggleTaskDone, deleteTask, filterByCategory }) {
    return (
        <div className="task-list">
            {tasks.length === 0 && (
                <div className="no-tasks">
                    Aucune tâche à afficher. Cliquez sur le bouton + pour ajouter une nouvelle tâche.
                </div>
            )}
            {tasks.map(task => {
                const taskCategories = task.categories
                    .map(catId => categories.find(cat => cat.id === catId))
                    .filter(cat => cat !== undefined);

                return (
                    <div
                        key={task.id}
                        className={`task-item ${task.urgent ? 'urgent' : ''} ${task.done ? 'done' : ''}`}
                    >
                        <div className="task-header">
                            <h3>{task.title}</h3>
                            <div className="task-actions">
                                <button onClick={() => toggleTaskDone(task.id)}>
                                    {task.done ? 'Annuler' : 'Terminer'}
                                </button>
                                <button onClick={() => deleteTask(task.id)}>Supprimer</button>
                            </div>
                        </div>
                        {task.description && (
                            <div className="task-description">{task.description}</div>
                        )}
                        {task.dueDate && (
                            <div className="task-due-date">{new Date(task.dueDate).toLocaleDateString()}</div>
                        )}
                        {task.contacts.length > 0 && task.contacts[0] !== '' && (
                            <div className="task-contacts">
                                <strong>Contacts:</strong> {task.contacts.join(', ')}
                            </div>
                        )}
                        {taskCategories.length > 0 && (
                            <div className="categories">
                                {taskCategories.map(cat => (
                                    <span
                                        key={cat.id}
                                        className="category-tag"
                                        style={{ backgroundColor: cat.color }}
                                        onClick={() => filterByCategory(cat.id)}
                                    >
                    {cat.title}
                  </span>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default TaskList;