import { Injectable } from '@angular/core';
import { Playlists, Album, Song, Playlist } from '@subular3/shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubsonicGetService } from './subsonic-get.service';

@Injectable({
  providedIn: 'root'
})
export class SubsonicPlaylistsService {
  constructor(private subsonic: SubsonicGetService) {}

  getPlaylists(): Observable<Playlists> {
    return this.subsonic
      .get('getPlaylists')
      .pipe(map((data: any) => data.playlists.playlist));
  }

  getRecentAdditions(): Observable<Album[]> {
    return this.subsonic
      .get('getAlbumList2', '&type=newest&size=50')
      .pipe(map((response: any) => response.albumList2.album));
  }

  getPlaylist(id: number): Observable<Playlist> {
    return this.subsonic.get('getPlaylist', `&id=${id}`).pipe(
      map(data => data['playlist']),
      map((playlist: any) => {
        playlist.entry = playlist.entry.map((song: Song) => {
          const measuredTime = new Date(song.duration * 1000);
          const timeWithoutHours = measuredTime.toISOString().substr(14, 5);
          const timeWithHours = measuredTime.toISOString().substr(11, 8);
          song.time = timeWithHours.startsWith('00:')
            ? timeWithoutHours
            : timeWithHours;
          return song;
        });
        return playlist;
      })
    );
  }

  createPlaylist(name: string): Observable<number> {
    return this.subsonic.get('createPlaylist', `&name=${name}`);
  }

  addSongToPlaylist(song: Song, playlistId: number) {
    return this.subsonic.get(
      'updatePlaylist',
      `&playlistId=${playlistId}&songIdToAdd=${song.id}`
    );
  }

  changePlaylistName(name: string, playlistId: number) {
    return this.subsonic.get(
      'updatePlaylist',
      `&playlistId=${playlistId}&name=${name}`
    );
  }

  removeSongFromPlaylist(songIndexToRemove, playlistId: number) {
    return this.subsonic.get(
      'updatePlaylist',
      `&playlistId=${playlistId}&songIndexToRemove=${songIndexToRemove}`
    );
  }
}
