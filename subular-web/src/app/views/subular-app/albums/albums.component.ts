import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IAlbum, IArtist } from '../../../../subular-shared/index';
import { Observable } from 'rxjs/Observable';
import { RouterResolverDataObservable, RouterParamObservable } from '../../../../subular-shared/functions';
import { SubsonicCachedService, SubsonicService } from '../../../../subular-shared';
import { HostBinding } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
	selector: 'albums',
	templateUrl: 'albums.component.html',
	styleUrls: ['albums.component.css']
})

export class AlbumsComponent implements OnInit {
	albums$: Observable<IAlbum[]>;
	artist$: Observable<IArtist>;

	@HostBinding('style.background-image')
	backgroundImage;

	constructor(private route: ActivatedRoute, private router: Router, private cached: SubsonicCachedService,
		private subsonic: SubsonicService) {

	}
	ngOnInit() {
		this.artist$ = RouterParamObservable<number>(this.route, this.router, 'artistId')
			.switchMap(artistId => this.cached.getArtistById(artistId))
		this.albums$ = RouterResolverDataObservable<IAlbum[]>(this.route, this.router, 'albums');
	}

	getCoverArt(id) {
		this.backgroundImage = `url(${this.subsonic.subsonicGetCoverUrl(id)})`;
	}
}
