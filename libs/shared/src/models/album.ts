export interface Album {
  id: number;
  name: string;
  artist: string;
  artistId: number;
  coverArt: string;
  songCount: number;
  duration: number;
  playCount: number;
  created: Date;
  year: number;
  genre: string;
}

// tslint:disable-next-line:no-empty-interface
export interface Albums extends Array<Album> {}
