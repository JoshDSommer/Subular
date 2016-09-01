import { Component } from '@angular/core';
import { SubularService } from './services/subsonic.service';
import { StoreService } from './services/store.service';
import { Store, Action } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { IServer, IArtist, REDUCERS_DICTONARY, SERVER_ACTIONS, AppState, NOW_PLAYING_ACTIONS } from './reducers/reducers.index';
import { StoreLogMonitorComponent } from '@ngrx/store-log-monitor';


@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css'],
	providers: [SubularService, StoreService],
	directives: [StoreLogMonitorComponent]
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
			name: 'hom2e',
			serverAddress: 'http://thesommerfamily.subsonic.org',
			serverPassword: 'qCCPmCczkWDvGo4Z',
			serverUserName: 'admin',
			salt: '',
			selected: true
		};

		this.store.dispatch({ type: SERVER_ACTIONS.ADD_SERVER, payload: newServer });
	}
	ngOnInit(): void {
	}
}
