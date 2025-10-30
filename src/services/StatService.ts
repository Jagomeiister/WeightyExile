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
      const stats: StatDefinition[] = [];
      if (Array.isArray(data.result)) {
        for (const group of data.result) {
          const category: string = group.label ?? group.id ?? 'Misc';
          if (Array.isArray(group.entries)) {
            for (const entry of group.entries) {
              if (entry && typeof entry.id === 'string' && typeof entry.text === 'string') {
                stats.push({ id: entry.id, text: entry.text, category });
              }
            }
          }
        }
      }
      return stats;
    } catch (err) {
      return [];
    }
  }
}