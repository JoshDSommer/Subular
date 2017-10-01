import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IAlbum, SubsonicService } from 'subular';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
	moduleId: module.id,
	selector: 'albums',
	templateUrl: 'albums.component.html',
	styleUrls: ['albums.component.css']
})

export class AlbumsComponent implements OnInit {
	albums: IAlbum[];
	constructor(private route: ActivatedRoute, private router: Router, private nsRouter: RouterExtensions, public subular:SubsonicService) {

	}
	back() {
		this.nsRouter.back();
	}
	ngOnInit() {
		this.albums = this.route.snapshot.data['albums'] as IAlbum[];
		this.router.events.subscribe(() => {
			this.albums = this.route.snapshot.data['albums'] as IAlbum[];
		});
	}
}