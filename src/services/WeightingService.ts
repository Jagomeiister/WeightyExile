/**
 * WeightingService provides simple helpers for computing a suggested
 * minimum total weight (minSum) based on selected stats and their
 * individual weights.  The suggestion is intended to help users pick
 * a reasonable threshold when they are unsure what to choose.  The
 * heuristic uses either provided desired minimum values or falls back
 * to half of the sum of weights.
 */

export interface WeightedStatInput {
  /**
   * Identifier of the stat (not used in calculation but passed through
   * for completeness).
   */
  id: string;
  /**
   * Weight assigned to the stat by the user.  Should be a positive
   * number.
   */
  weight: number;
  /**
   * Optional desired minimum roll value for the stat.  If provided
   * and the direction is greater‑than or equal (≥), the suggestion will
   * incorporate it into the total threshold.  If omitted for all
   * stats, the suggestion defaults to half the sum of weights.
   */
  desiredMin?: number;
}

export class WeightingService {
  /**
   * Compute a suggested minimum total weight for a group of stats.
   * If any desiredMin values are present, the suggestion is the sum of
   * desiredMin * weight for each stat that defines a desiredMin.  If
   * none are present, the suggestion defaults to half the sum of all
   * weights.  The result is rounded to the nearest integer and
   * guaranteed to be non‑negative.
   */
  static suggestMinSum(inputs: WeightedStatInput[]): number {
    if (!Array.isArray(inputs) || inputs.length === 0) return 0;
    let sumWeights = 0;
    let sumDesired = 0;
    let hasDesired = false;
    for (const item of inputs) {
      const weight = isNaN(item.weight) ? 0 : item.weight;
      sumWeights += weight;
      if (typeof item.desiredMin === 'number' && !isNaN(item.desiredMin)) {
        hasDesired = true;
        sumDesired += item.desiredMin * weight;
      }
    }
    if (hasDesired) {
      return Math.max(0, Math.round(sumDesired));
    }
    // Fallback: half the total weight
    const suggested = sumWeights * 0.5;
    return Math.max(0, Math.round(suggested));
  }
}