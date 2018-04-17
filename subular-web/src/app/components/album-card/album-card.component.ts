import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { SubsonicService, IAlbum } from '../../../subular-shared/index';
import { PlayerService } from '../../services/player.service';

@Component({
	selector: 'album-card',
	templateUrl: 'album-card.component.html',
	styleUrls: ['album-card.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class AlbumCardComponent implements OnInit {
	@Input() album: IAlbum;
	@Input() routerLink: string;

	getCoverUrl(coverArt) {
		if (coverArt) {
			return this.subsonic.subsonicGetCoverUrl(coverArt);
		}
	}

	constructor(private subsonic: SubsonicService, private playerService: PlayerService) {

	}
	ngOnInit() {

	}

	playAlbum(id) {
		this.subsonic.getSongs(id).subscribe(songs => {
			this.playerService.clearSongs();
			this.playerService.addSongs(songs);
			this.playerService.playSong();
		});
	}
}
