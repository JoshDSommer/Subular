import { Component, OnInit } from '@angular/core';
import { SubsonicService, IPlaylists } from '../../../subular-shared/index';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'playlist-list',
	templateUrl: 'playlist-list.component.html',
	styleUrls: ['playlist-list.component.css'],
})

export class PlaylistListComponent implements OnInit {
	playlists$: Observable<IPlaylists>;

	constructor(private subsonic: SubsonicService) {
		this.playlists$ = this.subsonic.getPlaylists();
	}

	ngOnInit() { }
}
