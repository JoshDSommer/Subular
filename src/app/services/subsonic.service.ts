import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IServer, IArtist, REDUCERS_DICTONARY, SERVER_ACTIONS, ARTIST_ACTIONS, APP_STATE_ACTIONS } from '../reducers/reducers.index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class SubularService {
	private settings: Observable<IServer>;

	constructor(private http: Http, private store: Store<any>) {

	}

	buildServerData(server: IServer): void {
		// if (this._settings.ServerAddress != null && this._settings.Username != null) {

		// 	window.localStorage.setItem('subular-albums', JSON.stringify([]));
		// 	window.localStorage.setItem('subular-artists', JSON.stringify([]));
		// 	window.localStorage.setItem('subular-playlist', JSON.stringify([]));
		// 	window.localStorage.setItem('subular-songs', JSON.stringify([]));
		this.buildArtistDatabase(server)
			.subscribe(
				(payload) => this.store.dispatch({ type: ARTIST_ACTIONS.ADD_ARTISTS, payload: payload }),
				null,
				() => this.store.dispatch({type:APP_STATE_ACTIONS.PAUSED})
			);
		// 	this.buildPlayListDatabase();
		// 	this.buildAlbumDatabase();
		// }
	}

	// getCoverUrl(id: number): string {
	// 	return this._settings.getServerURl('getCoverArt') + '&id=' + id + '&size=274';
	// }

	// getStreamUrl(id: number): string {
	// 	return this._settings.getServerURl('stream') + '&id=' + id;
	// }

	// // returns and observable of all the songs.
	// getSongsByAlbumId(parentId: number): Observable<any> {
	// 	let address = this._settings.getServerURl('getMusicDirectory') + '&id=' + parentId;
	// 	let songs;
	// 	return this._http.get(address).map(resp => resp.json());
	// }
	// getSongsByArtistIdAlbumId(id: number, parentId: number): ISong[] {
	// 	let songDb: ISong[];
	// 	let artistSongs: ISong[];
	// 	songDb = this.getSongDB();

	// 	artistSongs = songDb.filter((song) => {
	// 		return song.parent == parentId;
	// 	});

	// 	return artistSongs;
	// }
	// private getSongDB(): ISong[] {
	// 	let songDb: string = window.localStorage.getItem('subular-songs');
	// 	if (songDb != null) {
	// 		return JSON.parse(songDb);
	// 	}
	// 	return [];
	// }

	// getSongs(artistName?: string): ISong[] {
	// 	if (artistName == null) {
	// 		return this.getSongDB();
	// 	} else {
	// 		let songDb: ISong[];
	// 		songDb = this.getSongDB();
	// 		let artistSongs: ISong[] = songDb.filter((song: ISong) => {
	// 			return song.artist === artistName;
	// 		});
	// 		if (artistSongs != null) {
	// 			return artistSongs;
	// 		} else {
	// 			return [];
	// 		}
	// 	}
	// }


	// getAlbums(parentId?: number): IAlbum[] {
	// 	if (parentId == null) {
	// 		return JSON.parse(window.localStorage.getItem('subular-albums'));
	// 	} else {
	// 		let albums: IAlbum[] = JSON.parse(window.localStorage.getItem('subular-albums'));
	// 		let result: IAlbum[] = [];
	// 		if (albums != null) {
	// 			result = albums.filter((album: IAlbum) => {
	// 				return album.parent === parentId;
	// 			});
	// 		}

	// 		return result;
	// 	}
	// }

	// getalbum(id: number): IAlbum {
	// 	let albums: IAlbum[] = JSON.parse(window.localStorage.getItem('subular-albums'));
	// 	let result = albums.filter((album: IAlbum) => {
	// 		return album.id === id;
	// 	});
	// 	return result[0];
	// }

	// getArtist(name: string): IArtist {
	// 	return this.getArtists().find((value: IArtist) => {
	// 		return value.name == name;
	// 	});
	// }
	// getArtists(): IArtist[] {
	// 	return JSON.parse(window.localStorage.getItem('subular-artists'))
	// }

	// getPlaylists(): IPlaylist[] {
	// 	return JSON.parse(window.localStorage.getItem('subular-playlist'))
	// }

	// getPlaylist(id: number): Observable<any> {
	// 	let address = this._settings.getServerURl('getPlaylist') + '&id=' + id;
	// 	let songs;
	// 	return this._http.get(address).map(resp => resp.json());
	// }

	// updatePlaylist(name: string, comment: string) {

	// }
	// addSongToPlaylist(playlistId: number, songId: number): void {
	// 	//todo add check to see if song exists in playlist
	// 	let address = this._settings.getServerURl('updatePlaylist') + '&playlistId=' + playlistId + '&songIdToAdd=' + songId;
	// 	this._http.get(address).map(resp => resp.json()).subscribe(
	// 		data => { },
	// 		error => console.log(error),
	// 		() => { }
	// 	);
	// }

	// removeSongFromPlaylist(playlistId: number, songId: number): void {
	// 	let playlistString;
	// 	let playlistSongs: ISong[];
	// 	this.getPlaylist(playlistId).subscribe(
	// 		data => playlistString = this.cleanSubsonicResponse(data),
	// 		error => console.log(error),
	// 		() => {
	// 			playlistSongs = <ISong[]>JSON.parse(playlistString).subresp.playlist.entry;
	// 			let songIndex = playlistSongs.map((value: ISong) => {
	// 				return value.id;
	// 			}).indexOf(songId);
	// 			let address = this._settings.getServerURl('updatePlaylist') + '&playlistId=' + playlistId + '&songIndexToRemove=' + songIndex;
	// 			this._http.get(address).map(resp => resp.json()).subscribe(
	// 				data => { },
	// 				error => console.log(error),
	// 				() => { }
	// 			);
	// 		}
	// 	);
	// }

	// createNewPlaylist(name: string, songId: number) {
	// 	let address = this._settings.getServerURl('createPlaylist') + '&name=' + name + '&songIdToAdd=' + songId;
	// 	this._http.get(address).map(resp => resp.json()).subscribe(
	// 		data => { },
	// 		error => console.log(error),
	// 		() => { }
	// 	);
	// }



	// private buildPlayListDatabase(): void {
	// 	let playlistString;
	// 	let address = this._settings.getServerURl('getPlaylists');
	// 	this._http.get(address).map(resp => resp.json()).subscribe(
	// 		data => playlistString = this.cleanSubsonicResponse(data),
	// 		error => console.log(error),
	// 		() => {
	// 			try {
	// 				let playlists: any[] = JSON.parse(playlistString).subresp.playlists.playlist;
	// 				window.localStorage.setItem('subular-playlist', JSON.stringify(playlists));
	// 			} catch (e) {
	// 				console.log(e);
	// 			}
	// 		}
	// 	);
	// }
	private cleanSubsonicResponse(data: any): string {
		return JSON.stringify(data).replace('subsonic-response', 'subresp');
	}

	getServerURl(server: IServer, method: string) {
		return `${server.serverAddress}/rest/${method}.view?u=${server.serverUserName}&t=${server.serverPassword}&s=${server.salt}&v=1.0.0&c=rest&f=json`;
	}

	private buildArtistDatabase(server: IServer): Observable<any> {
		let artistString;
		let address = this.getServerURl(server, 'getIndexes');
		return this.http.get(address)
			.map(resp => resp.json())
			.map(payload => {
				artistString = this.cleanSubsonicResponse(payload);
				let artists: any[] = [];
				let artistsList: any[] = JSON.parse(artistString).subresp.indexes.index;
				console.log(JSON.stringify(artistsList));
				artistsList.forEach((value, index) => {
					artists = artists.concat(value.artist);
				});
				return artists;
			});

	}
	// private buildAlbumDatabase(offset?: number): void {
	// 	let albumString
	// 	offset = (!offset ? 0 : offset);
	// 	let address = this._settings.getServerURl('getAlbumList') + '&type=newest&size=500&offset=' + offset;
	// 	this._http.get(address).map(resp => resp.json()).subscribe(
	// 		data => albumString = this.cleanSubsonicResponse(data),
	// 		error => console.log(error),
	// 		() => {
	// 			try {
	// 				let albums: any[] = JSON.parse(albumString).subresp.albumList.album;
	// 				if (albums.length === 500) {
	// 					this.buildAlbumDatabase(offset + 500);
	// 				}
	// 				let newAlbums = this.getAlbums().concat(albums);
	// 				window.localStorage.setItem('subular-albums', JSON.stringify(newAlbums));
	// 			} catch (e) {
	// 				console.log(e);
	// 			}
	// 		}
	// 	);
	// }

	// buildSongsListForArtist(id): void {
	// 	let albums: IAlbum[] = this.getAlbums(id);
	// 	let songsDb: ISong[] = this.getSongDB();

	// 	albums.forEach((album) => {
	// 		let songs: any;
	// 		this.getSongsByAlbumId(album.id).subscribe(
	// 			data => songs = this.cleanSubsonicResponse(data),
	// 			error => console.log(error),
	// 			() => {
	// 				try {
	// 					let songsList: any[] = JSON.parse(songs).subresp.directory.child;
	// 					songsDb = songsDb.concat(songsList);
	// 					window.localStorage.setItem('subular-songs', JSON.stringify(songsDb));
	// 				} catch (e) {
	// 					console.log(e);
	// 				}
	// 			});
	// 	});
	// }


}