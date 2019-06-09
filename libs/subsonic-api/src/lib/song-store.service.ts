import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Songs, Song } from '@subular3/shared';

@Injectable({
  providedIn: 'root'
})
export class SongStoreService {
  private songList$ = new BehaviorSubject([]);
  private songList: Songs;

  addSongs(songs: Songs): Observable<Songs> {
    this.songList$.next(songs);
    this.songList = songs;
    return this.songList$.asObservable();
  }

  get songs$() {
    return this.songList$.asObservable();
  }

  updateSong(song: Song) {
    this.songList = this.songList.map(previousSong => {
      if (song.id === previousSong.id) {
        return song;
      }
      return previousSong;
    });
    this.songList$.next(this.songList);
  }
}
