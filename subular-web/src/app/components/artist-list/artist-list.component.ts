import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IArtist } from '../../../shared-services/index';

@Component({
	selector: 'artist-list',
	templateUrl: 'artist-list.component.html',
	styleUrls: ['artist-list.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistListComponent implements OnInit {
	@Input() artists: IArtist[];

	ngOnInit() { }

}