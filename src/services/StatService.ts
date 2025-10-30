/**
 * StatService loads stat definitions from a local JSON file and exposes
 * helper functions to search and filter stats.  The skeleton returns
 * an empty list; real implementations should parse the trade API
 * `data/stats` JSON and index stats by id and text.
 */
export interface StatDefinition {
  id: string;
  text: string;
  category: string;
}

export class StatService {
  /**
   * Load stat definitions from the cached JSON.  Returns an empty array
   * when the file is not available or parsing fails.
   */
  static async getStats(): Promise<StatDefinition[]> {
    try {
      const base = (import.meta as any).env?.BASE_URL || '/';
      const url = `${base}data/stats.json`;
      const res = await fetch(url);
      if (!res.ok) return [];
      const data = await res.json();
      // Flatten the stat groups into a single array.  This will be
      // implemented once the structure of stats.json is defined.
      return [];
    } catch (err) {
      return [];
    }
  }
}