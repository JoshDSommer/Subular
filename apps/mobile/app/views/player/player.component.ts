import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  PlayerService,
  IAudioPlayingInfo,
  PlayingStatus
} from '../../services/player.service';
import { SPIN_ANIMATION } from '../../animations/animations';
import { Observable } from 'rxjs/Observable';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page, EventData } from 'ui/page';
import { SubularMobileService } from '../../services/subularMobile.service';
import { Subscription, fromEvent } from 'rxjs';
import { topmost } from 'ui/frame';
import { Progress } from 'ui/progress';
import { screen } from 'platform';
import { ISong } from '@Subular/core';
import { ScrollView } from 'tns-core-modules/ui/scroll-view/scroll-view';
import { PanGestureEventData } from 'tns-core-modules/ui/gestures/gestures';

declare const CGAffineTransformMakeScale: any;

@Component({
  moduleId: module.id,
  selector: 'player',
  templateUrl: './player.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {
  timeEclipsed: string;
  highlightBgColor = '#ebd2f5';
  private subscription: Subscription;
  nowPlaying: IAudioPlayingInfo;
  songs$: Observable<ISong[]>;
  playerHeight = screen.mainScreen.heightDIPs - 50;
  PlayingStatus = PlayingStatus;
  animateOptions = SPIN_ANIMATION;

  imageHeightWidth = screen.mainScreen.widthDIPs / 6 * 4;
  imageTopBottomMargin = screen.mainScreen.widthDIPs / 7;
  queueVisible = false;
  playerVisible = true;

  constructor(
    public player: PlayerService,
    public nsRouter: RouterExtensions,
    private subular: SubularMobileService,
    private page: Page,
    private ref: ChangeDetectorRef
  ) {}
  private trimLeadingZero(time: string) {
    if (!time) {
      return '0:00';
    }
    return time.startsWith('0') ? time.substring(1, time.length) : time;
  }

  ngOnInit() {
    this.subscription = this.player.nowPlaying$.subscribe(nowPlaying => {
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
    }
    const panEvent$ = fromEvent(null, 'pan').map(
      (event: PanGestureEventData) => event.deltaY
    );
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
    return this.subular.getArtWork(song.coverArt, 1000);
  }

  updateView() {
    setTimeout(() => this.ref.markForCheck());
  }

  onProgressLoaded(args: EventData) {
    let progress = args.object as Progress;
    if (progress.android) {
      progress.android.setScaleY(4); //  progress.android === android.widget.ProgressBar
    } else if (progress.ios) {
      let transform = CGAffineTransformMakeScale(1.0, 4.0);
      progress.ios.transform = transform; // progress.ios === UIProgressView
    }
  }

  goToQueue(scrollView: ScrollView) {
    scrollView.scrollToVerticalOffset(this.playerHeight - 16, true);
  }
}
