import React from 'react';
import BaseSelector from './components/BaseSelector';
import StatPanel from './components/StatPanel';

/**
 * Root application component.  This component lays out the high‑level
 * structure of the WeightyExile UI.  Currently it contains placeholder
 * panels for selecting an item base and configuring stat weights.  As
 * development progresses, additional components (e.g., QueryPreview,
 * GroupControls) will be added here.
 */
const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>WeightyExile</h1>
        <p className="subtitle">Craft weighted trade queries for Path of Exile</p>
      </header>
      <main className="app-content">
        <section className="base-selector-panel">
          <h2>Select Base Item</h2>
          <BaseSelector />
        </section>
        <section className="stat-panel">
          <h2>Configure Stats & Weights</h2>
          <StatPanel />
        </section>
      </main>
    </div>
  );
};

export default App;