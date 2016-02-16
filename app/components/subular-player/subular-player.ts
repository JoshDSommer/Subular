import {Component, OnChanges, OnInit, ElementRef } from 'angular2/core';
import {SubularService} from './../../services/subular-service';
import {SettingsService} from './../../services/settings-service';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {Album} from './../../models/album';
import {PlayerService, IAudioPlayingInfo} from '../../services/player-service';
import {Song} from '../../models/song';

@Component({
    selector: 'subular-player',
    templateUrl: '/app/components/subular-player/subular-player.html',
	providers: [SubularService, SettingsService],
	inputs: ['imgUrl', 'albums', 'playerService', 'nowPlayingSong', 'time'],
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
	`]
})
export class SubularPlayer implements OnChanges, OnInit {
	public albums: Album[];
	public imgUrl: string;
	public playerService: PlayerService;
	public nowPlayingSong: Song;
	public playing: boolean = false;
	private gutterProgress: Element;

	constructor(private _dataService: SubularService, private _elementRef: ElementRef) {
		this.imgUrl = this._dataService.getCoverUrl(19);
		this.albums = this._dataService.getAlbums(19);
		this.nowPlayingSong = {
			id: 0,
			title: '',
			artist: '',
			parent: 0,
		}
	}
	nextSong(): void {
		this.playerService.playSong(this.playerService.currentIndex + 1);
		this.nowPlayingSong = this.playerService.currentSong();
	}

	previousSong(): void {
		this.playerService.playSong(this.playerService.currentIndex - 1);
		this.nowPlayingSong = this.playerService.currentSong();
	}

	pauseSong(): void {
		console.log('pause songs');
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
		});

		this.playerService.currentPosition.subscribe((info: IAudioPlayingInfo) => {
			this.gutterProgress.setAttribute('style', 'width:' + info.position + '%;');
		});

		this.playerService.currentlyPlaying.subscribe((playing: boolean) => {
			this.playing = playing;
		});
	}

}
