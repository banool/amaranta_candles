export interface Scent {
  id: number;
  name: string;
  url: string | null;
  notes: string | null;
  photo_link: string | null;
}

export interface StagingScent {
  id?: number;
  name: string;
  url: string | null;
  notes: string | null;
  photo_link: string | null;
}
