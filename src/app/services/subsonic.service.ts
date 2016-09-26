import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, Observer } from 'rxjs/Rx';
import { IServer,  REDUCERS_DICTONARY, SERVER_ACTIONS, APP_STATE_ACTIONS } from '../reducers/reducers.index';
// import { StateUpdates, Effect } from '@ngrx/effects';
import { IArtist, IAlbum } from '../shared/models';

export const LOCALSTORAGE_KEYS = {
	artists: 'subular-artists',
	albums: 'subular-albums'
};

@Injectable()
export class SubularService {
	private server: IServer;


	constructor(private http: Http, private store: Store<any>) {
		this.store.select<IServer[]>(REDUCERS_DICTONARY.servers).subscribe((servers) => {
			this.server = servers.filter((server) => {
				return server.selected;
			})[0];
		});


	}

	buildServerData(): Observable<any> {
		return Observable.merge(
			this.buildArtistDatabase(),
			this.buildAlbumDatabase(0)
		);
	}

	getStreamUrl(id: number): string {
		return this.getServerURl(this.server, 'stream', `id=${id}`);
	}

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


	getAlbum(albumId: number): Observable<IAlbum> {
		let albums: IAlbum[] = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEYS.albums));
		if(albums){
			let result = albums.filter((album: IAlbum) => {
				return album.id === albumId;
			})[0];
			return Observable.of(result);
		}
		return Observable.of(null);
	}

	getArtist(artistId: number): Observable<IArtist> {
		let artists: IArtist[] = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEYS.artists));
		if(artists){
			let result = artists.filter((artist: IArtist) => {
				return artist.id == artistId;
			})[0];
			return Observable.of(result);
		}
		return Observable.of(null);
	}

	saveArtist(artist: IArtist): void{
	let artists: IArtist[] = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEYS.artists));
		if(artists){
			let artistIndex = artists.findIndex(value => value.id === artist.id);
			artists[artistIndex] = artist;

			window.localStorage.setItem(LOCALSTORAGE_KEYS.artists, JSON.stringify(artists));
		}
	}

	getArtists(): Observable<IArtist[]>{
		let artists: IArtist[] = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEYS.artists));
		return Observable.of(artists);
	}

	getArtistAlbums(artistId:number): Observable<IAlbum[]> {
		let albums: IAlbum[] = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEYS.albums));
		if(albums){
			let result = albums.filter((album: IAlbum) => {
				return album.artistId == artistId;
			});
			return Observable.of(result);
		}
		return Observable.of(null);
	}

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
		let artistString;
		let address = this.getServerURl(this.server, 'getArtists');
		let artistsLocalStorage = window.localStorage.getItem(LOCALSTORAGE_KEYS.artists);

		//if we have values in local storage pull them out instead of hitting the api.
		if (artistsLocalStorage) {
			return Observable.of(JSON.parse(artistsLocalStorage));
		}

		return this.http.get(address)
			.map(resp => resp.json())
			.map(payload => {
				let artists: any[] = [];
				let artistsList: any[] = this.cleanSubsonicResponse(payload).artists.index;
				artistsList.forEach((value, index) => {
					artists = artists.concat(value.artist);
				});
				window.localStorage.setItem(LOCALSTORAGE_KEYS.artists, JSON.stringify(artists));
				return artists;
			});
	}


	getArtistInfo(artistId: number): Observable<IArtist[]> {
		let address = this.getServerURl(this.server, 'getArtistInfo2', `id=${artistId}`);
		let artistInfo;
		return this.getArtist(artistId).flatMap((artist) => this.http.get(address)
			.map(resp => resp.json())
			.map(data => {
				artistInfo = this.cleanSubsonicResponse(data);
				if (!artist.coverArt) {
					artist.coverArt = artistInfo.artistInfo2.largeImageUrl;
					this.saveArtist(artist);
				}
				return artistInfo.artistInfo2;
			}));
	}

	getAlbumInfo(albumId: number): Observable<IAlbum> {
		let address = this.getServerURl(this.server, 'getAlbum', `id=${albumId}`);
		let albumInfo;
		return this.http.get(address)
			.map(resp => resp.json())
			.map(data => {
				let album = this.cleanSubsonicResponse(data).album;
				album.coverArt = this.getCoverUrl(album.coverArt);
				return album;
			});
	}

	getCoverUrl(id: string): string {
		return this.getServerURl(this.server,'getCoverArt', `id=${id}`, 'size=500');
	}

	buildAlbumDatabase(offset?: number, existingAlbums?:IAlbum[]): Observable<any> {
		offset = (!offset ? 0 : offset);
		let address = this.getServerURl(this.server, 'getAlbumList2', 'type=newest', 'size=500', `offset=${offset}`);

		let albumLocalStorage = window.localStorage.getItem(LOCALSTORAGE_KEYS.albums);
	//	if we have values in local storage pull them out instead of hitting the api.
		if (albumLocalStorage) {
			return Observable.of(JSON.parse(albumLocalStorage));
		}

		return this.http.get(address)
			.map(resp => resp.json())
			.map(data => this.cleanSubsonicResponse(data).albumList2.album.map((album)=> {
				album.coverArt = this.getCoverUrl(album.coverArt);
				return album;
			}))
			.map(data => existingAlbums != null ? data.concat(existingAlbums) : data)
			.switchMap((albums) => {

				if ((albums.length % 500) == 0) {
					return this.buildAlbumDatabase(offset + 500, albums);
				}
				window.localStorage.setItem(LOCALSTORAGE_KEYS.albums, JSON.stringify(albums));
				return new Observable((observer:Observer<IAlbum[]>)=>{
					observer.next(albums);
				});
			});
	}

	getAlbums(parentId?: number): IAlbum[] {
		//if (parentId == null) {
		return JSON.parse(window.localStorage.getItem('subular-albums'));
		// } else {
		// 	let albums: IAlbum[] = JSON.parse(window.localStorage.getItem('subular-albums'));
		// 	let result: IAlbum[] = [];
		// 	if (albums != null) {
		// 		result = albums.filter((album: IAlbum) => {
		// 			return album.parent === parentId;
		// 		});
		// 	}

		// 	return result;
		// }
	}

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