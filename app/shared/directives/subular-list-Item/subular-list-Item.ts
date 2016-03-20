import {Component, OnInit, OnChanges, Inject, Input  } from 'angular2/core';
import {ISong} from '../../models/song';
import {path} from '../folder-info';
import {PlayerService, IAudioPlayingInfo} from '../../services/player-service';
import {SubularMenuItem} from '../subular-item-menu/subular-item-menu';
import {SubularService} from './../../services/subular-service';
import * as $ from 'jquery';

@Component({
selector: 'subular-list-item',
templateUrl: path + 'subular-list-item/subular-list-item.html',
inputs: ['songs', 'nowPlayingSong', 'removeFromPlaylist', 'playlistId'],
directives: [SubularMenuItem],
styleUrls: [
	path + 'subular-list-item/subular-list-item.css',
	path + 'subular-list-item/subular-list-item-light.css',
	path + 'subular-list-item/subular-list-item-dark.css',
]
})

export class SubularListItem implements OnInit, OnChanges {
public songs: ISong[];
public nowPlayingSong: ISong;
public removeFromPlaylist: boolean;
public playlistId: number;
public playerService: PlayerService;
@Input('item-style') public style: string;
public darkStyle: boolean;

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
	if (this.style === 'dark') {
		this.darkStyle = true;
	} else {
		this.darkStyle = false;
	}
	console.log(this.style);
	// $.contextMenu({
	// 		selector: '.song-list-item',
	// 		callback: function(key, options) {
	// 			var m = "clicked: " + key;
	// 			window.console && console.log(m) || alert(m);
	// 		},
	// 		items: {
	// 			"edit": {name: "Edit", icon: "edit"},
	// 			"cut": {name: "Cut", icon: "cut"},
	// 			copy: {name: "Copy", icon: "copy"},
	// 			"paste": {name: "Paste", icon: "paste"},
	// 			"delete": {name: "Delete", icon: "delete"},
	// 			"sep1": "---------",
	// 			"quit": {name: "Quit", icon: function(){
	// 				return 'context-menu-icon context-menu-icon-quit';
	// 			}}
	// 		}
	// 	});
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