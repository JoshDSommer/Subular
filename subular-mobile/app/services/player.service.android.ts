import { Injectable, NgZone } from '@angular/core';
import { ISong, SubsonicService, replace } from 'subular';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ios } from 'utils/utils';
import * as fs from "file-system";
import { IAudioPlayingInfo, PlayingStatus } from './player.service';


@Injectable()
export class PlayerServiceAndroid {
	preSortedSongListOrder: ISong[];
	songList: ISong[] = [];
	playHistory: ISong[] = [];
	private _nowPlaying$ = new BehaviorSubject<IAudioPlayingInfo>(null);
	get nowPlaying$(): Observable<IAudioPlayingInfo> {
		return this._nowPlaying$.asObservable();
	}
	private currentSong: IAudioPlayingInfo;
	private currentIndex: number;

	private _repeat: boolean;
	private _random: boolean;

	constructor(private subularService: SubsonicService, private ngZone: NgZone) {
		console.log('loading ANDROID PLAYER SERVICE')
		this.setupAudio();
	}

	clearSongs(): void {
		this.songList = [];
		this.preSortedSongListOrder = [];
		this._random = false;
	}

	addSong(song: ISong): void {
		this.songList = [...this.songList, song];
	}

	addAndPlaySong(song: ISong): void {
		this.addSong(song);
		this.playSong(this.songList.indexOf(song));
	}

	addSongs(songs: ISong[]): void {
		this.songList = [...this.songList, ...songs];
	}

	addSongsAndPlaySong(songs: ISong[], song: ISong) {
		this.addSongs(songs);
		this.playSong(this.songList.indexOf(song));
	}

	/**
	 * used to update song, for example if  hearted/unhearted
	 */
	updateSong(song: ISong) {
		this.songList = replace(this.songList, song);
		this.preSortedSongListOrder = replace(this.preSortedSongListOrder, song);
		this.currentSong.song = song;
	}

	shuffleSongs(firstSong: ISong = null): void {
		this._random = true;
		const songList = this.songList;
		this.preSortedSongListOrder = [...this.songList];

		let currentIndex = songList.length, temporaryValue, randomIndex;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = songList[currentIndex];
			songList[currentIndex] = songList[randomIndex];
			songList[randomIndex] = temporaryValue;
		}
		if (firstSong) {
			this.songList = [firstSong, ...songList];
			return;
		}
		this.songList = songList;
	}

	toggleRepeat() {
		this._repeat = !this._repeat;
		this.currentSong.repeat = this._repeat;
		this.notifyObservable();
	}

	toggleShuffle() {
		this._random = !this._random;

		if (this._random) {
			this.shuffleSongs(this.currentSong.song);
			this.currentIndex = 0;
		} else {
			this.songList = [...this.preSortedSongListOrder];
		}
		this.currentSong.random = this._random;
		this.notifyObservable();
	}

	playSong(index?: number): void {

	}

	private notifyObservable() {
	}

	private setupAudio() {
	}

	pauseSong(): void {
		this.currentSong.playing = PlayingStatus.paused;
		this.notifyObservable();

	}

	resumeSong(): void {
		this.currentSong.playing = PlayingStatus.playing;
		this.notifyObservable();
	}

	playNextSong() {
		const nextIndex = (this.currentIndex + 1) >= this.songList.length ? 0 : (this.currentIndex + 1);

		if (nextIndex === 0 && !this._repeat) {
			//if the next index is 0 and repeat is set to false then top playing
			return;
		}
		this.playSong(nextIndex);

	}

	playPreviousSong() {
		const previousIndex = (this.currentIndex - 1) < 0 ? (this.songList.length - 1) : (this.currentIndex - 1);
		this.playSong(previousIndex);
	}

	songUpdated(song: ISong) {
		this.songList = this.songList.map(previousSong => {
			if (song.id === previousSong.id) {
				return song;
			}
			return previousSong;
		});
		this.playHistory = this.playHistory.map(previousSong => {
			if (song.id === previousSong.id) {
				return song;
			}
			return previousSong;
		});
	}
}
