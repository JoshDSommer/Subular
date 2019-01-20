import { Component, OnInit } from '@angular/core';
import {
  RouterResolverDataObservable,
  IAlbum,
  SubsonicService,
  ISong
} from '@Subular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerService } from '../../../services/player.service';
import { HostBinding } from '@angular/core';
import { SongStoreService } from '@Subular/core';

@Component({
  selector: 'album',
  templateUrl: 'album.component.html',
  styleUrls: ['album.component.css']
})
export class AlbumComponent implements OnInit {
  nowPlayingSong$ = new Observable<ISong>();
  songs$: Observable<ISong[]>;
  album$: Observable<IAlbum>;

  dataTableSongs: ISong[] = [];

  private listedSongs: ISong[];

  @HostBinding('style.background-image')
  backgroundImage;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private subsonic: SubsonicService,
    private playerService: PlayerService,
    private songStore: SongStoreService
  ) {}

  ngOnInit() {
    this.album$ = RouterResolverDataObservable<IAlbum>(
      this.route,
      this.router,
      'album'
    );

    this.songs$ = this.album$
      .switchMap(album => this.subsonic.getSongs(album.id))
      // this map is to filter out duplicates.
      .map(songs =>
        songs.filter((song, index, self) => {
          return (
            index ===
            self.findIndex(previosSong => {
              return (
                previosSong.title === song.title &&
                previosSong.track === song.track
              );
            })
          );
        })
      )
      .do(songs => {
        this.getCoverArt(songs[0].id);
      })
      .switchMap(songs => this.songStore.addSongs(songs))
      .do(songs => (this.listedSongs = songs));

    this.nowPlayingSong$ = this.playerService.nowPlaying$
      .filter(nowPlaying => !!nowPlaying && !!nowPlaying.song)
      .map(nowPlaying => nowPlaying.song);
  }

  selectSong($song: ISong) {
    this.playerService.clearSongs();

    this.playerService.addSongsAndPlaySong(this.listedSongs, $song);
  }

  getCoverArt(coverArt) {
    return this.subsonic.subsonicGetCoverUrl(coverArt); // `url(${})`;
  }
}
