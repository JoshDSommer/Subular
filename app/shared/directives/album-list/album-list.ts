import {Component, OnChanges, OnInit, Inject  } from 'angular2/core';
import {AlbumCard} from '../album-card/album-card';
import {SubularService} from '../../services/subular-service';
import {Album} from '../../models/album';
import {Artist} from '../../models/artist';
import {BgImageDirective} from '../subular-bg-from-img/subular-bg-from-img';
import {PlayerService} from '../../services/player-service';
import {path} from '../folder-info';
import {Song} from '../../models/song';
import {SubularListItem} from '../subular-list-item/subular-list-item';

@Component({
	selector: 'album-list',
	templateUrl: path + 'album-list/album-list.html',
	directives: [AlbumCard, BgImageDirective, SubularListItem],
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
	`]
})

export class AlbumList implements OnChanges, OnInit {
	public artist: Artist = {
		id: 0,
		name: ''
	};
	public albums: Album[];
	public playerService: PlayerService;
	public songs: Song[];
	public nowPlayingSong: Song;

	constructor( @Inject(SubularService) private _dataService: SubularService, @Inject(PlayerService) playerService: PlayerService) {
		this.playerService = playerService;
		this.songs = [];
		this.nowPlayingSong = {};
	}

	imgUrl(id: number): string {
		let url = this._dataService.getCoverUrl(id);
		return url;
	}

	ngOnChanges(): void {
		if (this.artist != null) {
			this.albums = this._dataService.getAlbums(this.artist.id);
			document.body.setAttribute('style', '');
			this.songs = [];
			this.getSongs();
		}
	}

	ngOnInit(): void {
		this.getSongs();

		this.playerService.playingSong.subscribe((song) => {
			this.nowPlayingSong = song;
		});
	}

	getSongs(): void {
		if (this.artist != null) {
			this._dataService.buildSongsListForArtist(this.artist.id);
		}
	}
	getAlbumSongs(album: Album): void {
		console.log(album);
		this.songs = this._dataService.getSongsByArtistIdAlbumId(album.parent, album.id);
	}

	playArtist(): void {
		let songs;
		if (this.songs.length == 0) {
			songs = this._dataService.getSongs(this.artist.id);
		} else {
			songs = this.songs;
		}

		this.playerService.clearSongs();
		this.playerService.addSongs(songs);
		this.playerService.shuffleSongs();
		this.playerService.playSong();

		console.log("playArtist");
	}
}