import React, { useState, useEffect } from 'react';
import './assets/App.css';
import Header from './components/Header';
import TaskList from './components/TaskList';
import CategoryList from './components/CategoryList';
import StartupModal from './components/StartupModal';
import FormModal from './FormModal';

function App() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [viewMode, setViewMode] = useState('current');
    const [sortBy, setSortBy] = useState('dueDate');
    const [searchTerm, setSearchTerm] = useState('');
    const [showReset, setShowReset] = useState(true);
    const [filterCategory, setFilterCategory] = useState(null);

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        const savedCategories = localStorage.getItem('categories');

        if (savedTasks) setTasks(JSON.parse(savedTasks));
        if (savedCategories) setCategories(JSON.parse(savedCategories));
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('categories', JSON.stringify(categories));
    }, [tasks, categories]);

    const filteredTasks = tasks.filter(task => {
        if (viewMode === 'current' && task.done) return false;
        if (filterCategory && !task.categories.includes(filterCategory)) return false;
        if (searchTerm && searchTerm.length >= 3) {
            return task.title.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return true;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortBy === 'dueDate') {
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        } else if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        } else if (sortBy === 'creationDate') {
            return new Date(b.creationDate) - new Date(a.creationDate);
        } else if (sortBy === 'category') {
            const aCategory = categories.find(cat => cat.id === a.categories[0])?.title || '';
            const bCategory = categories.find(cat => cat.id === b.categories[0])?.title || '';
            return aCategory.localeCompare(bCategory);
        }
        return 0;
    });

    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const addCategory = (newCategory) => {
        setCategories([...categories, newCategory]);
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

    const deleteCategory = (categoryId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
            const updatedTasks = tasks.map(task => ({
                ...task,
                categories: task.categories.filter(id => id !== categoryId)
            }));

            setTasks(updatedTasks);
            setCategories(categories.filter(cat => cat.id !== categoryId));

            if (filterCategory === categoryId) {
                setFilterCategory(null);
            }
        }
    };

    const resetApp = () => {
        if (window.confirm('Êtes-vous sûr de vouloir réinitialiser l\'application ?')) {
            setTasks([]);
            setCategories([]);
        }
    };

    const loadBackup = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (data.tasks && data.categories) {
                        setTasks(data.tasks);
                        setCategories(data.categories);
                        setShowReset(false);
                        alert('Sauvegarde chargée avec succès !');
                    } else {
                        alert('Format de fichier de sauvegarde invalide');
                    }
                } catch (error) {
                    alert('Échec de l\'analyse du fichier de sauvegarde : ' + error.message);
                }
            };
            reader.readAsText(file);
        };
        input.click();
    };

    const downloadBackup = () => {
        const data = { tasks, categories };
        const json = JSON.stringify(data);
        const blob = new Blob([json], { type: 'application/json' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = 'todolist_backup.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const startFresh = () => {
        setShowReset(false);
    };

    const openModalSelector = () => {
        setModalType('selector');
        setShowModal(true);
    };

    const selectModalType = (type) => {
        setModalType(type);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalType('');
    };

    const filterByCategory = (categoryId) => {
        setFilterCategory(categoryId === filterCategory ? null : categoryId);
    };

    const returnToStartup = () => {
        if (window.confirm('Êtes-vous sûr de vouloir revenir à la page d\'accueil ? Toutes vos informations seront perdues.')) {
            setShowReset(true);
        }
    };

    return (
        <div className="App">
            {showReset ? (
                <StartupModal
                    loadBackup={loadBackup}
                    startFresh={startFresh}
                />
            ) : (
                <>
                    <Header
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                        setSortBy={setSortBy}
                        downloadBackup={downloadBackup}
                        resetApp={resetApp}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        filterCategory={filterCategory}
                        setFilterCategory={setFilterCategory}
                        categories={categories}
                        returnToStartup={returnToStartup}
                    />

                    <TaskList
                        tasks={sortedTasks}
                        categories={categories}
                        toggleTaskDone={toggleTaskDone}
                        deleteTask={deleteTask}
                        filterByCategory={filterByCategory}
                    />

                    <CategoryList
                        categories={categories}
                        deleteCategory={deleteCategory}
                        filterCategory={filterCategory}
                        filterByCategory={filterByCategory}
                    />

                    <button className="floating-action-button" onClick={openModalSelector}>+</button>
                </>
            )}

            <FormModal
                showModal={showModal}
                modalType={modalType}
                categories={categories}
                selectModalType={selectModalType}
                addTask={addTask}
                addCategory={addCategory}
                closeModal={closeModal}
            />
        </div>
    );
}

export default App;