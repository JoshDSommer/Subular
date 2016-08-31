import { Component } from '@angular/core';
import { SubularService } from './services/subsonic.service';
import { StoreService } from './services/store.service';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { IServer, IArtist, REDUCERS_DICTONARY, SERVER_ACTIONS, AppState, NOW_PLAYING_ACTIONS } from './reducers/reducers.index';
import { StoreLogMonitorComponent } from '@ngrx/store-log-monitor';
import { routing } from './app.routing';

@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css'],
	providers: [SubularService, StoreService],
	directives: [StoreLogMonitorComponent]
})
export class AppComponent {
	title = 'app works!';
	tracks: any[];
	artists: Observable<IArtist[]>;
	something: Observable<IArtist>;
	servers: Observable<IServer[]>;
	appState: Observable<AppState>;
	click$ = new Subject<IArtist>();

	appStateEnum;

	constructor(private subular: SubularService, private store: Store<any>, private storeService: StoreService) {
		this.artists = this.store.select<IArtist[]>(REDUCERS_DICTONARY.artists);
		this.servers = this.store.select<IServer[]>(REDUCERS_DICTONARY.servers);
		this.appState = this.store.select<AppState>(REDUCERS_DICTONARY.appState);
		this.appStateEnum = AppState;

		let newServer: IServer = {
			name: 'work',
			serverAddress: 'http://localhost:4040',
			serverPassword: 'admin',
			serverUserName: 'admin',
			salt: '',
			selected: true
		};

		this.artists.subscribe((artist) => console.log('Updated Lists', artist));

		this.store.dispatch({ type: SERVER_ACTIONS.ADD_SERVER, payload: newServer });
	}
	ngOnInit(): void {
		this.click$.subscribe(artist => {
			this.subular.getArtistInfo(artist.id).subscribe();
		});
	}
}
