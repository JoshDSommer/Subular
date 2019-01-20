import { Component, OnInit } from '@angular/core';
import { PlayerService, IAudioPlayingInfo } from '~/app/services';
import { Observable } from 'rxjs';
import { ISong } from '@Subular/core';

@Component({
  moduleId: module.id,
  selector: 'playing-que',
  templateUrl: './playing-que.component.html'
})
export class PlayingQueComponent implements OnInit {
  songs$: Observable<ISong[]>;
  constructor(private player: PlayerService) {}

  ngOnInit() {
    this.songs$ = this.player.queue$;
  }
}
