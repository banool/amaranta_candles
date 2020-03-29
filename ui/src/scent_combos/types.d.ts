import { Scent } from "../scents/types";

export const DEFAULT_SCENT_COMBO_ID = -1;

export interface ScentCombo {
  id: number;
  name: string;
  notes: string;
  scents: Scent[]
}

export interface StagingScentCombo {
  id?: number;
  name: string;
  notes: string;
  scents: number[]
}
