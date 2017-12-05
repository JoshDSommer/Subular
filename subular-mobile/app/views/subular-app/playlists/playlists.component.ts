import { Component, OnInit } from '@angular/core';
import { SubularMobileService } from '../../../services';
import { IPlaylists, IPlaylist } from 'subular';
import { Observable } from 'rxjs/Observable';

@Component({
	moduleId: module.id,
	selector: 'playlists',
	templateUrl: './playlists.component.html',
	styleUrls: ['./playlists.component.css']
})

export class PlaylistsComponent implements OnInit {
	playlists$: Observable<IPlaylists>;

	constructor(private subular: SubularMobileService) { }

	ngOnInit() {
		this.playlists$ = this.subular.getPlaylists()
			.map(playlists => [{ id: 0, name: 'Favorites' } as IPlaylist, ...playlists]);
	}
}

