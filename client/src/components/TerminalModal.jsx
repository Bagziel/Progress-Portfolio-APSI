import { useState, useRef, useEffect } from 'react';

export default function TerminalModal({
  isOpen,
  onClose,
  projects = [],
  tasks = [],
  onAddTask,
  currentTheme,
  onThemeChange,
}) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'PROGRESS PORTFOLIO TERMINAL [Version 2.4.0]\n(c) 2026 Eriel Ben L. Baguio. All rights reserved.\nType "help" to see available commands.',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);
  const canvasRef = useRef(null);

  // Auto-scroll to bottom on output
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Matrix digital rain canvas effect
  useEffect(() => {
    if (!isMatrixActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const width = (canvas.width = canvas.parentElement.offsetWidth);
    const height = (canvas.height = canvas.parentElement.offsetHeight);

    const characters = '0123456789ABCDEF0123456789HIJKLMNOPQRSTUVWXYZ$#@%&*+-=<>~/';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(8, 12, 9, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#34d399';
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMatrixActive]);

  if (!isOpen) return null;

  function handleCommand(cmd) {
    const raw = cmd.trim();
    if (!raw) return;

    // Save to command history
    setCommandHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    const parts = raw.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    const newEntries = [{ type: 'input', text: `> ${raw}` }];

    switch (command) {
      case 'help':
        newEntries.push({
          type: 'output',
          text: `AVAILABLE TERMINAL COMMANDS:
  help                 - Display this commands directory
  bio / whoami         - View developer profile & credentials
  projects             - Display catalog of showcased projects
  tasks / progress     - List active & completed milestones
  add <milestone>      - Directly add a task milestone to the portfolio
  skills               - Inspect technical competencies & stack
  theme <name>         - Switch theme (obsidian, gold, crt, slate)
  matrix               - Toggle matrix digital rain mode
  clear                - Clear console screen
  repo                 - View GitHub repository links
  exit / close         - Close terminal window`,
        });
        break;

      case 'bio':
      case 'whoami':
        newEntries.push({
          type: 'output',
          text: `NAME: Baguio, Eriel Ben L.
ROLE: Software Engineer & Data Analyst
FOCUS: Data Analytics, ETL Pipelines, Modern Web Engineering
GITHUB: https://github.com/Bagziel
STATUS: Open for Software Engineering & Data Analytics Opportunities`,
        });
        break;

      case 'projects':
        if (projects.length === 0) {
          newEntries.push({ type: 'output', text: 'No projects registered in catalog.' });
        } else {
          const list = projects
            .map(
              (p, i) =>
                `[${i + 1}] ${p.name || p.title}\n    Status: ${
                  p.completed ? 'COMPLETED' : 'IN_PROGRESS'
                } | Tools: ${(p.tools || []).join(', ')}\n    Repo: ${p.repository || 'N/A'}`
            )
            .join('\n\n');
          newEntries.push({ type: 'output', text: list });
        }
        break;

      case 'tasks':
      case 'progress':
        if (tasks.length === 0) {
          newEntries.push({ type: 'output', text: 'No milestones found.' });
        } else {
          const completedCount = tasks.filter((t) => t.completed).length;
          const list = tasks
            .map(
              (t) =>
                `  ${t.completed ? '[x]' : '[ ]'} #${t.id} ${t.title} (${
                  t.category || 'General'
                })`
            )
            .join('\n');
          newEntries.push({
            type: 'output',
            text: `MILESTONES OVERVIEW (${completedCount}/${tasks.length} Completed):\n${list}`,
          });
        }
        break;

      case 'add':
        if (!args.trim()) {
          newEntries.push({
            type: 'error',
            text: 'ERROR: Please provide a milestone title. Syntax: add <milestone title>',
          });
        } else {
          if (onAddTask) {
            onAddTask({ title: args.trim(), category: 'Web Development' });
            newEntries.push({
              type: 'success',
              text: `SUCCESS: Added milestone "${args.trim()}" [Category: Web Development]`,
            });
          }
        }
        break;

      case 'skills':
        newEntries.push({
          type: 'output',
          text: `TECHNICAL COMPETENCY MATRIX:
  [SQL & Databases]    PostgreSQL, Database Modeling, Complex Window Functions, CTEs
  [Data & Analytics]   Python, Pandas, Exploratory Data Analysis, KPI Dashboards
  [Web Engineering]    React, Vite, Node.js, Express, JavaScript ES6+, RESTful APIs
  [DevOps & Tools]     Docker, Git/GitHub, GitHub Actions CI/CD, Containerization`,
        });
        break;

      case 'theme':
        {
          const themeName = args.toLowerCase();
          if (['obsidian', 'gold', 'crt', 'slate'].includes(themeName)) {
            onThemeChange(themeName);
            newEntries.push({
              type: 'success',
              text: `THEME_CONFIG: Environment palette updated to "${themeName}".`,
            });
          } else {
            newEntries.push({
              type: 'error',
              text: `Invalid theme. Available themes: obsidian, gold, crt, slate`,
            });
          }
        }
        break;

      case 'matrix':
        setIsMatrixActive((prev) => !prev);
        newEntries.push({
          type: 'output',
          text: `MATRIX RAIN: ${!isMatrixActive ? 'INITIALIZED' : 'TERMINATED'}.`,
        });
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'repo':
        newEntries.push({
          type: 'output',
          text: `REPOSITORY URL:
https://github.com/Bagziel/Progress-Portfolio-APSI
AUTHOR PROFILE:
https://github.com/Bagziel`,
        });
        break;

      case 'exit':
      case 'close':
        onClose();
        return;

      default:
        newEntries.push({
          type: 'error',
          text: `COMMAND NOT RECOGNIZED: "${command}". Type "help" to view directory of commands.`,
        });
    }

    setHistory((prev) => [...prev, ...newEntries]);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex =
          historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInputVal(commandHistory[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  }

  return (
    <div className="terminal-backdrop" onClick={onClose}>
      <div
        className={`terminal-modal ${isMaximized ? 'maximized' : ''} ${
          isMatrixActive ? 'matrix-active' : ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header Bar */}
        <div className="terminal-header">
          <div className="terminal-window-dots">
            <button
              className="term-dot close"
              onClick={onClose}
              title="Close terminal (Esc)"
              aria-label="Close"
            />
            <button
              className="term-dot minimize"
              onClick={() => setIsMaximized((prev) => !prev)}
              title="Toggle size"
              aria-label="Maximize/Restore"
            />
            <button
              className="term-dot matrix"
              onClick={() => setIsMatrixActive((prev) => !prev)}
              title="Toggle Matrix Rain"
              aria-label="Matrix Rain"
            />
          </div>

          <div className="terminal-title">
            <span className="terminal-prompt-icon">›_</span>
            <span>bagziel@terminal: ~</span>
          </div>

          <div className="terminal-actions">
            <span className="term-badge">CLI_V2.4</span>
          </div>
        </div>

        {/* Matrix Canvas Layer */}
        {isMatrixActive && <canvas ref={canvasRef} className="matrix-canvas" />}

        {/* Terminal Body */}
        <div className="terminal-body" ref={terminalBodyRef}>
          {history.map((item, idx) => (
            <div key={idx} className={`term-row ${item.type}`}>
              {item.type === 'input' ? (
                <span className="term-input-text">{item.text}</span>
              ) : (
                <pre className="term-pre">{item.text}</pre>
              )}
            </div>
          ))}

          {/* Active Command Input Line */}
          <div className="term-input-line">
            <span className="term-prompt">user@bagziel:~$</span>
            <input
              ref={inputRef}
              type="text"
              className="term-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
