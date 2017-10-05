import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IAlbum, IArtist } from '../../../../subular-shared/index';
import { Observable } from 'rxjs';
import { RouterResolverDataObservable, RouterParamObservable } from '../../../../subular-shared/functions';
import { SubsonicCachedService } from '../../../../subular-shared/subsonic.cached.service';

@Component({
	selector: 'albums',
	templateUrl: 'albums.component.html',
	styleUrls: ['albums.component.css']
})

export class AlbumsComponent implements OnInit {
	albums$: Observable<IAlbum[]>;
	artist$: Observable<IArtist>;
	constructor(private route: ActivatedRoute, private router: Router, private cached: SubsonicCachedService) {

	}
	ngOnInit() {
		this.artist$ = RouterParamObservable<number>(this.route, this.router, 'artistId')
			.switchMap(artistId => this.cached.getArtistById(artistId))
		this.albums$ = RouterResolverDataObservable<IAlbum[]>(this.route, this.router, 'albums')
	}
}