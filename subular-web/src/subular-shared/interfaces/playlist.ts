

export interface IPlaylist {
	id: number;
	name: string;
	songCount: number;
	coverArt: string;
	created: Date;
	changed: Date;
	comment: string;
	duration: number;
}

// tslint:disable-next-line:no-empty-interface
export interface IPlaylists extends Array<IPlaylist> {}

