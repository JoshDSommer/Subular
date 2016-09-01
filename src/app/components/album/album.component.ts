import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SubularService } from '../../services/subsonic.service';

@Component({
	moduleId: module.id,
	selector: 'album',
	templateUrl: 'album.component.html'
})

export class AlbumComponent implements OnInit {

	constructor(private subular: SubularService, private route: ActivatedRoute) {

	}

	ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			let id = +params['id'];
			console.log('got an id of', id)
		});
	}
}