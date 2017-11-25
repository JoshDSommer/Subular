import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SubularAppBaseComponent, SubsonicCachedService, SubsonicService } from 'subular';
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { PlayerService, IAudioPlayingInfo, PlayingStatus } from '../../services/player.service';

@Component({
	moduleId: module.id,
	selector: 'subular-app',
	templateUrl: 'subular-app.component.html',
	styleUrls: ['subular-app.component.css'],
})

export class SubularAppComponent extends SubularAppBaseComponent {
	nowPlaying: IAudioPlayingInfo;
	// nowPlaying$: Observable<IAudioPlayingInfo>;
	PlayingStatus = PlayingStatus;
	@ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;

	get drawer(): RadSideDrawer {
		return this.drawerComponent.sideDrawer;
	}

	constructor(cachedData: SubsonicCachedService, route: ActivatedRoute, router: Router,
		public subsonic: SubsonicService,
		private player: PlayerService) {
		super(cachedData, route, router);
		this.player.nowPlaying$.subscribe(nowPlaying => this.nowPlaying = nowPlaying);

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