import { Component, OnInit } from '@angular/core';
import { SongStoreService, ISong } from 'subular';
import { Observable } from 'rxjs/Observable';
import { PlayerService } from '../../services/player.service';

@Component({
	moduleId: module.id,
	selector: 'song-list',
	templateUrl: './song-list.component.html',
	styleUrls: ['./song-list.component.css']
})

export class SongListComponent implements OnInit {
	listedSongs: ISong[];
	songs$: Observable<ISong[]>
	constructor(private songStore: SongStoreService, private playerService: PlayerService) { }

	ngOnInit() {
		this.songs$ = this.songStore.songs$
			.do(songs => this.listedSongs = songs);
	}

	selectSong($song: ISong) {
		this.playerService.clearSongs();

		this.playerService.addSongsAndPlaySong(this.listedSongs, $song);
	}
}