/// <reference path="../typings/index.d.ts" />

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { StoreModule, provideStore } from '@ngrx/store';
import { instrumentStore } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';
import { HTTP_PROVIDERS } from '@angular/http';

import { servers, artists, appState } from './app/reducers/reducers.index';

if (environment.production) {
	enableProdMode();
}

bootstrap(AppComponent, [
	provideStore({ servers, artists, appState }),
	HTTP_PROVIDERS,
	instrumentStore({
		monitor: useLogMonitor({
			visible: true,
			position: 'right'
		})
	})
]);
