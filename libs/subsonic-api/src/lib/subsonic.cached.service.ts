import { Injectable } from '@angular/core';
import { map, tap, switchMap, startWith, take } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';
import { SubsonicGetService } from './services/subsonic-get.service';
import {
  LOCALSTORAGE_PROVIDER,
  Artist,
  Album,
  Playlists,
  Playlist,
  Artists,
  Albums
} from '@subular3/shared';
import { SubsonicPlaylistsService } from './services/subsonic-playlists.service';

export const SUBULAR_CACHED_ALBUMS = 'subular.cached.albums';
export const SUBULAR_CACHED_ARTISTS = 'subular.cached.artists';
export const SUBULAR_CACHED_PLAYLISTS = 'subular.cached.playlists';

@Injectable({
  providedIn: 'root'
})
export class SubsonicCachedService {
  constructor(
    private subsonic: SubsonicGetService,
    private localStorage: LOCALSTORAGE_PROVIDER,
    private subsonicPlaylists: SubsonicPlaylistsService
  ) {}

  getCachedData(): Observable<[Artists, Albums, Playlists]> {
    return combineLatest(
      this.getArtists(),
      this.getAlbums(),
      this.getPlaylists()
    ) as any;
  }

  getPlaylists(): Observable<Playlists> {
    const playlists = this.localStorage.getValue(SUBULAR_CACHED_PLAYLISTS);
    return this.subsonicPlaylists.getPlaylists().pipe(
      tap((response: Playlists) =>
        this.localStorage.setValue(SUBULAR_CACHED_PLAYLISTS, response)
      ),
      startWith(playlists || []),
      switchMap(() =>
        this.getDateFromCache<Playlist>(SUBULAR_CACHED_PLAYLISTS)(
          this.localStorage
        )
      ),
      take(2)
    );
  }

  getArtists(): Observable<Artists> {
    const artists = this.localStorage.getValue(SUBULAR_CACHED_ARTISTS);
    return this.buildArtistDatabase().pipe(
      startWith(artists || []),
      switchMap(() =>
        this.getDateFromCache<Artist>(SUBULAR_CACHED_ARTISTS)(this.localStorage)
      ),
      take(2)
    );
  }

  private getDateFromCache<T>(cacheKey: string) {
    return (local: LOCALSTORAGE_PROVIDER) => {
      return new Observable<T[]>(observer => {
        let cachedArtist = local.getValue(cacheKey);
        cachedArtist = cachedArtist || [];
        observer.next(cachedArtist);
        observer.complete();
      });
    };
  }

  getAlbums(): Observable<Albums> {
    const albums = this.localStorage.getValue(SUBULAR_CACHED_ALBUMS);
    return this.buildAlbumDatabase().pipe(
      startWith(albums || []),
      switchMap(() =>
        this.getDateFromCache<Album>(SUBULAR_CACHED_ALBUMS)(this.localStorage)
      ),
      take(2)
    );
  }

  getAlbum(albumId: number) {
    return this.getAlbums().pipe(
      map(albums => albums.find(album => album.id === albumId))
    );
  }

  getArtistById(id: number): Observable<Artist> {
    return this.getArtists().pipe(
      map(artists => artists.find(artist => artist.id === id))
    );
  }

  private buildAlbumDatabase(
    albums: Albums = [],
    offset: number = 0
  ): Observable<boolean> {
    return this.subsonic
      .get('getAlbumList2', '&type=newest&size=500&offset=' + offset)
      .pipe(
        map((data: any) => data.albumList2.album as Album[]),
        switchMap((data: any) => {
          albums = [...albums, ...data];
          if (data.length === 500) {
            return this.buildAlbumDatabase(albums, offset + 500);
          } else {
            this.localStorage.setValue(SUBULAR_CACHED_ALBUMS, albums);
            return of(true);
          }
        })
      );
  }

  private buildArtistDatabase(): Observable<any> {
    return this.subsonic.get('getArtists').pipe(
      map((data: any) => {
        return data.artists.index
          .map(value => value.artist)
          .reduce((previous, value) => [...previous, ...value]) as Artist[];
      }),
      tap(artists =>
        this.localStorage.setValue(SUBULAR_CACHED_ARTISTS, artists)
      )
    );
  }
}
