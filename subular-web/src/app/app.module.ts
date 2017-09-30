import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { InputTextModule, PasswordModule, ButtonModule } from 'primeng/primeng';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { SubularBrandComponent } from './components/subular-brand/subular-brand.component';

import { SubsonicAuthenticationService } from '../subular-shared/subsonic-authentication.service';
import { SubsonicService } from '../subular-shared/subsonic.service';
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

@NgModule({
	declarations: [
		AlbumCardComponent,
		AlbumsComponent,
		AppComponent,
		ArtistListComponent,
		LoginComponent,
		PlayerComponent,
		RandomAlbumsComponent,
		SubularBrandComponent,
		SubularAppComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		ButtonModule,
		InputTextModule,
		HttpModule,
		PasswordModule,
		ReactiveFormsModule,
		SubularSharedModule.forRoot()
	],
	providers: [
		LOCALSTORAGE_SERVICE, MD5_SERVICE
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
