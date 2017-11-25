import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SubularAppBaseComponent, IAlbum, IArtist, SubsonicCachedService } from 'subular';
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { PlayerService, IAudioPlayingInfo } from '../../services/player.service';

@Component({
	moduleId: module.id,
	selector: 'subular-app',
	templateUrl: 'subular-app.component.html',
	styleUrls: ['subular-app.component.css'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})

export class SubularAppComponent extends SubularAppBaseComponent {
	nowPlaying$: Observable<IAudioPlayingInfo>;
	@ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;

	get drawer(): RadSideDrawer {
		return this.drawerComponent.sideDrawer;
	}

	constructor(cachedData: SubsonicCachedService, route: ActivatedRoute, router: Router, private player: PlayerService) {
		super(cachedData, route, router);
		this.nowPlaying$ = this.player.nowPlaying$;
	}
}