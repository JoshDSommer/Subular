import { ClassProvider } from '@angular/core';
import { LOCALSTORAGE_PROVIDER } from 'subular';
import { getString, setString } from 'application-settings';

export class LocalStorageService implements LOCALSTORAGE_PROVIDER {
	getValue(key: string): any {
		return JSON.parse(getString(key));
	}
	setValue(key: string, value: any): void {
		setString(key, JSON.stringify(value));
	}
}

export const LOCALSTORAGE_SERVICE: ClassProvider = {
	provide: LOCALSTORAGE_PROVIDER,
	useClass: LocalStorageService,
};
