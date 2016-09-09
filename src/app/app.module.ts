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

import { servers,  appState, nowPlayingQueue, nowPlayingTrack } from './reducers/reducers.index';
import { SubularService } from './services/subsonic.service';

import { ArtistsComponent } from './components/artists/artists.component';
import { ArtistInfoComponent } from './components/artistInfo/artistInfo.component';
import { AlbumComponent } from './components/album/album.component';
import { HomeComponent } from './components/home/home.component';
import { Angular2DataTableModule } from 'angular2-data-table';

@NgModule({
  declarations: [AppComponent, ArtistsComponent, AlbumComponent, ArtistInfoComponent, HomeComponent],
  imports: [BrowserModule, routing, Angular2DataTableModule],
  bootstrap: [AppComponent],
  providers:[
	provideStore({ servers, appState, nowPlayingQueue, nowPlayingTrack }),
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
