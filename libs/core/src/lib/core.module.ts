import { NgModule, ModuleWithProviders } from '@angular/core';
import { SubsonicService } from './services/subsonic.service';
import { SubsonicAuthenticationService } from './services/subsonic-authentication.service';
import { HttpModule } from '@angular/http';
import { SubsonicGuard } from './subsonic.guard';
import { SubsonicCachedService } from './services/subsonic.cached.service';
import { SubularAppBaseComponent } from './components/subular-app.base.component';
import { AlbumsResolver, AlbumResolver } from './resolvers';
import { SongStoreService } from './services';

@NgModule({
  declarations: [SubularAppBaseComponent],
  exports: [SubularAppBaseComponent]
})
export class SubularCoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SubularSharedModule,
      providers: [
        SubsonicAuthenticationService,
        SubsonicService,
        SubsonicGuard,
        SubsonicCachedService,
        AlbumsResolver,
        AlbumResolver,
        SongStoreService
      ]
    };
  }
}
