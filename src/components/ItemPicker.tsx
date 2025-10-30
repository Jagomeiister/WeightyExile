import React, { useEffect, useMemo, useState } from 'react';
import { ItemService } from '../services/ItemService';
import { inferType } from '../utils/inferType';

interface ItemPickerProps {
  onSelect: (base: string) => void;
}

/**
 * Two‑pane picker: Type (left) → Base (right)
 * - No class column; we derive a friendly "type" bucket from base names.
 * - Top search narrows both panes.
 */
const ItemPicker: React.FC<ItemPickerProps> = ({ onSelect }) => {
  const [allBases, setAllBases] = useState<string[]>([]);
  const [q, setQ] = useState('');
  const [selType, setSelType] = useState<string | null>(null);

  useEffect(() => {
    ItemService.getAllBases().then(setAllBases);
  }, []);

  const filteredBases = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return allBases;
    return allBases.filter(b => b.toLowerCase().includes(s));
  }, [allBases, q]);

  const typeBuckets = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const b of filteredBases) {
      const t = inferType(b);
      if (!map.has(t)) map.set(t, []);
      map.get(t)!.push(b);
    }
    const entries = Array.from(map.entries()).map(([type, list]) => ({
      type,
      list: list.sort((a, b) => a.localeCompare(b)),
    }));
    entries.sort((a, b) => a.type.localeCompare(b.type));
    return entries;
  }, [filteredBases]);

  const bases = useMemo(() => {
    if (!selType) return [];
    const b = typeBuckets.find(t => t.type === selType);
    return b ? b.list : [];
  }, [typeBuckets, selType]);

  return (
    <div className="picker-container">
      <div className="picker-toolbar">
        <input
          className="base-search"
          placeholder="Search bases…"
          value={q}
          onChange={e => { setQ(e.target.value); }}
        />
      </div>

      <div className="picker-columns two">
        <div className="picker-col">
          <div className="picker-title">Type</div>
          <ul className="picker-list">
            {typeBuckets.map(t => (
              <li key={t.type}
                  className={t.type === selType ? 'active' : ''}
                  onClick={() => setSelType(t.type)}>
                {t.type} <span className="count">({t.list.length})</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="picker-col">
          <div className="picker-title">Base</div>
          <ul className="picker-list">
            {bases.map(b => (
              <li key={b} onClick={() => onSelect(b)}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItemPicker;