import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SubularRouteData } from '~/app/app.routing';
import { Observable } from 'rxjs';
import { SubsonicCachedService, IAlbum } from '@Subular/core';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AlbumHeaderResolver implements Resolve<SubularRouteData> {
  constructor(private cache: SubsonicCachedService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<SubularRouteData> {
    const albumId = +route.paramMap.get('albumId');
    return this.cache.getAlbum(albumId).pipe(
      map(
        (album: IAlbum) =>
          (route.params && route.params.returnLink
            ? {
                title: null,
                backLinkTitle: route.params.returnLinkText,
                backLinkUrl: route.params.returnLink
              }
            : {
                title: null,
                backLinkTitle: album.artist,
                backLinkUrl: ['/app/albums', album.artistId]
              }) as SubularRouteData
      )
    );
  }
}
