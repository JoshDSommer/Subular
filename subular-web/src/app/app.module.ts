import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { InputTextModule, PasswordModule, ButtonModule, DataTableModule, SharedModule } from 'primeng/primeng';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { SubularBrandComponent } from './components/subular-brand/subular-brand.component';

import { SubsonicAuthenticationService, SubsonicService } from '../subular-shared';
import { LOCALSTORAGE_SERVICE } from './providers/localstorage.service';
import { SubularAppComponent } from './views/subular-app/subular-app.component';
import { RandomAlbumsComponent } from './views/subular-app/random-albums/random-albums.component';
import { HttpModule } from '@angular/http';
import { SubularSharedModule } from '../subular-shared/subular-shared.module';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { PlayerComponent } from './components/player/player.component';
import { AlbumsComponent } from './views/subular-app/albums/albums.component';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { MD5_SERVICE } from './providers/md5.provider';
import { AlbumComponent } from './views/subular-app/album/album.component';
import { PlayerService } from './services/player.service';
import { GutterComponent } from './components/gutter/gutter.component';

@NgModule({
	declarations: [
		AlbumCardComponent,
		AlbumsComponent,
		AlbumComponent,
		AppComponent,
		ArtistListComponent,
		LoginComponent,
		PlayerComponent,
		RandomAlbumsComponent,
		SubularBrandComponent,
		SubularAppComponent,
		GutterComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		ButtonModule,
		DataTableModule,
		InputTextModule,
		HttpModule,
		PasswordModule,
		ReactiveFormsModule,
		SharedModule,
		SubularSharedModule.forRoot()
	],
	providers: [
		LOCALSTORAGE_SERVICE, MD5_SERVICE,
		PlayerService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
