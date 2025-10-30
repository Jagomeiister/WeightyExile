/**
 * ItemService provides functions to load and cache the list of item bases.
 * In the skeleton implementation, it loads static data from a local JSON
 * file (public/data/items.json) if available.  A real implementation
 * should fetch the file created by the scheduled GitHub Action and parse
 * the nested categories, filtering out unique items.
 */
export interface ItemCategory {
  /**
   * Unique identifier for the category (e.g., "accessories", "weapons").
   */
  id: string;
  /**
   * Human‑friendly label displayed to users (e.g., "Accessories").
   */
  label: string;
  /**
   * List of base types within the category.  Unique items are excluded.
   */
  bases: string[];
}

export class ItemService {
  /**
   * Internal helper that loads the raw item data JSON from the public folder.
   * Returns undefined if the fetch fails or the JSON cannot be parsed.
   */
  private static async loadItemData(): Promise<any | undefined> {
    try {
      const base = (import.meta as any).env?.BASE_URL || '/';
      const url = `${base}data/items.json`;
      const res = await fetch(url);
      if (!res.ok) return undefined;
      return await res.json();
    } catch (err) {
      return undefined;
    }
  }

  /**
   * Retrieve a flat, alphabetised list of item base names from the cached JSON.
   * Unique items are filtered out.  If the JSON cannot be loaded, returns an
   * empty array.
   */
  static async getBaseTypes(): Promise<string[]> {
    const data = await this.loadItemData();
    if (!data || !Array.isArray(data.result)) return [];
    const bases: string[] = [];
    for (const category of data.result) {
      if (Array.isArray(category.entries)) {
        for (const entry of category.entries) {
          if (entry && typeof entry.type === 'string' && !entry.name) {
            bases.push(entry.type);
          }
        }
      }
    }
    return bases.sort();
  }

  /**
   * Retrieve a structured list of item categories with their base types.
   * Unique items are filtered out.  Categories are sorted alphabetically by
   * label and their base lists are also sorted.  If the JSON cannot be
   * loaded, returns an empty array.
   */
  static async getCategories(): Promise<ItemCategory[]> {
    const data = await this.loadItemData();
    if (!data || !Array.isArray(data.result)) return [];
    const categories: ItemCategory[] = [];
    for (const category of data.result) {
      const id: string = category.id ?? '';
      const label: string = category.label ?? id;
      const bases: string[] = [];
      if (Array.isArray(category.entries)) {
        for (const entry of category.entries) {
          // Only include non‑unique base items: those with a "type" but without a "name" property
          if (entry && typeof entry.type === 'string' && !entry.name) {
            bases.push(entry.type);
          }
        }
      }
      if (bases.length > 0) {
        categories.push({ id, label, bases: bases.sort() });
      }
    }
    // Sort categories by their human‑friendly label
    categories.sort((a, b) => a.label.localeCompare(b.label));
    return categories;
  }
}