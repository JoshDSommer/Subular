import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { PlayerService, PlayingStatus } from '../../services/player.service';
import { SubsonicService } from '../../../subular-shared/index';

@Component({
	selector: 'player',
	templateUrl: 'player.component.html',
	styleUrls: ['player.component.css'],
})

export class PlayerComponent implements OnInit {
	nowPlaying$;
	songList;
	playingStatus = PlayingStatus;

	@HostBinding('style.height')
	height = '0';

	constructor(private subsonic: SubsonicService, private playerService: PlayerService) {

	}

	ngOnInit() {
		this.nowPlaying$ = this.playerService.nowPlaying$.do(nowPlaying => {
			if(nowPlaying && nowPlaying.song){
				this.height = '90px';
			}
		});
		this.songList = this.playerService.songList;
	}

	nextSong(): void {
		this.playerService.playNextSong();
	}

	previousSong(): void {
		this.playerService.playPreviousSong();
	}

	pauseSong(): void {
		this.playerService.pauseSong();
	}

	playSong(): void {
		this.playerService.resumeSong();
	}
}
