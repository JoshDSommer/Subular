import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ISong, SubsonicService } from '@Subular/core';
import { SongStoreService } from '@Subular/core';
@Component({
  selector: 'heart',
  templateUrl: 'heart.component.html',
  styleUrls: ['heart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeartComponent {
  @Input() song: ISong;
  @Output() songUpdated = new EventEmitter<ISong>();

  get isHearted() {
    return this.song.starred;
  }
  constructor(private subsonic: SubsonicService) {}

  unHeartSong() {
    this.song = { ...this.song, starred: null };
    this.subsonic.unStarSong(this.song.id).subscribe();
    this.songUpdated.next(this.song);
  }

  heartSong() {
    this.song = { ...this.song, starred: new Date() };
    this.subsonic.starSong(this.song.id).subscribe();
    this.songUpdated.next(this.song);
  }
}
