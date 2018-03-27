import { Component, OnInit } from '@angular/core';
import { SubularMobileService } from '../../../services';
import { Observable } from 'rxjs/Observable';
import { IPlaylists, IPlaylist } from 'subular';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
	moduleId: module.id,
	selector: 'add-to-playlist',
	templateUrl: './add-to-playlist.component.html',
	styleUrls: ['./add-to-playlist.component.css']
})
export class AddToPlaylistComponent implements OnInit {
	playlists$: Observable<IPlaylists>;

	constructor(private subular: SubularMobileService, private route: ActivatedRoute, private nsRouter : RouterExtensions) { }

	ngOnInit() {
		this.playlists$ = this.subular.getPlaylists()
			.map(playlists => [{ id: 0, name: 'Favorites' } as IPlaylist, ...playlists])
	}

	getCoverArt(playlist: IPlaylist) {
		return this.subular.subsonicGetPlaylistCoverUrl(playlist);
	}

	addToPlaylist(playlist: IPlaylist) {
		this.route.params
			.map(params => params['songId'])
			.do(console.log)
			.switchMap(songId => {
				return this.subular.addToPlaylist({ id: songId } as any, playlist.id);
			})
			.subscribe(() => {
				this.nsRouter.back();
			});
	}
}