import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SubularAppBaseComponent, SubsonicCachedService, SubsonicService } from 'subular';
import { PlayerService, IAudioPlayingInfo, PlayingStatus } from '../../services/player.service';
import { SPIN_ANIMATION } from '../../animations/animations';
import { setNumber } from 'application-settings';
import { ARTIST_LIST_CACHE_KEY } from '../subular-app/artist-list/artist-list.component';
import { SubularMobileService } from '../../services/subularMobile.service';
import { RouterExtensions } from 'nativescript-angular/router';

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
	highlightBgColor = '#ebd2f5';

	constructor(private subular: SubularMobileService, private router: RouterExtensions,
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
		this.subular.pingServer()
			.subscribe(authenticated => {
				if (!authenticated) {
					this.redirectToLogin();
				}
			});

		this.loaded$ = this.subular.getCachedData()
			.map(([artists, albums]) => true);
	}

	getArtWork(song) {
		return this.subular.subsonicGetSongCoverUrl(song)
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

	redirectToLogin() {
		this.router.navigate(['/login'], { clearHistory: true });
	}
}