export interface Album {
	id: number;
	parent: number;
	isDir: boolean;
	title: string;
	album: string;
	artist: string;
	year: number;
	genre: string;
	coverArt: number;
	created: Date;
}