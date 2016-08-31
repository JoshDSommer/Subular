/// <reference path="../typings/index.d.ts" />

// import { bootstrap } from '@angular/platform-browser-dynamic';
// import { enableProdMode } from '@angular/core';
// import { AppComponent, environment } from './app/';
// import { StoreModule, provideStore } from '@ngrx/store';
// import { instrumentStore } from '@ngrx/store-devtools';
// import { useLogMonitor } from '@ngrx/store-log-monitor';
// import { HTTP_PROVIDERS } from '@angular/http';
// import { runEffects } from '@ngrx/effects';

// import { servers, artists, appState, nowPlaying } from './app/reducers/reducers.index';
// import { SubularService } from './app/services/subsonic.service';

// if (environment.production) {
// 	enableProdMode();
// }

// bootstrap(AppComponent, [
// 	provideStore({ servers, artists, appState, nowPlaying }),
// 	runEffects(SubularService),
// 	HTTP_PROVIDERS,
// 	instrumentStore({
// 		monitor: useLogMonitor({
// 			visible: true,
// 			position: 'right'
// 		})
// 	})
// ]);
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);