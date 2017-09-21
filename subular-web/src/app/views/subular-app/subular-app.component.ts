import { Component, OnInit } from '@angular/core';
import { CachedAlbumArtistService } from '../../../shared-services/cached-album-artist.service';
import { Observable } from 'rxjs/Observable';
import { IAlbum, IArtist } from '../../../shared-services/index';

@Component({
	selector: 'subular-app',
	templateUrl: 'subular-app.component.html',
	styleUrls: ['subular-app.component.css']
})

export class SubularAppComponent implements OnInit {
	albums$: Observable<IAlbum[]>;
	artists$: Observable<IArtist[]>;
	loaded$: Observable<boolean>;

	constructor(private cachedData: CachedAlbumArtistService) {

	}
	ngOnInit() {
		this.loaded$ = this.cachedData.refreshedCachedData();
		this.artists$ = this.cachedData.getArtists();
	}
}