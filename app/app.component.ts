import {Component, OnInit, enableProdMode } from 'angular2/core';
import {SubularService} from './shared/services/subular-service';
import {SettingsService} from './shared/services/settings-service';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {SubularPlayer} from './shared/directives/subular-player/subular-player';
import {ArtistList} from './artist-list/artist-list';
import {Settings} from './settings/settings';
import {IArtist} from './shared/models/artist';
import {IAlbum} from './shared/models/album';
import {PlayerService} from './shared/services/player-service';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Playlists} from './playlists/playlists';

//enableProdMode();

@Component({
	selector: 'subular',
	templateUrl: '/app/app.html',
	providers: [SubularService, SettingsService, SubularPlayer, ArtistList, Playlists, PlayerService],
	inputs: ['imgUrl', 'albums', 'nowPlaying', 'playerService', 'page'],
	styles: [`
		.card-dark{
			background:rgb(34, 34, 34);
		},
		.container{
			background:#fff;
		}
		.settings-button{
			color: #9d9d9d;
			font-size: 30px;
			line-height: 50px;
		}
		.settings-button:hover{
			color:#fff;
		}
	`],
	directives: [SubularPlayer, ArtistList, Settings, Playlists, ROUTER_DIRECTIVES]
})
@RouteConfig([
	{ path: '/', name: 'Landing', component: ArtistList, useAsDefault: true },
	{ path: '/artist', name: 'ArtistList', component: ArtistList },
	{ path: '/artist/:id', name: 'ArtistAlbums', component: ArtistList},
	{ path: '/artist/:id/:albumId', name: 'ArtistAlbum', component: ArtistList},
	{ path: '/settings', name: 'Settings', component: Settings },
	{ path: '/playlists', name: 'Playlists', component: Playlists },
])

export class SubularApp implements OnInit {
	getData: string;
	items: Array<any>;
	public albums: IAlbum[];
	public imgUrl: string;
	public selectedArtist: IArtist;
	public nowPlaying: any[];
	public page: number = 1;

	constructor(private _dataService: SubularService, public playerService: PlayerService) {
		if (this._dataService.getArtists() != null && this._dataService.getArtists().length == 0)
			this._dataService.buildServerData();
	}

	ngOnInit(): void {

	}
}
