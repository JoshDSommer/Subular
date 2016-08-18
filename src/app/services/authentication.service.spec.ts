/* tslint:disable:no-unused-variable */
import * as cryptoJs from 'crypto-js';

import { addProviders, async, inject } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';

describe('Service: Authentication', () => {
	beforeEach(() => {
		addProviders([AuthenticationService]);
	});

	it('should be able to access CryptoJS', inject([AuthenticationService], (service: AuthenticationService) => {
		expect(cryptoJs).toBeTruthy();
	}));

	it('should have a salt upon initialization', inject([AuthenticationService], (service: AuthenticationService) =>{


	}));

	it('should make a salt with the lenght of 15', inject([AuthenticationService], (service: AuthenticationService) => {
		expect(service).toBeTruthy();

		let saltValue = service.makeSalt();

		expect(saltValue).not.toBeNull();
		expect(saltValue.length).toBe(15);
	}));
});

