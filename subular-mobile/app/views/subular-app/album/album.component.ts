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
import { DownloadQueueService } from '../../../services/downloadQueue.service';

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

	allSongsDownloaded = true;
	animateOptions = SLIDE_RIGHT_ANIMATION

	constructor(private route: ActivatedRoute,
		private router: Router,
		private subular: SubularMobileService,
		private playerService: PlayerService,
		private songStore: SongStoreService,
		private queue: DownloadQueueService) { }

	downloaded(song) {
		const localFile = fs.path.join(fs.knownFolders.documents().path, song.id.toString() + '.mp3');
		const fileExists = fs.File.exists(localFile);
		this.allSongsDownloaded = fileExists;
		return fileExists;
	}

	ngOnInit() {
		this.album$ = RouterResolverDataObservable<IAlbum>(this.route, this.router, 'album');
		this.songs$ = this.album$.switchMap(album => this.subular.getSongs(album.id))
			// this map is to filter out duplicates.
			.map(songs => songs.filter((song, index, self) => {
				return index === self.findIndex((previosSong) => {
					return previosSong.title === song.title && previosSong.track === song.track;
				});
			}))
			.switchMap(songs => this.songStore.addSongs(songs))
			.do(songs => this.listedSongs = songs);
	}

	selectSong($song: ISong) {
		this.playerService.clearSongs();

		this.playerService.addSongsAndPlaySong(this.listedSongs, $song);
	}

	playAndShuffle() {
		this.playerService.addSongs(this.listedSongs);
		this.playerService.shuffleSongs();
		this.playerService.playSong();
	}

	download(song: ISong) {
		this.queue.addSongToTheQueue(song);
	}

	downloadAllSongs() {
		this.listedSongs.forEach(song => {
			this.download(song)
		});
	}
	ngOnDestroy() {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
	}
}