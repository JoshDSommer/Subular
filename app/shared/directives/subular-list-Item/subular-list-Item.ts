import {Component, OnInit, OnChanges} from 'angular2/core';
import {Song} from '../../models/song';
import {path} from '../folder-info';
import {PlayerService, IAudioPlayingInfo} from '../../services/player-service';
import {SubularMenuItem} from '../subular-item-menu/subular-item-menu';

@Component({
	selector: 'subular-list-item',
	templateUrl: path + 'subular-list-item/subular-list-item.html',
	inputs: ['songs', 'number', 'nowPlayingSong'],
	directives: [SubularMenuItem],
	styles: [`
			td{
				font-size:14px;
				line-height:22px;
			}

			table{
				width:98%;
				margin:0 auto;
				position:relative;
			}
			.row-artist{
				padding:0 10px;
			}
			.row-song{
				max-width:45%;
				overflow:hidden;
			}
			.row-track{
				width: 19px;
			}
			.row-num{
				padding-right:5px;
			}
			tr{
				border-bottom: 1px #efefef solid;
				cursor:hand;
			}
			td, th{
				overflow:hidden;
				padding:0 5px;
			}
			tr td:first-child{
				padding-left:10px;
			}
			tr td:last-child{
				padding-right:10px;
			}
			tr:hover{
				color:#fff;
				background-color:#9d9d9d;
			}
			.rowPlaying{
				background: -webkit-linear-gradient(#4B0082,#4B0082);
				font-weight:700;
				color:#fff;
			}`],
})
export class SubularListItem implements OnInit, OnChanges {
	public songs: Song[];
	public nowPlayingSong: Song;
	constructor(private playerService: PlayerService) {
		this.nowPlayingSong = {
			id: 0,
			title: '',
			artist: '',
			parent: 0,
		}
	}

	ngOnInit(): void {
		this.playerService.playingSong.subscribe((song) => {
			this.nowPlayingSong = song;
		});
	}

	ngOnChanges(): void {
		console.log(this.songs);
	}

	rowNum(index: number): number {
		return index + 1;
	}

	playSongFromList(index: number): void {
		this.playerService.songList = this.songs;
		this.playerService.playSong(index);
	}
}