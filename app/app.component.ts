import {Component} from 'angular2/core';
import {SubularService} from './services/subular-service';
import {SettingsService} from './services/settings-service';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {SubularPlayer} from './components/subular-player/subular-player'
import {ArtistList} from './components/artist-list/artist-list'
import {Settings} from './components/settings/settings'
import {Artist} from './models/artist';
import {Album} from './models/album';
import {PlayerService} from './services/player-service';
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
	{ path: '/', name: 'ArtistList', component: ArtistList },
	{ path: '/settings', name: 'Settings', component: Settings }
])

export class SubularApp {
	getData: string;
	items: Array<any>;
	public albums: Album[];
	public imgUrl: string;
	public selectedArtist: Artist;
	public nowPlaying: any[];
	public page: number = 1;

	constructor(private _dataService: SubularService, public playerService: PlayerService) {


	}

}
