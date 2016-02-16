import {SettingsService} from './settings-service';
import {Http, Headers} from 'angular2/http';
import {Injectable, Inject} from 'angular2/core';
import 'rxjs/add/operator/map';
import {Artist} from '../models/artist';
import {Album} from '../models/album';
import {Song} from '../models/song';

import {Playlist} from '../models/playlist';
import {Observable} from 'rxjs/observable';

@Injectable()
export class SubularService {

	constructor( @Inject(SettingsService) private _settings: SettingsService, @Inject(Http) private _http: Http) {
		this.buildServerData();
	}

	buildServerData(): void {
		if (this._settings.ServerAddress != 'null') {
			if (!window.localStorage.getItem('subular-albums')) {
				window.localStorage.setItem('subular-albums', JSON.stringify([]));
				window.localStorage.setItem('subular-artists', JSON.stringify([]));
				window.localStorage.setItem('subular-playlist', JSON.stringify([]));
				this.buildArtistDatabase();
				this.buildPlayListDatabase();
				this.buildAlbumDatabase();
			}

		}
	}

	getCoverUrl(id: number): string {
		return this._settings.getServerURl('getCoverArt') + '&id=' + id + '&size=274';
	}

	getStreamUrl(id: number): string {
		return this._settings.getServerURl('stream') + '&id=' + id;
	}

	//returns and observable of all the songs.
	getSongsByAlbumId(parentId: number): Observable<any> {
		let address = this._settings.getServerURl('getMusicDirectory') + '&id=' + parentId;
		let songs;
		return this._http.get(address).map(resp => resp.json());
	}
	getSongsByArtistIdAlbumId(id: number, parentId: number): Song[] {
		return this.getSongs(id).filter((song) => {
			return song.parent === parentId
		});
	}

	getSongs(id: number): Song[] {
		let songs: any = window.localStorage.getItem('subular-songs-' + id);
		if (songs != null) {
			return JSON.parse(songs);
		}
		return [];
	}


	getAlbums(parentId?: number): Album[] {
		if (parentId == null) {
			return JSON.parse(window.localStorage.getItem('subular-albums'));
		} else {
			let albums: Album[] = JSON.parse(window.localStorage.getItem('subular-albums'));
			let result: Album[] = [];
			if (albums != null) {
				result = albums.filter((album: Album) => {
					return album.parent == parentId;
				});
			}

			return result;
		}
	}

	getalbum(id: number): Album {
		let albums: Album[] = JSON.parse(window.localStorage.getItem('subular-albums'));
		let result = albums.filter((album: Album) => {
			return album.id == id;
		});
		return result[0];
	}

	getArtists(): Artist[] {
		return JSON.parse(window.localStorage.getItem('subular-artists'))
	}

	getPlaylists(): Playlist[] {
		return JSON.parse(window.localStorage.getItem('subular-playlist'))
	}

	private buildPlayListDatabase(): void {
		let playlistString;
		let address = this._settings.getServerURl('getPlaylists');
		this._http.get(address).map(resp => resp.json()).subscribe(
			data => playlistString = this.cleanSubsonicResponse(data),
			error => alert(error),
			() => {
				let playlists: any[] = JSON.parse(playlistString).subresp.playlists.playlist;
				window.localStorage.setItem('subular-playlist', JSON.stringify(playlists));
			}
		);
	}

	private buildArtistDatabase(): void {
		let artistString;
		let address = this._settings.getServerURl('getIndexes');
		this._http.get(address).map(resp => resp.json()).subscribe(
			data => artistString = this.cleanSubsonicResponse(data),
			error => alert(error),
			() => {
				let artistList: any[] = [];;
				let artists: any[] = JSON.parse(artistString).subresp.indexes.index;
				artists.forEach((value, index) => {
					artistList = artistList.concat(value.artist);
				});
				window.localStorage.setItem('subular-artists', JSON.stringify(artistList));
			}
		);
	}
	private buildAlbumDatabase(offset?: number): void {
		let albumString
		offset = (!offset ? 0 : offset);
		let address = this._settings.getServerURl('getAlbumList') + '&type=newest&size=500&offset=' + offset;
		this._http.get(address).map(resp => resp.json()).subscribe(
			data => albumString = this.cleanSubsonicResponse(data),
			error => alert(error),
			() => {
				let albums: any[] = JSON.parse(albumString).subresp.albumList.album;
				if (albums.length === 500) {
					this.buildAlbumDatabase(offset + 500);
				}
				let newAlbums = this.getAlbums().concat(albums);
				window.localStorage.setItem('subular-albums', JSON.stringify(newAlbums));
			}
		);
	}

	buildSongsListForArtist(id): void {
		let albums: Album[] = this.getAlbums(id);
		window.localStorage.setItem('subular-songs-' + id, JSON.stringify([]));

		albums.forEach((album) => {
			let songs: any;
			this.getSongsByAlbumId(album.id).subscribe(
				data => songs = this.cleanSubsonicResponse(data),
				error => alert(error),
				() => {
					let songsList: any[] = JSON.parse(songs).subresp.directory.child;
					songsList = this.getSongs(id).concat(songsList);
					window.localStorage.setItem('subular-songs-' + id, JSON.stringify(songsList));
				});
		});
	}
	public cleanSubsonicResponse(data: any): string {
		return JSON.stringify(data).replace('subsonic-response', 'subresp');
	}

}