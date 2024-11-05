// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import Dictionary from './components/Dictionary';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`App ${theme}`}>
      <div className="theme-toggle">
        <span>{theme === 'light' ? '🌞' : '🌙'}</span>
        <button onClick={toggleTheme} className="theme-button">
          theme-change
        </button>
      </div>
      <Dictionary />
    </div>
  );
}

export default App;
