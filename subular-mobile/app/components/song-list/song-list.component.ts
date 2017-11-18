import { Component, OnInit } from '@angular/core';
import { SongStoreService, ISong } from 'subular';
import { Observable } from 'rxjs/Observable';

@Component({
	moduleId: module.id,
	selector: 'song-list',
	templateUrl: './song-list.component.html',
	styleUrls: ['./song-list.component.css']
})

export class SongListComponent implements OnInit {
	songs$: Observable<ISong[]>
	constructor(private songStore: SongStoreService) { }

	ngOnInit() {
		this.songs$ = this.songStore.songs$;
	}
}