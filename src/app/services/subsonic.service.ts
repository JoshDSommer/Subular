import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IServer, IArtist, REDUCERS_DICTONARY, SERVER_ACTIONS, ARTIST_ACTIONS, APP_STATE_ACTIONS } from '../reducers/reducers.index';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';
import { StateUpdates, Effect } from '@ngrx/effects';

@Injectable()
export class SubularService {
	private server: IServer;

	@Effect() artists$ = this.updates$
		.whenAction(SERVER_ACTIONS.ADD_SERVER)
		.map(update => {
			return update.action.payload;
		})
		.switchMap(payload => this.buildArtistDatabase()
			.map(res => ({ type:ARTIST_ACTIONS.ADD_ARTISTS , payload: res }))
		);

	constructor(private http: Http, private store: Store<any>, private updates$: StateUpdates<any>) {
		this.store.select<IServer[]>(REDUCERS_DICTONARY.servers).subscribe((servers)=>{
			this.server = servers.filter((server)=>{
				return server.selected;
			})[0];
		});
	}



	// buildServerData(server: IServer): void {
	// 	// if (this._settings.ServerAddress != null && this._settings.Username != null) {

	// 	// 	window.localStorage.setItem('subular-albums', JSON.stringify([]));
	// 	// 	window.localStorage.setItem('subular-artists', JSON.stringify([]));
	// 	// 	window.localStorage.setItem('subular-playlist', JSON.stringify([]));
	// 	// 	window.localStorage.setItem('subular-songs', JSON.stringify([]));
	// 	this.buildArtistDatabase(server)
	// 		.subscribe(
	// 			(payload) => this.store.dispatch({ type: ARTIST_ACTIONS.ADD_ARTISTS, payload: payload }),
	// 			null,
	// 			() =>
	// 		);

	// 	// 	this.buildPlayListDatabase();
	// 	// 	this.buildAlbumDatabase();
	// 	// }
	// }

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
	private cleanSubsonicResponse(data: any): any {
		return JSON.parse(JSON.stringify(data).replace('subsonic-response', 'subresp')).subresp;
	}

	getServerURl(server: IServer, method: string, ...args: string[]) {
		let additionalArguments = '';
		if (args) {
			additionalArguments = `&${args.join('&')}`;
		}
		return `${server.serverAddress}/rest/${method}.view?u=${server.serverUserName}&t=${server.serverPassword}&s=${server.salt}${additionalArguments}&v=1.0.0&c=rest&f=json`;
	}

	private buildArtistDatabase(): Observable<any> {
		let subularArtistLocalStorage =`subular-artists-server-${this.server.name}`;
		let artistString;
		let address = this.getServerURl(this.server, 'getArtists');
		let artistsLocalStorage = window.localStorage.getItem(subularArtistLocalStorage);

		//if we have values in local storage pull them out instead of hitting the api.
		if(artistsLocalStorage) {
			return new Observable((observer) => {
				observer.next(JSON.parse(artistsLocalStorage));
				observer.complete;
				return observer;
			})
				.delay(5000) // delaying this 5 seconds to give a more applicationy feel...whateves.
				.do(()=>{
					this.store.dispatch({ type: APP_STATE_ACTIONS.PAUSED });
				});
		}

		return this.http.get(address)
			.map(resp => resp.json())
			.map(payload => {
				let artists: any[] = [];
				let artistsList: any[] = this.cleanSubsonicResponse(payload).artists.index;
				artistsList.forEach((value, index) => {
					artists = artists.concat(value.artist);
				});
				window.localStorage.setItem(subularArtistLocalStorage, JSON.stringify(artists));
				return artists;
			})
			.do(() =>this.store.dispatch({type:APP_STATE_ACTIONS.PAUSED}));
	}


	public getArtistInfo(artistId: number): Observable<any>{
		let address = this.getServerURl(this.server, 'getArtistInfo2', `id=${artistId}`);

		let artistInfo;

		return this.http.get(address)
			.map(resp => resp.json())
			.map(payload => {
				artistInfo = this.cleanSubsonicResponse(payload);
				return artistInfo.artistInfo2;
			});
	}

	public getAlbumInfo(albumId: number): Observable<any>{
		let address = this.getServerURl(this.server, 'getAlbum', `id=${albumId}`);
		let albumInfo;
		return this.http.get(address)
			.map(resp => resp.json())
			.map(payload => {
				albumInfo = this.cleanSubsonicResponse(payload);
				console.log(albumInfo);
				return albumInfo;
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