import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ISong } from '../interfaces';

@Injectable()
export class SongStoreService {

	private songList$ = new BehaviorSubject([]);
	private songList: ISong[];

	addSongs(songs: ISong[]): Observable<ISong[]> {
		this.songList$.next(songs);
		this.songList = songs;
		return this.songList$.asObservable();
	}

	updateSong(song: ISong) {
		this.songList = this.songList.map(previousSong => {
			if (song.id === previousSong.id) {
				return song;
			}
			return previousSong;
		});
		this.songList$.next(this.songList);
	}
}
