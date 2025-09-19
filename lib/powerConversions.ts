// Supported units
export type Unit = 'W' | 'kW' | 'HP' | 'TON' | 'A_1PH' | 'A_3PH' | 'kVA';

export interface AmpOptions {
  voltage?: number;        // Default: 230V (1φ) / 415V (3φ)
  powerFactor?: number;    // Default: 0.90 (Indian avg)
}

// --- Constants & Maps (India) ---
const HP_TO_W = 746; // 1 HP ≈ 746 W
const DEFAULTS = { V1: 230, V3: 415, PF: 0.90 };

// AC running-load mapping (Indian averages)
const TON_TO_W_TABLE: Record<string, number> = {
  '1': 1200,
  '1.5': 1800,
  '2': 2500,
  '2.5': 3200,
  '3': 3800,
};

// --- Conversion Helpers ---
export function tonToW(ton: number): number {
  const key = String(ton);
  if (TON_TO_W_TABLE[key]) return TON_TO_W_TABLE[key];
  return Math.round(ton * 1200); // fallback (≈1200 W per ton)
}

export function hpToW(hp: number): number {
  return Math.round((hp * HP_TO_W) / 10) * 10; // rounded to nearest 10 W
}

export function ampsToW_1ph(amps: number, opts: AmpOptions = {}): number {
  const V = opts.voltage ?? DEFAULTS.V1;
  const PF = opts.powerFactor ?? DEFAULTS.PF;
  return Math.round(V * amps * PF);
}

export function ampsToW_3ph(amps: number, opts: AmpOptions = {}): number {
  const V = opts.voltage ?? DEFAULTS.V3;
  const PF = opts.powerFactor ?? DEFAULTS.PF;
  const sqrt3 = 1.7320508075688772;
  return Math.round(sqrt3 * V * amps * PF);
}

export function kvaToW(kva: number, powerFactor = DEFAULTS.PF): number {
  return Math.round(kva * 1000 * powerFactor);
}

// --- Generic Helpers ---
export const wToKw = (w: number) => +(w / 1000).toFixed(3);
export const kwToW = (kw: number) => Math.round(kw * 1000);

// --- Normalize any supported unit to Watts ---
export function toWatts(value: number, unit: Unit, opts: AmpOptions = {}): number {
  switch (unit) {
    case 'W':     return Math.round(value);
    case 'kW':    return kwToW(value);
    case 'HP':    return hpToW(value);
    case 'TON':   return tonToW(value);
    case 'A_1PH': return ampsToW_1ph(value, opts);
    case 'A_3PH': return ampsToW_3ph(value, opts);
    case 'kVA':   return kvaToW(value, opts.powerFactor ?? DEFAULTS.PF);
    default:      throw new Error(`Unsupported unit: ${unit}`);
  }
}

// --- Load Items ---
export type LoadItem = {
  name: string;
  value: number;     // user entry (e.g., 1.5 TON, 1 HP, 5 A, 120 W)
  unit: Unit;
  qty?: number;      // default 1
  opts?: AmpOptions; // for Amps/kVA cases
};

// --- Sum all loads to total Watts ---
export function sumLoadToWatts(items: LoadItem[]): number {
  return items.reduce((sum, it) => {
    const qty = it.qty ?? 1;
    return sum + toWatts(it.value, it.unit, it.opts) * qty;
  }, 0);
}

// --- Suggested System Size (kW) ---
export function suggestSystemSizeKw(totalWatts: number): number {
  return +(totalWatts / 1000).toFixed(2);
}
