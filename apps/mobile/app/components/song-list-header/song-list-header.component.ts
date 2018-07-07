import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

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

  constructor() {}

  ngOnInit() {}

  playAndShuffle() {
    this.shuffleFunction();
  }

  downloadAllSongs() {
    this.downloadFunction();
  }
}
