import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProgressPage from "./pages/ProgressPage";
import { listTasks, listProjects, createTask, updateTask, deleteTask } from "./api";
import DemoNotice from "./components/DemoNotice.jsx";

export default function App() {
  // Application State
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");

  // Zero-dependency Hash Navigation (#home, #projects, #progress)
  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash.replace("#/", "").replace("#", "");
      if (["projects", "progress"].includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage("home");
      }
    }
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  function handleNavigate(page) {
    setCurrentPage(page);
    window.location.hash = `#${page}`;
  }

  // Fetch initial tasks and projects
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
        setLoadError(err.message);
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Task Actions
  async function handleAddTask(input) {
    const created = await createTask(input);
    setTasks((prevTasks) => [created, ...prevTasks]);
  }

  async function handleToggleTask(id) {
    const current = tasks.find((t) => t.id === id);
    if (!current) return;
    const updated = await updateTask(id, { completed: !current.completed });
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? updated : t))
    );
  }

  async function handleDeleteTask(id) {
    await deleteTask(id);
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  }

  return (
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
              {currentPage === "home" && (
                <HomePage
                  projects={projects}
                  tasks={tasks}
                  onAddTask={handleAddTask}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                  onNavigate={handleNavigate}
                />
              )}
              {currentPage === "projects" && (
                <ProjectsPage projects={projects} />
              )}
              {currentPage === "progress" && (
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
