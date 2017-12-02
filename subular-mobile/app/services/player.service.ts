import { Injectable, NgZone } from '@angular/core';
import { ISong, SubsonicService } from 'subular';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ios } from 'utils/utils';
import * as fs from "file-system";

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
	commandCenter: MPRemoteCommandCenter;
	controlsHandler: ControlsHandler;
	songList: ISong[] = [];
	playHistory: ISong[] = [];
	private _nowPlaying$ = new BehaviorSubject<IAudioPlayingInfo>(null);
	get nowPlaying$(): Observable<IAudioPlayingInfo> {
		return this._nowPlaying$.asObservable();
	}
	private _player: AVQueuePlayer;
	private currentSong: IAudioPlayingInfo;
	private currentIndex: number;


	constructor(private subularService: SubsonicService, private ngZone: NgZone) {

		this.setupAudio();
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
			this.currentIndex = (!index ? 0 : index);

			const playingSong = this.songList[this.currentIndex];

			this.playHistory = [...this.playHistory, playingSong];
			this.currentSong = { song: playingSong, playing: PlayingStatus.loading, position: 0, remainingTime: 0 };

			const localFile = fs.path.join(fs.knownFolders.documents().path, playingSong.id.toString() + '.mp3');
			const streamUrl = this.subularService.getStreamUrl(playingSong.id);
			let url;

			if (fs.File.exists(localFile)) {
				url = NSURL.fileURLWithPath(localFile)
				console.log('localfile');
			} else {
				console.log('stream');
				url = NSURL.URLWithString(streamUrl);
			}
			let playerItem = AVPlayerItem.playerItemWithURL(url);
			this._player.removeAllItems();
			this._player.insertItemAfterItem(playerItem, null);
			this.notifyObservable();
			this._player.play();

			// TODO set artwork
			const values = ios.collections.jsArrayToNSArray([playingSong.title, playingSong.artist, playingSong.album]);
			const keys = ios.collections.jsArrayToNSArray([MPMediaItemPropertyTitle, MPMediaItemPropertyArtist, MPMediaItemPropertyAlbumTitle])

			const nowPlaying = NSDictionary
				.dictionaryWithObjectsForKeys(values, keys);

			MPNowPlayingInfoCenter.defaultCenter().nowPlayingInfo = nowPlaying as any;

		}
	}

	private notifyObservable() {
		this.ngZone.run(() => {
			this._nowPlaying$.next(this.currentSong);
		});
	}

	private setupAudio() {
		this._player = AVQueuePlayer.alloc().init();

		//allows player controls and background audio.
		UIApplication.sharedApplication.beginReceivingRemoteControlEvents();

		AVAudioSession.sharedInstance().setCategoryWithOptionsError(AVAudioSessionCategoryPlayback, null);
		AVAudioSession.sharedInstance().setActiveError(true);

		// creates the controls handler to marshal commands between objective c and javascript
		this.controlsHandler = ControlsHandler.initWithOwner(new WeakRef(this));

		// sets the command center commands to use the controls handers events.
		this.commandCenter = MPRemoteCommandCenter.sharedCommandCenter();
		this.commandCenter.pauseCommand.enabled = true;
		this.commandCenter.pauseCommand.addTargetAction(this.controlsHandler, 'pauseSong');
		this.commandCenter.playCommand.enabled = true;
		this.commandCenter.playCommand.addTargetAction(this.controlsHandler, 'resumeSong');
		this.commandCenter.nextTrackCommand.enabled = true;
		this.commandCenter.nextTrackCommand.addTargetAction(this.controlsHandler, 'playNextSong');
		this.commandCenter.previousTrackCommand.enabled = true;
		this.commandCenter.previousTrackCommand.addTargetAction(this.controlsHandler, 'playPreviousSong');

		//TODO delegates to update time and when song is done playing
		const _interval = CMTimeMake(1, 5);
		this._player.addPeriodicTimeObserverForIntervalQueueUsingBlock(_interval, null, (currentTime) => {
			let _seconds = CMTimeGetSeconds(currentTime);
			const position = (_seconds / this.currentSong.song.duration) * 100;
			const remainder = Math.floor(this.currentSong.song.duration - _seconds);
			if (remainder >= 1) {
				const mins = Math.floor(remainder / 60);
				const secs = remainder - mins * 60;
				this.currentSong.position = position;
				// this is because this function is started to be called as soon as the play is playing.
				// not nescarrily after loading.
				this.currentSong.remainingTime = remainder;
				if (this.currentSong.playing != PlayingStatus.paused) {
					this.currentSong.playing = position > 0 ? PlayingStatus.playing : PlayingStatus.loading;
				}
				this.currentSong.mins = mins;
				this.currentSong.secs = secs;
				switch (this.currentSong.playing) {
					case PlayingStatus.loading: {
						this.commandCenter.playCommand.enabled = false;
						this.commandCenter.pauseCommand.enabled = false;
						break;
					}
					case PlayingStatus.paused: {
						this.commandCenter.playCommand.enabled = true;

						break;
					}
					case PlayingStatus.playing: {
						this.commandCenter.pauseCommand.enabled = true;
						break;
					}
				}
				this.notifyObservable();
			} else {
				this.playNextSong();
			}
		});

	}

	pauseSong(): void {
		this._player.pause();
		this.currentSong.playing = PlayingStatus.paused;
		this.notifyObservable();

	}

	resumeSong(): void {
		this._player.play();
		this.currentSong.playing = PlayingStatus.playing;
		this.notifyObservable();
	}

	playNextSong() {
		console.log('next song')
		const nextIndex = (this.currentIndex + 1) >= this.songList.length ? 0 : (this.currentIndex + 1);
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


class ControlsHandler extends NSObject {
	private _owner: WeakRef<PlayerService>;

	public static initWithOwner(owner: WeakRef<PlayerService>): ControlsHandler {
		let impl = <ControlsHandler>ControlsHandler.new();
		impl._owner = owner;
		return impl;
	}

	public pauseSong() {
		let owner = this._owner.get();
		if (!owner) {
			return;
		}

		owner.pauseSong();
	}

	public resumeSong() {
		let owner = this._owner.get();
		if (!owner) {
			return;
		}

		owner.resumeSong();
	}

	public playNextSong() {
		let owner = this._owner.get();
		if (!owner) {
			return;
		}

		owner.playNextSong();
	}

	public playPreviousSong() {
		let owner = this._owner.get();
		if (!owner) {
			return;
		}

		owner.playPreviousSong();
	}


	public static ObjCExposedMethods = {
		'pauseSong': { returns: interop.types.void },
		'resumeSong': { returns: interop.types.void },
		'playNextSong': { returns: interop.types.void },
		'playPreviousSong': { returns: interop.types.void }
	};

}