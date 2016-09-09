export interface IAlbum {
	id: number;
	artistId: number;
	isDir: boolean;
	name: string;
	artist: string;
	songCount: number;
	year: number;
	genre: string;
	coverArt: string;
	created: Date;
	song: ISong[];
}

export interface ISong {
	id?: number;
	parent?: number;
	isDir?: boolean;
	title?: string;
	album?: string;
	artist?: string;
	track?: number;
	year?: number;
	genre?: string;
	coverArt?: number;
	size?: number;
	contentType?: string;
	suffix?: string;
	duration?: number;
	bitRate?: number;
	path?: string;
	isVideo?: boolean;
	discNumber?: number;
	created?: Date;
	albumId?: number;
	artistId?: number;
	type?: string;
}


export interface IArtist {
	id: number;
	name: string;
	albumCount: number;
	coverArt: string;
}
