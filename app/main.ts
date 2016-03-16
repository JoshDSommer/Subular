import {bootstrap}    from 'angular2/platform/browser';
import {provide} from 'angular2/core';
import {SubularApp} from './app.component';
import {HTTP_PROVIDERS } from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import { SubularListBoxService} from './shared/directives/subular-list-box/subular-list-box.service';


bootstrap(SubularApp, [HTTP_PROVIDERS, ROUTER_PROVIDERS, SubularListBoxService, provide(LocationStrategy, { useClass: HashLocationStrategy })]);