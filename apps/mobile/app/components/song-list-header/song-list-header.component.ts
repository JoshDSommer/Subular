import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
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
  styleUrls: ['./song-list-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongListHeaderComponent implements OnInit {
  @Input() name: string;
  @Input() year: string;
  @Input() genre: string;
  @Input() shuffleFunction: Function;
  @Input() downloadFunction: Function;
  @Input() coverArt: string;
  @Input() allSongsDownloaded: boolean;

  constructor(private subular: SubularMobileService) {}

  ngOnInit() {}

  playAndShuffle(event: TouchGestureEventData) {
    console.log(event.action);
    if (event.action === TouchAction.up) {
      this.touched();
      this.shuffleFunction();
    }
  }

  downloadAllSongs() {
    this.touched();
    this.downloadFunction();
  }

  getCoverArt() {
    return this.subular.getArtWork(this.coverArt);
  }

  ngAfterViewInit() {}

  touched() {
    console.log('touched');
  }
}
