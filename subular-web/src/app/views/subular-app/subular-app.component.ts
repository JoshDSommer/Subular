import { Component, OnInit } from '@angular/core';
import { SubsonicCachedService } from '../../../shared-services/subsonic.cached.service';
import { Observable } from 'rxjs/Observable';
import { IAlbum, IArtist } from '../../../shared-services/index';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
	selector: 'subular-app',
	templateUrl: 'subular-app.component.html',
	styleUrls: ['subular-app.component.css']
})

export class SubularAppComponent implements OnInit {
	artists$: Observable<IArtist[]>;
	loaded: boolean;
	artistId$: Observable<any>;

	constructor(private cachedData: SubsonicCachedService, private route: ActivatedRoute, private router: Router) {}

	ngOnInit() {
		this.artists$ = this.cachedData.getCachedData()
			.map(([artists, albums]) => artists)
			.do(() => this.loaded = true);

		this.artistId$ = Observable.of(this.route.firstChild.snapshot.params['artistId'])
			.merge(this.router.events
				.filter(value => value instanceof NavigationEnd)
				.map(() => +this.route.firstChild.snapshot.params['artistId']));
	}
}