export type Priority = 1|2|3|4|5;

export interface WeightedInput {
  id: string;
  text: string;
  priority: Priority;
  desiredMin?: number;
  direction?: 'gte' | 'lte';
}

const DEFAULT_SCALES: Record<string, number> = {
  'pseudo.pseudo_total_life': 100,
  'pseudo.pseudo_total_resistance': 120,
  'pseudo.pseudo_total_chaos_resistance': 60,
  'pseudo.pseudo_total_all_attributes': 80,
};

function scaleFor(id: string, text: string): number {
  if (DEFAULT_SCALES[id]) return DEFAULT_SCALES[id];
  const t = text.toLowerCase();
  if (t.includes('maximum life')) return 100;
  if (t.includes('resistance')) return 60;
  if (t.includes('attributes')) return 80;
  if (t.includes('energy shield')) return 120;
  if (t.includes('evasion')) return 150;
  if (t.includes('armour') || t.includes('armor')) return 150;
  if (t.includes('damage') || t.includes('attack') || t.includes('spell')) return 50;
  return 100;
}

export interface AutoWeightResult {
  weights: { id: string; weight: number }[];
  minSum: number;
}

export function autoWeight(inputs: WeightedInput[]): AutoWeightResult {
  const raw = inputs.map((s) => {
    const dir = s.direction ?? 'gte';
    const scale = scaleFor(s.id, s.text);
    const importance = s.priority;
    const score = importance / Math.max(1, scale);
    return { ...s, dir, scale, score };
  });

  const total = raw.reduce((a, r) => a + r.score, 0) || 1;
  const weights = raw.map((r) => {
    const w = Math.max(1, Math.round((r.score / total) * 100));
    return { id: r.id, weight: w };
  });

  let minSum = 0;
  for (const r of raw) {
    if (typeof r.desiredMin === 'number' && r.direction !== 'lte') {
      const w = weights.find(w => w.id === r.id)!.weight;
      minSum += (r.desiredMin * w) / r.scale;
    }
  }
  if (!inputs.some(i => typeof i.desiredMin === 'number')) {
    const sumW = weights.reduce((a, w) => a + w.weight, 0);
    minSum = Math.round(sumW * 0.5);
  }
  minSum = Math.max(1, Math.round(minSum));

  return { weights, minSum };
}