import React, { useEffect, useMemo, useState } from 'react';
    import { StatDefinition, StatService } from '../services/StatService';
    import { autoWeight, WeightedInput } from '../services/WeightingService';

    interface SelectedStat extends StatDefinition {
      priority: 1|2|3|4|5;
      desiredMin?: number;
      direction: 'gte' | 'lte';
      weight: number;
    }

    const StatPanel: React.FC = () => {
      const [allStats, setAllStats] = useState<StatDefinition[]>([]);
      const [q, setQ] = useState('');
      const [selected, setSelected] = useState<SelectedStat[]>([]);
      const [minSum, setMinSum] = useState<number>(50);
      const [showJson, setShowJson] = useState(false);

      useEffect(() => {
        StatService.getStats().then(setAllStats);
      }, []);

      const suggestions = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return [];
        const already = new Set(selected.map(x => x.id));
        return allStats
          .filter(st => !already.has(st.id) && (st.text.toLowerCase().includes(s) || st.category.toLowerCase().includes(s)))
          .slice(0, 25);
      }, [q, allStats, selected]);

      const addStat = (st: StatDefinition) => {
        setSelected(cur => [...cur, { ...st, priority: 3, direction: 'gte', weight: 10 }]);
        setQ('');
      };

      const removeStat = (id: string) => {
        setSelected(cur => cur.filter(s => s.id !== id));
      };

      const onPriority = (id: string, p: number) => {
        setSelected(cur => cur.map(s => s.id === id ? { ...s, priority: Math.min(5, Math.max(1, p)) as any } : s));
      };

      const onDesired = (id: string, v?: number) => {
        setSelected(cur => cur.map(s => s.id === id ? { ...s, desiredMin: v } : s));
      };

      const onDirection = (id: string, d: 'gte'|'lte') => {
        setSelected(cur => cur.map(s => s.id === id ? { ...s, direction: d } : s));
      };

      const onWeight = (id: string, w: number) => {
        setSelected(cur => cur.map(s => s.id === id ? { ...s, weight: Math.max(1, Math.round(w)) } : s));
      };

      const handleAuto = () => {
        const inputs: WeightedInput[] = selected.map(s => ({
          id: s.id, text: s.text, priority: s.priority, desiredMin: s.desiredMin, direction: s.direction
        }));
        const result = autoWeight(inputs);
        setSelected(cur => cur.map(st => ({ ...st, weight: result.weights.find(w => w.id === st.id)?.weight ?? st.weight })));
        setMinSum(result.minSum);
      };

      const tradeWeightGroup = useMemo(() => {
        // PoE trade weight2 format:
        // group: [{ id, value: { weight } }], with group "type":"weight2", "min": minSum
        return {
          type: "weight2",
          min: minSum,
          filters: selected.map(s => ({
            id: s.id,
            disabled: false,
            value: { weight: s.weight }
          }))
        };
      }, [selected, minSum]);

      return (
        <div className="stat-panel">
          <h3>Stats & Weights</h3>
          <input
            className="stat-search"
            placeholder="Search stats…"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          {q && suggestions.length > 0 && (
            <div className="stat-suggestions">
              {suggestions.map(st => (
                <div key={st.id} className="stat-suggestion" onClick={() => addStat(st)}>{st.text}</div>
              ))}
            </div>
          )}

          <div className="stat-actions">
            <button className="btn" onClick={handleAuto}>Auto-weight</button>
            <div className="min-weight">
              <label>Min total score</label>
              <input type="number" value={minSum} onChange={e => setMinSum(parseInt(e.target.value || '0'))} />
            </div>
            <button className="btn" onClick={() => setShowJson(s => !s)}>{showJson ? 'Hide' : 'Show'} Trade JSON</button>
          </div>

          {showJson && (
            <pre style={{maxHeight:'240px', overflow:'auto', background:'#0f0f0f', padding:'8px', border:'1px solid #333', borderRadius:'6px'}}>
{JSON.stringify(tradeWeightGroup, null, 2)}
            </pre>
          )}

          <div className="stat-list">
            {selected.map(s => (
              <div className="stat-row" key={s.id}>
                <div className="stat-text">{s.text}</div>
                <div className="stat-controls">
                  <label>Priority</label>
                  <select value={s.priority} onChange={e => onPriority(s.id, parseInt(e.target.value))}>
                    {[1,2,3,4,5].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <label>Dir</label>
                  <select value={s.direction} onChange={e => onDirection(s.id, e.target.value as any)}>
                    <option value="gte">≥</option>
                    <option value="lte">≤</option>
                  </select>
                  <label>Desired ≥</label>
                  <input type="number" value={s.desiredMin ?? ''} onChange={e => onDesired(s.id, e.target.value === '' ? undefined : parseFloat(e.target.value))} style={{width:'7rem'}}/>
                  <label>Weight</label>
                  <input type="number" value={s.weight} onChange={e => onWeight(s.id, parseInt(e.target.value || '1'))} style={{width:'6rem'}}/>
                  <button className="btn" onClick={() => removeStat(s.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    export default StatPanel;