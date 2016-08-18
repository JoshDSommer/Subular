import { Injectable } from '@angular/core';
import * as cryptoJs from 'crypto-js';

@Injectable()
export class AuthenticationService {

	constructor() { }


	makeSalt(): string {
		let salt = '';
		let possibleValues = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (let index = 0; index < 15; index++){
			salt += possibleValues.charAt(Math.floor(Math.random() * possibleValues.length));
		}

		return salt;
	}
}
