import { Component, OnInit } from '@angular/core';
import {
  RouterResolverDataObservable,
  IPlaylist,
  SubsonicService,
  ISong
} from '@Subular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerService } from '../../../services/player.service';
import { MenuItem } from 'primeng/primeng';
import { HostBinding } from '@angular/core';
import { SongStoreService } from '@Subular/core';

@Component({
  selector: 'playlist',
  templateUrl: 'playlist.component.html',
  styleUrls: ['playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  playlistId: number;
  playlistId$: Observable<any>;
  contextMenuItems: MenuItem[];
  nowPlayingSong$ = new Observable<ISong>();
  songs$: Observable<ISong[]>;
  playlist$: Observable<IPlaylist>;
  selectedSong: ISong;
  dataTableSongs: ISong[] = [];

  private listedSongs: ISong[];

  @HostBinding('style.background-image') backgroundImage;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subsonic: SubsonicService,
    private playerService: PlayerService,
    private songStore: SongStoreService
  ) {}

  ngOnInit() {
    this.playlistId$ = this.router.events
      .filter(value => value instanceof NavigationEnd)
      .map(() => this.route.snapshot.params['playlistId'])
      .startWith(this.route.snapshot.params['playlistId']);

    this.playlist$ = this.playlistId$
      .switchMap(playlistId => this.subsonic.getPlaylist(playlistId))
      .do(playlist => (this.listedSongs = playlist.entry))
      .do(playlist => (this.playlistId = playlist.id));

    this.nowPlayingSong$ = this.playerService.nowPlaying$
      .filter(nowPlaying => !!nowPlaying && !!nowPlaying.song)
      .map(nowPlaying => nowPlaying.song);

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
        label: 'Remove from playlist',
        command: event => {
          this.playlist$ = this.subsonic
            .removeSongFromPlaylist(
              this.listedSongs.indexOf(this.selectedSong),
              this.playlistId
            )
            .switchMap(() => this.subsonic.getPlaylist(this.playlistId))
            .do(playlist => (this.listedSongs = playlist.entry));
        }
      }
    ];
  }

  selectSong($song: ISong) {
    this.playerService.clearSongs();

    this.playerService.addSongsAndPlaySong(this.listedSongs, $song);
  }

  getCoverArt(coverArt) {
    return this.subsonic.subsonicGetCoverUrl(coverArt); // `url(${})`;
  }
}
