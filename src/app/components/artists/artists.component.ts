import { Component, OnInit } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { IServer, IArtist, REDUCERS_DICTONARY, SERVER_ACTIONS, AppState, NOW_PLAYING_ACTIONS } from '../../reducers/reducers.index';
@Component({
	moduleId: module.id,
	selector: 'artists',
	templateUrl: 'artists.component.html'
})

export class ArtistsComponent implements OnInit {
	appState: Observable<AppState>;
	appStateEnum;

	constructor(private store: Store<any>){
		this.appState = this.store.select<AppState>(REDUCERS_DICTONARY.appState);
		this.appStateEnum = AppState;

	}

	ngOnInit() { }
}