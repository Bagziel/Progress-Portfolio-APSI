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
  const [goals, setGoals] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false;
    Promise.all([listGoals(), listProjects()])
      .then(([goalsData, projectsData]) => {
        if (cancelled) return;
        setGoals(goalsData);
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

  async function handleAddGoal(title) {
    const createdGoal = await createGoal(title);
    setGoals((prevGoals) => [...prevGoals, createdGoal]);
  }

  async function handleToggleGoal(id) {
    const current = goals.find((goal) => goal.id === id);
    if (!current) return;
    const updatedGoal = await updateGoal(id, { completed: !current.completed });
    setGoals((prevGoals) =>
      prevGoals.map((goal) => (goal.id === id ? updatedGoal : goal))
    );
  }

  async function handleDeleteGoal(id) {
    await deleteGoal(id);
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
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
                  goals={goals}
                  onAddGoal={handleAddGoal}
                  onToggleGoal={handleToggleGoal}
                  onDeleteGoal={handleDeleteGoal}
                />
              }
            />
            <Route path="/projects" element={<ProjectsPage projects={projects} />} />
            <Route
              path="/progress"
              element={<ProgressPage goals={goals} onToggleGoal={handleToggleGoal} onDeleteGoal={handleDeleteGoal} />}
            />
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  );
}
