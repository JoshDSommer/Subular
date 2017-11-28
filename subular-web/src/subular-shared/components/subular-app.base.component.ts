import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SubsonicCachedService } from '../services/subsonic.cached.service';
import { IArtist } from '../interfaces/artists';

@Component({
	template: ''
})
export class SubularAppBaseComponent implements OnInit {
	loaded$: Observable<boolean>;
	artistId$: Observable<any>;

	constructor(private cachedData: SubsonicCachedService, private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		this.loaded$ = this.cachedData.getCachedData()
			.map(([artists, albums]) => true);


		if (this.route && this.route.firstChild && this.route.firstChild.snapshot && this.route.firstChild.snapshot.params) {
			this.artistId$ = this.router.events
				.filter(value => value instanceof NavigationEnd)
				.map(() => this.route.firstChild.snapshot.params['artistId'])
				.startWith(this.route.firstChild.snapshot.params['artistId']);
		}

	}
}
