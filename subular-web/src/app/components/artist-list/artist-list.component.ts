import { Component, OnInit, Input, ChangeDetectionStrategy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { IArtist } from '../../../shared-module/index';


@Component({
	selector: 'artist-list',
	templateUrl: 'artist-list.component.html',
	styleUrls: ['artist-list.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistListComponent implements OnInit {
	@Input() selectedArtistId: number;
	@Input() artists: IArtist[];
	@ViewChild('artistList') artistListUL: ElementRef;

	@HostListener('window:keyup', ['$event'])
	keyEvent(event: KeyboardEvent) {
		if (this.artists) {
			const artist = this.searchArtistsWithDebounce(event.key);
		}
	}

	private searchValue = '';
	private timeOut;


	searchArtistsWithDebounce(value) {
		clearTimeout(this.timeOut);
		this.searchValue = this.searchValue + value;
		this.timeOut = setTimeout(() => {
			const artist = this.getFirstArtistThatStartsWith(this.searchValue);
			this.scrollToArtist(artist);
			this.searchValue = '';
		}, 500);
	}

	scrollToArtist(artist: IArtist) {
		if (artist) {
			const nativeHtmlUL = this.artistListUL.nativeElement as HTMLUListElement;
			const artistLI = nativeHtmlUL.querySelector(`[class='${artist.id}']`) as HTMLLIElement;
			nativeHtmlUL.scrollTop = artistLI.offsetTop - 100;
			artistLI.querySelector('a').click()
		}
	}

	getFirstArtistThatStartsWith(startsWith: string): IArtist {
		return this.artists.find(value => value.name
			.toLowerCase()
			.replace('the ', '')
			.substr(0, startsWith.length) == startsWith.toLowerCase()
		);
	}

	ngOnInit() { }

}