import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProgressPage from "./pages/ProgressPage";
import { listTasks, listProjects, createTask, updateTask, deleteTask } from "./api";
import DemoNotice from './components/DemoNotice.jsx'

// A deliberately small working app. Replace all of it with your own project.
//
// What is worth keeping is the SHAPE: four states rather than two, a loading
// message that admits a free-tier server can be slow to wake, and errors that
// say something rather than rendering an empty list.


export default function App() {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState('home')

  // Handle URL has changes (#home, #projects, #progress)
  useEffect(() => {
    function handleHash() {
      const hash = window.location.has.replace('#/', '').replace('#', '');
      if (['projects', 'progress'].includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    }
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all([listTasks(), listProjects()])
      .then(([tasksData, projectsData]) => {
        if (cancelled) return;
        setTasks(tasksData || []);
        setProjects(projectsData || []);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleAddTask(title) {
    const createdTask = await createTask(title);
    setTasks((prevTasks) => [...prevTasks, createdTask]);
  }

  async function handleToggleTask(id) {
    const current = tasks.find((task) => task.id === id);
    if (!current) return;
    const updatedTask = await updateTask(id, { completed: !current.completed });
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTask : task))
    );
  }

  async function handleDeleteTask(id) {
    await deleteTask(id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  return(
    <div className="app-layout">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="main-content">
        <div className="page-wrapper">
          <DemoNotice />
          {loadError && (
            <div className="error" role="alert">
              Couldn&apos;t load data: {loadError}
            </div>
          )}
          {isLoading ? (
            <p className="loading-state">Loading portfolio data...</p>
          ) : (
            <>
            {currentPage === 'home' && (
              <HomePage
                projects={projects}
                tasks={tasks}
                onAddTask={handleAddTask}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
              />
            )}
            {currentPage === 'projects' && (
              <ProjectsPage projects={projects} />
            )}
            {currentPage === 'progress' && (
              <ProgressPage
                tasks={tasks}
                onAddTask={handleAddTask}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
              />
            )}
          </>
        )}
      </div>
    </main>
    <Footer />
    </div>
  );
}
