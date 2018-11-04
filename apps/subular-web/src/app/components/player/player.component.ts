import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostBinding,
  HostListener
} from '@angular/core';
import { PlayerService, PlayingStatus } from '../../services/player.service';
import { SubsonicService } from '@Subular/core';
import { SongStoreService } from '@Subular/core';

@Component({
  selector: 'player',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.css']
})
export class PlayerComponent implements OnInit {
  nowPlaying$;
  songList;
  playingStatus = PlayingStatus;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight': {
        this.nextSong();
        break;
      }
      case 'ArrowLeft': {
        this.previousSong();
        break;
      }
    }
  }

  constructor(
    private subsonic: SubsonicService,
    private playerService: PlayerService,
    private songStore: SongStoreService
  ) {}

  ngOnInit() {
    this.nowPlaying$ = this.playerService.nowPlaying$.do(nowPlaying => {
      // if (nowPlaying && nowPlaying.song) {
      // 	this.height = '90px';
      // } else {
      // 	this.height = '0px';
      // }
    });
    this.songList = this.playerService.songList;
  }

  nextSong(): void {
    this.playerService.playNextSong();
  }

  previousSong(): void {
    this.playerService.playPreviousSong();
  }

  pauseSong(): void {
    this.playerService.pauseSong();
  }

  playSong(): void {
    this.playerService.resumeSong();
  }

  songUpdated(song) {
    this.songStore.updateSong(song);
    this.playerService.songUpdated(song);
  }
}
