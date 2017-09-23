import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CachedAlbumArtistService } from '../../../../shared-services/index';
import { IAlbum } from '../../../../shared-services/index';

@Injectable()
export class AlbumResolver implements Resolve<IAlbum[]> {

	constructor(private cache: CachedAlbumArtistService) {
	}

	resolve(route: ActivatedRouteSnapshot): Observable<IAlbum[]> {
		return this.cache.getAlbums()
			.map(albums => {
				const artistId = +route.paramMap.get('artistId');
				console.log(artistId,albums)
				const filtered = albums.filter(album => album.parent == artistId)
				console.log(filtered)
				return filtered;
			});
	}
}