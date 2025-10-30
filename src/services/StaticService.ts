/**
 * StaticService loads additional data such as currencies, influences,
 * map tiers, etc.  The skeleton does not implement loading logic.
 */
export class StaticService {
  static async getStatic(): Promise<any[]> {
    try {
      const res = await fetch('/weightexile/data/static.json');
      if (!res.ok) return [];
      return await res.json();
    } catch (err) {
      return [];
    }
  }
}