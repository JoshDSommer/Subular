import { Injectable } from '@angular/core';
import { SubsonicService, SubsonicCachedService, ISong, IArtist, IAlbum } from 'subular';
import { Observable } from 'rxjs/Observable';

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