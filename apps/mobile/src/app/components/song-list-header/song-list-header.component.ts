import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  AfterViewInit
} from '@angular/core';
import { SubularMobileService } from '../../services';
import {
  GestureTypes,
  TouchAction,
  TouchGestureEventData
} from 'tns-core-modules/ui/gestures/gestures';

@Component({
  moduleId: module.id,
  selector: 'song-list-header',
  templateUrl: './song-list-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongListHeaderComponent implements OnInit, AfterViewInit {
  @Input()
  name: string;
  @Input()
  year: string;
  @Input()
  genre: string;
  @Input()
  shuffleFunction: Function;
  @Input()
  downloadFunction: Function;
  @Input()
  coverArt: string;
  @Input()
  allSongsDownloaded: boolean;

  constructor(private subular: SubularMobileService) {}

  ngOnInit() {}

  playAndShuffle(event: TouchGestureEventData) {
    if (event.action === TouchAction.up) {
      setTimeout(this.shuffleFunction);
    }
  }

  downloadAllSongs(event: TouchGestureEventData) {
    if (event.action === TouchAction.up) {
      // withough the timeout in iOS this crashes on the playlist page
      setTimeout(this.downloadFunction);
    }
  }

  getCoverArt() {
    return this.subular.getArtWork(this.coverArt);
  }

  ngAfterViewInit() {}
}
