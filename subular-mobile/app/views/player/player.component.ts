import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { PlayerService, IAudioPlayingInfo, PlayingStatus } from '../../services/player.service';
import { SPIN_ANIMATION } from '../../animations/animations';
import { Observable } from 'rxjs/Observable';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page, EventData } from "ui/page";
import { SubularMobileService } from '../../services/subularMobile.service';
import { Subscription } from 'rxjs';
import { topmost } from "ui/frame";
import { Progress } from 'ui/progress';

@Component({
	moduleId: module.id,
	selector: 'player',
	templateUrl: './player.component.html',
	styleUrls: ['./player.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlayerComponent implements OnInit {
	private subscription: Subscription;
	nowPlaying: IAudioPlayingInfo;

	PlayingStatus = PlayingStatus;
	animateOptions = SPIN_ANIMATION;

	constructor(public player: PlayerService, public nsRouter: RouterExtensions, private subular: SubularMobileService, private page: Page, private ref: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.subscription = this.player.nowPlaying$.subscribe(nowPlaying => {
			if (nowPlaying) {
				this.nowPlaying = Object.assign({}, nowPlaying);
				this.ref.markForCheck();
			}
		});
		if (topmost().ios) {
			let navigationBar = topmost().ios.controller.navigationBar;
			navigationBar.barStyle = UIBarStyle.Black;
		}

	}

	getArtWork(song) {
		return this.subular.subsonicGetCoverUrl(song, 1000)
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onProgressLoaded(args: EventData) {
		let progress = args.object as Progress;

		// if (progress.android) {
		// 	progress.android.setScaleY(5);  //  progress.android === android.widget.ProgressBar
		// } else if (progress.ios) {
		let transform = CGAffineTransformMakeScale(1.0, 5.0);
		progress.ios.transform = transform; // progress.ios === UIProgressView
		// }

	}
}