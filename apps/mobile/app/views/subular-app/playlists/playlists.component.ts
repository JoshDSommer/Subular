import { Component, OnInit } from '@angular/core';
import { SubularMobileService } from '../../../services';
import { IPlaylists, IPlaylist } from '@Subular/core';
import { Observable } from 'rxjs/Observable';
import { DownloadQueueService } from '../../../services/downloadQueue.service';
import { of } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  playlists$: Observable<IPlaylists>;

  constructor(
    private subular: SubularMobileService,
    private download: DownloadQueueService
  ) {}

  ngOnInit() {
    this.playlists$ = this.subular
      .getPlaylists()
      .map(playlists => [
        { id: 0, name: 'Favorites' } as IPlaylist,
        ...playlists
      ]);
  }

  getCoverArt(playlist: IPlaylist) {
    if (playlist.name) {
      return this.subular.getArtWork(playlist.coverArt);
    }
    return of(null);
  }
}
