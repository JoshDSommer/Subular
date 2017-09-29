import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SubsonicCachedService, IArtist } from 'subular';
import { Observable } from 'rxjs/Rx';
import { ListView } from 'ui/list-view';

@Component({
	moduleId: module.id,
	selector: 'artist-list',
	templateUrl: './artist-list.component.html',
	styleUrls: ['./artist-list.component.css']
})

export class ArtistListComponent implements OnInit {
	@ViewChild('artistList') _artistListView: ElementRef;
	artists$: Observable<IArtist[]>;
	alphabet = 'abcdefghijklmnopqrstuvwxyz#'.split('');
	artists: IArtist[];

	get artistListView(): ListView {
		return this._artistListView.nativeElement;
	}

	constructor(private cachedData: SubsonicCachedService) {

	}

	ngOnInit() {
		this.artists$ = this.cachedData.getCachedData()
			.map(([artists, albums]) => artists)
			.do(artists => this.artists = artists);

	}

	jumpToArtistThatStartsWith(char) {
		if (char == '#') {
			char = 1;
		}
		const firstArtistThatStartsWith = this.artists.find(artist => artist.name.toLowerCase().replace('the', '').startsWith(char));
		const itemToScrollToIndex = this.artists.indexOf(firstArtistThatStartsWith);
		this.artistListView.scrollToIndex(itemToScrollToIndex);

	}
}