import { Injectable } from '@angular/core';
import { LOCALSTORAGE_PROVIDER } from './localstorage.provider';

const SERVER_INFO_KEY = 'SERVERINFO';

@Injectable()
export class SubsonicAuthenticationService {

	constructor(private localStorage: LOCALSTORAGE_PROVIDER) {
	}

	saveAuthenticationInfo(server: string, username: string, password: string) {
		localStorage.setItem(SERVER_INFO_KEY, JSON.stringify({ server, username, password }));
	}
}