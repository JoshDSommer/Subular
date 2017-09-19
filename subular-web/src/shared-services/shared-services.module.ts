import { NgModule } from '@angular/core';
import { SubsonicService } from './subsonic.service';
import { SubsonicAuthenticationService } from './subsonic-authentication.service';
import { HttpModule } from '@angular/http';
import { SubsonicGuard } from './subsonic.guard';
import { CachedAlbumArtistService } from './cached-album-artist.service';

@NgModule({
	imports:[
	],
	providers: [
		SubsonicAuthenticationService,
		SubsonicService,
		SubsonicGuard,
		CachedAlbumArtistService
	],
})
export class SharedServicesModule { }