import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IAlbum, RouterResolverDataObservable, ISong, SongStoreService } from 'subular';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { SLIDE_RIGHT_ANIMATION } from '../../../animations/animations';
import { PlayerService } from '../../../services/player.service';
import { SubularMobileService } from '../../../services/subularMobile.service';
import { ios } from 'utils/utils';
import * as fs from "file-system";

@Component({
	moduleId: module.id,
	selector: 'album',
	templateUrl: './album.component.html',
	styleUrls: ['./album.component.css'],
})

export class AlbumComponent implements OnInit {
	songSubscription: Subscription;
	songs$: Observable<ISong[]>;
	listedSongs = [];
	album$: Observable<IAlbum>;
	albums: IAlbum;

	animateOptions = SLIDE_RIGHT_ANIMATION

	constructor(private route: ActivatedRoute,
		private router: Router,
		private subular: SubularMobileService,
		private playerService: PlayerService,
		private songStore: SongStoreService) { }

	downloaded(song) {
		const localFile = fs.path.join(fs.knownFolders.documents().path, song.id.toString() + '.mp3');
		const streamUrl = this.subular.getStreamUrl(song.id);
		let url;

		return fs.File.exists(localFile);
	}

	ngOnInit() {
		this.album$ = RouterResolverDataObservable<IAlbum>(this.route, this.router, 'album');
		// this.songs$ =
		this.songs$ = this.album$.switchMap(album => this.subular.getSongs(album.id))
			// this map is to filter out duplicates.
			.map(songs => songs.filter((song, index, self) => {
				return index === self.findIndex((previosSong) => {
					return previosSong.title === song.title && previosSong.track === song.track;
				});
			}))
			.switchMap(songs => this.songStore.addSongs(songs))
			.do(songs => this.listedSongs = songs);
		// 	.do(songs => this.listedSongs = songs);
		// this.nowPlayingSong$ = this.playerService.nowPlaying$
		// .filter(nowPlaying => !!nowPlaying && !!nowPlaying.song)
		// .map(nowPlaying => nowPlaying.song);

	}

	selectSong($song: ISong) {
		this.playerService.clearSongs();

		this.playerService.addSongsAndPlaySong(this.listedSongs, $song);
	}

	download(song: ISong) {
		this.subular.downloadSong(song).subscribe(console.log);
	}
	ngOnDestroy() {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
	}
}