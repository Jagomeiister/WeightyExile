import React, { useEffect, useState } from 'react';
import { ItemService } from '../services/ItemService';

/**
 * BaseSelector loads a list of item base categories and allows the user to
 * select one.  At this early stage of development it displays a simple
 * drop‑down menu populated from the ItemService.  The real implementation
 * should filter out unique items and support search and hierarchy.
 */
const BaseSelector: React.FC = () => {
  const [bases, setBases] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    // Fetch cached items from the service.  In the initial skeleton this
    // returns an empty list.  Implement ItemService.getBaseTypes() to
    // return the flattened base item names.
    const fetchBases = async () => {
      const items = await ItemService.getBaseTypes();
      setBases(items);
    };
    fetchBases();
  }, []);

  return (
    <div className="base-selector">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="base-select"
      >
        <option value="" disabled>
          -- choose a base --
        </option>
        {bases.map((base) => (
          <option key={base} value={base}>
            {base}
          </option>
        ))}
      </select>
      {selected && (
        <p className="selected-base">Selected base: {selected}</p>
      )}
    </div>
  );
};

export default BaseSelector;