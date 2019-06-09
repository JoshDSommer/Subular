export interface Artist {
  id: number;
  name: string;
}

export interface Artists extends Array<Artist> {}
