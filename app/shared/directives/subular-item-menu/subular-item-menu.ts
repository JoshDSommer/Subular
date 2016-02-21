import {Component, ViewEncapsulation, OnInit, OnDestroy, APPLICATION_COMMON_PROVIDERS } from 'angular2/core';
import {CORE_DIRECTIVES, COMMON_DIRECTIVES, FORM_BINDINGS, COMMON_PIPES, FORM_DIRECTIVES} from 'angular2/common';
import {path} from '../folder-info';

@Component({
	selector: 'subular-item-menu',
	templateUrl: path + 'subular-item-menu/subular-item-menu.html',
	// styleUrls: ['./components/app/app.css'],
	encapsulation: ViewEncapsulation.None,
})

export class SubularMenuItem implements OnInit, OnDestroy {

	constructor() { }

	ngOnInit() { console.log('ngOnInit'); }
	ngOnDestroy() { console.log('ngOnDestroy'); }
}