import { Component, OnInit } from '@angular/core';
import { SubularMobileService } from '../../../services';
import { IPlaylists } from 'subular';
import { Observable } from 'rxjs/Observable';

@Component({
	moduleId: module.id,
	selector: 'playlists',
	templateUrl: './playlists.component.html',
	styleUrls: ['./playlists.component.css']
})

export class PlaylistsComponent implements OnInit {
	playlists$: Observable<IPlaylists>;

	constructor(private subular: SubularMobileService) { }

	ngOnInit() {
		this.playlists$ = this.subular.getPlaylists();
	 }
}