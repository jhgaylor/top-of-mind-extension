<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <span>Current Theme: <strong>{theme}</strong></span>
  <button 
    onClick={handleThemeToggle}
    style={{
      padding: '4px 12px',
      backgroundColor: theme === 'light' ? '#333' : '#fff',
      color: theme === 'light' ? '#fff' : '#333',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }}
  >
    Toggle to {theme === 'light' ? 'Dark' : 'Light'}
  </button>
</div>