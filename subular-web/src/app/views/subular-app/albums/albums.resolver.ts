import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SubsonicCachedService } from '../../../../shared-module/index';
import { IAlbum } from '../../../../shared-module/index';

@Injectable()
export class AlbumResolver implements Resolve<IAlbum[]> {

	constructor(private cache: SubsonicCachedService) {
	}

	resolve(route: ActivatedRouteSnapshot): Observable<IAlbum[]> {
		return this.cache.getAlbums()
			.map(albums => {
				const artistId = +route.paramMap.get('artistId');
				const filtered = albums.filter(album => album.parent == artistId)
				return filtered;
			});
	}
}