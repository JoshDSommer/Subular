import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SubularAppBaseComponent, SubsonicCachedService, SubsonicService } from 'subular';
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { PlayerService, IAudioPlayingInfo, PlayingStatus } from '../../services/player.service';
import { GridLayout } from 'ui/layouts/grid-layout';

@Component({
	moduleId: module.id,
	selector: 'subular-app',
	templateUrl: 'subular-app.component.html',
	styleUrls: ['subular-app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubularAppComponent extends SubularAppBaseComponent {
	nowPlaying: IAudioPlayingInfo;
	PlayingStatus = PlayingStatus;

	constructor(cachedData: SubsonicCachedService, route: ActivatedRoute, router: Router,
		public subsonic: SubsonicService,
		private player: PlayerService,
		private ref: ChangeDetectorRef) {
		super(cachedData, route, router);
		this.player.nowPlaying$.subscribe(nowPlaying => {
			if (nowPlaying) {
				this.nowPlaying = Object.assign({}, nowPlaying);
				this.ref.markForCheck();
			}
		});
	}

	getArtWork(coverArt) {
		if (coverArt) {
			return this.subsonic.subsonicGetCoverUrl(coverArt)
		}
		return '~/images/coverArt.png';
	}

	play() {
		this.player.resumeSong();
	}

	pause() {
		this.player.pauseSong();
	}
}