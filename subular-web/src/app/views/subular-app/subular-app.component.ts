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
	albums: IAlbum[];
	artists: IArtist[];
	loaded: boolean;

	constructor(private cachedData: CachedAlbumArtistService) {

	}
	ngOnInit() {
		this.cachedData.getCachedData().subscribe(([artists,albums]) => {
			this.artists = artists;
			this.albums = albums;
			this.loaded = true;
		});
	}
}