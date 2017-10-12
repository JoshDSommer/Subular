import { Component, OnInit } from '@angular/core';
import { RouterResolverDataObservable, IAlbum, SubsonicService, ISong } from '../../../../subular-shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
	selector: 'album',
	templateUrl: 'album.component.html',
	styleUrls: ['album.component.css']
})

export class AlbumComponent implements OnInit {
	songs$: Observable<ISong[]>
	album$: Observable<IAlbum>;

	dataTableSongs: ISong[] =[];

	constructor(private route: ActivatedRoute, private router: Router, private subsonic: SubsonicService) { }
	ngOnInit() {
		this.album$ = RouterResolverDataObservable<IAlbum>(this.route, this.router, 'album');

		this.songs$ = this.album$.switchMap(album => this.subsonic.getSongs(album.id));
	}
}