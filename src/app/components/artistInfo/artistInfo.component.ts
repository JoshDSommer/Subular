import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import {
	DomSanitizer,
	SafeHtml,
	SafeUrl,
	SafeStyle
} from '@angular/platform-browser';

import { IServer, REDUCERS_DICTONARY, SERVER_ACTIONS, AppState, NOW_PLAYING_ACTIONS } from '../../reducers/reducers.index';
import { ActivatedRoute, Params } from '@angular/router';
import { SubularService } from '../../services/subsonic.service';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { IArtist, IAlbum } from '../../shared/models';


@Component({
	selector: 'artistInfo',
	templateUrl: './artistInfo.component.html',
	styleUrls:['./artistInfo.component.css']
})
export class ArtistInfoComponent implements OnInit, OnChanges {
	@ViewChild('componentWrap') componentWrap: ElementRef;

	artist: any;
	artistName:string;
	artists: Observable<IArtist[]>;
	albums$: Observable<IAlbum[]>;
	getCoverUrl: Function;
	backgroundImage: SafeStyle;

	bio: string;
	constructor(private subular: SubularService, private route: ActivatedRoute, private store: Store<any>, private sanitization: DomSanitizer ) {
		this.route.params.forEach((params: Params) => {
			let id = +params['artistId'];
			this.artist = null;
			this.albums$ = this.subular.getArtistAlbums(id);

			this.subular.getArtist(id).subscribe(value=>{
				if(value)
					this.artistName= value.name;

				if(!this.backgroundImage)
					this.backgroundImage = this.sanitization.bypassSecurityTrustStyle(`url('${value.coverArt}')`);

			});
			this.subular.getArtistInfo(id).subscribe(value => {
				this.artist = value
				if(!this.backgroundImage)

					this.backgroundImage = this.sanitization.bypassSecurityTrustStyle(`url('${this.artist.largeImageUrl}')`);
			});

		});
	}

	ngOnInit() {
	}

	ngAfterViewInit() {

	}

	ngOnChanges() {
		console.log('ch ch ch changes...')
	}
}