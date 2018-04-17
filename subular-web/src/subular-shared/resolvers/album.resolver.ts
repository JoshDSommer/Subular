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
		const albumId = +route.paramMap.get('albumId');
		return this.cache.getAlbum(albumId);
	}
}
