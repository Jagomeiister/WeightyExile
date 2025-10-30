import React, { useEffect, useState } from 'react';
import { ItemService, ItemCategory } from '../services/ItemService';

/**
 * BaseSelector loads a list of item base categories and allows the user to
 * select one.  At this early stage of development it displays a simple
 * drop‑down menu populated from the ItemService.  The real implementation
 * should filter out unique items and support search and hierarchy.
 */
const BaseSelector: React.FC = () => {
  // List of categories loaded from the service
  const [categories, setCategories] = useState<ItemCategory[]>([]);
  // Current search term used to filter bases
  const [search, setSearch] = useState('');
  // Currently selected base item
  const [selected, setSelected] = useState('');

  useEffect(() => {
    // Load structured categories on component mount
    const fetchCategories = async () => {
      const cats = await ItemService.getCategories();
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  /**
   * Filter the bases within each category based on the search term.  This
   * function returns a new array of categories where each category only
   * contains bases that match the search query.  Categories with no
   * matching bases are excluded from the returned list.
   */
  const filteredCategories = categories
    .map((cat) => {
      const filteredBases = cat.bases.filter((base) =>
        base.toLowerCase().includes(search.toLowerCase())
      );
      return { ...cat, bases: filteredBases };
    })
    .filter((cat) => cat.bases.length > 0);

  return (
    <div className="base-selector">
      {/* Search bar to filter bases */}
      <input
        type="text"
        className="base-search"
        placeholder="Search base type..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="base-select"
      >
        <option value="" disabled>
          -- choose a base --
        </option>
        {filteredCategories.map((cat) => (
          <optgroup key={cat.id} label={cat.label}>
            {cat.bases.map((base) => (
              <option key={`${cat.id}-${base}`} value={base}>
                {base}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      {selected && (
        <p className="selected-base">Selected base: {selected}</p>
      )}
    </div>
  );
};

export default BaseSelector;