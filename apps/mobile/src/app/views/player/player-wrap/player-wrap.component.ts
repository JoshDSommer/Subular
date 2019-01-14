import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerService, IAudioPlayingInfo } from '~/app/services';
import { Page } from 'tns-core-modules/ui/page/page';
import { topmost } from 'tns-core-modules/ui/frame';
import { RouterExtensions } from 'nativescript-angular/router';

declare const CGAffineTransformMakeScale, UIBarStyle: any;

@Component({
  moduleId: module.id,
  selector: 'player-wrap',
  templateUrl: './player-wrap.component.html'
})
export class PlayerWrapComponent implements OnInit {
  nowPlaying$: Observable<IAudioPlayingInfo>;

  constructor(
    private player: PlayerService,
    private nsRouter: RouterExtensions,
    private page: Page
  ) {}

  ngOnInit() {
    this.nowPlaying$ = this.player.nowPlaying$;

    if (this.page.ios) {
      topmost().ios.controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(
        true,
        false
      );
      const navigationBar = topmost().ios.controller.navigationBar;
      navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    }
  }

  back() {
    this.nsRouter.back();
  }
}
