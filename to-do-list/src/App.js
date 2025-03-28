import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) setTasks(JSON.parse(savedTasks));
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e) => {
        e.preventDefault();
        if (newTask.trim() === '') return;

        const task = {
            id: Date.now().toString(),
            title: newTask,
            done: false,
            creationDate: new Date().toISOString()
        };

        setTasks([...tasks, task]);
        setNewTask('');
    };

    const toggleTaskDone = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, done: !task.done } : task
        ));
    };

    const deleteTask = (taskId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
            setTasks(tasks.filter(task => task.id !== taskId));
        }
    };

    return (
        <div className="App">
            <Header />

            <form onSubmit={addTask} className="task-form">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Ajouter une nouvelle tâche..."
                />
                <button type="submit">Ajouter</button>
            </form>

            <div className="task-list">
                {tasks.length === 0 && (
                    <div className="no-tasks">
                        Aucune tâche à afficher. Ajoutez votre première tâche !
                    </div>
                )}

                {tasks.map(task => (
                    <div key={task.id} className={`task-item ${task.done ? 'done' : ''}`}>
                        <div className="task-header">
                            <h3>{task.title}</h3>
                            <div className="task-actions">
                                <button onClick={() => toggleTaskDone(task.id)}>
                                    {task.done ? 'Annuler' : 'Terminer'}
                                </button>
                                <button onClick={() => deleteTask(task.id)}>Supprimer</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;