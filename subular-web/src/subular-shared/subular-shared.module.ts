import { NgModule, ModuleWithProviders } from '@angular/core';
import { SubsonicService } from './subsonic.service';
import { SubsonicAuthenticationService } from './subsonic-authentication.service';
import { HttpModule } from '@angular/http';
import { SubsonicGuard } from './subsonic.guard';
import { SubsonicCachedService } from './subsonic.cached.service';
import { SubularAppBaseComponent } from './components/subular-app.base.component';
import { AlbumsResolver, AlbumResolver } from './resolvers';

@NgModule({
	declarations:[
		SubularAppBaseComponent
	],
	exports:[
		SubularAppBaseComponent
	]
})
export class SubularSharedModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: SubularSharedModule,
			providers: [
				SubsonicAuthenticationService,
				SubsonicService,
				SubsonicGuard,
				SubsonicCachedService,
				AlbumsResolver,
				AlbumResolver
			]
		};
	}
}
