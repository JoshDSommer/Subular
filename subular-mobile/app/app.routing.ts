import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./views/login/login.component";
import { SubularAppComponent } from "./views/subular-app/subular-app.component";
import { ArtistListComponent } from "./views/subular-app/artist-list/artist-list.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    {
		path: 'app',
		component: SubularAppComponent,
		children: [
			{ path: '', redirectTo: 'artists', pathMatch: 'full' },
			{ path: 'artists', component: ArtistListComponent },
		// 	{ path: 'random', component: RandomAlbumsComponent },
		// 	{
		// 		path: 'albums/:artistId', component: AlbumsComponent,
		// 		resolve: {
		// 			albums: AlbumResolver
		// 		}
		// 	},
		// 	{ path: 'artist/:id', component: RandomAlbumsComponent },
		// 	{ path: 'playlists', component: RandomAlbumsComponent },
		// 	{ path: 'playlist/:id', component: RandomAlbumsComponent }
		]
	},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }