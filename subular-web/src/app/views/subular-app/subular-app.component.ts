import { Component, OnInit } from '@angular/core';
import { SubsonicCachedService } from '../../../shared-module/subsonic.cached.service';
import { Observable } from 'rxjs/Observable';
import { IAlbum, IArtist } from '../../../shared-module/index';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SubularAppBaseComponent } from '../../../shared-module/components/subular-app.base.component';

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