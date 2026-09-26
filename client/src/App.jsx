import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProgressPage from "./pages/ProgressPage";
import { listGoals, listProjects, createGoal, updateGoal, deleteGoal } from "./api";
import DemoNotice from './components/DemoNotice.jsx'

// A deliberately small working app. Replace all of it with your own project.
//
// What is worth keeping is the SHAPE: four states rather than two, a loading
// message that admits a free-tier server can be slow to wake, and errors that
// say something rather than rendering an empty list.


export default function App() {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false;
    Promise.all([listTasks(), listProjects()])
      .then(([tasksData, projectsData]) => {
        if (cancelled) return;
        setTasks(tasksData);
        setProjects(projectsData);
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {loadError && (
          <p className="max-w-5xl mx-auto px-4 py-4 text-small text-red-600">
            Couldn&apos;t load data: {loadError}
          </p>
        )}
        {isLoading ? (
          <p className="max-w-5xl mx-auto px-4 py-10 text-body text-text-secondary">Loading...</p>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  projects={projects}
                  tasks={tasks}
                  onAddTask={handleAddTask}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                />
              }
            />
            <Route path="/projects" element={<ProjectsPage projects={projects} />} />
            <Route
              path="/progress"
              element={<ProgressPage tasks={tasks} onToggleTask={handleToggleTask} onDeleteTask={handleDeleteTask} />}
            />
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  );
}
