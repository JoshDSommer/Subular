import { Injectable } from '@angular/core';
import { LOCALSTORAGE_PROVIDER } from './localstorage.provider';
import { MD5 } from 'crypto-js';

const SERVER_INFO_KEY = 'SERVERINFO';

@Injectable()
export class SubsonicAuthenticationService {

	private salt: string;
	private serverUrl: string;
	private username: string;
	private password: string;

	constructor(private localStorage: LOCALSTORAGE_PROVIDER) {
	}

	saveAuthenticationInfo(server: string, username: string, password: string) {
		this.salt = this.salt || this.makeSalt();
		this.password = MD5(password + this.salt).toString();
		this.username = username;
		this.serverUrl = server;

		localStorage.setItem(SERVER_INFO_KEY, JSON.stringify({ server, username, password: this.password, salt: this.salt }));

	}

	getServerURl(method: string) {
		let serverUrl = this.serverUrl + '/rest/' + method + '.view?u=' + this.username + '&t=' + this.password + '&s=' + this.salt + '&v=1.0.0&c=rest&f=json';
		return serverUrl;
	}

	private makeSalt(): string {
		let text = "";
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 15; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}
}