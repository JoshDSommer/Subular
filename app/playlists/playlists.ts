import {Component, ElementRef, Inject, OnInit } from 'angular2/core';
import {SubularService} from './../shared/services/subular-service';
import {SettingsService} from './../shared/services/settings-service';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {IPlaylist} from './../shared/models/playlist';
import {ISong} from './../shared/models/song';
import {AlbumList} from '../shared/directives/album-list/album-list'
import {PlayerService} from '../shared/services/player-service';
import {SubularListItem} from '../shared/directives/subular-list-item/subular-list-item';
import {ISubularItems, SubularListBoxService} from '../shared/directives/subular-list-box/subular-list-box.service';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
	selector: 'playlists',
	templateUrl: 'app/playlists/playlists.html',
	inputs: ['playlists', 'selectedplaylist', 'songs'],
	styles: [`
		.playlist-list{
			height:calc(100% - 115px);
			list-style-type: none;
			padding:5px 0px;
			overflow-y:auto;
			border-right:1px solid #BBB !important;
		}
		.playlist-list::-webkit-scrollbar {
				background: transparent !important;
		}
		.playlist-list-item{
			padding:5px 6px;
			border-bottom:1px solid #eee !important;
		}
		.playlist-list-item:hover{
			color:#fff;
			background-color:#9d9d9d;
		}
		.playlist-container{
			background-color: white;
			opacity: 0.85;
			height:calc(100% - 115px);
			overflow:auto;
		}
	`],
	directives: [AlbumList, SubularListItem]
})
export class Playlists implements OnInit {
	public playlists: IPlaylist[];
	public selectedplaylist: IPlaylist;
	public songs: ISong[];
	private subularService: SubularListBoxService;

	constructor(private dataService: SubularService, private playerService: PlayerService,
		@Inject(Router) private router: Router,
		@Inject(RouteParams) private routerParams: RouteParams,
		@Inject(SubularListBoxService) subularService: SubularListBoxService) {

		this.subularService = subularService;
		this.playlists = this.dataService.getPlaylists();
		this.songs = [];
		subularService.setItems(this.playlists);
		subularService.ItemSelectFunction = (playlist: IPlaylist): any => {
			this.router.navigate(['Playlist', { id: playlist.id }]);
		};

		if (this.playlists != null && this.playlists.length > 0) {
			this.selectedplaylist = this.playlists[0];
			this.onSelect(this.selectedplaylist);
		}
	}

	ngOnInit(): void {
		// if (this.routerParams.get('id') != null) {
		// 	let playlistString;
		// 	let playlistSongs;
		// 	this.dataService.getPlaylist(+this.routerParams.get('id')).subscribe(
		// 		data => playlistString = this.dataService.cleanSubsonicResponse(data),
		// 		error => console.log(error),
		// 		() => {
		// 			playlistSongs = <ISong[]>JSON.parse(playlistString).subresp.playlist.entry;
		// 			console.log(playlistSongs);
		// 			this.songs = playlistSongs;
		// 		}
		// 	);
		// }
	}

	onSelect(playlist: IPlaylist) {

	}
	playPlaylist(): void {
		this.playerService.clearSongs();
		this.playerService.addSongs(this.songs);
		this.playerService.shuffleSongs();
		this.playerService.playSong();
	}
}