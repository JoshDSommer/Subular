import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SubsonicCachedService, IArtist } from 'subular';
import { Observable } from 'rxjs/Rx';
import { ListView } from 'ui/list-view';
import { Label } from 'ui/label';
import { StackLayout } from 'ui/layouts/stack-layout';
import { TouchGestureEventData, PanGestureEventData, TouchAction } from 'ui/gestures';
import { layout } from 'utils/utils';

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

	previousCharacterToJumpTo: string;
	slide($event: TouchGestureEventData) {
		const yCoordinate = $event.getY();
		const stackWrapper = $event.view as StackLayout;
		const firstLabel = stackWrapper.getChildAt(1) as Label;
		const letterHeight = layout.toDeviceIndependentPixels(firstLabel.getMeasuredHeight());
		const indexRaw = yCoordinate / letterHeight;
		if (indexRaw >= 0 && indexRaw <= this.alphabet.length) {
			const indexToGoTo = Math.floor(indexRaw);
			const char = this.alphabet[indexToGoTo];

			if (this.previousCharacterToJumpTo != char) {
				this.jumpToArtistThatStartsWith(char)
				this.previousCharacterToJumpTo = char;
			}

		}

	}
	jumpToArtistThatStartsWith(char) {
		if (!char) {
			return;
		}
		if (char == '#') {
			char = '1';
		}
		if (char == 'a') {
			this.artistListView.scrollToIndex(0);
			return;
		}
		const firstArtistThatStartsWith = this.artists.find(artist => artist.name.toLowerCase()
			.replace('the', '')
			.replace('los', '')
			.trim()
			.startsWith(char));
		const itemToScrollToIndex = this.artists.indexOf(firstArtistThatStartsWith);
		if (firstArtistThatStartsWith && itemToScrollToIndex) {
			this.artistListView.scrollToIndex(itemToScrollToIndex);
		}

	}
}