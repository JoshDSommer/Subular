import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SubularService } from '../../services/subsonic.service';
import { IArtist, IAlbum, ISong } from '../../shared/models';
import { Observable } from 'rxjs/Rx';
import { Angular2DataTableModule,  TableOptions, TableColumn, ColumnMode, SelectionType } from 'angular2-data-table';



@Component({
	moduleId: module.id,
	selector: 'album',
	templateUrl: 'album.component.html'
})

export class AlbumComponent implements OnInit {
	@Input() albumId: number;

	album: IAlbum;

	rows = [];

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

	constructor(private subular: SubularService, private route: ActivatedRoute) {}

	onRowClick(selected) {
		console.log('Selection!', selected);
	}

	ngOnInit(): void {
		console.log(this.route.snapshot);
		this.route.params.forEach((params: Params) => {
			this.albumId = +params['albumId'];
		});
		this.subular.getAlbumInfo(this.albumId).subscribe(album=>{
			this.album = album;
			this.rows.push(...this.album.song);
		});

	}
}