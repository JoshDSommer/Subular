import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { SubularAppComponent } from './views/subular-app/subular-app.component';
import { ArtistListComponent } from './views/subular-app/artist-list/artist-list.component';
import { AlbumsComponent } from './views/subular-app/albums/albums.component';
import { AlbumsResolver, AlbumResolver } from './resolvers';
import { AlbumComponent } from './views/subular-app/album/album.component';
import { AlbumHeaderResolver } from './views/subular-app/album/album-header.resolver';
import { PlayerComponent } from './views/player/player.component';
import { PlaylistsComponent } from './views/subular-app/playlists/playlists.component';
import { PlaylistComponent } from './views/subular-app/playlist/playlist.component';
import { RecentlyAddedComponent } from './views/subular-app/recently-added/recently-added.component';
import { AddToPlaylistComponent } from './views/subular-app/add-to-playlist/add-to-playlist.component';
import { SupaComponent } from './views/supa/supa.component';
import { PlayerWrapComponent } from './views/player/player-wrap/player-wrap.component';

export interface SubularRouteData {
  title?: string;
  backLinkTitle?: string;
  backLinkUrl?: string[];
  headerData?: SubularRouteData;
}

const routes: Routes = [
  { path: '', redirectTo: '/app/artists', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'app',
    component: SubularAppComponent,
    children: [
      { path: '', redirectTo: 'artists', pathMatch: 'full' },
      {
        path: 'artists',
        component: ArtistListComponent,
        data: {
          title: 'Artists',
          backLink: null,
          backLinkUrl: null
        }
      },
      {
        path: 'albums/:artistId',
        component: AlbumsComponent,
        resolve: {
          albums: AlbumsResolver
        },
        data: {
          title: null,
          backLinkTitle: 'Artists',
          backLinkUrl: ['/app/artists']
        }
      },
      {
        path: 'album/:albumId',
        component: AlbumComponent,
        resolve: {
          headerData: AlbumHeaderResolver
        }
      },
      {
        path: 'playlists',
        component: PlaylistsComponent,
        data: {
          title: 'Playlists',
          backLink: null,
          backLinkUrl: null
        }
      },
      { path: 'playlist/:playlistId', component: PlaylistComponent },
      {
        path: 'recent',
        component: RecentlyAddedComponent,
        data: {
          title: 'Recent',
          backLink: null,
          backLinkUrl: null
        }
      },
      {
        path: 'supa',
        component: SupaComponent,
        data: {
          title: ' ',
          backLink: null,
          backLinkUrl: null
        }
      }
    ]
  },
  {
    path: 'player',
    component: PlayerWrapComponent
  },
  {
    path: 'addToPlaylist/:songId',
    component: AddToPlaylistComponent
  }
];

@NgModule({
  declarations: [],
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
