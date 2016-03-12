import {Component, OnChanges, OnInit, Inject  } from 'angular2/core';
import {AlbumCard} from '../album-card/album-card';
import {SubularService} from '../../services/subular-service';
import {IAlbum} from '../../models/album';
import {IArtist} from '../../models/artist';
import {BgImageDirective} from '../subular-bg-from-img/subular-bg-from-img';
import {PlayerService} from '../../services/player-service';
import {path} from '../folder-info';
import {ISong} from '../../models/song';
import {SubularListItem} from '../subular-list-item/subular-list-item';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
	selector: 'album-list',
	templateUrl: path + 'album-list/album-list.html',
	directives: [AlbumCard, BgImageDirective, SubularListItem, ROUTER_DIRECTIVES],
	inputs: ['albums', 'artist', 'playerService', 'songs'],
	styles: [`
		album-card{
			cursor:hand;
		}
		.album-list{
			height:calc(100% - 180px);
			overflow-y:auto;
			padding-left:5px;
		}
		.album-list::-webkit-scrollbar {
					background: transparent !important;
		}
		.album-list::-webkit-scrollbar {
			background: transparent !important;
		}
		h2{
			padding:0 25px;
			margin-bottom: 0;
		}
		i.fa:hover{
			color:#9d9d9d !important;
		}
		.album-song-list{
			background-color: white;
			opacity: 0.85;
			height:calc(100% - 170px);
			overflow:auto;
		}
		#album-list-artist a{
			color:inherit;
		}
		h2{
			color:#fff;
		}
	`]
})

export class AlbumList implements OnChanges, OnInit {
	public artist: IArtist = {
		id: 0,
		name: ''
	};
	public albums: IAlbum[];
	public playerService: PlayerService;
	public songs: ISong[];
	public nowPlayingSong: ISong;
	private gotoClick: any;

	constructor(
		@Inject(SubularService) private dataService: SubularService,
		@Inject(PlayerService) playerService: PlayerService,
		@Inject(Router) private router: Router,
		@Inject(RouteParams) private routerParams: RouteParams
	) {
		this.playerService = playerService;
		this.songs = [];
		this.nowPlayingSong = {};

	}

	imgUrl(id: number): string {
		let url = this.dataService.getCoverUrl(id);
		return url;
	}

	ngOnChanges(): void {
		if (this.artist != null) {
			this.albums = this.dataService.getAlbums(this.artist.id);
			// this.songs = [];
			// this.getSongs();
		}
	}

	ngOnInit(): void {
		if (this.routerParams.get('albumId') != null) {
			let albumId = +this.routerParams.get('albumId');
			this.songs = this.dataService.getSongsByArtistIdAlbumId(0, albumId);
		} else {
			this.getSongs();
			document.body.setAttribute('style', '');
			this.songs = [];
		}
		this.playerService.playingSong.subscribe((song) => {
			this.nowPlayingSong = song;
			console.log('album-list' + this.nowPlayingSong.title);
		});
	}

	getSongs(): void {
		if (this.artist != null) {
			let artistSongs = this.dataService.getSongs(this.artist.name);
			if (artistSongs.length === 0)
				this.dataService.buildSongsListForArtist(this.artist.id);
		}
	}
	getAlbumSongs(album: IAlbum): void {
		this.router.navigate(['ArtistAlbum', { id: this.artist.id, albumId: album.id }]);
	}

	playArtist(): void {
		let songs;
		if (this.songs.length == 0) {
			songs = this.dataService.getSongs(this.artist.name);
		} else {
			songs = this.songs;
		}

		this.playerService.clearSongs();
		this.playerService.addSongs(songs);
		this.playerService.shuffleSongs();
		this.playerService.playSong();
	}
}