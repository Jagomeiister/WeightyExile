/**
 * ItemService provides functions to load and cache the list of item bases.
 * In the skeleton implementation, it loads static data from a local JSON
 * file (public/data/items.json) if available.  A real implementation
 * should fetch the file created by the scheduled GitHub Action and parse
 * the nested categories, filtering out unique items.
 */
export class ItemService {
  /**
   * Retrieve a flat list of item base names from the cached JSON.  If
   * the JSON file is unavailable or cannot be parsed, an empty array
   * is returned.  This function can be enhanced to support caching
   * results in memory and to handle stale data.
   */
  static async getBaseTypes(): Promise<string[]> {
    try {
      // Use Vite's BASE_URL to construct the correct path to static data
      // When deployed to GitHub Pages, BASE_URL will be the repository name (e.g., `/weightexile/`)
      // During local development it will be `/`.
      const base = (import.meta as any).env?.BASE_URL || '/';
      const url = `${base}data/items.json`;
      const res = await fetch(url);
      if (!res.ok) {
        // Return an empty array on error; you may want to log the error
        return [];
      }
      const data = await res.json();
      // The data structure follows the PoE trade API: result is an array of
      // categories, each containing an entries array.  We flatten the entries
      // and return the base types (ignore unique items which have a name field).
      const bases: string[] = [];
      if (Array.isArray(data.result)) {
        for (const category of data.result) {
          if (Array.isArray(category.entries)) {
            for (const entry of category.entries) {
              if (entry && typeof entry.type === 'string' && !entry.name) {
                bases.push(entry.type);
              }
            }
          }
        }
      }
      return bases.sort();
    } catch (err) {
      // In a real implementation, consider rethrowing or logging the error
      return [];
    }
  }
}