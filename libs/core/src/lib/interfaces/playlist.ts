import { ISong } from '../index';

export interface IPlaylist {
	id: number;
	name: string;
	songCount: number;
	coverArt: string;
	created: Date;
	changed: Date;
	comment: string;
	entry?: Array<ISong>;
	duration: number;
}

// tslint:disable-next-line:no-empty-interface
export interface IPlaylists extends Array<IPlaylist> { }


