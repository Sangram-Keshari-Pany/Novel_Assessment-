import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import '../css/nav.css'; 

function Nav() {
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [darkTheme, setDarkTheme] = useState(storedTheme === 'dark');

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
    localStorage.setItem("theme", darkTheme ? "dark" : "light");
    console.log(localStorage.getItem('theme'))
  };
  return (
    <nav className="navbar">
      <div className="navbar__title">Loan Calculator</div>
      <ul className="navbar__links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/exchange-rate">Exchange Rate</a></li>
        <li><a href="/error">Error Page</a></li>
        <li>
          <button
            onClick={toggleTheme}
            className="navbar__theme-toggle"
            aria-label={darkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {darkTheme ? 
              <FontAwesomeIcon icon={faSun} size="2xl" color="white" /> 
              : 
              <FontAwesomeIcon icon={faMoon} size="2xl" color="black" />
            }
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
