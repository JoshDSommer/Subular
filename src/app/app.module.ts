import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { StoreModule, provideStore } from '@ngrx/store';
import { instrumentStore } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';
import { HTTP_PROVIDERS } from '@angular/http';
import { runEffects } from '@ngrx/effects';

import { servers, artists, appState, nowPlaying } from './reducers/reducers.index';
import { SubularService } from './services/subsonic.service';

import { ArtistsComponent } from './components/artists/artists.component';

@NgModule({
  declarations: [AppComponent, ArtistsComponent],
  imports: [BrowserModule, routing],
  bootstrap: [AppComponent],
  providers:[
	provideStore({ servers, artists, appState, nowPlaying }),
	runEffects(SubularService),
	HTTP_PROVIDERS,
	instrumentStore({
		monitor: useLogMonitor({
			visible: true,
			position: 'right'
		})
	})
]
})
export class AppModule {

}
