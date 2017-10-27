import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SubsonicCachedService } from '../services/subsonic.cached.service';
import { IArtist } from '../interfaces/artists';

@Component({
	template:''
})
export class SubularAppBaseComponent implements OnInit {
	artists$: Observable<IArtist[]>;
	artistId$: Observable<any>;
	loaded: boolean;

	constructor(private cachedData: SubsonicCachedService, private route: ActivatedRoute, private router: Router) {}

	ngOnInit() {
		this.artists$ = this.cachedData.getCachedData()
			.map(([artists, albums]) => artists)
			.do(() => this.loaded = true);

		if (this.route && this.route.firstChild && this.route.firstChild.snapshot  && this.route.firstChild.snapshot.params) {
			this.artistId$ = Observable.of(this.route.firstChild.snapshot.params['artistId'])
			.merge(this.router.events
				.filter(value => value instanceof NavigationEnd)
				.map(() => this.route.firstChild.snapshot.params['artistId']));
		}

	}
}