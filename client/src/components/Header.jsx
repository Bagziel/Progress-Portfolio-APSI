export default function Header() {
    const navItems = [
        { id: 'home', label: 'Home', href: '/' },
        { id: 'projects', label: 'Projects', href: '/projects' },
        { id: 'tasks', label: 'Tasks', href: '/tasks' },
    ]

    return (
        <header className="header-bar">
            <div className="header-content">
                <a 
                className="header-logo" 
                href='/'
                onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
                >
                    Progress<span>Portfolio</span>
                </a>
                <nav aria-label="Main navigation">
                    <ul className="header-nav">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={item.href}
                                    onClick={(e) => { e.preventDefault(); onNavigate(item.id); }}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}