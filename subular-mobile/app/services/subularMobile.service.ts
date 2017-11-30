import { Injectable } from '@angular/core';
import { SubsonicService, SubsonicCachedService, ISong, IArtist, IAlbum } from 'subular';
import { Observable } from 'rxjs/Observable';
import * as http from "http";
import * as fs from "file-system";
import * as utilModule from "utils/utils";
import { LocalStorageService } from '../providers/localstorage.service';
import { getString, setString } from 'application-settings';
import * as connectivity from "tns-core-modules/connectivity";

interface ISubularService {
	subsonic: SubsonicService;
	cachedData: SubsonicCachedService;
}

const CACHED_SONGS_KEY = 'subular.cached.songs';

@Injectable()
export class SubularMobileService {

	private subsonicService: ISubularService;

	constructor(subsonic: SubsonicService, private cachedData: SubsonicCachedService) {
		const getOnlineServices = () => ({ subsonic, cachedData });
		const getOfflineServices = () => ({
			subsonic: {
				getSongs: (albumId) => this.getCachedSongs(albumId),
				subsonicGetCoverUrl: () => ''
			},
			cachedData: {
				getCachedData: () => Observable.of(true),
				getArtists: () => this.getArtistFromCache(),
				getAlbums: () => this.getAlbumsFromCache()
			}
		} as any);

		const handleConnectionChange = (connectionType) => {
			switch (connectionType) {
				case connectivity.connectionType.none:
					this.subsonicService = getOfflineServices();
					break;
				case connectivity.connectionType.wifi:
					this.subsonicService = getOnlineServices();
					break;
				case connectivity.connectionType.mobile:
					this.subsonicService = getOfflineServices();
					break;
			}
		};

		var connectionType = connectivity.getConnectionType();

		handleConnectionChange(connectionType);
		connectivity.startMonitoring(handleConnectionChange);
	}


	public downloadSong(song: ISong): Observable<boolean> {
		let url = this.subsonicService.subsonic.getDownloadUrl(song.id);
		let path = fs.path.join(fs.knownFolders.documents().path, song.id.toString() + '.mp3');
		let coverPath = fs.path.join(fs.knownFolders.documents().path, song.coverArt + '.png');
		let coverUrl = this.subsonicService.subsonic.subsonicGetCoverUrl(song.coverArt);

		console.log(url);

		const getCover$ = Observable.fromPromise(http.getFile({
			url: coverUrl,
			method: "GET",
		}, coverPath));
		const getSong$ = Observable.fromPromise(http.getFile({
			url: url,
			method: "GET",
		}, path))
			.do(() => this.StoreCachedSong(song))
			.map(file => {
				return file && fs.File.exists(file.path)
			});

		if (fs.File.exists(coverPath)) {
			console.log('cached cover')
			return getSong$;
		}
		console.log('song cover')
		return getCover$.switchMap(() => getSong$);
		//TODO Save cached songs list.

	}
	getDownloadUrl(id: number): string {
		return this.subsonicService.subsonic.getDownloadUrl(id);
	}

	getStreamUrl(id: number): string {
		return this.subsonicService.subsonic.getStreamUrl(id);
	}

	getSongs(albumId: number): Observable<ISong[]> {
		return this.subsonicService.subsonic.getSongs(albumId);
	}

	subsonicGetCoverUrl(song: ISong): string {
		//I'd rather always get image ar from the file system if available
		let coverPath = fs.path.join(fs.knownFolders.documents().path, song.coverArt + '.png');
		if (fs.File.exists(coverPath)) {
			return coverPath
		}
		if (this.subsonicService.subsonic.subsonicGetCoverUrl) {
			return this.subsonicService.subsonic.subsonicGetCoverUrl(song.coverArt);
		}
		return '~/images/coverArt.png';
	}
	starSong(id: number) {
		return this.subsonicService.subsonic.starSong(id);
	}
	unStarSong(id: number) {
		return this.subsonicService.subsonic.unStarSong(id);
	}
	getArtists(): Observable<IArtist[]> {
		//return this.getArtistFromCache();
		return this.subsonicService.cachedData.getArtists();
	}
	getAlbums(): Observable<IAlbum[]> {
		//return this.getAlbumsFromCache();
		return this.subsonicService.cachedData.getAlbums();
	}
	getArtistById(id: number): Observable<IArtist> {
		return this.subsonicService.cachedData.getArtistById(id);
	}
	getCachedData() {
		return this.subsonicService.cachedData.getCachedData();
	}

	StoreCachedSong(song: ISong) {
		const cachedSongs = this.getValue(CACHED_SONGS_KEY) || [];
		const updatedSongs = [...cachedSongs, song];

		this.setValue(CACHED_SONGS_KEY, updatedSongs);
	}

	private sortByName = (array: Array<{ name: string }>) => {
		return array.sort((a, b) => {
			if (a.name < b.name)
				return -1;
			if (a.name > b.name)
				return 1;
			return 0;
		});
	};

	private getArtistFromCache(): Observable<IArtist[]> {
		const cachedSongs = this.getValue(CACHED_SONGS_KEY);
		if (cachedSongs) {
			const cachedSongsToArtist = cachedSongs.map(song => ({ id: song.artistId, name: song.artist } as IArtist));
			const artists = cachedSongsToArtist.filter((artist, index, self) => self.findIndex(t => t.id === artist.id) === index) as IArtist[];
			console.log(JSON.stringify(artists))
			return Observable.of(this.sortByName(artists) as IArtist[]);
		}
		return Observable.of([]);
	}

	private getAlbumsFromCache(): Observable<IAlbum[]> {
		const cachedSongs = this.getValue(CACHED_SONGS_KEY);
		if (cachedSongs) {
			const cachedSongsToAlbums = cachedSongs.map(song => ({ id: song.albumId, name: song.album, artist: song.artist, coverArt: song.coverArt, artistId: song.artistId } as IAlbum));
			const albums = cachedSongsToAlbums.filter((album, index, self) => self.findIndex(t => t.id === album.id) === index)
			console.log(JSON.stringify(albums))

			return Observable.of(this.sortByName(albums) as IAlbum[]);
		}
		return Observable.of([]);
	}

	private getCachedSongs(albumId: number) {

		const cachedSongs = this.getValue(CACHED_SONGS_KEY) as ISong[];
		const filteredSongs = cachedSongs.filter(song => song.albumId === albumId)
		return Observable.of(filteredSongs);
	}

	private getValue(key: string): any {
		const value = getString(key);
		if (value) {
			return JSON.parse(value);
		}
		return null;
	}
	private setValue(key: string, value: any): void {
		setString(key, JSON.stringify(value));
	}
}