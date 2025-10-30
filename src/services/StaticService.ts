/**
 * StaticService loads additional data such as currencies, influences,
 * map tiers, etc.  The skeleton does not implement loading logic.
 */
export class StaticService {
  static async getStatic(): Promise<any[]> {
    try {
      const base = (import.meta as any).env?.BASE_URL || '/';
      const url = `${base}data/static.json`;
      const res = await fetch(url);
      if (!res.ok) return [];
      return await res.json();
    } catch (err) {
      return [];
    }
  }
}