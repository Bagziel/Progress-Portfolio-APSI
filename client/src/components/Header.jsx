export default function Header({ currentPage = 'home', onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'progress', label: 'Progress' },
  ];

  return (
    <header className="header-bar">
      <div className="header-inner">
        <a 
          href="#home" 
          className="brand-logo"
          onClick={(e) => { 
            e.preventDefault(); 
            if (onNavigate) onNavigate('home'); 
          }}
        >
          Progress<span>Portfolio</span>
        </a>
        <nav aria-label="Main Navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}