import {Component, ViewEncapsulation, OnInit, OnDestroy, APPLICATION_COMMON_PROVIDERS } from 'angular2/core';
import {CORE_DIRECTIVES, COMMON_DIRECTIVES, FORM_BINDINGS, COMMON_PIPES, FORM_DIRECTIVES} from 'angular2/common';
import {path} from '../folder-info';

@Component({
	selector: 'subular-item-menu',
	templateUrl: path + 'subular-item-menu/subular-item-menu.html',
	// styleUrls: ['./components/app/app.css'],
	encapsulation: ViewEncapsulation.None,
	inputs: ['showMenu'],
	styles: [`
	i.fa{
		padding:0 5px;
	}
	i.fa:hover{
		background-color:#efefef;
	}
	.ul-play-menu{
		padding: 10px 20px;
		z-index: 99;
		background-color: #fff;
		border: 1px solid #000;
		list-style-type: none;
		position: absolute;
		margin-left: -120;
	}
	.ul-play-menu li{
		padding:5px 6px;
		border-bottom:1px solid #eee !important;
		color:#010101;
	}
	.ul-play-menu li:hover{
		color:#fff;
		background-color:#9d9d9d;
	}
	`]
})

export class SubularMenuItem {
	public showMenu: boolean;
	constructor() {
		this.showMenu = false;
	}
	menuClick(): void {
		this.showMenu = true;
	}
}