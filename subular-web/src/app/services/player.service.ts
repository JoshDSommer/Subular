import { Injectable } from '@angular/core';
import { ISong, SubsonicService } from '../../subular-shared/index';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

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
}

@Injectable()
export class PlayerService {
	songList: ISong[] = [];
	playHistory: ISong[] = [];
	audio: any;
	private currentSong$ = new BehaviorSubject<IAudioPlayingInfo>(null);
	private currentSong: IAudioPlayingInfo;
	public currentIndex: number;
	private audioSubscriptions: Subscription;

	get nowPlaying$() {
		return this.currentSong$.asObservable();
	}

	private songAtIndex(index) {
		return this.songList[index];

	}

	constructor(private subularService: SubsonicService) {
		this.currentSong$.unsubscribe = () => {
			if (this.audioSubscriptions) {
				this.audioSubscriptions.unsubscribe();
				this.audio = null;
			}
		};
	}

	clearSongs(): void {
		this.songList = [];
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

	shuffleSongs(): void {
		const songList = this.songList;

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
		this.songList = songList;
	}


	playSong(index?: number): void {
		if (this.songList.length > 0) {
			this.currentIndex  = (!index ? 0 : index);

			const playingSong = this.songAtIndex(index);

			this.playHistory = [...this.playHistory, playingSong];
			this.currentSong = { song: playingSong, playing: PlayingStatus.loading, position: 0, remainingTime: 0 };

			this.currentSong$.next(this.currentSong);
			if (this.audio != null) {
				this.audio.pause();
			}

			const streamUrl = this.subularService.getStreamUrl(playingSong.id); // + '&maxBitRate=128';
			this.audio = new Audio(streamUrl);

			this.audio.play();

			const timeUpdate$ = Observable.fromEvent(this.audio, 'timeupdate')
				.do(() => {
					const remainder = this.audio.duration - this.audio.currentTime;
					const position = (this.audio.currentTime / this.audio.duration) * 100;
					const mins = Math.floor(remainder / 60);
					const secs = remainder - mins * 60;

					this.currentSong = {
						song: this.currentSong.song,
						playing: PlayingStatus.playing,
						remainingTime: remainder,
						position: position,
						mins,
						secs
					};

					this.currentSong$.next(this.currentSong);
				});
			const trackPaused$ = Observable.fromEvent(this.audio, 'pause')
				.do(() => {
					this.currentSong$.next({ ...this.currentSong, playing: PlayingStatus.paused });
				});

			const trackPlay$ = Observable.fromEvent(this.audio, 'play')
				.do(() => {
					this.currentSong$.next({ ...this.currentSong, playing: PlayingStatus.playing });
				});

			const trackDone$ = Observable.fromEvent(this.audio, 'ended')
				.do(() => {
					if ((this.currentIndex + 1) < this.songList.length) {
						this.playSong(this.currentIndex + 1);
					}
				});

			this.audioSubscriptions = Observable.merge(timeUpdate$, trackDone$, trackPaused$, trackPlay$).subscribe();
		}
	}

	pauseSong(): void {
		this.audio.pause();
		setTimeout(() => {
		});
	}

	resumeSong(): void {
		this.audio.play();
		this.currentSong$.next({ ...this.currentSong, playing: PlayingStatus.playing });
	}

	playNextSong() {
		const nextIndex = (this.currentIndex + 1) >= this.songList.length ? 0 : (this.currentIndex + 1);
		this.playSong(nextIndex);
	}

	playPreviousSong() {
		const previousIndex = (this.currentIndex - 1) < 0 ? (this.songList.length - 1) : (this.currentIndex - 1);
		this.playSong(previousIndex);
	}
}
