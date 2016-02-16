import {bootstrap}    from 'angular2/platform/browser'
import {SubularApp} from './app.component'
import {HTTP_PROVIDERS } from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';

bootstrap(SubularApp, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);