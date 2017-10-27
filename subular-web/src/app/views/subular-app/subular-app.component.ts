import { Component, OnInit } from '@angular/core';
import { SubsonicCachedService, SubularAppBaseComponent } from '../../../subular-shared/';
import { Observable } from 'rxjs/Observable';
import { IAlbum, IArtist } from '../../../subular-shared/index';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
	selector: 'subular-app',
	templateUrl: 'subular-app.component.html',
	styleUrls: ['subular-app.component.css']
})

export class SubularAppComponent extends SubularAppBaseComponent {
	constructor(cachedData: SubsonicCachedService, route: ActivatedRoute, router: Router) {
		super(cachedData, route, router);
	}
}
