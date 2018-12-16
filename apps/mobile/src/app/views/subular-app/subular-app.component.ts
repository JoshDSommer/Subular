import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  PlayerService,
  IAudioPlayingInfo,
  PlayingStatus
} from '../../services/player.service';
import { SPIN_ANIMATION } from '../../animations/animations';
import { setNumber } from 'tns-core-modules/application-settings';
import { ARTIST_LIST_CACHE_KEY } from '../subular-app/artist-list/artist-list.component';
import { SubularMobileService } from '../../services/subularMobile.service';
import { RouterExtensions } from 'nativescript-angular/router';
import {
  animate,
  group,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';
import { shareReplay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

const slideLeft = [
  query(':leave', style({ transform: 'translateX(0)' })),
  query(':enter', style({ transform: 'translateX(0)', opacity: 0.5 })), // animations breaks layout here so instead we get a card look. should be -400

  group(
    [
      query(
        ':enter',
        animate(500, style({ transform: 'translateX(0)', opacity: 1 })),
        {
          // delay: 10
          optional: true
        }
      ),
      query(
        ':leave',
        animate(500, style({ transform: 'translateX(400)', opacity: 0.5 })),
        {
          // delay: 10
          optional: true
        }
      )
    ],
    { delay: 10 }
  ) // Needed because a wierd animation scheduling bug in IOS
];

const slideRight = [
  query(':leave', style({ transform: 'translateX(0)' })),
  query(':enter', style({ transform: 'translateX(0)', opacity: 0.5 })), //should be 400

  group(
    [
      query(
        ':leave',
        animate(500, style({ transform: 'translateX(-400)', opacity: 0.5 })),
        {
          // delay: 10
          // delay: 100
          optional: true
        }
      ),
      query(
        ':enter',
        animate(500, style({ transform: 'translateX(0)', opacity: 1 })),
        {
          // delay: 10
          optional: true
        }
      )
    ],
    { delay: 10 }
  ) // Needed because a wierd animation scheduling bug in IOS
];

@Component({
  moduleId: module.id,
  selector: 'subular-app',
  templateUrl: './subular-app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
  // animations: [
  //   trigger('routeAnimation', [
  //     transition('recent => album', slideRight),
  //     transition('recent => artists', slideRight),
  //     transition('recent => playlists', slideRight),
  //     transition('artists => playlists', slideRight),
  //     transition('artists => supa', slideRight),
  //     transition('artists => albums', slideRight),
  //     transition('artists => recent', slideLeft),
  //     transition('playlists => supa', slideRight),
  //     transition('playlists => recent', slideLeft),
  //     transition('playlists => artists', slideLeft),
  //     transition('supa => playlists', slideLeft),
  //     transition('supa => recent', slideRight),
  //     transition('supa => artists', slideLeft),
  //     transition('albums => album', slideRight),
  //     transition('album => albums', slideLeft),
  //     transition('albums => artists', slideLeft)
  //   ])
  // ]
})
export class SubularAppComponent implements OnInit {
  loaded$: any;
  nowPlaying: IAudioPlayingInfo;

  PlayingStatus = PlayingStatus;
  animateOptions = SPIN_ANIMATION;
  highlightBgColor = '#ebd2f5';
  currentArtWork: Observable<string>;

  constructor(
    private subular: SubularMobileService,
    private router: RouterExtensions,
    private player: PlayerService,
    private ref: ChangeDetectorRef
  ) {
    this.player.nowPlaying$.subscribe(nowPlaying => {
      if (this.nowPlaying && this.nowPlaying.song.id !== nowPlaying.song.id) {
        this.currentArtWork = null;
      }
      if (nowPlaying) {
        this.nowPlaying = Object.assign({}, nowPlaying);
        this.ref.markForCheck();
      }
    });
  }

  prepRouteState(outlet: RouterOutlet) {
    const path = outlet.activatedRoute.snapshot.routeConfig.path;
    const pathCleanedUp = path.substring(0, path.indexOf('/'));
    const route = path.includes('/') ? pathCleanedUp : path;
    return route;
  }

  ngOnInit() {
    this.subular.pingServer().subscribe(authenticated => {
      if (!authenticated) {
        this.redirectToLogin();
      }
    });

    this.loaded$ = this.subular
      .getCachedData()
      .map(([artists, albums]) => true);
  }

  getArtWork(song) {
    if (!this.currentArtWork) {
      this.currentArtWork = this.subular
        .getArtWork(song.coverArt, 1000)
        .pipe(shareReplay());
    }
    return this.currentArtWork;
  }

  play() {
    this.player.resumeSong();
  }

  pause() {
    this.player.pauseSong();
  }

  clearArtistKeyCache() {
    setNumber(ARTIST_LIST_CACHE_KEY, 0);
  }

  redirectToLogin() {
    this.router.navigate(['/login'], { clearHistory: true });
  }
}
