import React, { useEffect, useMemo, useState } from 'react';
import { StatService, StatDefinition } from '../services/StatService';
import { WeightingService, WeightedStatInput } from '../services/WeightingService';

/**
 * StatPanel allows users to search for stat modifiers, add them to a
 * weighted group, adjust individual weights and set a minimum total
 * weight threshold.  This component loads stat definitions from the
 * StatService and provides simple UI controls for configuration.
 */
const StatPanel: React.FC = () => {
  // All available stat definitions
  const [stats, setStats] = useState<StatDefinition[]>([]);
  // Search term for filtering stats
  const [search, setSearch] = useState('');
  /**
   * Selected stats with weight and optional desired minimum.  The
   * desiredMin field is currently unused in WeightingService but
   * reserved for future enhancements.
   */
  const [selectedStats, setSelectedStats] = useState<{
    stat: StatDefinition;
    weight: number;
    desiredMin?: number;
  }[]>([]);
  // Minimum total weight threshold for the group.  Can be edited by the user.
  const [minTotal, setMinTotal] = useState<number>(0);
  // Whether the user has manually edited the minTotal.  If false, the
  // component will update minTotal based on suggested values when
  // selected stats change.
  const [minEdited, setMinEdited] = useState<boolean>(false);
  // Suggested minTotal computed by WeightingService.  Displayed as
  // guidance to the user.
  const [suggestedMin, setSuggestedMin] = useState<number>(0);

  useEffect(() => {
    const load = async () => {
      const defs = await StatService.getStats();
      setStats(defs);
    };
    load();
  }, []);

  /**
   * Filter available stats based on the search term and exclude any
   * already selected stats.  Limit the number of suggestions to avoid
   * overwhelming the user.
   */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return stats
      .filter(
        (s) =>
          s.text.toLowerCase().includes(q) &&
          !selectedStats.find((sel) => sel.stat.id === s.id)
      )
      .slice(0, 10);
  }, [stats, search, selectedStats]);

  // Add a stat to the selected list with a default weight of 1
  const addStat = (stat: StatDefinition) => {
    setSelectedStats((prev) => [...prev, { stat, weight: 1 }]);
    setSearch('');
  };

  // Update the weight for a selected stat at the given index
  const updateWeight = (index: number, weight: number) => {
    setSelectedStats((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], weight };
      return next;
    });
  };

  // Remove a stat from the selected list
  const removeStat = (index: number) => {
    setSelectedStats((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * Compute and update the suggested minimum total weight whenever the
   * selected stats or their weights change.  If the user has not
   * manually edited minTotal (minEdited is false), minTotal will be
   * updated to the new suggestion.
   */
  useEffect(() => {
    // Build WeightedStatInput array for WeightingService
    const inputs: WeightedStatInput[] = selectedStats.map((s) => ({
      id: s.stat.id,
      weight: s.weight,
      desiredMin: s.desiredMin,
    }));
    const suggestion = WeightingService.suggestMinSum(inputs);
    setSuggestedMin(suggestion);
    if (!minEdited) {
      setMinTotal(suggestion);
    }
  }, [selectedStats, minEdited]);

  // Handler for manual minTotal input change
  const handleMinChange = (value: number) => {
    setMinEdited(true);
    setMinTotal(value);
  };

  return (
    <div className="stat-panel">
      <h3>Stat Weights</h3>
      {/* Search input */}
      <input
        type="text"
        className="stat-search"
        placeholder="Search modifiers..."
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />
      {/* Suggestions list */}
      {search && filtered.length > 0 && (
        <ul className="stat-suggestions">
          {filtered.map((stat) => (
            <li key={stat.id} onClick={() => addStat(stat)}>
              {stat.text}
            </li>
          ))}
        </ul>
      )}
      {/* Selected stats and weight controls */}
      <div className="selected-stats">
        {selectedStats.map((item, index) => (
          <div key={item.stat.id} className="stat-row">
            <span className="stat-text">{item.stat.text}</span>
            <input
              type="number"
              min="0"
              step="0.1"
              value={item.weight}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateWeight(index, parseFloat(e.target.value))}
              className="weight-input"
            />
            <button
              type="button"
              className="remove-stat"
              onClick={() => removeStat(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      {/* Minimum total weight input */}
      <div className="min-weight">
        <label htmlFor="min-weight-input">Minimum total weight:</label>
        <input
          id="min-weight-input"
          type="number"
          min="0"
          step="1"
          value={minTotal}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleMinChange(parseInt(e.target.value, 10) || 0)}
          className="min-weight-input"
        />
        {/* Display suggested minimum for guidance */}
        {suggestedMin > 0 && (
          <span className="suggested-min">(Suggested: {suggestedMin})</span>
        )}
      </div>
    </div>
  );
};

export default StatPanel;