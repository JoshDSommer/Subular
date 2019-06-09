import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '@subular3/shared';
import { SubsonicAuthenticationService } from '../subsonic-authentication.service';
import { SubsonicGetService } from './subsonic-get.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubsonicSongsService {
  constructor(
    private authentication: SubsonicAuthenticationService,
    private subsonic: SubsonicGetService
  ) {}

  getStreamUrl(id: number): string {
    return `${this.authentication.getServerURl('stream')}&id=${id}`;
  }

  getDownloadUrl(id: number): string {
    return `${this.authentication.getServerURl('download')}&id=${id}`;
  }

  getHLSStream(id: number) {
    return `${this.authentication.getHLSURl(id)}`;
  }

  getSongs(albumId: number): Observable<Song[]> {
    return this.subsonic.get('getAlbum', `&id=${albumId}`).pipe(
      map(data => data.album.song),
      map(songs => {
        return songs.map((song: Song) => {
          const measuredTime = new Date(song.duration * 1000);
          const timeWithoutHours = measuredTime.toISOString().substr(14, 5);
          const timeWithHours = measuredTime.toISOString().substr(11, 8);
          song.time = timeWithHours.startsWith('00:')
            ? timeWithoutHours
            : timeWithHours;
          return song;
        });
      })
    );
  }

  getCoverUrl(id: number): string {
    return (
      this.authentication.getServerURl('getCoverArt') + `&id=${id}&size=${274}`
    );
  }

  starSong(id: number) {
    return this.subsonic.get('star', `&id=${id}`);
  }
  unStarSong(id: number) {
    return this.subsonic.get('unstar', `&id=${id}`);
  }

  starAlbum(id: number) {
    return this.subsonic.get('star', `&albumId=${id}`);
  }
  unStarAlbum(id: number) {
    return this.subsonic.get('unstar', `&albumId=${id}`);
  }
}
