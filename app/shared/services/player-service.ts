import {Injectable, EventEmitter, Inject} from 'angular2/core';
import {ISong} from '../models/Song';
import {SubularService} from './subular-service';

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
	public playingSong: EventEmitter<ISong>;
	public currentPosition: EventEmitter<IAudioPlayingInfo>;
	public currentlyPlaying: EventEmitter<boolean>;

	public currentIndex: number;
	constructor( @Inject(SubularService) private _settingsService: SubularService) {
		this.playingSong = new EventEmitter();
		this.currentlyPlaying = new EventEmitter();
		this.currentPosition = new EventEmitter();
	}
	emitPlayingSongEvent() {
		this.playingSong.emit(this.currentSong());
	}
	emitPlayingEvent(playing: boolean) {
		this.currentlyPlaying.emit(playing);
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

			let streamUrl = this._settingsService.getStreamUrl(this.songList[index].id);// + '&maxBitRate=128';
			this.audio = new Audio(streamUrl);
			this.audio.play();
			this.audio.addEventListener('timeupdate', () => {
				let rem = this.audio.duration - this.audio.currentTime;
				let pos = (this.audio.currentTime / this.audio.duration) * 100;
				let mins = Math.floor(rem / 60);
				let secs = rem - mins * 60;
				this.currentPosition.emit({
					remainingTime: rem,
					position: pos,
					mins,
					secs
				});

			});
			this.audio.addEventListener('ended', () => {
				this.playSong(this.currentIndex + 1);
			});
		} else {
			console.log('no songs in list');
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