import { Component, OnInit } from '@angular/core';
import { RouterResolverDataObservable, IAlbum, SubsonicService, ISong } from '../../../../subular-shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerService } from '../../../services/player.service';
import { MenuItem } from 'primeng/primeng';
import { HostBinding } from '@angular/core';

@Component({
	selector: 'album',
	templateUrl: 'album.component.html',
	styleUrls: ['album.component.css']
})

export class AlbumComponent implements OnInit {
	contextMenuItems: MenuItem[];
	nowPlayingSong$ = new Observable<ISong>();
	songs$: Observable<ISong[]>;
	album$: Observable<IAlbum>;

	dataTableSongs: ISong[] = [];

	private listedSongs: ISong[];

	@HostBinding('style.background-image')
	backgroundImage;

	constructor(private route: ActivatedRoute,
		private router: Router,
		private subsonic: SubsonicService,
		private playerService: PlayerService) { }

	ngOnInit() {
		this.album$ = RouterResolverDataObservable<IAlbum>(this.route, this.router, 'album')

		this.songs$ = this.album$.switchMap(album => this.subsonic.getSongs(album.id))
			.do(songs => this.listedSongs = songs)
			.do(songs => {
				this.getCoverArt(songs[0].id);
			});
		this.nowPlayingSong$ = this.playerService.nowPlaying$
			.filter(nowPlaying => !!nowPlaying && !!nowPlaying.song)
			.map(nowPlaying => nowPlaying.song);

		this.contextMenuItems = [{
			label: 'Coming soon...'
		}];
	}

	selectSong($song: ISong) {
		this.playerService.clearSongs();

		this.playerService.addSongsAndPlaySong(this.listedSongs, $song);
	}

	getCoverArt(id) {
		this.backgroundImage = `url(${this.subsonic.subsonicGetCoverUrl(id)})`;
	}
}
