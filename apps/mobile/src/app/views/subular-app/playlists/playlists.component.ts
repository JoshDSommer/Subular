import { Component, OnInit } from '@angular/core';
import { SubularMobileService } from '../../../services';
import { IPlaylists, IPlaylist } from '@Subular/core';
import { Observable } from 'rxjs/Observable';
import { DownloadQueueService } from '../../../services/downloadQueue.service';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { popIn } from '../../../pipes/popin.pipe';

@Component({
  moduleId: module.id,
  selector: 'playlists',
  templateUrl: './playlists.component.html'
})
export class PlaylistsComponent implements OnInit {
  playlists$: Observable<IPlaylists>;

  constructor(
    private subular: SubularMobileService,
    private download: DownloadQueueService
  ) {}

  ngOnInit() {
    this.playlists$ = this.subular.getPlaylists().pipe(
      map(playlists => [
        { id: 0, name: 'Favorites' } as IPlaylist,
        ...playlists
      ]),
      popIn
    );
  }

  getCoverArt(playlist: IPlaylist) {
    if (playlist.name) {
      return this.subular.getArtWork(playlist.coverArt);
    }
    return of(null);
  }
}
