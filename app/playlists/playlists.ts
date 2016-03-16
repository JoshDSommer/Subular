import {Component, ElementRef, Inject, OnInit, NgZone} from 'angular2/core';
import {SubularService} from './../shared/services/subular-service';
import {SettingsService} from './../shared/services/settings-service';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {IPlaylist} from './../shared/models/playlist';
import {ISong} from './../shared/models/song';
import {IAlbum} from './../shared/models/album';
import {AlbumList} from '../shared/directives/album-list/album-list'
import {PlayerService} from '../shared/services/player-service';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {SubularListItem} from '../shared/directives/subular-list-item/subular-list-item';
import {ISubularItems, SubularListBoxService} from '../shared/directives/subular-list-box/subular-list-box.service';
import * as _ from 'lodash';

@Component({
	selector: 'playlists',
	templateUrl: 'app/playlists/playlists.html',
	inputs: ['playlists', 'selectedplaylist', 'songs'],
	styles: [`
		h2{
			color:#fff;
			width:95%;
		},
		subular-list-item {
		}
		.album-images{
			height:45px;
		}
	`],
	directives: [AlbumList, SubularListItem, ROUTER_DIRECTIVES]
})
export class Playlists implements OnInit {
	public playlists: IPlaylist[];
	public selectedplaylist: IPlaylist;
	public songs: ISong[];
	private albums: ISong[];
	public currentSong: ISong;

	constructor(private dataService: SubularService, private playerService: PlayerService,
		@Inject(Router) private router: Router,
		@Inject(RouteParams) private routerParams: RouteParams,
		@Inject(SubularListBoxService) private subularService: SubularListBoxService,
		private settings: SettingsService) {

		this.playlists = this.dataService.getPlaylists();
		this.songs = [];

		if (this.routerParams.get('id') == null) {
			subularService.setItems(this.playlists);
			subularService.ItemSelectFunction = (playlist: IPlaylist): any => {
				this.router.navigate(['Playlist', { id: playlist.id }]);
			};
			this.router.navigate(['Playlist', { id: this.playlists[0].id }]);
		}

		this.settings.defaultBackground();
	}
	getCover(albumId: number): string {
		return this.dataService.getCoverUrl(albumId);
	}

	ngOnInit(): void {
		if (this.routerParams.get('id') != null) {
			let albumId = +this.routerParams.get('id');
			this.selectedPlaylist(albumId);
		}
		this.playerService.playingSong.subscribe((song) => {
			this.currentSong = song;
		});
	}

	selectedPlaylist(playlistId: number) {
		let playlistString;
		let playlistSongs;
		this.songs = [];
		this.albums = [];
		this.dataService.getPlaylist(playlistId).subscribe(
			data => playlistString = this.dataService.cleanSubsonicResponse(data),
			error => console.log(error),
			() => {

				playlistSongs = <ISong[]>JSON.parse(playlistString).subresp.playlist.entry;
				this.songs = playlistSongs;
				_.forEach(this.songs, (song: ISong) => {
					let albumSong = this.albums.filter((albumSong: ISong) => {
						return albumSong.parent === song.parent;
					});
					if (albumSong.length == 0) {
						this.albums.push(song);
					}
				});
			}
		);
		this.selectedplaylist = this.dataService.getPlaylists().filter((playlist: IPlaylist) => {
			return playlist.id == playlistId;
		})[0];

	}
	playPlaylist(): void {
		this.playerService.clearSongs();
		this.playerService.addSongs(this.songs);
		this.playerService.shuffleSongs();
		this.playerService.playSong();
	}
}