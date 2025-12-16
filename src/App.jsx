import React from 'react';
import { DarkModeProvider } from './DarkModeContext';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  return (
    <DarkModeProvider>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Impact Africa</h1>
          <DarkModeToggle />
        </header>
        <main>
          {/* Your main content goes here */}
        </main>
      </div>
    </DarkModeProvider>
  );
}

export default App;