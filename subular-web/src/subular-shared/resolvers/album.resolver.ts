import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IAlbum } from '../interfaces/album';
import { SubsonicCachedService } from '../services/subsonic.cached.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AlbumResolver implements Resolve<IAlbum> {

	constructor(private cache: SubsonicCachedService) {
	}

	resolve(route: ActivatedRouteSnapshot): Observable<IAlbum> {
		return this.cache.getAlbums()
			.map(albums => {
				const albumId = +route.paramMap.get('albumId');
				const filtered = albums.find(album => album.id == albumId)
				return filtered;
			});
	}
}
