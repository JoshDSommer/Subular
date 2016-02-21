import {Component, ViewEncapsulation} from 'angular2/core';
import {SettingsService} from './../../shared/services/settings-service';
import {SubularService} from './../../shared/services/subular-service';
import {Router}              from 'angular2/router';

@Component({
	selector: 'settings',
	templateUrl: '/app/components/settings/settings.html',
	styles: [`
	.form-group{
		margin-left:10px;
	}
	`],
	inputs: ['server', 'username', 'password', 'loading'],
	providers: [SettingsService]
})

export class Settings {
	public server: string;
	public username: string;
	public password: string;
	public loading: boolean = false;

	constructor(private _settings: SettingsService, private _dataService: SubularService, private _router: Router) {
		this.server = this._settings.ServerAddress;
		this.username = this._settings.Username;
		this.password = this._settings.Password;
	}
	save(): void{
		this._settings.ServerAddress = this.server;
		this._settings.Username = this.username;
		this._settings.Password = this.password;
	}
	refreshData(): void {
		this.save();
		this._dataService.buildServerData();
		this.loading = true;
		setTimeout(() => {
			this._router.navigate(['ArtistList']);
		}, 15000);

	}
	testConnection(): void{

	}
}
