import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faBars } from '@fortawesome/free-solid-svg-icons';
import '../css/nav.css';
import { ThemeContext } from '../Themes';
import { Link } from 'react-router-dom';

function Nav() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [darkTheme, setDarkTheme] = useState(theme === 'dark');
  const [activeLink, setActiveLink] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setDarkTheme(theme === 'dark');
  }, [theme]);

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
    setSidebarOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${theme}`}>
        <div className="hamburger" onClick={() => setSidebarOpen(true)}>
          <FontAwesomeIcon icon={faBars} size="xl" />
        </div>
        <div className="navbar__title">Loan Calculator</div>

        <div className="navbar2">
          <ul className="navbar__links">
            <li><Link to="/" onClick={() => handleNavLinkClick('home')} className={activeLink === 'home' ? 'active' : ''}>Home</Link></li>
            <li><Link to="/about" onClick={() => handleNavLinkClick('about')} className={activeLink === 'about' ? 'active' : ''}>About</Link></li>
            <li><Link to="/exchange-rate" onClick={() => handleNavLinkClick('exchange')} className={activeLink === 'exchange' ? 'active' : ''}>Exchange Rate</Link></li>
            <li><Link to="/error" onClick={() => handleNavLinkClick('error')} className={activeLink === 'error' ? 'active' : ''}>Error Page</Link></li>
          </ul>
          <button onClick={toggleTheme} className="navbar__theme-toggle">
                {darkTheme ? (
                  <FontAwesomeIcon icon={faSun} size="2xl" color="white" />
                ) : (
                  <FontAwesomeIcon icon={faMoon} size="2xl" color="black" />
                )}
          </button> 
        </div>   
      </nav>

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <div className={`sidebar ${sidebarOpen ? 'open' : ''} ${theme==='dark'?"dark":"light"} `}>
        <ul className="sidebar__links">
          <li><Link to="/" onClick={() => handleNavLinkClick('home')} className={activeLink === 'home' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/about" onClick={() => handleNavLinkClick('about')} className={activeLink === 'about' ? 'active' : ''}>About</Link></li>
          <li><Link to="/exchange-rate" onClick={() => handleNavLinkClick('exchange')} className={activeLink === 'exchange' ? 'active' : ''}>Exchange Rate</Link></li>
          <li><Link to="/error" onClick={() => handleNavLinkClick('error')} className={activeLink === 'error' ? 'active' : ''}>Error Page</Link></li>
        </ul>
      </div>

    </>
  );
}

export default Nav;
