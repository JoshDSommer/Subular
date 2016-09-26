import { Component, OnInit } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { IServer, REDUCERS_DICTONARY, SERVER_ACTIONS, AppState, NOW_PLAYING_ACTIONS } from '../../reducers/reducers.index';
import { SubularService } from '../../services/subsonic.service';
import { IArtist, IAlbum } from '../../shared/models';


@Component({
	selector: 'artists',
	templateUrl: './artists.component.html',
	styleUrls: ['./artists.component.css']
})

export class ArtistsComponent implements OnInit {
	appState: Observable<AppState>;
	artists$: Observable<IArtist[]>;
	selectedArtist:Subject<IArtist>;
	click$ = new Subject<IArtist>();

	appStateEnum;

	constructor(private store: Store<any>, private subular: SubularService){
		this.appState = this.store.select<AppState>(REDUCERS_DICTONARY.appState);
		this.appStateEnum = AppState;
	}

	ngOnInit() {
		this.artists$ = this.subular.getArtists();
	 }
}