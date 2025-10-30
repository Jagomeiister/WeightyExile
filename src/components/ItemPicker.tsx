import React, { useEffect, useMemo, useState } from 'react';
import { ItemService, ItemCategory } from '../services/ItemService';

/**
 * ItemPicker presents a two‑column interface for selecting an item base.
 * The left column lists categories (e.g. Accessories, Armour, Weapons) and
 * the right column lists the base types within the selected category.
 * A search box filters bases across all categories.  When a base is
 * clicked, the onSelect callback is invoked with the base name.
 */
interface ItemPickerProps {
  /**
   * Callback invoked when the user selects a base item.  The argument
   * is the base type string.
   */
  onSelect: (base: string) => void;
}

const ItemPicker: React.FC<ItemPickerProps> = ({ onSelect }) => {
  const [categories, setCategories] = useState<ItemCategory[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Load categories on mount
  useEffect(() => {
    const load = async () => {
      const cats = await ItemService.getCategories();
      setCategories(cats);
      // Default to the first category if available
      if (cats.length > 0) {
        setSelectedCategoryId(cats[0].id);
      }
    };
    load();
  }, []);

  /**
   * Filter categories and their bases based on the search term.
   * Categories with no matching bases are excluded from the returned list.
   */
  const filteredCategories = useMemo(() => {
    if (!search) return categories;
    const q = search.toLowerCase();
    return categories
      .map((cat) => {
        const bases = cat.bases.filter((b) => b.toLowerCase().includes(q));
        return { ...cat, bases };
      })
      .filter((cat) => cat.bases.length > 0);
  }, [categories, search]);

  // Determine the currently selected category
  const selectedCategory = useMemo(() => {
    // If the selectedCategoryId no longer exists in filtered list, pick the first
    const byId = filteredCategories.find((c) => c.id === selectedCategoryId);
    return byId ?? filteredCategories[0] ?? null;
  }, [filteredCategories, selectedCategoryId]);

  // Base list for selected category
  const bases = selectedCategory ? selectedCategory.bases : [];

  return (
    <div className="item-picker">
      <div className="picker-search-row">
        <input
          type="text"
          className="base-search"
          placeholder="Search bases..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="picker-columns">
        <div className="picker-col categories">
          <ul className="picker-list">
            {filteredCategories.map((cat) => (
              <li
                key={cat.id}
                className={cat.id === (selectedCategory && selectedCategory.id) ? 'active' : ''}
                onClick={() => setSelectedCategoryId(cat.id)}
              >
                {cat.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="picker-col bases">
          <ul className="picker-list">
            {bases.map((b) => (
              <li key={b} onClick={() => onSelect(b)}>
                {b}
              </li>
            ))}
            {bases.length === 0 && (
              <li className="no-results">No bases found</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItemPicker;