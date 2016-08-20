import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { provideStore } from '@ngrx/store';

import { sample } from './app/reducers/reducers.index';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent,
  provideStore({sample})
);
