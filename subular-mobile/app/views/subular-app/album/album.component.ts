import { Component, OnInit } from '@angular/core';
import { IAlbum, SubsonicService, RouterResolverDataObservable, ISong, SongStoreService } from 'subular';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
	moduleId: module.id,
	selector: 'album',
	templateUrl: './album.component.html',
	styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit {
	songs$: Observable<ISong[]>;
	listedSongs: {};
	album$: Observable<IAlbum>;
	albums: IAlbum;

	constructor(private route: ActivatedRoute,
		private router: Router,
		private subsonic: SubsonicService,
		// private playerService: PlayerService,
		private songStore: SongStoreService) { }

	ngOnInit() {
		this.album$ = RouterResolverDataObservable<IAlbum>(this.route, this.router, 'album')
			.do(album => {
				// this.getCoverArt(songs[0].id);
			});
		// this.songs$ =
		this.album$.switchMap(album => this.subsonic.getSongs(album.id))
			// this map is to filter out duplicates.
			.map(songs => songs.filter((song, index, self) => {
				return index === self.findIndex((previosSong) => {
					return previosSong.title === song.title && previosSong.track === song.track;
				});
			}))

			.switchMap(songs => this.songStore.addSongs(songs))

		// 	.do(songs => this.listedSongs = songs);
		// this.nowPlayingSong$ = this.playerService.nowPlaying$
		// .filter(nowPlaying => !!nowPlaying && !!nowPlaying.song)
		// .map(nowPlaying => nowPlaying.song);


	}
}