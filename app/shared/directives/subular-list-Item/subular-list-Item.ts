import {Component, OnInit} from 'angular2/core';
import {Song} from '../../models/song';
import {path} from '../folder-info';

@Component({
	selector: 'subular-list-item',
	templateUrl: path + 'subular-list-Item/subular-list-Item.html',
	inputs: ['song', 'number']
})

export class SubularListItem implements OnInit {
	public song: Song;
	public number: number;
	constructor() {
		console.log(this.song);
	}

	ngOnInit() { }
}