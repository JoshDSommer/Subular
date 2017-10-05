import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { LoginComponent } from './views/login/login.component'
import { SubularAppComponent } from './views/subular-app/subular-app.component';
import { RandomAlbumsComponent } from './views/subular-app/random-albums/random-albums.component';
import { SubsonicGuard } from '../subular-shared/subsonic.guard';
import { AlbumsComponent } from './views/subular-app/albums/albums.component';
import { AlbumsResolver, AlbumResolver } from '../subular-shared/resolvers';
import { AlbumComponent } from './views/subular-app/album/album.component';

const routes: Routes = [
	{
		path: '', redirectTo: 'login', pathMatch: 'full'
	},
	{
		path: 'login', component: LoginComponent
	},
	{
		path: 'app',
		component: SubularAppComponent,
		children: [
			{ path: '', redirectTo: 'random', pathMatch: 'full', canActivate: [SubsonicGuard] },
			{ path: 'random', component: RandomAlbumsComponent },
			{
				path: 'albums/:artistId', component: AlbumsComponent,
				resolve: {
					albums: AlbumsResolver
				}
			},
			{
				path:'album/:albumId', component: AlbumComponent,
				resolve: {
					album: AlbumResolver
				}
			},
			{ path: 'artist/:id', component: RandomAlbumsComponent },
			{ path: 'playlists', component: RandomAlbumsComponent },
			{ path: 'playlist/:id', component: RandomAlbumsComponent }
		]
	},

];

@NgModule({

	imports: [
		RouterModule.forRoot(routes, { useHash: true })
	],
	exports: [RouterModule],
	providers: [
	]

})
export class AppRoutingModule { }
