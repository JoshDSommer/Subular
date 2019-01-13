import { Component, OnInit, Input } from '@angular/core';
import { IAlbum, SubsonicService } from '@Subular/core';
import { PlayerService } from '../../../../services/player.service';

@Component({
  selector: 'album-options',
  templateUrl: 'album-options.component.html',
  styleUrls: ['album-options.component.css']
})
export class AlbumOptionsComponent {
  @Input()
  album: IAlbum;

  constructor(
    private subsonic: SubsonicService,
    private playerService: PlayerService
  ) {}

  playAlbum() {
    this.subsonic.getSongs(this.album.id).subscribe(songs => {
      this.playerService.clearSongs();
      this.playerService.addSongs(songs);
      this.playerService.playSong();
    });
  }

  playAlbumRandom() {
    this.subsonic.getSongs(this.album.id).subscribe(songs => {
      this.playerService.clearSongs();
      this.playerService.addSongs(songs);
      this.playerService.shuffleSongs();
      this.playerService.playSong();
    });
  }
}
