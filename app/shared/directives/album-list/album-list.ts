import {Component, OnChanges, OnInit, Inject  } from 'angular2/core';
import {AlbumCard} from '../album-card/album-card';
import {SubularService} from '../../services/subular-service';
import {Album} from '../../models/album';
import {Artist} from '../../models/artist';
import {BgImageDirective} from '../subular-bg-from-img/subular-bg-from-img';
import {PlayerService} from '../../services/player-service';

@Component({
	selector: 'album-list',
	templateUrl: '/app/shared/directives/album-list/album-list.html',
	directives: [AlbumCard, BgImageDirective],
	inputs: ['albums', 'artist', 'playerService'],
	styles: [`
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
		}
		i.fa:hover{
			color:#9d9d9d !important;
		}
	`]
})

export class AlbumList implements OnChanges, OnInit {
	public artist: Artist = {
		id: 0,
		name: ''
	};
	public albums: Album[];
	public playerService: PlayerService;

	constructor(private _dataService: SubularService, @Inject(PlayerService) playerService: PlayerService) {
				this.playerService = playerService;
	}

	ngOnChanges(): void {
		if (this.artist != null) {
			this.albums = this._dataService.getAlbums(this.artist.id);
			document.body.setAttribute('style', '');

			this.getSongs();
		}
	}

	ngOnInit(): void {
		this.getSongs();
	}

	getSongs(): void {
		if (this.artist != null) {
			this._dataService.buildSongsListForArtist(this.artist.id);
		}
	}

	playArtist(): void {
		let songs = this._dataService.getSongs(this.artist.id);
		this.playerService.clearSongs();
		this.playerService.addSongs(songs);
		this.playerService.shuffleSongs();
		this.playerService.playSong();

		console.log("playArtist");
	}
}