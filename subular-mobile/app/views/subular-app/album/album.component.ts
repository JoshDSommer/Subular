import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { IAlbum, RouterResolverDataObservable, ISong, SongStoreService, SongState } from 'subular';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { SLIDE_RIGHT_ANIMATION, SPIN_ANIMATION } from '../../../animations/animations';
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

	allSongsDownloaded = false;
	animateOptions = SLIDE_RIGHT_ANIMATION
	SongState = SongState;
	animateSpin = SPIN_ANIMATION;

	constructor(private route: ActivatedRoute,
		private router: Router,
		private subular: SubularMobileService,
		private playerService: PlayerService,
		private songStore: SongStoreService,
		private queue: DownloadQueueService,
		private zone: NgZone) { }


	ngOnInit() {
		this.album$ = RouterResolverDataObservable<IAlbum>(this.route, this.router, 'album');
		this.songs$ = this.album$.switchMap(album => this.subular.getSongs(album.id))
			// this map is to filter out duplicates.
			.map(songs => songs.filter((song, index, self) => {
				return index === self.findIndex((previosSong) => {
					return previosSong.title === song.title && previosSong.track === song.track;
				});
			})).
			map(songs => {
				return songs.map(song => {
					const downloaded = this.downloaded(song);
					if (downloaded) {
						song = Object.assign({}, song, { state: SongState.downloaded }) as ISong;
					}
					return song;
				});
			})
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

	downloaded(song) {
		const localFile = fs.path.join(fs.knownFolders.documents().path, song.id.toString() + '.mp3');
		const fileExists = fs.File.exists(localFile);
		this.allSongsDownloaded = fileExists;
		return fileExists;
	}

	download(song: ISong) {
		const onComplete = () => {
			this.zone.run(() => {
				let updatedSong = song;
				updatedSong = Object.assign({}, updatedSong, { state: SongState.downloaded }) as ISong;
				this.songStore.updateSong(updatedSong);
			});
		}
		this.queue.addSongToTheQueue({ song, onComplete });
		song = Object.assign({}, song, { state: SongState.downloading }) as ISong;
		this.songStore.updateSong(song);
	}

	downloadAllSongs() {
		this.listedSongs.forEach(song => {
			this.download(song)
		});
		this.allSongsDownloaded = true;
	}
	ngOnDestroy() {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
	}
}