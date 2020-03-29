export interface Vessel {
  id: number;
  name: string | null;
  url: string | null;
  notes: string | null;
  photo_link: string | null;
}

export interface StagingVessel {
  id?: number;
  name: string | null;
  url: string | null;
  notes: string | null;
  photo_link: string | null;
}
