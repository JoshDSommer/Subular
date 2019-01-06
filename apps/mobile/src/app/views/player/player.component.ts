import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import {
  PlayerService,
  IAudioPlayingInfo,
  PlayingStatus
} from '../../services/player.service';
import { SPIN_ANIMATION } from '../../animations/animations';
import { Observable } from 'rxjs/Observable';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page, EventData } from 'tns-core-modules/ui/page';
import { SubularMobileService } from '../../services/subularMobile.service';
import { Subscription, fromEvent } from 'rxjs';
import { topmost } from 'tns-core-modules/ui/frame';
import { Progress } from 'tns-core-modules/ui/progress';
import { screen } from 'tns-core-modules/platform';
import { ISong } from '@Subular/core';
import { ScrollView } from 'tns-core-modules/ui/scroll-view/scroll-view';
import { TapticEngine } from 'nativescript-taptic-engine';
import { shareReplay } from 'rxjs/operators';

declare const CGAffineTransformMakeScale, UIBarStyle: any;

@Component({
  moduleId: module.id,
  selector: 'player',
  templateUrl: './player.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit, OnDestroy {
  timeEclipsed: string;
  highlightBgColor = '#ebd2f5';
  private subscription: Subscription;
  nowPlaying: IAudioPlayingInfo;
  songs$: Observable<ISong[]>;
  playerHeight = screen.mainScreen.heightDIPs - 50;
  PlayingStatus = PlayingStatus;
  animateOptions = SPIN_ANIMATION;

  imageHeightWidth = (screen.mainScreen.widthDIPs / 5) * 4;
  imageTopBottomMargin = screen.mainScreen.widthDIPs / 7;
  queueVisible = false;
  playerVisible = true;
  currentArtWork: Observable<string>;

  constructor(
    private player: PlayerService,
    private nsRouter: RouterExtensions,
    private subular: SubularMobileService,
    private page: Page,
    private ref: ChangeDetectorRef,
    private vibrator: TapticEngine
  ) {}

  private trimLeadingZero(time: string) {
    if (!time) {
      return '0:00';
    }
    return time.startsWith('0') ? time.substring(1, time.length) : time;
  }

  ngOnInit() {
    this.subscription = this.player.nowPlaying$.subscribe(nowPlaying => {
      if (this.nowPlaying && this.nowPlaying.song.id !== nowPlaying.song.id) {
        this.currentArtWork = null;
      }

      if (nowPlaying) {
        //mutate time formats probably should export this to a Pipe
        this.nowPlaying = Object.assign({}, nowPlaying);
        const measuredTime = new Date(
          (nowPlaying.song.duration - nowPlaying.remainingTime) * 1000
        );
        const timeWithoutHours = measuredTime.toISOString().substr(14, 5);
        const timeWithHours = measuredTime.toISOString().substr(11, 8);
        this.timeEclipsed = timeWithHours.startsWith('00:')
          ? timeWithoutHours
          : timeWithHours;
        this.timeEclipsed = this.trimLeadingZero(this.timeEclipsed);
        this.nowPlaying.song.time = this.trimLeadingZero(
          this.nowPlaying.song.time
        );
        this.ref.markForCheck();
      }
    });
    this.songs$ = this.player.queue$;
    //id back button ios
    if (this.page.ios) {
      topmost().ios.controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(
        true,
        false
      );
      const navigationBar = topmost().ios.controller.navigationBar;
      navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    }
    // const panEvent$ = fromEvent(null, 'pan').map(
    //   (event: PanGestureEventData) => event.deltaY
    // );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  songHeartChange(song: ISong) {
    this.player.updateSong(song);
  }

  getArtWork(song) {
    if (!this.currentArtWork) {
      this.currentArtWork = this.subular
        .getArtWork(song.coverArt, 1000)
        .pipe(shareReplay());
    }
    return this.currentArtWork;
  }

  updateView() {
    setTimeout(() => this.ref.markForCheck());
  }

  onProgressLoaded(args: EventData) {
    const progress = args.object as Progress;
    if (progress.android) {
      progress.android.setScaleY(4); //  progress.android === android.widget.ProgressBar
    } else if (progress.ios) {
      const transform = CGAffineTransformMakeScale(1.0, 4.0);
      progress.ios.transform = transform; // progress.ios === UIProgressView
    }
  }

  goToQueue(scrollView: ScrollView) {
    scrollView.scrollToVerticalOffset(this.playerHeight - 16, true);
  }

  playPreviousSong() {
    this.player.playPreviousSong();
    this.updateView();
    this.hapticFeedback();
  }

  playNextSong() {
    this.player.playNextSong();
    this.hapticFeedback();
  }

  toggleShuffle() {
    this.player.toggleShuffle();
    this.hapticFeedback();
  }

  toggleRepeat() {
    this.player.toggleRepeat();
    this.hapticFeedback();
  }

  pauseSong() {
    this.player.pauseSong();
    this.updateView();
    this.hapticFeedback();
  }

  resumeSong() {
    this.player.resumeSong();
    this.updateView();
    this.hapticFeedback();
  }

  hapticFeedback() {
    this.vibrator.selection();
  }

  back() {
    this.nsRouter.back();
  }
}
