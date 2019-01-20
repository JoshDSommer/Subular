import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MenuItem, ContextMenu } from 'primeng/primeng';
import { ISong, SubsonicService } from '@Subular/core';
import { PlayerService } from '../../services/player.service';
import { IPlaylist } from '@Subular/core';

@Component({
  selector: 'context-menu',
  templateUrl: 'context-menu.component.html',
  styleUrls: ['context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {
  @Input()
  selectedSong: ISong;
  @ViewChild(ContextMenu)
  contextMenu: ContextMenu;

  contextMenuItems: MenuItem[];

  constructor(
    private subsonic: SubsonicService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.contextMenuItems = [
      {
        label: 'Play now',
        command: event => {
          this.playerService.addAndPlaySong(this.selectedSong);
        }
      },
      {
        label: 'Play next',
        command: event => {
          this.playerService.addSongToPlayNext(this.selectedSong);
        }
      },
      {
        label: 'Add to playlist:',
        items: []
      }
    ] as MenuItem[];

    const newPlaylistMenuItem = (playlist: IPlaylist) => ({
      label: playlist.name,
      command: event => {
        this.subsonic
          .addSongToPlaylist(this.selectedSong, playlist.id)
          .subscribe();
      }
    });

    this.subsonic.getPlaylists().subscribe(playlists => {
      this.contextMenuItems[2].items = playlists.map(newPlaylistMenuItem);
    });
  }
}
