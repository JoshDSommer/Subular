import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ClassProvider } from '@angular/core';
import { SubsonicService } from './subsonic.service';
import { IAlbum } from './interfaces/album';
import { IArtist } from './interfaces/artists';
import { LOCALSTORAGE_PROVIDER } from './localstorage.provider';


const SUBULAR_CACHED_ALBUMS = 'subular.cached.albums';

@Injectable()
export class CachedAlbumArtistService {

	// private artists: IArtist[];

	constructor(private subsonic: SubsonicService, private localStorage: LOCALSTORAGE_PROVIDER) {

	}

	refreshedCachedData(): Observable<boolean> {
		return this.buildAlbumDatabase();
	}

	getAlbums():Observable<IAlbum[]>{
		const albums = this.localStorage.getValue(SUBULAR_CACHED_ALBUMS);
		if(albums){
			return new Observable(observer =>{
				observer.next(albums);
				observer.complete();
			});
		}
		// else rebuild albumDB  and then get it form local storage.
		return this.buildAlbumDatabase().switchMap(()=>this.getAlbums());
	}



	private cleanSubsonicResponse(data: any): string {
		return JSON.stringify(data).replace('subsonic-response', 'subresp');
	}

	private buildAlbumDatabase(albums: IAlbum[] = [], offset: number = 0): Observable<boolean> {
		return this.subsonic
			.subsonicGet('getAlbumList', '&type=newest&size=500&offset=' + offset)
			.switchMap(data => {
				let newAlbums = data.subresp.albumList.album as IAlbum[];
				albums = [...albums, ...newAlbums,]
				if (newAlbums.length === 500) {
					return this.buildAlbumDatabase(albums, offset + 500);
				} else {
					this.localStorage.setValue(SUBULAR_CACHED_ALBUMS, albums);
					return Observable.of(true);
				}
			});
	}
}
