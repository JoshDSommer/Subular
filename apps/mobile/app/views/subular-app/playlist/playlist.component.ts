import { Component, OnInit, NgZone } from '@angular/core';
import { SubularMobileService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import { IPlaylist, SongStoreService, ISong, SongState } from '@Subular/core';
import { Observable } from 'rxjs/Observable';
import { SLIDE_RIGHT_ANIMATION } from '../../../animations/animations';
import { PlayerService } from '../../../services/player.service';
import { DownloadQueueService } from '../../../services/downloadQueue.service';
import {
  CurrentConnectionService,
  ConnectionType
} from '../../../services/currentConnection.service';
import { switchMap, map, tap } from 'rxjs/operators';
import { SwipeGestureEventData, SwipeDirection } from 'ui/gestures';
import { GridLayout } from 'ui/layouts/grid-layout';

interface IAlbumSong extends ISong {
  header: boolean;
}

@Component({
  moduleId: module.id,
  selector: 'playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  connection$: Observable<ConnectionType>;
  songs$: Observable<IAlbumSong[]>;
  listedSongs: any;
  playlist$: Observable<IPlaylist>;
  animateOptions = SLIDE_RIGHT_ANIMATION;
  allSongsDownloaded = false;
  SongState = SongState;
  ConnectionType = ConnectionType;

  private playlistId = 0;

  constructor(
    private subular: SubularMobileService,
    private songStore: SongStoreService,
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private queue: DownloadQueueService,
    private zone: NgZone,
    private connection: CurrentConnectionService
  ) {}

  ngOnInit() {
    this.playlist$ = this.route.params.pipe(
      map(params => params['playlistId']),
      tap(playlistId => (this.playlistId = playlistId)),
      switchMap(playlistId => this.subular.getPlaylist(playlistId))
    );

    this.getSongs();

    this.connection$ = this.connection.connectionType$;
  }

  getSongs() {
    this.songs$ = this.playlist$.pipe(
      map(playlist => playlist.entry),
      switchMap(songs => this.songStore.addSongs(songs)),
      tap(songs => (this.listedSongs = songs)),
      tap(songs => {
        const notDownloadedSongs = songs.filter(
          song =>
            song.state != SongState.downloaded &&
            song.state != SongState.downloading
        );
        this.allSongsDownloaded = notDownloadedSongs.length === 0;
      }),
      map(songs => {
        return [{ header: true } as any, ...songs];
      }),
      map(songs => {
        return songs;
      })
    );
  }

  selectSong($song: ISong) {
    this.playerService.clearSongs();

    this.playerService.addSongsAndPlaySong(this.listedSongs, $song);
  }

  swipe($event: SwipeGestureEventData, gridView: GridLayout) {
    if ($event.direction == SwipeDirection.left && gridView.translateX === 0) {
      gridView
        .animate({
          translate: { x: -65, y: 0 },
          duration: 400
        })
        .then(() => {})
        .catch(() => {});
    }
    if (
      $event.direction === SwipeDirection.right &&
      gridView.translateX === -65
    ) {
      gridView
        .animate({
          translate: { x: 0, y: 0 },
          duration: 400
        })
        .then(() => {})
        .catch(() => {});
      gridView.translateX = 0;
    }
  }

  void() {
    return;
  }

  removeFromPlaylist(index: number) {
    this.subular.removeFromPlaylist(index, this.playlistId).subscribe();
    this.getSongs();
  }

  playAndShuffle() {
    this.playerService.addSongs(this.listedSongs);
    this.playerService.shuffleSongs(null);
    this.playerService.playSong();
  }

  download(song: ISong) {
    const onComplete = () => {
      this.zone.run(() => {
        let updatedSong = song;
        updatedSong = Object.assign({}, updatedSong, {
          state: SongState.downloaded
        }) as ISong;
        this.songStore.updateSong(updatedSong);
      });
    };
    // the song is added to the queue update the store
    if (this.queue.addSongToTheQueue({ song, onComplete })) {
      song = Object.assign({}, song, { state: SongState.downloading }) as ISong;
      this.songStore.updateSong(song);
    }
  }

  downloadAllSongs() {
    this.listedSongs.forEach(song => {
      this.download(song);
    });
    this.allSongsDownloaded = true;
  }

  templateSelector = (item: any, index: number, items: any) => {
    const template = item.header === true ? 'header' : 'regular';
    return template;
  };
}
