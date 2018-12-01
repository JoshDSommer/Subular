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
  animateChild,
  group,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';

const slideLeft = [
  query(':leave', style({ transform: 'translateX(0)' })),
  query(':enter', style({ transform: 'translateX(-400)' })),

  group(
    [
      query(':enter', animate(500, style({ transform: 'translateX(0)' })), {
        // delay: 110
      }),
      query(':leave', animate(500, style({ transform: 'translateX(750)' })), {
        // delay: 100
      })
    ],
    { delay: 10 }
  ) // Needed because a wierd animation scheduling bug in IOS
];

const slideRight = [
  query(':leave', style({ transform: 'translateX(0)' })),
  query(':enter', style({ transform: 'translateX(400)' })),

  group(
    [
      query(':leave', animate(500, style({ transform: 'translateX(-400)' })), {
        // delay: 100
      }),
      query(':enter', animate(500, style({ transform: 'translateX(0)' })), {
        // delay: 100
      })
    ],
    { delay: 10 }
  ) // Needed because a wierd animation scheduling bug in IOS
];

@Component({
  moduleId: module.id,
  selector: 'subular-app',
  templateUrl: './subular-app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('routeAnimation', [
      transition('recent => album', slideRight),
      transition('recent => artists', slideRight),
      transition('artists => playlists', slideRight),
      transition('artists => supa', slideRight),
      transition('playlists => supa', slideRight),
      transition('supa => playlists', slideLeft),
      transition('supa => recent', slideLeft),
      transition('supa => artists', slideLeft),
      transition('playlists => artists', slideLeft),
      transition('playlists => recent', slideLeft),
      transition('artists => recent', slideLeft),
      transition('artists => albums', slideRight),
      transition('albums => album', slideRight),
      transition('album => albums', slideLeft),
      transition('albums => artists', slideLeft)
    ])
  ]
})
export class SubularAppComponent implements OnInit {
  loaded$: any;
  nowPlaying: IAudioPlayingInfo;

  PlayingStatus = PlayingStatus;
  animateOptions = SPIN_ANIMATION;
  highlightBgColor = '#ebd2f5';

  constructor(
    private subular: SubularMobileService,
    private router: RouterExtensions,
    private player: PlayerService,
    private ref: ChangeDetectorRef
  ) {
    this.player.nowPlaying$.subscribe(nowPlaying => {
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
    return this.subular.getArtWork(song.coverArt);
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
