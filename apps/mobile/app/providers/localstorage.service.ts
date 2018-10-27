import { FactoryProvider } from '@angular/core';
import { LOCALSTORAGE_PROVIDER, IServerInfo } from '@Subular/core';
import { getString, setString } from 'tns-core-modules/application-settings';

export class LocalStorageService implements LOCALSTORAGE_PROVIDER {
  constructor() {}
  getValue(key: string): any {
    const value = getString(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }
  setValue(key: string, value: any): void {
    setString(key, JSON.stringify(value));
  }
}
export function getLocalStorage() {
  return new LocalStorageService();
}

export const LOCALSTORAGE_SERVICE: FactoryProvider = {
  provide: LOCALSTORAGE_PROVIDER,
  useFactory: getLocalStorage
};
