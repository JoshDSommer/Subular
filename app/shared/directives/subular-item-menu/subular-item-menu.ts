import {Component, ViewEncapsulation, OnInit, ElementRef, OnDestroy, APPLICATION_COMMON_PROVIDERS, Inject  } from 'angular2/core';
import {CORE_DIRECTIVES, COMMON_DIRECTIVES, FORM_BINDINGS, COMMON_PIPES, FORM_DIRECTIVES} from 'angular2/common';
import {path} from '../folder-info';
import {PlayerService} from '../../services/player-service';
import {SubularService} from './../../services/subular-service';
import {ISong} from '../../models/song';
import {IPlaylist} from '../../models/playlist';

@Component({
	selector: 'subular-item-menu',
	templateUrl: path + 'subular-item-menu/subular-item-menu.html',
	// styleUrls: ['./components/app/app.css'],
	encapsulation: ViewEncapsulation.None,
	inputs: ['showMenu', 'song', 'removeFromPlaylist', 'removeFromNowPlaying'],
	styles: [`
	.subular-item-menu{
	}
	i.fa{
		padding:0 5px;
	}
	i.fa:hover{
		opacity:0.65;
	}
	.ul-play-menu, .ul-play-menu-sub{
		padding: 10px 20px;
		z-index: 99;
		background-color: #fff;
		border: 1px solid #000;
		list-style-type: none;
		position: absolute;
		margin-left: -120;
	}
	.ul-play-menu-sub{
		margin-top: -30px;
	}
	.ul-play-menu li{
		padding:5px 6px;
		border-bottom:1px solid #eee !important;
		color:#010101;
	}
	.ul-play-menu li:hover{
	}
	`]
})

export class SubularMenuItem implements OnInit {
	public showMenu: boolean;
	public song: ISong;
	public playlists: IPlaylist[];
	public showPlaylists: boolean;
	public hideMenu: any;

	constructor( @Inject(ElementRef) private _elementRef: ElementRef, @Inject(SubularService) private dataService: SubularService, @Inject(PlayerService) private _playerService: PlayerService) {
		this.showMenu = false;
		this.showPlaylists = false;
		this.playlists = this.dataService.getPlaylists();

	}

	ngOnInit(): void {
		let el = <HTMLElement>this._elementRef.nativeElement;
		let menu = <HTMLElement>el.getElementsByClassName('ul-play-menu')[0];
		let subMenu = <HTMLElement>menu.getElementsByClassName('ul-play-menu-sub')[0];
		menu.addEventListener('mouseout', (event) => {
			let e = <HTMLElement>event.toElement || <HTMLElement>event.relatedTarget;
			if (e.parentNode === menu || e.parentNode === subMenu || e === menu) {
				clearTimeout(this.hideMenu);
				this.hideMenu = setTimeout(() => {
					this.showMenu = false;
					this.showPlaylists = false;
				}, 2700);
				return;
			}
			this.hideMenu = setTimeout(() => {
				this.showMenu = false;
				this.showPlaylists = false;
			}, 700);
		});
	}
	menuClick(): void {
		this.showMenu = !this.showMenu
		this.showMenu = true;
		this.hideMenu = setTimeout(() => {
			this.showMenu = false;
			this.showPlaylists = false;
		}, 1700);
	}

	playNext(): void {
		if (this._playerService.songList == null) {
			this._playerService.songList = [];
			this._playerService.songList.push(this.song);
		} else {
			this._playerService.songList.splice(this._playerService.currentIndex + 1, 0, this.song);
		}
		this.showMenu = false;
	}
	playNow(): void {
		if (this._playerService.songList == null) {
			this._playerService.songList = [];
			this._playerService.songList.push(this.song);
			this._playerService.playSong(0);
		} else {
			this._playerService.songList.splice(this._playerService.currentIndex + 1, 0, this.song);
			this._playerService.playSong(this._playerService.currentIndex + 1);
		}
		this.showMenu = false;
	}
	addToPlaylist(playlistId: number, songId: number): void {
		this.dataService.addSongToPlaylist(playlistId, songId);
		this.showMenu = false;
		this.showPlaylists = false;
	}

	createPlaylist(songId: number) {
		this.dataService.createNewPlaylist('New Playlist ', songId);
		this.showMenu = false;
		this.showPlaylists = false;
	}
}