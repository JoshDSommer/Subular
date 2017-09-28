import { NgModule, ModuleWithProviders } from '@angular/core';
import { SubsonicService } from './subsonic.service';
import { SubsonicAuthenticationService } from './subsonic-authentication.service';
import { HttpModule } from '@angular/http';
import { SubsonicGuard } from './subsonic.guard';
import { SubsonicCachedService } from './subsonic.cached.service';
import { LOCALSTORAGE_PROVIDER } from './localstorage.provider';
import { MD5_PROVIDER } from './md5.provider';
import { SubularAppBaseComponent } from './components/subular-app.base.component';

@NgModule({
	declarations:[
		SubularAppBaseComponent
	],
	exports:[
		SubularAppBaseComponent
	]
})
export class SubularSharedModule {
	public static forRoot(...providers): ModuleWithProviders {
		return {
			ngModule: SubularSharedModule,
			providers: [
				SubsonicAuthenticationService,
				SubsonicService,
				SubsonicGuard,
				SubsonicCachedService,
				providers
			]
		};
	}
}
