export interface Dye {
  id: number;
  name: string | null;
  url: string | null;
  notes: string | null;
  photo_link: string | null;
}

export interface StagingDye {
  id?: number;
  name: string | null;
  url: string | null;
  notes: string | null;
  photo_link: string | null;
}
