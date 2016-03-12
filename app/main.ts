import {bootstrap}    from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {SubularApp} from './app.component';
import {HTTP_PROVIDERS } from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import { SubularListBoxService} from './shared/directives/subular-list-box/subular-list-box.service';
import {PlayerService} from './shared/services/player-service';
import {SubularService} from './shared/services/subular-service';
import {SettingsService} from './shared/services/settings-service';

bootstrap(SubularApp, [HTTP_PROVIDERS, ROUTER_PROVIDERS, SubularListBoxService, SubularService, SettingsService, PlayerService, provide(LocationStrategy, { useClass: HashLocationStrategy })]);