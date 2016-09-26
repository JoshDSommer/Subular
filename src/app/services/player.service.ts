import {Injectable, Inject} from '@angular/core';
import {SubularService} from './subsonic.service';
import { BehaviorSubject, Observable } from 'rxjs/RX';
import { IArtist, IAlbum, ISong } from '../shared/models';



export interface IAudioPlayingInfo {
	remainingTime: number;
	position: number;
	mins: number;
	secs: number;
}

@Injectable()
export class PlayerService {
	public songList: ISong[];
	public audio: any;
	public playingSong: BehaviorSubject<ISong>;
	public currentPosition: BehaviorSubject<IAudioPlayingInfo>;
	public currentlyPlaying: BehaviorSubject<boolean>;


	private audioPlaying$:Observable<any>
	private audioEnded$:Observable<any>;

	public currentIndex: number;
	constructor(private subular: SubularService ) {
		this.playingSong = new BehaviorSubject(null);
		this.currentlyPlaying = new BehaviorSubject(null);
		this.currentPosition = new BehaviorSubject(null);
	}

	emitPlayingSongEvent() {
		this.playingSong.next(this.currentSong());
	}

	emitPlayingEvent(playing: boolean) {
		this.currentlyPlaying.next(playing);
	}

	getCurrentIndexChangeemitter() {
		return this.playingSong;
	}

	clearSongs(): void {
		this.songList = [];
	}
	addSong(ISong: ISong): void {
		this.songList = (!this.songList ? [] : this.songList);
		this.songList.push(ISong);
	}

	addSongs(songs: ISong[]): void {
		songs.forEach((ISong) => {
			this.addSong(ISong);
		});
		this.playSong();
	}

	shuffleSongs(): void {
		let currentIndex = this.songList.length, temporaryValue, randomIndex;
		let shuffledSongs: ISong[] = [];
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = this.songList[currentIndex];
			this.songList[currentIndex] = this.songList[randomIndex];
			this.songList[randomIndex] = temporaryValue;
		}
	}

	playSong(index?: number): void {
		if (this.songList.length > 0) {

			index = (!index ? 0 : index);
			this.currentIndex = index;
			this.emitPlayingSongEvent();
			this.emitPlayingEvent(true);

			if (this.audio != null)
				this.audio.pause();

			let streamUrl = this.subular.getStreamUrl(this.songList[index].id);// + '&maxBitRate=128';
			this.audio = new Audio(streamUrl);
			this.audio.play();

			this.audioPlaying$ = Observable.fromEvent(this.audio, 'timeupdate');

			this.audioPlaying$.subscribe(()=>{
				let rem = this.audio.duration - this.audio.currentTime;
				let pos = (this.audio.currentTime / this.audio.duration) * 100;
				let mins = Math.floor(rem / 60);
				let secs = rem - mins * 60;
				this.emitPlayingSongEvent();
				this.currentPosition.next({
					remainingTime: rem,
					position: pos,
					mins,
					secs
				});

			});
			this.audio.addEventListener('ended', () => {
				if ((this.currentIndex + 1) < this.songList.length)
					this.playSong(this.currentIndex + 1);
			});
		}
	}
	pauseSong(): void {
		this.audio.pause();
		this.emitPlayingEvent(false);
	}

	resumeSong(): void {
		this.audio.play();
		this.emitPlayingEvent(true);
	}

	currentSong(): ISong {
		return this.songList[this.currentIndex];
	}
}