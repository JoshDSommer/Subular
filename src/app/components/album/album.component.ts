import { Component, OnInit,  Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SubularService } from '../../services/subsonic.service';
import { IArtist, IAlbum, ISong } from '../../shared/models';
import { Observable } from 'rxjs/Rx';
import { Angular2DataTableModule,  TableOptions, TableColumn, ColumnMode, SelectionType } from 'angular2-data-table';
import { SongListComponent } from '../songList/songlist.component'


@Component({
	selector: 'album',
	templateUrl: './album.component.html',
	styleUrls:['./album.component.css']

})

export class AlbumComponent implements OnInit {
	@Input() albumId: number;
	@ViewChild('songList') songList:SongListComponent;

	album: IAlbum;

	constructor(private subular: SubularService, private route: ActivatedRoute) {}

	ngOnInit(): void {

	}

	ngAfterViewInit(): void{
		console.log(this.songList);
		this.route.params.forEach((params: Params) => {
			this.albumId = +params['albumId'];
		});
		this.subular.getAlbumInfo(this.albumId).subscribe(album=>{
			this.album = album;
			this.songList.addSongs(album.song);
		});
	}
}