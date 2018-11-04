import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { IAudioPlayingInfo, PlayerService } from '../../../services';
import { ISong } from '@Subular/core';

@Component({
  moduleId: module.id,
  selector: 'queue-item',
  templateUrl: './queue-item.component.html',
  styleUrls: ['./queue-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueueItemComponent implements OnInit {
  @Input() nowPlaying: IAudioPlayingInfo;
  @Input() item: ISong;
  @Input() index: number;

  constructor(private player: PlayerService) {}

  ngOnInit() {}

  selectSong(index) {
    this.player.playSong(index);
  }
}
