import {Component, OnChanges, OnInit, ElementRef } from 'angular2/core';
import {SubularService} from './../../services/subular-service';
import {SettingsService} from './../../services/settings-service';
import {HTTP_PROVIDERS}  from 'angular2/http';
import {IAlbum} from './../../models/album';
import {PlayerService, IAudioPlayingInfo} from '../../services/player-service';
import {ISong} from '../../models/song';
import {SubularListItem} from '../subular-list-item/subular-list-item';
import {path} from '../folder-info';

@Component({
	selector: 'subular-player',
	templateUrl: path + 'subular-player/subular-player.html',
	providers: [SubularService, SettingsService],
	directives: [SubularListItem],
	inputs: ['imgUrl', 'albums', 'playerService', 'nowPlayingSong', 'time', 'song', 'playingSongs'],
	styles: [`
	.card-dark{
			background:rgb(34, 34, 34);
		}
	.playing-footer{
				position:fixed;
				width:100%;
				height:65px;
				bottom:0;
				background:#ffffff;
				border-top:1px #101010;
				box-shadow: 5px -1px 5px #888888;
			}
			i.fa{
				color: #101010;
				line-height: 60px !important;
				font-size: 46px !important;

			}
			div.ff-rw i, div.heart i{
				font-size: 28px !important;
				margin-right:15px;
			}

			.gutter{
				background-color:#101010;
				margin:0 !important;
				height:4px;
				padding:0;
			}
			.gutter-progress{
				background: -webkit-linear-gradient(#4B0082,#EED2EE);
				height:4px;
    			display: inline-block;
			}
			.title{
				width: 100%;
				display: inline-block;
				font-size: 20px;
				margin-top:5px;
			}
			.album{
				font-size: 13px;
				margin-left: 10px;
			}
			.artist{
				font-weight:700;
			}
			i.fa:hover{
				color:#9d9d9d;
			}
			#now-playing-list{
				position:absolute;
				bottom:75px;
				top:75px;
				right:30px;
				background-color:#fff;
				width:79%;
				overflow-y:auto;
				border-radius:2px;
				z-index: 99;
				padding:5px 0px 10px;
				border:1px #4B0082 solid;
			}
			#now-playing-list h3{
				padding:1px 15px;
			}
	`]
})
export class SubularPlayer implements OnChanges, OnInit {
	public albums: IAlbum[];
	public imgUrl: string;
	public playerService: PlayerService;
	public nowPlayingSong: ISong;
	public playing: boolean = false;
	private gutterProgress: Element;
	private songs: ISong[];
	public playingSongs: boolean = false;

	constructor(private _dataService: SubularService, private _elementRef: ElementRef) {
		this.imgUrl = this._dataService.getCoverUrl(19);
		this.albums = this._dataService.getAlbums(19);
		this.songs = [];
		this.nowPlayingSong = {
			id: 0,
			title: '',
			artist: '',
			parent: 0,
		};
	}
	nextSong(): void {
		this.playerService.playSong(this.playerService.currentIndex + 1);
		this.nowPlayingSong = this.playerService.currentSong();
		this.songs = this.playerService.songList;
	}

	previousSong(): void {
		this.playerService.playSong(this.playerService.currentIndex - 1);
		this.nowPlayingSong = this.playerService.currentSong();
	}

	pauseSong(): void {
		this.playerService.pauseSong();
	}

	playSong(): void {
		this.playerService.resumeSong();
	}
	ngOnChanges(changes): void {

	}

	ngOnInit(): void {
		this.gutterProgress = (<HTMLElement>this._elementRef.nativeElement).getElementsByClassName("gutter-progress")[0];

		this.playerService.playingSong.subscribe((song) => {
			this.nowPlayingSong = song;
			this.songs = this.playerService.songList;

		});

		this.playerService.currentPosition.subscribe((info: IAudioPlayingInfo) => {
			this.gutterProgress.setAttribute('style', 'width:' + info.position + '%;');
		});

		this.playerService.currentlyPlaying.subscribe((playing: boolean) => {
			this.playing = playing;
		});
	}
}
