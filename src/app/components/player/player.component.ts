import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SongListComponent } from '../songList/songList.component';
import { SubularService } from '../../services/subsonic.service';
import { PlayerService, IAudioPlayingInfo} from '../../services/player.service';
import { IArtist, IAlbum, ISong } from '../../shared/models';

@Component({
	selector: 'player',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.css']

})
export class PlayerComponent implements OnInit {
	@ViewChild('songList') songList: SongListComponent;

	public albums: IAlbum[];
	public imgUrl: string;
	public currentSong: ISong;
	public currentArtist: IArtist;
	public playing: boolean = false;
	private gutterProgress: Element;
	private songs: ISong[];
	public playingSongs: boolean = false;

	constructor(private subular: SubularService, private _elementRef:ElementRef, private player: PlayerService) {
		this.songs = [];
		this.currentSong = {
			id: 0,
			title: '',
			artist: '',
			parent: 0,
		};
	}
	nextSong(): void {
		this.player.playSong(this.player.currentIndex + 1);
		this.currentSong = this.player.currentSong();
		this.songs = this.player.songList;
		this.getImgUrl();
	}

	previousSong(): void {
		this.player.playSong(this.player.currentIndex - 1);
		this.currentSong = this.player.currentSong();
		this.getImgUrl();
	}

	pauseSong(): void {
		this.player.pauseSong();
	}

	playSong(): void {
		this.player.resumeSong();
	}
	ngOnChanges(changes): void {
		this.getImgUrl();
	}

	getImgUrl(): string {
		if (this.currentSong != null && this.currentSong.id != 0) {
			this.imgUrl ='';
		}
		return this.imgUrl;
	}

	ngOnInit(): void {
		this.gutterProgress = (<HTMLElement>this._elementRef.nativeElement).getElementsByClassName("gutter-progress")[0];

		// this.player.playingSong.subscribe((song) => {
		// 	if(song){
		// 		this.currentSong = song;
		// 		this.songs = this.player.songList;
		// 		this.getImgUrl();
		// 		this.subular.getArtist(this.currentSong.artistId).subscribe(artist=>this.currentArtist);
		// 	}
		// });

		// this.player.currentPosition.subscribe((info: IAudioPlayingInfo) => {
		// 	this.gutterProgress.setAttribute('style', 'width:' + info.position + '%;');
		// });

		// this.player.currentlyPlaying.subscribe((playing: boolean) => {
		// 	this.playing = playing;
		// });
	}
}