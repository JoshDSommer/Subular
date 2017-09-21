import { Injectable } from '@angular/core';
import { LOCALSTORAGE_PROVIDER } from './localstorage.provider';
import { MD5 } from 'crypto-js';

const SERVER_INFO_KEY = 'SERVERINFO';
interface IServerInfo {
	server: string;
	username: string;
	password: string;
	salt: string;
}

@Injectable()
export class SubsonicAuthenticationService {

	private salt: string;
	private server: string;
	private username: string;
	private password: string;


	constructor(private localStorage: LOCALSTORAGE_PROVIDER) {
		const existingInfo = localStorage.getValue(SERVER_INFO_KEY) as IServerInfo;

		if (existingInfo) {
			this.password = existingInfo.password;
			this.server = existingInfo.server;
			this.username = existingInfo.username;
			this.salt = existingInfo.salt;
		}
	}

	saveAuthenticationInfo(server: string, username: string, password: string) {
		this.salt = this.salt || this.makeSalt();
		this.password = MD5(password + this.salt).toString();
		this.username = username;
		this.server = server;

		localStorage.setItem(SERVER_INFO_KEY, JSON.stringify(<IServerInfo>{ server, username, password: this.password, salt: this.salt }));

	}

	getServerURl(method: string) {
		let serverUrl = this.server + '/rest/' + method + '.view?u=' + this.username + '&t=' + this.password + '&s=' + this.salt + '&v=1.0.0&c=rest&f=json';
		return serverUrl;
	}

	private makeSalt(): string {
		let text = "";
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 99; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}
}