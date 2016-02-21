import {Component, OnInit} from 'angular2/core';
import {SubularService} from './shared/services/subular-service';
import {SettingsService} from './shared/services/settings-service';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {SubularPlayer} from './shared/directives/subular-player/subular-player';
import {ArtistList} from './components/artist-list/artist-list';
import {Settings} from './components/settings/settings';
import {Artist} from './shared/models/artist';
import {Album} from './shared/models/album';
import {PlayerService} from './shared/services/player-service';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
	selector: 'subular',
	templateUrl: '/app/app.html',
	providers: [SubularService, SettingsService, SubularPlayer, ArtistList, PlayerService],
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
	directives: [SubularPlayer, ArtistList, Settings, ROUTER_DIRECTIVES]


})
@RouteConfig([
	{ path: '/artist', name: 'ArtistList', component: ArtistList, useAsDefault: true },
	{ path: '/settings', name: 'Settings', component: Settings },
])

export class SubularApp implements OnInit {
	getData: string;
	items: Array<any>;
	public albums: Album[];
	public imgUrl: string;
	public selectedArtist: Artist;
	public nowPlaying: any[];
	public page: number = 1;

	constructor(private _dataService: SubularService, public playerService: PlayerService) {
		if (this._dataService.getArtists() != null && this._dataService.getArtists().length == 0)
			this._dataService.buildServerData();

		setTimeout(() => {
			console.log('done');
		}, 6000);


	}

	ngOnInit(): void {

	}
}
