export interface ItemCategory {
  label: string;
  bases: string[];
}

export class ItemService {
  static async _loadItemsJson(): Promise<any> {
    const base = (import.meta as any).env?.BASE_URL || '/';
    const url = `${base}data/items.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load items.json: ${res.status}`);
    return res.json();
  }

  static async getBaseTypes(): Promise<string[]> {
    try {
      const data = await this._loadItemsJson();
      const out = new Set<string>();
      for (const cat of data.result || []) {
        for (const e of cat.entries || []) {
          if (e && e.type && !e.name) out.add(e.type as string);
        }
      }
      return Array.from(out).sort((a, b) => a.localeCompare(b));
    } catch {
      return [];
    }
  }

  static async getCategories(): Promise<ItemCategory[]> {
    try {
      const data = await this._loadItemsJson();
      const res: ItemCategory[] = [];
      for (const cat of (data.result || [])) {
        const bases = new Set<string>();
        for (const e of cat.entries || []) {
          if (e && e.type && !e.name) bases.add(e.type as string);
        }
        if (bases.size > 0) {
          res.push({ label: cat.label || cat.id || 'Unknown', bases: Array.from(bases).sort((a,b)=>a.localeCompare(b)) });
        }
      }
      return res.sort((a, b) => a.label.localeCompare(b.label));
    } catch {
      return [];
    }
  }

  static async getAllBases(): Promise<string[]> {
    try {
      const cats = await this.getCategories();
      return cats.flatMap(c => c.bases);
    } catch {
      return [];
    }
  }
}