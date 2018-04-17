import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SubsonicService } from './subsonic.service';
import { IAlbum } from '../interfaces/album';
import { IArtist } from '../interfaces/artists';
import { LOCALSTORAGE_PROVIDER } from '../localstorage.provider';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

export const SUBULAR_CACHED_ALBUMS = 'subular.cached.albums';
export const SUBULAR_CACHED_ARTISTS = 'subular.cached.artists';

@Injectable()
export class SubsonicCachedService {

	// private artists: IArtist[];

	constructor(private subsonic: SubsonicService, private localStorage: LOCALSTORAGE_PROVIDER) {

	}



	getCachedData(): Observable<[IArtist[], IAlbum[]]> {
		return Observable.combineLatest(this.getArtists(), this.getAlbums()) as any;
	}

	getArtists(): Observable<IArtist[]> {
		const artists = this.localStorage.getValue(SUBULAR_CACHED_ARTISTS);
		if (artists) {
			return new Observable(observer => {
				observer.next(artists);
				observer.complete();
			});
		}
		// else rebuild albumDB  and then get it form local storage.
		return this.buildArtistDatabase().switchMap(() => this.getArtists());
	}

	getAlbums(): Observable<IAlbum[]> {
		const albums = this.localStorage.getValue(SUBULAR_CACHED_ALBUMS);
		if (albums) {
			return new Observable(observer => {
				observer.next(albums);
				observer.complete();
			});
		}
		// else rebuild albumDB  and then get it form local storage.
		return this.buildAlbumDatabase().switchMap(() => this.getAlbums());
	}

	getAlbum(albumId: number) {
		const albums = this.localStorage.getValue(SUBULAR_CACHED_ALBUMS);
		const filtered = albums.find(album => album.id == albumId)

		if (filtered) {
			return new Observable(observer => {
				observer.next(filtered);
				observer.complete();
			});
		}
		// else rebuild albumDB  and then get it form local storage.
		return this.buildAlbumDatabase().switchMap(() => this.getAlbums().map(albumList => albumList.find(album => album.id === albumId)));

	}

	getArtistById(id: number): Observable<IArtist> {
		return this.getArtists().map(artists => artists.find(artist => artist.id == id));
	}



	private cleanSubsonicResponse(data: any): string {
		return JSON.stringify(data).replace('subsonic-response', 'subresp');
	}

	private buildAlbumDatabase(albums: IAlbum[] = [], offset: number = 0): Observable<boolean> {
		return this.subsonic
			.subsonicGet('getAlbumList2', '&type=newest&size=500&offset=' + offset)
			.map(data => data.subresp.albumList2.album as IAlbum[])
			.switchMap(data => {
				albums = [...albums, ...data,]
				if (data.length === 500) {
					return this.buildAlbumDatabase(albums, offset + 500);
				} else {
					this.localStorage.setValue(SUBULAR_CACHED_ALBUMS, albums);
					return Observable.of(true);
				}
			});
	}

	private buildArtistDatabase(): Observable<any> {
		return this.subsonic.subsonicGet('getArtists')
			.map(data => data.subresp.artists.index
				.map(value => value.artist)
				.reduce((previous, value) => [...previous, ...value]) as IArtist[]
			)
			.do(artists => this.localStorage.setValue(SUBULAR_CACHED_ARTISTS, artists))
	}
}
