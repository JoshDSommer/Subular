import { Song } from '../index';

export interface Playlist {
  id: number;
  name: string;
  songCount: number;
  coverArt: string;
  created: Date;
  changed: Date;
  comment: string;
  entry?: Array<Song>;
  duration: number;
}

// tslint:disable-next-line:no-empty-interface
export interface IPlaylists extends Array<Playlist> {}
