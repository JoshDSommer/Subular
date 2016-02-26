import {Component, ElementRef, Inject} from 'angular2/core';
import {SubularService} from './../shared/services/subular-service';
import {SettingsService} from './../shared/services/settings-service';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {Playlist} from './../shared/models/playlist';
import {Song} from './../shared/models/song';
import {AlbumList} from '../shared/directives/album-list/album-list'
import {PlayerService} from '../shared/services/player-service';
import {Router} from 'angular2/router';
import {SubularListItem} from '../shared/directives/subular-list-item/subular-list-item';

@Component({
	selector: 'playlists',
	templateUrl: 'app/playlists/playlists.html',
	providers: [SubularService, SettingsService],
	inputs: ['playlists', 'selectedplaylist', 'songs'],
	styles: [`
		.playlist-list{
			height:calc(100% - 115px);
			list-style-type: none;
			padding:5px 0px;
			overflow-y:auto;
			border-right:1px solid #BBB !important;
		}
		.playlist-list::-webkit-scrollbar {
				background: transparent !important;
		}
		.playlist-list-item{
			padding:5px 6px;
			border-bottom:1px solid #eee !important;
		}
		.playlist-list-item:hover{
			color:#fff;
			background-color:#9d9d9d;
		}
		.playlist-container{
			background-color: white;
			opacity: 0.85;
			height:calc(100% - 115px);
			overflow:auto;
		}
	`],
	directives: [AlbumList, SubularListItem]
})
export class Playlists {
	public playlists: Playlist[];
	public selectedplaylist: Playlist;
	public songs: Song[];

	constructor(private _dataService: SubularService, private playerService: PlayerService) {
		this.playlists = this._dataService.getPlaylists();
		this.songs = [];

		if (this.playlists != null && this.playlists.length > 0) {
			this.selectedplaylist = this.playlists[0];
			this.onSelect(this.selectedplaylist);
		}
	}

	onSelect(playlist: Playlist) {
		let playlistString;
		let playlistSongs;
		this._dataService.getPlaylist(playlist.id).subscribe(
			data => playlistString = this._dataService.cleanSubsonicResponse(data),
			error => console.log(error),
			() => {
				playlistSongs = <Song[]>JSON.parse(playlistString).subresp.playlist.entry;
				console.log(playlistSongs);
				this.songs = playlistSongs;
			}
		);
		this.selectedplaylist = playlist;
	}
	playPlaylist(): void {
		this.playerService.clearSongs();
		this.playerService.addSongs(this.songs);
		this.playerService.shuffleSongs();
		this.playerService.playSong();

		console.log("playArtist");
	}
}