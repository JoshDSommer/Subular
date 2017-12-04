import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SubularAppBaseComponent, SubsonicCachedService, SubsonicService } from 'subular';
import { PlayerService, IAudioPlayingInfo, PlayingStatus } from '../../services/player.service';
import { SPIN_ANIMATION } from '../../animations/animations';
import { setNumber } from 'application-settings';
import { ARTIST_LIST_CACHE_KEY } from '../subular-app/artist-list/artist-list.component';
import { SubularMobileService } from '../../services/subularMobile.service';

@Component({
	moduleId: module.id,
	selector: 'subular-app',
	templateUrl: 'subular-app.component.html',
	styleUrls: ['subular-app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubularAppComponent {
	loaded$: any;
	nowPlaying: IAudioPlayingInfo;

	PlayingStatus = PlayingStatus;
	animateOptions = SPIN_ANIMATION;

	constructor(private subular: SubularMobileService, route: ActivatedRoute, router: Router,
		private player: PlayerService,
		private ref: ChangeDetectorRef) {
		this.player.nowPlaying$.subscribe(nowPlaying => {
			if (nowPlaying) {
				this.nowPlaying = Object.assign({}, nowPlaying);
				this.ref.markForCheck();
			}
		});
	}

	ngOnInit() {
		this.loaded$ = this.subular.getCachedData()
			.map(([artists, albums]) => true);
	}

	getArtWork(song) {
		return this.subular.subsonicGetCoverUrl(song)
	}

	play() {
		this.player.resumeSong();
	}

	pause() {
		this.player.pauseSong();
	}

	clearArtistKeyCache() {
		setNumber(ARTIST_LIST_CACHE_KEY, 0)
	}
}