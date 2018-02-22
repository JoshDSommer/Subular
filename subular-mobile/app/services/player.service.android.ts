import { Injectable } from '@angular/core';
import { ISong, SubsonicService } from 'subular';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export enum PlayingStatus {
	loading,
	paused,
	playing
}

export interface IAudioPlayingInfo {
	song: ISong;
	playing: PlayingStatus;
	remainingTime?: number;
	position?: number;
	mins?: number;
	secs?: number;
	repeat?: boolean;
	random?: boolean;
}

@Injectable()
export class PlayerService {

	private _nowPlaying$ = new BehaviorSubject<IAudioPlayingInfo>(null);
	get nowPlaying$(): Observable<IAudioPlayingInfo> {
		return this._nowPlaying$.asObservable();
	}
	private currentSong: IAudioPlayingInfo;
	private currentIndex: number;

	private _repeat: boolean;
	private _random: boolean;

	constructor() {
	}

	clearSongs(): void {

	}

	addSong(song: ISong): void {
	}

	addAndPlaySong(song: ISong): void {

	}

	addSongs(songs: ISong[]): void {
	}

	addSongsAndPlaySong(songs: ISong[], song: ISong) {

	}

	updateSong(song: ISong) {

	}

	shuffleSongs(firstSong: ISong = null): void {

	}

	toggleRepeat() {

	}

	toggleShuffle() {

	}

	playSong(index?: number): void {

	}

	private notifyObservable() {
	}

	private setupAudio() {
	}

	pauseSong(): void {


	}

	resumeSong(): void {

	}

	playNextSong() {

	}

	playPreviousSong() {

	}

	songUpdated(song: ISong) {

	}
}
