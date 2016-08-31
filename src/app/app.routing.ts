import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';

import { ArtistsComponent } from './components/artists/artists.component';

const appRoutes: Routes =[
	{
		path: 'artists',
		component: ArtistsComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

