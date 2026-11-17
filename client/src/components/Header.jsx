import { useState, useRef, useEffect } from 'react';

export default function Header({
  currentPage = 'home',
  onNavigate,
  currentTheme = 'obsidian',
  onThemeChange,
  onOpenTerminal,
}) {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef(null);

  const navItems = [
    { id: 'home', label: 'Overview', code: '01' },
    { id: 'projects', label: 'Projects', code: '02' },
    { id: 'progress', label: 'Milestones', code: '03' },
  ];

  const themes = [
    { id: 'obsidian', name: 'Cyber Obsidian', icon: '🟢' },
    { id: 'gold', name: 'Champagne Gold', icon: '✨' },
    { id: 'crt', name: 'Retro Amber CRT', icon: '⚡' },
    { id: 'slate', name: 'Modern Slate', icon: '⚪' },
  ];

  // Close theme dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target)) {
        setIsThemeMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleNavClick(e, id) {
    e.preventDefault();
    if (onNavigate) onNavigate(id);
  }

  function handleThemeSelect(themeId) {
    if (onThemeChange) onThemeChange(themeId);
    setIsThemeMenuOpen(false);
  }

  return (
    <header className="header-bar">
      <div className="header-inner">
        {/* Brand Logo / Telemetry */}
        <div className="brand-group">
          <a
            href="#home"
            className="brand-logo"
            onClick={(e) => handleNavClick(e, 'home')}
          >
            <span className="brand-prefix">//</span>
            <span className="brand-main">BAGZIEL</span>
            <span className="brand-sub">.SYS</span>
          </a>
          <div className="telemetry-pill" title="System Status: Operational">
            <span className="pulse-indicator" />
            <span className="telemetry-label">SYSTEM · NOMINAL</span>
          </div>
        </div>

        {/* Center Navigation */}
        <nav className="nav-container" aria-label="Main Navigation">
          <ul className="nav-list">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <li key={item.id} className="nav-item">
                  <a
                    href={`#${item.id}`}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                  >
                    <span className="nav-code">{item.code}</span>
                    <span className="nav-text">{item.label}</span>
                    {isActive && <span className="nav-active-pip" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Header Right Actions */}
        <div className="header-actions">
          {/* Terminal Quick Launch Button */}
          <button
            type="button"
            className="header-action-btn terminal-trigger-btn"
            onClick={() => {
              if (onOpenTerminal) onOpenTerminal();
            }}
            title="Launch Terminal CLI"
            aria-label="Open Terminal"
          >
            <span className="terminal-glyph">&gt;_</span>
            <span className="action-label">CLI</span>
          </button>

          {/* Theme Selector Dropdown */}
          <div className="theme-dropdown-container" ref={themeMenuRef}>
            <button
              type="button"
              className="header-action-btn theme-toggle-btn"
              onClick={() => {
                setIsThemeMenuOpen((prev) => !prev);
              }}
              title="Select Color Palette"
              aria-expanded={isThemeMenuOpen}
              aria-haspopup="true"
            >
              <span className="theme-current-icon">
                {themes.find((t) => t.id === currentTheme)?.icon || '🎨'}
              </span>
              <span className="action-label">Theme</span>
              <span className={`dropdown-chevron ${isThemeMenuOpen ? 'open' : ''}`}>▾</span>
            </button>

            {isThemeMenuOpen && (
              <div className="theme-menu-popover">
                <div className="theme-menu-header">COLOR SCHEME</div>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`theme-option-btn ${currentTheme === t.id ? 'active' : ''}`}
                    onClick={() => handleThemeSelect(t.id)}
                  >
                    <span className="theme-opt-icon">{t.icon}</span>
                    <span className="theme-opt-name">{t.name}</span>
                    {currentTheme === t.id && <span className="theme-check">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
