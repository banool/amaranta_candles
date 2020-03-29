
export interface Scent {
  id: number;
  name: string;
  url: string;
  notes: string;
  photo_link: string;
}

export interface StagingScent {
  id?: number;
  name: string;
  url: string;
  notes: string;
  photo_link: string;
}
