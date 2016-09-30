import { Component, Input } from '@angular/core';
import { SubularService } from './services/subsonic.service';
import { StoreService } from './services/store.service';
import { PlayerService } from './services/player.service';
import { Store, Action } from '@ngrx/store';
import { Observable, Subject } from 'rxjs/Rx';
import { IServer, REDUCERS_DICTONARY, SERVER_ACTIONS, AppState, NOW_PLAYING_ACTIONS,APP_STATE_ACTIONS } from './reducers/reducers.index';
import { IArtist } from './shared/models';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [SubularService, StoreService,PlayerService],
})
export class AppComponent {
	title = 'Subular';
	tracks: any[];
	something: Observable<IArtist>;
	servers: Observable<IServer[]>;
	appState: Observable<AppState>;

	appStateEnum;

	constructor(private subular: SubularService, private store: Store<any>, private storeService: StoreService) {
		this.servers = this.store.select<IServer[]>(REDUCERS_DICTONARY.servers);
		this.appState = this.store.select<AppState>(REDUCERS_DICTONARY.appState);
		this.appStateEnum = AppState;

		let newServer: IServer = {
			name: 'home',

			serverUserName: 'admin',
			salt: '',
			selected: true
		};

		this.store.dispatch({ type: SERVER_ACTIONS.ADD_SERVER, payload: newServer });

		this.subular.buildServerData().subscribe(null,null,() => {
			this.store.dispatch({ type: APP_STATE_ACTIONS.PAUSED });
		});
	}
	ngOnInit(): void {
	}
}
