export interface Wax {
  id: number;
  name: string | null;
  url: string | null;
  notes: string | null;
  photo_link: string | null;
}

export interface StagingWax {
  id?: number;
  name: string | null;
  url: string | null;
  notes: string | null;
  photo_link: string | null;
}
