import { Injectable } from '@angular/core';
import { SubsonicService, SubsonicCachedService, ISong, IArtist, IAlbum } from 'subular';
import { Observable } from 'rxjs/Observable';
import * as http from "http";
import * as fs from "file-system";
import * as utilModule from "utils/utils";

interface ISubularService {
	subsonic: SubsonicService;
	cachedData: SubsonicCachedService;
}

@Injectable()
export class SubularMobileService {

	private subsonicService: ISubularService;

	constructor(subsonic: SubsonicService, private cachedData: SubsonicCachedService) {
		this.subsonicService = { subsonic, cachedData }
	}

	public downloadSong(song: ISong): Observable<boolean> {
		let url: string = this.subsonicService.subsonic.getDownloadUrl(song.id);
		let path: string = fs.path.join(fs.knownFolders.documents().path, song.id.toString() + '.mp3');

		console.log(url);

		return Observable.fromPromise(http.getFile({
			url: url,
			method: "GET",

		}, path))
			.map(file => {
				return file && fs.File.exists(file.path)
			});

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

	subsonicGetCoverUrl(id: number): string {
		return this.subsonicService.subsonic.subsonicGetCoverUrl(id);
	}
	starSong(id: number) {
		return this.subsonicService.subsonic.starSong(id);
	}
	unStarSong(id: number) {
		return this.subsonicService.subsonic.unStarSong(id);
	}
	getArtists(): Observable<IArtist[]> {
		return this.subsonicService.cachedData.getArtists();
	}
	getAlbums(): Observable<IAlbum[]> {
		return this.subsonicService.cachedData.getAlbums();
	}
	getArtistById(id: number): Observable<IArtist> {
		return this.subsonicService.cachedData.getArtistById(id);
	}
	getCachedData() {
		return this.subsonicService.cachedData.getCachedData();
	}
}