import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { SubsonicService, IAlbum } from '../../../subular-shared/index';

@Component({
	selector: 'album-card',
	templateUrl: 'album-card.component.html',
	styleUrls: ['album-card.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class AlbumCardComponent implements OnInit {
	@Input() album: IAlbum;

	getCoverUrl(coverArt) {
		if (coverArt)
			return this.subsonic.subsonicGetCoverUrl(coverArt);
	}

	constructor(private subsonic: SubsonicService) {

	}
	ngOnInit() { }
}