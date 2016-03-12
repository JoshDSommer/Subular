import {bootstrap}    from 'angular2/platform/browser'
import {SubularApp} from './app.component'
import {HTTP_PROVIDERS } from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import { SubularListBoxService} from './shared/directives/subular-list-box/subular-list-box.service';
import {PlayerService} from './shared/services/player-service';
import {SubularService} from './shared/services/subular-service';
import {SettingsService} from './shared/services/settings-service';

bootstrap(SubularApp, [HTTP_PROVIDERS, ROUTER_PROVIDERS, SubularListBoxService, SubularService, SettingsService, PlayerService]);