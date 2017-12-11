import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

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
import { HeartComponent } from './components/heart/heart.component';
import { HighlightDirective } from './directives/highlight.directive';
import { WorkerService, DownloadQueueService } from './services';
import { PlaylistsComponent } from './views/subular-app/playlists/playlists.component';
import { PlaylistComponent } from './views/subular-app/playlist/playlist.component';
import { SlideDownBackDirective } from './directives/slideDownBack.directive';
import { SlideForwardDirective } from './directives/slideForward.directive';
import { CurrentConnectionService } from './services/currentConnection.service';
import { RecentlyAddedComponent } from './views/subular-app/recently-added/recently-added.component';

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
        HeartComponent,
        HighlightDirective,
        PlaylistsComponent,
        PlaylistComponent,
        SlideDownBackDirective,
        SlideForwardDirective,
        RecentlyAddedComponent,
    ],
    providers: [
        LOCALSTORAGE_SERVICE,
        MD5_SERVICE,
        PlayerService,
        SubularMobileService,
        AlbumsResolver,
        AlbumResolver,
        WorkerService,
        DownloadQueueService,
        CurrentConnectionService
    ],
    schemas: [
        NO_ERRORS_SCHEMA

    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
