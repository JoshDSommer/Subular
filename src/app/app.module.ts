import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { enableProdMode } from '@angular/core';
import { StoreModule, provideStore } from '@ngrx/store';
// import { instrumentStore } from '@ngrx/store-devtools';
import {  HttpModule, JsonpModule, Http } from '@angular/http';
// import {   } from '@ngrx/effects';

import { servers,  appState, nowPlayingQueue, nowPlayingTrack } from './reducers/reducers.index';
import { SubularService } from './services/subsonic.service';
import { PlayerService } from './services/player.service';

import { ArtistsComponent } from './components/artists/artists.component';
import { ArtistInfoComponent } from './components/artistInfo/artistInfo.component';
import { AlbumComponent } from './components/album/album.component';
import { PlayerComponent } from './components/player/player.component';
import { SongListComponent } from './components/songList/songList.component';
import { HomeComponent } from './components/home/home.component';
import { Angular2DataTableModule } from 'angular2-data-table';

@NgModule({
  declarations: [AppComponent, ArtistsComponent, AlbumComponent, ArtistInfoComponent, HomeComponent, SongListComponent, PlayerComponent],
  imports: [
	  	BrowserModule,
		routing,
		Angular2DataTableModule,
		HttpModule,
		JsonpModule,
		StoreModule.provideStore({ servers, appState, nowPlayingQueue, nowPlayingTrack })

  ],
  bootstrap: [AppComponent]
//   providers:[
// 	provideStore({ servers, appState, nowPlayingQueue, nowPlayingTrack }),
// 	runEffects(SubularService),
// 	runEffects(PlayerService),
// 	HTTP_PROVIDERS
// 	//,
// 	// instrumentStore({
// 	// 	monitor: useLogMonitor({
// 	// 		visible: true,
// 	// 		position: 'right'
// 	// 	})
// 	// })
// ]
})
export class AppModule {

}
