import { Scent } from "../scents/types";

export interface ScentCombo {
  id: number;
  name: string | null;
  notes: string | null;
  scents: Scent[];
}

export interface StagingScentCombo {
  id?: number;
  name: string | null;
  notes: string | null;
  scents: number[];
}
