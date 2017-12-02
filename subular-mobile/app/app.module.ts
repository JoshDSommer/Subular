import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { LOCALSTORAGE_PROVIDER, SubularSharedModule } from 'subular';

import { LOCALSTORAGE_SERVICE } from './providers/localstorage.service';
import { MD5_SERVICE } from './providers/md5.service';
import { LoginComponent } from './views/login/login.component';

// import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { TNSFrescoModule } from 'nativescript-fresco/angular';
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { SubularAppComponent } from './views/subular-app/subular-app.component';
import { ArtistListComponent } from './views/subular-app/artist-list/artist-list.component';
import { AlbumsComponent } from './views/subular-app/albums/albums.component';

import * as applicationModule from "tns-core-modules/application";
import * as frescoModule from "nativescript-fresco";
import { AlbumComponent } from './views/subular-app/album/album.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { PlayerService } from './services/player.service';
import { AnimateDirective } from './directives/animate.directive';
import { SlideBackDirective } from './directives/slideBack.directive';
import { SubularMobileService } from './services/subularMobile.service';
import { AlbumsResolver, AlbumResolver } from './resolvers';
import { PlayerComponent } from './views/player/player.component';
import { NativeShadowDirective } from './directives/shadow.directive';

if (applicationModule.android) {
    applicationModule.on("launch", () => {
        frescoModule.initialize();
    });
}

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        SubularSharedModule.forRoot(),
        NativeScriptModule,
        NativeScriptHttpModule,
        AppRoutingModule,
        TNSFrescoModule,
    ],
    declarations: [
        AppComponent,
        AlbumsComponent,
        ArtistListComponent,
        AnimateDirective,
        LoginComponent,
        SubularAppComponent,
        AlbumComponent,
        SongListComponent,
        PlayerComponent,
        NativeShadowDirective,
        SlideBackDirective,
    ],
    providers: [
        LOCALSTORAGE_SERVICE,
        MD5_SERVICE,
        PlayerService,
        SubularMobileService,
        AlbumsResolver,
        AlbumResolver

    ],
    schemas: [
        NO_ERRORS_SCHEMA

    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
