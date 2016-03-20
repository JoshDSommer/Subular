import {Component, OnChanges, OnInit, Inject, ViewEncapsulation  } from 'angular2/core';
import {AlbumCard} from '../album-card/album-card';
import {SubularService} from '../../services/subular-service';
import {PlayerService} from '../../services/player-service';
import {IAlbum} from '../../models/album';
import {IArtist} from '../../models/artist';
import {path} from '../folder-info';
import {ISong} from '../../models/song';
import {SubularListItem} from '../subular-list-item/subular-list-item';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
	selector: 'album-list',
	templateUrl: path + 'album-list/album-list.html',
	directives: [AlbumCard, SubularListItem, ROUTER_DIRECTIVES],
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
	`],

})

export class AlbumList implements OnChanges, OnInit {
	public artist: IArtist = {
		id: 0,
		name: ''
	};
	public albums: IAlbum[];
	public playerService: PlayerService;
	public nowPlayingSong: ISong;
	private gotoClick: any;

	constructor(
		@Inject(SubularService) private dataService: SubularService,
		@Inject(PlayerService) playerService: PlayerService,
		@Inject(Router) private router: Router,
		@Inject(RouteParams) private routerParams: RouteParams
	) {
		this.playerService = playerService;
		this.nowPlayingSong = {};
	}



	ngOnChanges(): void {
		if (this.artist != null) {
			this.albums = this.dataService.getAlbums(this.artist.id);
			// this.songs = [];
			// this.getSongs();
		}
	}

	ngOnInit(): void {

		this.getSongs();
		document.body.setAttribute('style', '');

		this.playerService.playingSong.subscribe((song) => {
			this.nowPlayingSong = song;
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

		songs = this.dataService.getSongs(this.artist.name);

		this.playerService.clearSongs();
		this.playerService.addSongs(songs);
		this.playerService.shuffleSongs();
		this.playerService.playSong();
	}
}