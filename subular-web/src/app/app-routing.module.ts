import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { LoginComponent } from './views/login/login.component'
import { SubularAppComponent } from './views/subular-app/subular-app.component';
import { RandomAlbumsComponent } from './views/random-albums/random-albums.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{
		path: 'app', component: SubularAppComponent, children: [
			{ path: '', component: RandomAlbumsComponent, outlet: 'subular' }
		]
	},

];

@NgModule({

	imports: [
		RouterModule.forRoot(routes, { useHash: true })
	],
	exports: [RouterModule],

})
export class AppRoutingModule { }
