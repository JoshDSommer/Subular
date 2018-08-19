import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { SubularMobileService } from '../../services/subularMobile.service';
import { ISong, IAlbum, IArtist } from '@Subular/core';
@Component({
  moduleId: module.id,
  selector: 'heart',
  templateUrl: 'heart.component.html',
  styleUrls: ['heart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeartComponent {
  @Input() song: ISong;
  @Input() album: IAlbum;
  @Input() artist: IArtist;
  @Output() songUpdated = new EventEmitter<ISong>();
  @Input() row: number;
  @Input() col: number;

  get isHearted() {
    return this.song.starred;
  }
  constructor(private subsonic: SubularMobileService) {}

  unHeart() {
    if (this.song) {
      this.unHeartSong();
    }
    if (this.artist) {
      this.subsonic.unStarArtist(this.artist.id);
    }
    if (this.album) {
      this.subsonic.unStarAlbum(this.album.id);
    }
  }

  heart() {
    if (this.song) {
      this.heartSong();
    }
    if (this.artist) {
      this.subsonic.starArtist(this.artist.id);
    }

    if (this.album) {
      this.subsonic.starAlbum(this.album.id);
    }
  }

  heartArtist() {}

  unHeartSong() {
    this.song = Object.assign({}, this.song, { starred: null });
    this.subsonic.unStarSong(this.song.id).subscribe();
    this.songUpdated.next(this.song);
  }

  heartSong() {
    this.song = Object.assign({}, this.song, { starred: new Date() });
    this.subsonic.starSong(this.song.id).subscribe();
    this.songUpdated.next(this.song);
  }
}
