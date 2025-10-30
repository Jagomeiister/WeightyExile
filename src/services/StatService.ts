export interface StatDefinition {
  id: string;
  text: string;
  category: string;
}

export class StatService {
  static async getStats(): Promise<StatDefinition[]> {
    try {
      const base = (import.meta as any).env?.BASE_URL || '/';
      const url = `${base}data/stats.json`;
      const res = await fetch(url);
      if (!res.ok) return [];
      const data = await res.json();
      const out: StatDefinition[] = [];
      for (const group of data.result || []) {
        const gLabel = group.label || group.id || 'Stats';
        for (const e of group.entries || []) {
          if (e && e.id && e.text) out.push({ id: e.id, text: e.text, category: gLabel });
        }
      }
      return out;
    } catch {
      return [];
    }
  }
}