import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SubularMobileService } from '../services/subularMobile.service';
import { IAlbum } from '@Subular/core';

@Injectable()
export class AlbumsResolver implements Resolve<IAlbum[]> {
  constructor(private subular: SubularMobileService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAlbum[]> {
    return this.subular.getAlbums().map(albums => {
      const artistId = +route.paramMap.get('artistId');
      const filtered = albums.filter(album => album.artistId == artistId);
      return filtered;
    });
  }
}
