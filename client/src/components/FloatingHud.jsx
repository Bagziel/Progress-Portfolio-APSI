import { useState, useEffect } from 'react';

export default function FloatingHud({ onOpenTerminal }) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowBackToTop(window.scrollY > 300);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="floating-hud-dock" aria-label="HUD Controls">
      {showBackToTop && (
        <button
          type="button"
          className="hud-btn top-btn"
          onClick={scrollToTop}
          title="Scroll to Top"
          aria-label="Scroll to top"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}

      <button
        type="button"
        className="hud-btn terminal-btn"
        onClick={() => {
          if (onOpenTerminal) onOpenTerminal();
        }}
        title="Open Interactive Terminal (or press ~)"
        aria-label="Open Interactive Terminal"
      >
        <span className="terminal-glow-pulse" />
        <span className="terminal-hud-label">&gt;_</span>
      </button>
    </div>
  );
}
