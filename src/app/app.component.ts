import { Component } from '@angular/core';
import { SubularService } from './services/subsonic.service';
import { StoreService } from './services/store.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IServer, IArtist, REDUCERS_DICTONARY, SERVER_ACTIONS, AppState } from './reducers/reducers.index';
import { StoreLogMonitorComponent } from '@ngrx/store-log-monitor';


@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css'],
	providers: [SubularService,StoreService],
	directives: [StoreLogMonitorComponent]
})
export class AppComponent {
	title = 'app works!';
	artists: Observable<IArtist>;
	servers: Observable<IServer[]>;
	appState: Observable<AppState>;
	appStateEnum;

	constructor(private subular: SubularService, private store: Store<any>, private storeService: StoreService) {
		this.artists = <any>this.store.select(REDUCERS_DICTONARY.artists);
		this.servers = <any>this.store.select(REDUCERS_DICTONARY.servers);
		this.appState = <any>this.store.select(REDUCERS_DICTONARY.appState);

		this.appStateEnum = AppState;

		let newServer: IServer = {
			name: 'home',
			serverAddress: '',
			serverPassword: '',
			serverUserName: '',
			salt: '',
			selected: true
		};

		this.store.dispatch({ type: SERVER_ACTIONS.ADD_SERVER, payload: newServer });

	}
}
