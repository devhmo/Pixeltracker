import { useState } from 'react'

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
  viewMode: 'cards' | 'dashboard';
  setViewMode: (mode: 'cards' | 'dashboard') => void;
}

export default function Header({ darkMode, toggleTheme, viewMode, setViewMode }: HeaderProps) {
  return (
    <header>
      <div className="header-controls">
        <button 
          id="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <span className="sun-icon">☀️</span>
          <span className="moon-icon">🌙</span>
        </button>
        <button 
          id="sort-btn" 
          className="btn"
          aria-label="Sort accounts"
        >
          <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h12M3 18h6" />
          </svg>
        </button>
        <button 
          id="enable-notifications-btn" 
          className="btn"
          aria-label="Enable notifications"
        >
          <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
      </div>
      
      <h1>PixelFarm</h1>
      <p>Account Pixels Tracker</p>
      
      <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button 
          onClick={() => setViewMode('cards')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            backgroundColor: viewMode === 'cards' ? 'var(--primary-color)' : 'var(--card-bg-color)',
            color: viewMode === 'cards' ? 'white' : 'var(--text-color)',
            cursor: 'pointer',
          }}
        >
          Cards View
        </button>
        <button 
          onClick={() => setViewMode('dashboard')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            backgroundColor: viewMode === 'dashboard' ? 'var(--primary-color)' : 'var(--card-bg-color)',
            color: viewMode === 'dashboard' ? 'white' : 'var(--text-color)',
            cursor: 'pointer',
          }}
        >
          IP Dashboard
        </button>
      </div>
    </header>
  );
}