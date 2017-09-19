import { Component, OnInit } from '@angular/core';
import { CachedAlbumArtistService } from '../../../shared-services/cached-album-artist.service';
import { Observable } from 'rxjs/Observable';
import { IAlbum } from '../../../shared-services/index';

@Component({
	selector: 'subular-app',
	templateUrl: 'subular-app.component.html'
})

export class SubularAppComponent implements OnInit {
	albums$: Observable<IAlbum[]>;

	constructor(private cachedData: CachedAlbumArtistService) {

	}
	ngOnInit() {
		this.albums$ = this.cachedData.getAlbums();
	}
}