import { NgModule } from '@angular/core';
import { SubsonicService } from './subsonic.service';
import { SubsonicAuthenticationService } from './subsonic-authentication.service';
import { HttpModule } from '@angular/http';

@NgModule({
	imports:[
	],
	providers: [
		SubsonicAuthenticationService,
		SubsonicService,
	],
})
export class SharedServicesModule { }