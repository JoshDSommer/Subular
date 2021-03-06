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
  SongState,
  SubsonicCachedService
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
import { popIn } from '../../../pipes/popin.pipe';
import { ItemEventData } from 'tns-core-modules/ui/list-view/list-view';
import { isIOS } from 'tns-core-modules/ui/page/page';

interface IAlbumSong extends ISong {
  header: boolean;
}

@Component({
  moduleId: module.id,
  selector: 'album',
  templateUrl: './album.component.html'
})
export class AlbumComponent implements OnInit {
  returnLink: any;
  songSubscription: Subscription;
  songs$: Observable<IAlbumSong[]>;
  listedSongs: IAlbumSong[] = [];
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
    private nsRouter: RouterExtensions,
    private cache: SubsonicCachedService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.album$ = this.cache.getAlbum(
      +this.route.snapshot.paramMap.get('albumId')
    ) as Observable<IAlbum>;
    this.songs$ = this.album$.pipe(
      switchMap(album => this.subular.getSongs(album.id)),
      // this map is to filter out duplicates.
      // map(songs =>
      //   songs.filter((song, index, self) => {
      //     return (
      //       index ===
      //       self.findIndex(previosSong => {
      //         return (
      //           previosSong.title === song.title &&
      //           previosSong.track === song.track &&
      //         );
      //       })
      //     );
      //   })
      // ),
      // switchMap(songs => this.songStore.addSongs(songs)),
      tap(songs => (this.listedSongs = songs as IAlbumSong[])),
      tap(songs => {
        const notDownloadedSongs = songs.filter(
          song =>
            song.state !== SongState.downloaded &&
            song.state !== SongState.downloading
        );
        this.allSongsDownloaded = notDownloadedSongs.length === 0;
      }),
      map(songs => [{ header: true } as any, ...songs]),
      popIn,
      switchMap(songs => this.songStore.addSongs(songs) as any),
      tap(() => {
        setTimeout(() => this.ref.markForCheck());
      })
    ) as Observable<IAlbumSong[]>;

    this.returnLink = this.route.snapshot.data.headerData.backLinkUrl;
    if (
      Object.prototype.toString.call(
        this.route.snapshot.data.headerData.backLinkUrl
      ) === '[object String]'
    ) {
      this.returnLink = [this.route.snapshot.data.headerData.backLinkUrl];
    }
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

  playAndShuffle = () => {
    this.playerService.clearSongs();
    this.playerService.addSongs(this.listedSongs.filter(song => !song.header));
    this.playerService.shuffleSongs(null);
    this.playerService.playSong();
  };

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

  downloadAllSongs = () => {
    setTimeout(() => {
      this.listedSongs.forEach(song => {
        if (!song.header) {
          this.download(song);
        }
      });
      this.allSongsDownloaded = true;
    });
  };

  onItemLoading(args: ItemEventData) {
    if (isIOS && args.index === 0) {
      const iosCell = args.ios;
      iosCell.selectionStyle = UITableViewCellSelectionStyle.None;
    }
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }

  templateSelector = (item: any, index: number, items: any) => {
    let template = 'regular';
    if (item && item.header) {
      template = 'header';
    }
    if (item && item.placeholder) {
      template = 'placeholder';
    }
    return template;
  };
}
