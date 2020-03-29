import { Scent } from "../scents/types";

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
