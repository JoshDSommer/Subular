import {Component, OnInit, OnChanges, Inject } from 'angular2/core';
import {ISong} from '../../models/song';
import {path} from '../folder-info';
import {PlayerService, IAudioPlayingInfo} from '../../services/player-service';
import {SubularMenuItem} from '../subular-item-menu/subular-item-menu';
import {SubularService} from './../../services/subular-service';

@Component({
	selector: 'subular-list-item',
	templateUrl: path + 'subular-list-item/subular-list-item.html',
	inputs: ['songs', 'number', 'nowPlayingSong', 'removeFromPlaylist', 'playlistId'],
	directives: [SubularMenuItem],
	styleUrls: [path + 'subular-list-item/subular-list-item.css'],
})

export class SubularListItem implements OnInit, OnChanges {
	public songs: ISong[];
	public nowPlayingSong: ISong;
	public removeFromPlaylist: boolean;
	public playlistId: number;
	public playerService: PlayerService;

	constructor( @Inject(PlayerService) playerService: PlayerService, @Inject(SubularService) private dataService: SubularService) {
		this.playerService = playerService;
		this.nowPlayingSong = {
			id: 0,
			title: '',
			artist: '',
			parent: 0,
		};

	}

	ngOnInit(): void {
	}

	ngOnChanges(): void {
		let songs = this.songs;
		this.songs = [];
		this.songs = songs;
	}

	rowNum(index: number): number {
		return index + 1;
	}
	formatDuration(duration: number): string {
		let min = Math.floor(duration / 60);
		let seconds = duration - min * 60;
		let returnTime: string = min + ':' + (seconds <= 9 ? '0' + seconds : seconds);
		return returnTime;
	}

	playSongFromList(index: number): void {
		this.playerService.songList = this.songs;
		this.playerService.playSong(index);
	}

	removeSong(playlistId: number, songId: number) {
		let songIndex = this.songs.map((val: ISong) => { return val.id; }).indexOf(songId);
		this.dataService.removeSongFromPlaylist(playlistId, songId);
		this.songs.splice(songIndex, 1);
	}
}