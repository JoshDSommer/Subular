import { Component, OnInit } from '@angular/core';
import { SubsonicService, IPlaylists } from '@Subular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'playlist-list',
  templateUrl: 'playlist-list.component.html',
  styleUrls: ['playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {
  playlists: IPlaylists;
  playlists$: Observable<IPlaylists>;

  constructor(private subsonic: SubsonicService) {
    this.playlists$ = this.subsonic
      .getPlaylists()
      .pipe(tap(playlists => (this.playlists = playlists)));
  }

  createNew() {
    let tempPlaylistName = 'New Playlist';
    const playlistsNameNewPlaylistCount = this.playlists.filter(playlist =>
      playlist.name.startsWith('New Playlist')
    );

    if (
      playlistsNameNewPlaylistCount &&
      playlistsNameNewPlaylistCount.length > 0
    ) {
      tempPlaylistName += ' ' + (playlistsNameNewPlaylistCount.length + 1);
    }

    this.playlists$ = this.subsonic
      .createPlaylist(tempPlaylistName)
      .switchMap(() => this.subsonic.getPlaylists())
      .pipe(tap(playlists => (this.playlists = playlists)));
  }

  ngOnInit() {}
}
