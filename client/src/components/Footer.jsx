export default function Footer({ onOpenTerminal }) {
  return (
    <footer className="footer-bar">
      <div className="footer-inner">
        <div className="footer-brand-section">
          <div className="footer-brand-logo">
            <span className="brand-dot" />
            <strong>PROGRESS PORTFOLIO</strong>
            <span className="footer-badge">PORTFOLIO &amp; LAB</span>
          </div>
          <p className="footer-subtext">
            Designed &amp; built by <strong>Baguio, Eriel Ben L.</strong> · Software &amp; Data Engineering.
          </p>
        </div>

        <div className="footer-hud-info">
          <div className="footer-shortcut-hint">
            <span className="kbd-pill">~</span>
            <span>or click CLI for command terminal</span>
          </div>

          <div className="footer-links">
            <a
              href="https://github.com/Bagziel"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              GitHub Profile ↗
            </a>
            <span className="footer-sep">/</span>
            <a
              href="https://github.com/Bagziel/Progress-Portfolio-APSI"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              Repository ↗
            </a>
            <span className="footer-sep">/</span>
            <button
              type="button"
              className="footer-cli-link"
              onClick={() => {
                if (onOpenTerminal) onOpenTerminal();
              }}
            >
              Terminal Console &gt;_
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
