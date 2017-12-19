import { FactoryProvider, NgZone } from '@angular/core';
import { ios } from 'application';
import { PlayerServiceIos } from './player.service.ios';
import { PlayerServiceAndroid } from './player.service.android';
import { SubsonicService, ISong } from 'subular';
import { Observable } from 'rxjs/Observable';


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

export abstract class PlayerService {
	nowPlaying$: Observable<any>;
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

export const PLAYER_SERVICE: FactoryProvider = {
	provide: PlayerService,
	useFactory: getPlayerService,
	deps: [NgZone, SubsonicService]
};

export function getPlayerService(ngZone, subsonic) {
	// console.log('loading player service....')

	// if (ios) {
	// 	return new PlayerServiceIos(subsonic, ngZone);
	// } else {
		return new PlayerServiceAndroid(subsonic, ngZone);
	// }
}