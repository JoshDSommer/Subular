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
		path: 'artist/:id',
		component: ArtistInfoComponent
	},
	{
		path: 'album/:id',
		component: AlbumComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

