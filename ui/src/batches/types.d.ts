export interface Batch {
  id: number;
  name: string | null;
  notes: string | null;
  // Storing datetime locally as string to work with redux.
  made_at: string;
}

export interface StagingBatch {
  id?: number;
  name: string | null;
  notes: string | null;
  // Storing datetime locally as string to work with redux.f
  made_at: string;
}
