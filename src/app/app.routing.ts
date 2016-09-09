import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';

import { ArtistInfoComponent } from './components/artistInfo/artistInfo.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { AlbumComponent } from './components/album/album.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes =[
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'artist/:artistId',
		component: ArtistInfoComponent
	},
	{
		path: 'artist/:artistId/album/:albumId',
		component: AlbumComponent,
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

