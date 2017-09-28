import { ClassProvider } from '@angular/core';
import { LOCALSTORAGE_PROVIDER } from '../../shared-module';

export class LocalStorageService implements LOCALSTORAGE_PROVIDER {
	getValue(key: string): any {
		return JSON.parse(window.localStorage.getItem(key));
	}
	setValue(key: string, value: any): void {
		window.localStorage.setItem(key, JSON.stringify(value));
	}
}

export const LOCALSTORAGE_SERVICE: ClassProvider = {
	provide: LOCALSTORAGE_PROVIDER,
	useClass: LocalStorageService,
};
