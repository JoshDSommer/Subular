import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SubularAppBaseComponent, IAlbum, IArtist, SubsonicCachedService  } from 'subular';

@Component({
	moduleId: module.id,
	selector: 'subular-app',
	templateUrl: 'subular-app.component.html',
	styleUrls: ['subular-app.component.css']
})

export class SubularAppComponent extends SubularAppBaseComponent {
	constructor(cachedData: SubsonicCachedService, route: ActivatedRoute, router: Router) {
		super(cachedData, route, router);
	}
}