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
	starred: Date;
	type?: string;
}
