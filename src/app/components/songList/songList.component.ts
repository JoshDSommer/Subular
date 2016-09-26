import { Component, OnInit,AfterViewInit, Input  } from '@angular/core';
import { Angular2DataTableModule,  TableOptions, TableColumn, ColumnMode, SelectionType } from 'angular2-data-table';
import { ISong } from '../../shared/models';
import { PlayerService } from '../../services/player.service';
@Component({
	selector: 'songList',
	templateUrl: './songList.component.html'
})

export class SongListComponent implements AfterViewInit, OnInit {
	@Input() songs: ISong[] = [];

	rows =[];

	options = new TableOptions({
		columnMode: ColumnMode.force,
		headerHeight: 50,
		footerHeight: 50,
		SelectionType: SelectionType.single,
		rowHeight: 'auto',
		columns: [
			new TableColumn({ prop: 'title', name:'Title',flexGrow:1 }),
			new TableColumn({ prop: 'track', maxWidth: 65, name: '#' }),
			new TableColumn({ prop: 'artist', name: 'Artist' }),
			new TableColumn({ prop: 'album', name: 'Album' }),
			new TableColumn({ prop: 'year', name: 'Year', maxWidth: 65,  }),
			new TableColumn({ prop: 'genre', name: 'Genre' })
		]
	});

	constructor(private playerService:PlayerService){

	}

	onRowClick(song:any){
		this.playerService.addSong(song.row);
	}

	addSongs(songs:ISong[]){
		this.rows.push(...songs);
	}

	ngAfterViewInit(){
		console.log(this.songs);
		if(this.songs){

		}else{
			this.songs=[];
		}
	}

	ngOnInit() {

	}
}