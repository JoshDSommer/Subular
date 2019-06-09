import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WebLoginModule } from '@subular3/web-login';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ClassProvider } from '@angular/core';

export class LocalStorageService implements LOCALSTORAGE_PROVIDER {
  getValue(key: string): any {
    return JSON.parse(window.localStorage.getItem(key));
  }
  setValue(key: string, value: any): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
import { FactoryProvider } from '@angular/core';
import { MD5 } from 'crypto-js';
import { LOCALSTORAGE_PROVIDER, MD5_PROVIDER } from '@subular3/shared';

export const MD5_SERVICE: FactoryProvider = {
  provide: MD5_PROVIDER,
  useFactory: getMD5
};

export function getMD5() {
  return { MD5 };
}

export const LOCALSTORAGE_SERVICE: ClassProvider = {
  provide: LOCALSTORAGE_PROVIDER,
  useClass: LocalStorageService
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    WebLoginModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LOCALSTORAGE_SERVICE, MD5_SERVICE],
  bootstrap: [AppComponent]
})
export class AppModule {}
