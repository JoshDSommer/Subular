import {Injectable} from 'angular2/core';
declare let CryptoJS: any;

@Injectable()
export class SettingsService {

	constructor() {
		if (this.salt == null || this.salt === '')
			this.salt = this.makeSalt();
	}

	private _serverAddress: string;

	get salt(): string {
		return window.localStorage['subsonic-salt'];
	}
	set salt(v) {
		window.localStorage.setItem('subsonic-salt', v);
	}

	get ServerAddress() {
		return window.localStorage.getItem("server-address");
	}

	set ServerAddress(v: string) {
		window.localStorage.setItem("server-address", v);
	}

	get Username() {
		return window.localStorage.getItem("server-username");
	}

	set Username(v: string) {
		window.localStorage.setItem("server-username", v);
	}

	get Password(): string {
		return window.localStorage.getItem("server-password");
	}

	set Password(v: string) {
		window.localStorage.setItem("server-password", CryptoJS.MD5(v + this.salt).toString());
	}


	getServerURl(method: string) {
		let serverUrl = this.ServerAddress + '/rest/' + method + '.view?u=' + this.Username + '&t=' + this.Password + '&s=' + this.salt + '&v=1.0.0&c=rest&f=json';
		return serverUrl;
	}

	makeSalt(): string {
		let text = "";
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 15; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}

	defaultBackground(): void {
		document.body.setAttribute('style', `
						background: -webkit-linear-gradient(#4B0082, #101010, #080808);
						background: -o-linear-gradient(#4B0082, #101010, #080808);
						background: linear-gradient(#4B0082, #101010, #080808);;
						`);
	}
}