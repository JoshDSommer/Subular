import {Component, OnInit, Inject } from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {SubularService} from '../shared/services/subular-service';
import {PlayerService} from '../shared/services/player-service';
import {ISong} from '../shared/models/song';
import {ISubularItems, SubularListBoxService} from '../shared/directives/subular-list-box/subular-list-box.service';

import {IArtist} from './../shared/models/artist';
import {SubularListItem} from './../shared/directives/subular-list-item/subular-list-item';

@Component({
	selector: 'album',
	templateUrl: 'app/album/album.html',
	directives: [SubularListItem]

})

export class AlbumComponent implements OnInit {
	public songs: ISong[];
	public artist: IArtist;
	public artists: IArtist[];
	public currentSong: ISong;
	constructor(
		@Inject(SubularService) private dataService: SubularService, @Inject(PlayerService) private playerService: PlayerService, @Inject(Router) private router: Router, @Inject(RouteParams) private routerParams: RouteParams
		, @Inject(SubularListBoxService) private subularService: SubularListBoxService
	) {
		this.songs = [];
	}

	ngOnInit() {
		this.artists = this.dataService.getArtists();
		this.subularService.setItems(this.artists);

		this.subularService.ItemSelectFunction = (artist: IArtist): any => {
			this.router.navigate(['ArtistAlbums', { id: artist.id }]);
		};

		if (this.routerParams.get('albumId') != null) {
			let albumId = +this.routerParams.get('albumId');
			this.songs = this.dataService.getSongsByArtistIdAlbumId(0, albumId);
		}
		if (this.routerParams.get('id') != null) {
			this.artist = this.artists.find((artist: IArtist) => {
				return artist.id.toString() === this.routerParams.get('id');
			});
			this.subularService.setSelectedItem(this.artist);
		}
		this.playerService.playingSong.subscribe((song) => {
			this.currentSong = song;
		});
	}

	imgUrl(id: number): string {
		let url = this.dataService.getCoverUrl(id);
		return url;
	}
}