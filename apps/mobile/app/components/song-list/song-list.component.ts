import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { SongStoreService, ISong } from '@Subular/core';
import { Observable } from 'rxjs/Observable';
import { PlayerService } from '../../services/player.service';

@Component({
	moduleId: module.id,
	selector: 'song-list',
	templateUrl: './song-list.component.html',
	styleUrls: ['./song-list.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class SongListComponent implements OnInit {
	@Output() playingSong = new EventEmitter<ISong>();
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
		this.playingSong.emit($song);
	}
}