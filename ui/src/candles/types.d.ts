import { Dye } from "../dyes/types";
import { Scent } from "../scents/types";
import { ScentCombo } from "../scent_combos/types";

export interface DyeWithAmount {
  dye: Dye;
  amount: number;
}

export interface ScentWithAmount {
  dye: Scent;
  amount: number;
}

export interface Candle {
  id: number;
  name: string | null;
  notes: string | null;
  // batch: Batch;
  dyes_with_amounts: DyeWithAmount[];
  indended_scent_combo: ScentCombo;
  scents_with_amounts: ScentWithAmount[];
  // vessel: Vessel;
  // waxes_with_amounts: WaxWithAmount[];
}
