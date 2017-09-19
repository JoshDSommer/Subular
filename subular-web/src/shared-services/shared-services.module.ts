import { NgModule } from '@angular/core';
import { SubsonicService } from './subsonic.service';
import { SubsonicAuthenticationService } from './subsonic-authentication.service';
import { HttpModule } from '@angular/http';
import { SubsonicGuard } from './subsonic.guard';

@NgModule({
	imports:[
	],
	providers: [
		SubsonicAuthenticationService,
		SubsonicService,
		SubsonicGuard
	],
})
export class SharedServicesModule { }