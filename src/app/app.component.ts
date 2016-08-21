import { Component } from '@angular/core';
import { SubularService } from './services/subsonic.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IServer, IArtist, REDUCERS_DICTONARY, SERVER_ACTIONS, AppState } from './reducers/reducers.index';

@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css'],
	providers: [ SubularService]
})
export class AppComponent {
	title = 'app works!';
	artists: Observable<IArtist>;
	server: Observable<IServer[]>;
	appState: Observable<AppState>;

	constructor(private subular: SubularService, private store: Store<any>) {
		this.artists = <any>this.store.select(REDUCERS_DICTONARY.artists);
		this.server = <any>this.store.select(REDUCERS_DICTONARY.servers);
		this.appState = <any>this.store.select(REDUCERS_DICTONARY.appState);

		let newServer: IServer = {
			name: '',
			serverAddress: '',
			serverPassword: '',
			serverUserName: '',
			salt: '',
			selected: true
		}

		this.server.subscribe((server: IServer[]) => {
			if (server && server[0]) {
				this.subular.buildServerData(server[0]);
			}
		});

		this.store.dispatch({ type: SERVER_ACTIONS.ADD_SERVER, payload: newServer });

	}
}
