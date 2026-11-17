import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingHud from './components/FloatingHud';
import TerminalModal from './components/TerminalModal';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProgressPage from './pages/ProgressPage';
import DemoNotice from './components/DemoNotice';
import { listTasks, listProjects, createTask, updateTask, deleteTask } from './api';

export default function App() {
  // Application Data State
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  // UI Theme & Terminal State
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      return localStorage.getItem('portfolio_theme') || 'obsidian';
    } catch {
      return 'obsidian';
    }
  });

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Synchronize theme on document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    try {
      localStorage.setItem('portfolio_theme', currentTheme);
    } catch {}
  }, [currentTheme]);

  // Zero-dependency Hash Navigation (#home, #projects, #progress)
  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
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

  // Global Keyboard Shortcuts (e.g. ~ to toggle Terminal)
  useEffect(() => {
    function handleGlobalKeyDown(e) {
      if (e.key === '`' || e.key === '~') {
        const tag = document.activeElement?.tagName?.toLowerCase();
        if (tag !== 'input' && tag !== 'textarea') {
          e.preventDefault();
          setIsTerminalOpen((prev) => !prev);
        }
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  function handleNavigate(page) {
    setCurrentPage(page);
    window.location.hash = `#${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleThemeChange(themeId) {
    setCurrentTheme(themeId);
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
    return created;
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
    <div className={`app-layout theme-${currentTheme}`}>
      {/* Background ambient mesh grid */}
      <div className="ambient-background-grid" aria-hidden="true" />

      {/* Header Bar */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="main-content">
        <div className="page-wrapper">
          <DemoNotice />

          {loadError && (
            <div className="error-alert-banner" role="alert">
              <span className="error-icon">⚠️</span>
              <span>Could not load portfolio data: {loadError}</span>
            </div>
          )}

          {isLoading ? (
            <div className="loading-state-card">
              <div className="loading-pulse-ring" />
              <p className="loading-state-text">INITIALIZING TELEMETRY &amp; DATA SYSTEMS...</p>
            </div>
          ) : (
            <>
              {currentPage === 'home' && (
                <HomePage
                  projects={projects}
                  tasks={tasks}
                  onAddTask={handleAddTask}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                  onNavigate={handleNavigate}
                  onOpenTerminal={() => setIsTerminalOpen(true)}
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

      {/* Footer */}
      <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Floating HUD Dock (Terminal Launcher & Back to Top) */}
      <FloatingHud onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Interactive Floating Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        projects={projects}
        tasks={tasks}
        onAddTask={handleAddTask}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
      />
    </div>
  );
}
