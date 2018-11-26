import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { IArtist } from '@Subular/core';
import { Observable } from 'rxjs/Observable';
import { ListView } from 'tns-core-modules/ui/list-view';
import { Label } from 'tns-core-modules/ui/label';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { TouchGestureEventData } from 'tns-core-modules/ui/gestures';
import { layout } from 'tns-core-modules/utils/utils';
import { getNumber, setNumber } from 'application-settings';
import { SubularMobileService } from '../../../services/subularMobile.service';

import { tap } from 'rxjs/operators';
import { TapticEngine } from 'nativescript-taptic-engine';

export const ARTIST_LIST_CACHE_KEY = 'artist-list-cached-index';

@Component({
  moduleId: module.id,
  selector: 'artist-list',
  templateUrl: './artist-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistListComponent implements OnInit, AfterViewInit {
  get artistListView(): ListView {
    return this._artistListView.nativeElement;
  }

  get labelView(): ListView {
    return this._label.nativeElement;
  }

  constructor(
    private subular: SubularMobileService,
    private ref: ChangeDetectorRef,
    private vibrator: TapticEngine
  ) {}
  @ViewChild('artistList')
  _artistListView: ElementRef;
  @ViewChild('label')
  _label: ElementRef;

  cachedIndex: any;
  artists$: Observable<IArtist[]>;
  alphabet = 'abcdefghijklmnopqrstuvwxyz#'.split('');
  artists: IArtist[];

  detectChanges = tap(() => this.ref.markForCheck());

  previousCharacterToJumpTo: string;

  ngOnInit() {
    this.artists$ = this.subular
      .getArtists()
      .pipe(tap(artists => (this.artists = artists)));
  }

  ngAfterViewInit() {
    const jumpToIndex = getNumber(ARTIST_LIST_CACHE_KEY, 0);
    this.artistListView.scrollToIndex(jumpToIndex);
  }
  slide($event: TouchGestureEventData) {
    const yCoordinate = $event.getY();
    const stackWrapper = $event.view as StackLayout;
    const firstLabel = stackWrapper.getChildAt(1) as Label;
    const letterHeight = layout.toDeviceIndependentPixels(
      firstLabel.getMeasuredHeight()
    );
    const indexRaw = yCoordinate / letterHeight;
    if (indexRaw >= 0 && indexRaw <= this.alphabet.length) {
      const indexToGoTo = Math.floor(indexRaw);
      const char = this.alphabet[indexToGoTo];

      if (this.previousCharacterToJumpTo !== char) {
        this.jumpToArtistThatStartsWith(char);
        this.previousCharacterToJumpTo = char;
      }
    }
  }
  jumpToArtistThatStartsWith(char) {
    if (!char) {
      return;
    }
    if (char === '#') {
      char = '1';
    }
    if (char === 'a') {
      this.artistListView.scrollToIndex(0);
      this.vibrator.selection();
      return;
    }
    const firstArtistThatStartsWith = this.artists.find(artist =>
      artist.name
        .toLowerCase()
        .replace('the ', '')
        .replace('los ', '')
        .trim()
        .startsWith(char)
    );
    const itemToScrollToIndex = this.artists.indexOf(firstArtistThatStartsWith);
    if (firstArtistThatStartsWith && itemToScrollToIndex) {
      this.artistListView.scrollToIndex(itemToScrollToIndex);
      this.vibrator.selection();
    }
  }

  cacheIndex(index) {
    index = index - 5;
    if (index < 0) {
      index = 0;
    }
    setNumber(ARTIST_LIST_CACHE_KEY, index);
  }
}
