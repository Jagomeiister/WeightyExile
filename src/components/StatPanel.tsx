import React from 'react';

/**
 * StatPanel is a placeholder for configuring stat filters and weights.  The
 * real implementation will allow searching stats, adding them to groups
 * and adjusting weights and thresholds.  For now it simply shows a
 * message indicating where the controls will appear.
 */
const StatPanel: React.FC = () => {
  return (
    <div className="stat-panel">
      <p>
        Stat configuration coming soon.  Here you will be able to search
        modifiers, add them to weighted groups, set per‑stat weights and
        define minimum total weights.
      </p>
    </div>
  );
};

export default StatPanel;