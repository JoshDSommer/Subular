import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { SubularMobileService } from '../../services';

@Component({
  moduleId: module.id,
  selector: 'song-list-header',
  templateUrl: './song-list-header.component.html',
  styleUrls: ['./song-list-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongListHeaderComponent implements OnInit {
  @Input() name: string;
  @Input() shuffleFunction: Function;
  @Input() downloadFunction: Function;
  @Input() coverArt: string;

  constructor(private subular: SubularMobileService) {}

  ngOnInit() {}

  playAndShuffle() {
    this.shuffleFunction();
  }

  downloadAllSongs() {
    this.downloadFunction();
  }

  getCoverArt() {
    return this.subular.getArtWork(this.coverArt);
  }

  ngAfterViewInit() {}
}
