import {Component, ViewEncapsulation} from 'angular2/core';
import {SettingsService} from './../../services/settings-service';
import {SubularService} from './../../services/subular-service';

@Component({
	selector: 'settings',
    templateUrl: '/app/components/settings/settings.html',
	styles: [`
		.form-group{
			margin-left:10px;
		}
		`],
	inputs:['server','username','password'],
	providers: [SettingsService]
})

export class Settings {
	public server: string;
	public username: string;
	public password: string;

	constructor(private _settings: SettingsService, private _dataService: SubularService) {
		this.server = this._settings.ServerAddress;
		this.username = this._settings.Username;
		this.password = this._settings.Password;
	}

	refreshData(): void{
		this._settings.ServerAddress = this.server;
		this._settings.Username = this.username;
		this._settings.Password = this.password;
		this._dataService.buildServerData();
	}
}
