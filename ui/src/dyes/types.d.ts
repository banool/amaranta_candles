
export interface Dye {
  id: number;
  name: string;
  url: string;
  notes: string;
  photo_link: string;
}

export interface StagingDye {
  id?: number;
  name: string;
  url: string;
  notes: string;
  photo_link: string;
}
