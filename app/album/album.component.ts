import {Component, OnInit, Inject } from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {SubularService} from '../shared/services/subular-service';
import {PlayerService} from '../shared/services/player-service';
import {ISong} from '../shared/models/song';
import {ISubularItems, SubularListBoxService} from '../shared/directives/subular-list-box/subular-list-box.service';
import {SettingsService} from './../shared/services/settings-service';

import {IArtist} from './../shared/models/artist';
import {SubularListItem} from './../shared/directives/subular-list-item/subular-list-item';

@Component({
	selector: 'album',
	templateUrl: 'app/album/album.html',
	directives: [SubularListItem],
	styles: [`
		.album-song-list{
			height:calc(100% - 170px);
			overflow:auto;
		}
		img{
			margin:15px;
			float:left;
		}
		h2,h3{
			color:#fff;
			margin: 15px 0 10px;
		}
		.year{
			font-size:12px;
			margin:0 0 15px;
			font-weight:500;
		}
	`],
	styleUrls: ['app/shared/directives/subular-list-item/subular-list-item-light.css'],

})

export class AlbumComponent implements OnInit {
	public songs: ISong[];
	public artist: IArtist;
	public artists: IArtist[];
	public currentSong: ISong;
	constructor(
		@Inject(SubularService) private dataService: SubularService, @Inject(PlayerService) private playerService: PlayerService, @Inject(Router) private router: Router, @Inject(RouteParams) private routerParams: RouteParams
		, @Inject(SubularListBoxService) private subularService: SubularListBoxService, private settings: SettingsService
	) {
		this.songs = [];
	}

	ngOnInit() {
		//this.settings.defaultBackground();
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
		if (document.body.getAttribute('style') == null || document.body.getAttribute('style') == '') {
			this.settings.defaultBackground();
		}
	}

	imgUrl(id: number): string {
		let url = this.dataService.getCoverUrl(id);
		return url;
	}
}