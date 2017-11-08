import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
	imgUrl;

	constructor(private subsonic: SubsonicService, private playerService: PlayerService) {

	}

	ngOnInit() {
		this.nowPlaying$ = this.playerService.nowPlaying$.do(nowPlaying => {
			if (nowPlaying) {
				this.imgUrl = this.subsonic.subsonicGetCoverUrl(nowPlaying.song.id);
			}
		});
		this.songList = this.playerService.songList;
	}

	nextSong(): void {
		// this.playerService.playSong(this.playerService.currentIndex + 1);
		// this.currentSong = this.playerService.currentSong();
		// this.songs = this.playerService.songList;
		// this.getImgUrl();
	}

	previousSong(): void {
		// this.playerService.playSong(this.playerService.currentIndex - 1);
		// this.currentSong = this.playerService.currentSong();
		// this.getImgUrl();
	}

	pauseSong(): void {
		this.playerService.pauseSong();
	}

	playSong(): void {
		this.playerService.resumeSong();
	}
}
