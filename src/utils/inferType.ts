// Heuristic mapping from base name to a friendly type bucket
export function inferType(base: string): string {
  const b = base.toLowerCase();
  const has = (s: string) => b.includes(s);

  // Accessories
  if (b.endsWith(' ring') || has(' ring ')) return 'Ring';
  if (has('amulet')) return 'Amulet';
  if (b.endsWith(' belt') || has(' belt ')) return 'Belt';

  // Armour
  if (/(helmet|helm|circlet|hood|cap|crown|bascinet)/.test(b)) return 'Helmet';
  if (/(gloves|gauntlet|mitts)/.test(b)) return 'Gloves';
  if (/(boots|greaves|slippers|shoes)/.test(b)) return 'Boots';
  if (/(armour|armor|plate|brigandine|tunic|robe|garb|carapace|coat|hauberk|chainmail|ringmail|jacket|vest|leather)/.test(b)) return 'Body Armour';
  if (/shield|buckler|kite|targe/.test(b)) return 'Shield';
  if (/quiver/.test(b)) return 'Quiver';

  // Weapons
  if (/bow/.test(b)) return 'Bow';
  if (/wand/.test(b)) return 'Wand';
  if (/dagger/.test(b)) return 'Dagger';
  if (/claw/.test(b)) return 'Claw';
  if (/staff/.test(b)) return 'Staff';
  if (/sceptre|scepter/.test(b)) return 'Sceptre';
  if (/axe/.test(b)) return 'Axe';
  if (/mace|maul/.test(b)) return 'Mace';
  if (/sword/.test(b)) return 'Sword';

  // Jewellery catch‑alls
  if (/ring/.test(b)) return 'Ring';

  // Default: use last word as type
  const parts = base.split(' ');
  return parts[parts.length - 1];
}