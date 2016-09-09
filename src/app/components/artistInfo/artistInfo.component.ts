import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IServer, REDUCERS_DICTONARY, SERVER_ACTIONS, AppState, NOW_PLAYING_ACTIONS } from '../../reducers/reducers.index';
import { ActivatedRoute, Params } from '@angular/router';
import { SubularService } from '../../services/subsonic.service';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { IArtist, IAlbum } from '../../shared/models';



@Component({
	moduleId: module.id,
	selector: 'artistInfo',
	templateUrl: 'artistInfo.component.html',
})
export class ArtistInfoComponent implements OnInit, OnChanges {
	artist: any;
	artists: Observable<IArtist[]>;
	albums$: Observable<IAlbum[]>;
	getCoverUrl:Function;


	bio:string;
	constructor(private subular: SubularService, private route: ActivatedRoute, private ref:ChangeDetectorRef, private store: Store<any> ){
		this.route.params.forEach((params: Params) => {
			let id = +params['artistId'];
			this.artist=null;
			this.albums$ = this.subular.getArtistAlbums(id);
			this.subular.getArtistInfo(id).subscribe(value=>this.artist = value);
		});
	}

	ngOnInit() {

	}
	ngAfterViewInit(){

	}

	ngOnChanges() {
		console.log('ch ch ch changes...')
	}
}