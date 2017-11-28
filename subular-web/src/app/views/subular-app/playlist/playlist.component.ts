import { Component, OnInit } from '@angular/core';
import { RouterResolverDataObservable, IPlaylist, SubsonicService, ISong } from '../../../../subular-shared';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerService } from '../../../services/player.service';
import { MenuItem } from 'primeng/primeng';
import { HostBinding } from '@angular/core';
import { SongStoreService } from '../../../../subular-shared';

@Component({
	selector: 'playlist',
	templateUrl: 'playlist.component.html',
	styleUrls: ['playlist.component.css']
})

export class PlaylistComponent implements OnInit {
	playlistId$: Observable<any>;
	contextMenuItems: MenuItem[];
	nowPlayingSong$ = new Observable<ISong>();
	songs$: Observable<ISong[]>;
	playlist$: Observable<IPlaylist>;

	dataTableSongs: ISong[] = [];

	private listedSongs: ISong[];

	@HostBinding('style.background-image')
	backgroundImage;

	constructor(private route: ActivatedRoute,
		private router: Router,
		private subsonic: SubsonicService,
		private playerService: PlayerService,
		private songStore: SongStoreService) { }

	ngOnInit() {
		this.playlistId$ = this.router.events
			.filter(value => value instanceof NavigationEnd)
			.map(() => this.route.snapshot.params['playlistId'])
			.startWith(this.route.snapshot.params['playlistId']);

		this.playlist$ = this.playlistId$
			.switchMap(playlistId => this.subsonic
				.getPlaylist(playlistId))
			.do(playlist => this.listedSongs = playlist.entry);


		this.nowPlayingSong$ = this.playerService.nowPlaying$
			.filter(nowPlaying => !!nowPlaying && !!nowPlaying.song)
			.map(nowPlaying => nowPlaying.song);

		this.contextMenuItems = [{
			label: 'Coming soon...'
		}];
	}

	selectSong($song: ISong) {

		console.log($song, this.listedSongs, this.listedSongs.indexOf($song));
		this.playerService.clearSongs();

		this.playerService.addSongsAndPlaySong(this.listedSongs, $song);
	}

	getCoverArt(coverArt) {
		return this.subsonic.subsonicGetCoverUrl(coverArt); // `url(${})`;
	}
}
