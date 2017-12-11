import { Component, OnInit, NgZone } from '@angular/core';
import { SubularMobileService } from '../../../services';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { IPlaylist, SongStoreService, ISong, SongState } from 'subular';
import { Observable } from 'rxjs/Observable';
import { SLIDE_RIGHT_ANIMATION } from '../../../animations/animations';
import { PlayerService } from '../../../services/player.service';
import { ios } from 'utils/utils';
import * as fs from "file-system";
import { DownloadQueueService } from '../../../services/downloadQueue.service';
import { CurrentConnectionService, ConnectionType } from '../../../services/currentConnection.service';

@Component({
	moduleId: module.id,
	selector: 'playlist',
	templateUrl: './playlist.component.html',
	styleUrls: ['./playlist.component.css']
})

export class PlaylistComponent implements OnInit {
	connection$: Observable<ConnectionType>;
	songs$: Observable<ISong[]>;
	listedSongs: any;
	playlist$: Observable<IPlaylist>;
	animateOptions = SLIDE_RIGHT_ANIMATION
	allSongsDownloaded = false;
	SongState = SongState;
	ConnectionType = ConnectionType;

	constructor(private subular: SubularMobileService, private songStore: SongStoreService,
		private route: ActivatedRoute, private playerService: PlayerService, private queue: DownloadQueueService,
		private zone: NgZone, private connection: CurrentConnectionService
	) { }

	ngOnInit() {
		this.playlist$ = this.route.params
			.map(params => params['playlistId'])
			.switchMap(playlistId => this.subular.getPlaylist(playlistId))

		this.songs$ = this.playlist$
			.map(playlist => playlist.entry)
			.switchMap(songs => this.songStore.addSongs(songs))
			.do(songs => this.listedSongs = songs)
			.do(songs => {
				const notDownloadedSongs = songs.filter(song => song.state != SongState.downloaded && song.state != SongState.downloading);
				this.allSongsDownloaded = notDownloadedSongs.length === 0;
			});

		this.connection$ = this.connection.connectionType$;

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
		const onComplete = () => {
			this.zone.run(() => {
				let updatedSong = song;
				updatedSong = Object.assign({}, updatedSong, { state: SongState.downloaded }) as ISong;
				this.songStore.updateSong(updatedSong);
			});
		}
		// the song is added to the queue update the store
		if (this.queue.addSongToTheQueue({ song, onComplete })) {
			song = Object.assign({}, song, { state: SongState.downloading }) as ISong;
			this.songStore.updateSong(song);
		};
	}

	downloadAllSongs() {
		this.listedSongs.forEach(song => {
			this.download(song)
		});
		this.allSongsDownloaded = true;
	}
}