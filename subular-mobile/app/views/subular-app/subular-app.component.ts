import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SubularAppBaseComponent, IAlbum, IArtist, SubsonicCachedService  } from 'subular';
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";

@Component({
	moduleId: module.id,
	selector: 'subular-app',
	templateUrl: 'subular-app.component.html',
	styleUrls: ['subular-app.component.css']
})

export class SubularAppComponent extends SubularAppBaseComponent {
	@ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;

	get drawer(): RadSideDrawer{
		return this.drawerComponent.sideDrawer;
	}

	constructor(cachedData: SubsonicCachedService, route: ActivatedRoute, router: Router) {
		super(cachedData, route, router);
	}
}