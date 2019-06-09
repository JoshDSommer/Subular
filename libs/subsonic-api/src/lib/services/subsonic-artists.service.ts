import { Injectable } from '@angular/core';
import { SubsonicGetService } from './subsonic-get.service';
import { Observable } from 'rxjs';
import { Song, Artist } from '@subular3/shared';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubsonicArtistsService {
  constructor(private subsonic: SubsonicGetService) {}

  starArtist(id: number) {
    return this.subsonic.get('star', `&artistId=${id}`);
  }
  unStarArtist(id: number) {
    return this.subsonic.get('unstar', `&artistId=${id}`);
  }

  getArtistsTopSongs(artistName): Observable<Song[]> {
    return this.subsonic.get('getTopSongs', `&artist=${artistName}`);
  }

  getArtistInfo(artistId: number): Observable<Artist> {
    return this.subsonic
      .get('getArtistInfo2', `&id=${artistId}`)
      .pipe(
        map((data: any) => (data && data.artistInfo2 ? data.artistInfo2 : {}))
      );
  }
}
