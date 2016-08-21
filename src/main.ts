/// <reference path="../typings/index.d.ts" />

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { StoreModule, provideStore } from '@ngrx/store';
import { HTTP_PROVIDERS } from '@angular/http';

import { servers, artists } from './app/reducers/reducers.index';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent,
  [provideStore({ servers, artists }), HTTP_PROVIDERS]
);
