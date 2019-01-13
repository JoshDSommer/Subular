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
export class AlbumResolver implements Resolve<IAlbum> {
  constructor(private subular: SubularMobileService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAlbum> {
    return this.subular.getAlbums().map(albums => {
      const albumId = +route.paramMap.get('albumId');
      const filtered = albums.find(album => album.id == albumId);
      return filtered;
    });
  }
}
