import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core';
import {
  IAlbum,
  RouterResolverDataObservable,
  ISong,
  SongStoreService,
  SongState
} from '@Subular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import {
  SLIDE_RIGHT_ANIMATION,
  SPIN_ANIMATION
} from '../../../animations/animations';
import { PlayerService } from '../../../services/player.service';
import { SubularMobileService } from '../../../services/subularMobile.service';
import { DownloadQueueService } from '../../../services/downloadQueue.service';
import 'rxjs/add/operator/combineLatest';
import { RouterExtensions } from 'nativescript-angular/router';
import { switchMap, tap, map, combineLatest } from 'rxjs/operators';

@Component({
  moduleId: module.id,
  selector: 'album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  returnLink$: Observable<any>;
  songSubscription: Subscription;
  songs$: Observable<ISong[]>;
  listedSongs = [];
  album$: Observable<IAlbum>;
  albums: IAlbum;

  allSongsDownloaded = false;
  animateOptions = SLIDE_RIGHT_ANIMATION;
  SongState = SongState;
  animateSpin = SPIN_ANIMATION;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subular: SubularMobileService,
    private playerService: PlayerService,
    private songStore: SongStoreService,
    private queue: DownloadQueueService,
    private zone: NgZone,
    private nsRouter: RouterExtensions
  ) {}

  ngOnInit() {
    this.album$ = RouterResolverDataObservable<IAlbum>(
      this.route,
      this.router,
      'album'
    );
    this.songs$ = this.album$.pipe(
      switchMap(album => this.subular.getSongs(album.id)),
      // this map is to filter out duplicates.
      map(songs =>
        songs.filter((song, index, self) => {
          return (
            index ===
            self.findIndex(previosSong => {
              return (
                previosSong.title === song.title &&
                previosSong.track === song.track
              );
            })
          );
        })
      ),
      switchMap(songs => this.songStore.addSongs(songs)),
      tap(songs => (this.listedSongs = songs)),
      tap(songs => {
        const notDownloadedSongs = songs.filter(
          song =>
            song.state != SongState.downloaded &&
            song.state != SongState.downloading
        );
        this.allSongsDownloaded = notDownloadedSongs.length === 0;
      })
    );

    this.returnLink$ = this.route.params.pipe(
      combineLatest(this.album$),
      map(([value, album]) => {
        return {
          link: !value.returnLink
            ? ['/app/albums', album.artistId]
            : [value.returnLink],
          text: !value.returnLink ? album.artist : value.returnLinkText
        };
      })
    );
  }

  selectSong($song: ISong) {
    this.playerService.clearSongs();

    this.playerService.addSongsAndPlaySong(this.listedSongs, $song);
  }

  longpress($song: ISong) {
    this.nsRouter.navigate(['/addToPlaylist/' + $song.id], {
      transition: {
        name: 'slideTop'
      }
    });
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
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
