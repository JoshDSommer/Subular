import { Injectable } from '@angular/core';
import { SubsonicAuthenticationService } from './subsonic-authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ISong, IPlaylist, IAlbum } from '../interfaces';
import { IPlaylists } from '../interfaces/playlist';
import { of } from 'rxjs/observable/of';
import { map, concat, tap, delay } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

const placeholderSong = {
  placeholder: true
} as any;
const PLACEHOLDER_VALUES = [
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong,
  placeholderSong
];

const PLACEHOLDER$ = of(PLACEHOLDER_VALUES);

@Injectable()
export class SubsonicService {
  constructor(
    private authentication: SubsonicAuthenticationService,
    private http: HttpClient
  ) {}

  pingServer(): Observable<boolean> {
    return this.subsonicGet('ping')
      .map(data => data.status === 'ok')
      .catch(() => of(false));
  }

  getStreamUrl(id: number): string {
    return `${this.authentication.getServerURl('stream')}&id=${id}`;
  }

  getDownloadUrl(id: number): string {
    return `${this.authentication.getServerURl('download')}&id=${id}`;
  }

  getHLSStream(id: number) {
    return `${this.authentication.getHLSURl(id)}`;
  }

  getPlaylists(): Observable<IPlaylists> {
    return PLACEHOLDER$.pipe(
      concat(
        this.subsonicGet('getPlaylists').map(data => data.playlists.playlist)
      )
    );
  }

  getRecentAdditions(): Observable<IAlbum[]> {
    return PLACEHOLDER$.pipe(
      concat(
        this.subsonicGet('getAlbumList2', '&type=newest&size=50').map(
          response => response.albumList2.album
        )
      )
    );
  }

  getPlaylist(id: number): Observable<IPlaylist> {
    return this.subsonicGet('getPlaylist', `&id=${id}`)
      .map(data => data.playlist)
      .map(playlist => {
        playlist.entry = playlist.entry.map((song: ISong) => {
          const measuredTime = new Date(song.duration * 1000);
          const timeWithoutHours = measuredTime.toISOString().substr(14, 5);
          const timeWithHours = measuredTime.toISOString().substr(11, 8);
          song.time = timeWithHours.startsWith('00:')
            ? timeWithoutHours
            : timeWithHours;
          return song;
        });
        return playlist;
      });
  }

  createPlaylist(name: string): Observable<number> {
    return this.subsonicGet('createPlaylist', `&name=${name}`);
  }

  addSongToPlaylist(song: ISong, playlistId: number) {
    return this.subsonicGet(
      'updatePlaylist',
      `&playlistId=${playlistId}&songIdToAdd=${song.id}`
    );
  }

  changePlaylistName(name: string, playlistId: number) {
    return this.subsonicGet(
      'updatePlaylist',
      `&playlistId=${playlistId}&name=${name}`
    );
  }

  removeSongFromPlaylist(songIndexToRemove, playlistId: number) {
    return this.subsonicGet(
      'updatePlaylist',
      `&playlistId=${playlistId}&songIndexToRemove=${songIndexToRemove}`
    );
  }

  getArtistInfo(artistId: number): Observable<any> {
    return this.subsonicGet('getArtistInfo2', `&id=${artistId}`).pipe(
      map((data: any) => (data && data.artistInfo2 ? data.artistInfo2 : {}))
    );
  }

  getSongs(albumId: number): Observable<ISong[]> {
    return PLACEHOLDER$.pipe(
      concat(
        this.subsonicGet('getAlbum', `&id=${albumId}`)
          .map(data => data.album.song)
          .map(songs => {
            return songs.map((song: ISong) => {
              const measuredTime = new Date(song.duration * 1000);
              const timeWithoutHours = measuredTime.toISOString().substr(14, 5);
              const timeWithHours = measuredTime.toISOString().substr(11, 8);
              song.time = timeWithHours.startsWith('00:')
                ? timeWithoutHours
                : timeWithHours;
              return song;
            });
          })
      )
    );
  }

  getTopSongs(artistName): Observable<ISong[]> {
    return PLACEHOLDER$.pipe(
      concat(this.subsonicGet('getTopSongs', `&artist=${artistName}`))
    );
  }

  subsonicGetCoverUrl(id: number, size = 274): string {
    return (
      this.authentication.getServerURl('getCoverArt') + `&id=${id}&size=${274}`
    );
  }

  starSong(id: number) {
    return this.subsonicGet('star', `&id=${id}`);
  }
  unStarSong(id: number) {
    return this.subsonicGet('unstar', `&id=${id}`);
  }

  subsonicGet(method: string);
  subsonicGet(method: string, additionalParams: string);
  subsonicGet(method: string, additionalParams?: string): Observable<any> {
    const url = additionalParams
      ? this.authentication.getServerURl(method) + additionalParams
      : this.authentication.getServerURl(method);
    if (url === '' || url === additionalParams) {
      return of(false);
    }
    return this.http.get<any>(url).pipe(map(data => data['subsonic-response']));
  }
}
