import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IAlbum } from '../../../../shared-services/index';

@Component({
	selector: 'albums',
	templateUrl: 'albums.component.html',
	styleUrls: ['albums.component.css']
})

export class AlbumsComponent implements OnInit {
	albums: IAlbum[];
	constructor(private route: ActivatedRoute, private router: Router) {

	}
	ngOnInit() {
		this.albums = this.route.snapshot.data['albums'] as IAlbum[];
		this.router.events.subscribe(() => {
			this.albums = this.route.snapshot.data['albums'] as IAlbum[];
		});
	}
}