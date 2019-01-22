import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  RouterOutlet,
  Router,
  NavigationEnd,
  ActivatedRoute
} from '@angular/router';
import {
  PlayerService,
  IAudioPlayingInfo,
  PlayingStatus
} from '../../services/player.service';
import {
  SPIN_ANIMATION,
  SLIDE_DOWN_ANIMATION,
  SLIDE_UP_ANIMATION,
  screenInfo,
  SCALE_DOWN_ANIMATION,
  SCALE_UP_ANIMATION
} from '../../animations/animations';
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
import {
  shareReplay,
  tap,
  filter,
  map,
  switchMap,
  mergeMap,
  startWith
} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { topmost, isIOS } from 'tns-core-modules/ui/frame/frame';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout/grid-layout';

declare const UIBarStyle: any;

export const log = (args: any[]) =>
  console.log(
    '--------------------------------------------------------------------------------------------',
    ...args,
    '--------------------------------------------------------------------------------------------'
  );

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
  playerVisible = false;
  animation: any;
  intialOffset: number;
  routeDate$: any;

  get routerOutlet(): GridLayout {
    return this._routerOutlet.nativeElement;
  }

  get playerWrap(): StackLayout {
    return this._playerWrap.nativeElement;
  }

  @ViewChild('routerOutletWrap')
  _routerOutlet: ElementRef;

  @ViewChild('playerWrap')
  _playerWrap: ElementRef;

  constructor(
    private subular: SubularMobileService,
    private router: RouterExtensions,
    private player: PlayerService,
    private ref: ChangeDetectorRef,
    private route: Router,
    private activatedRoute: ActivatedRoute
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

  // prepRouteState(outlet: RouterOutlet) {
  //   const path = outlet.activatedRoute.snapshot.routeConfig.path;
  //   const pathCleanedUp = path.substring(0, path.indexOf('/'));
  //   const route = path.includes('/') ? pathCleanedUp : path;
  //   return route;
  // }

  ngOnInit() {
    this.routeDate$ = this.route.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        // this will traverse over the state tree to find the last activated route.
        while (route.firstChild) {
          route = route.firstChild;
        }
        //finally return that route
        return route as ActivatedRoute;
      }),
      mergeMap(route => route.data),
      startWith({ title: 'Artists' } as any),
      map(data => {
        if (data.headerData) {
          return data.headerData;
        }
        return data;
      })
    );

    this.intialOffset = screenInfo.portrait;
    this.subular.pingServer().subscribe(authenticated => {
      if (!authenticated) {
        this.redirectToLogin();
      }
    });

    this.loaded$ = this.subular.getCachedData().map(([]) => true);
  }

  getArtWork(song) {
    if (!this.currentArtWork && song && song.coverArt) {
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

  showPlayer() {
    // log(['showPlayer', playerWrap ? playerWrap.translateY : null]);
    if (this.playerWrap) {
      this.playerWrap.translateY = screenInfo.portrait;
    }
    SLIDE_UP_ANIMATION.target = this.playerWrap;
    SCALE_DOWN_ANIMATION.target = this.routerOutlet;
    this.animation = [{ ...SLIDE_UP_ANIMATION }, { ...SCALE_DOWN_ANIMATION }];
    this.playerVisible = true;

    // if (isIOS) {
    //   topmost().ios.controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(
    //     true,
    //     false
    //   );
    //   const navigationBar = topmost().ios.controller.navigationBar;
    //   navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    // }
  }

  hidePlayerSlide = () => this.hidePlayer();

  hidePlayer() {
    SLIDE_DOWN_ANIMATION.target = this.playerWrap;
    SCALE_UP_ANIMATION.target = this.routerOutlet;
    this.animation = [
      { ...SLIDE_DOWN_ANIMATION },
      { ...SCALE_UP_ANIMATION, target: this.routerOutlet }
    ];

    this.playerVisible = false;

    // this.ref.markForCheck();
    // if (isIOS) {
    //   topmost().ios.controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(
    //     true,
    //     false
    //   );
    //   const navigationBar = topmost().ios.controller.navigationBar;
    //   navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    // }
  }
}
