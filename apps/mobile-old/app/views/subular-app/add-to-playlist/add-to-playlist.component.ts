import { Component, OnInit } from '@angular/core';
import { SubularMobileService } from '../../../services';
import { Observable } from 'rxjs/Observable';
import { IPlaylists, IPlaylist } from '@Subular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { map, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'add-to-playlist',
  templateUrl: './add-to-playlist.component.html',
  styleUrls: ['./add-to-playlist.component.css']
})
export class AddToPlaylistComponent implements OnInit {
  playlists$: Observable<IPlaylists>;

  constructor(
    private subular: SubularMobileService,
    private route: ActivatedRoute,
    private nsRouter: RouterExtensions
  ) {}

  ngOnInit() {
    this.playlists$ = this.subular
      .getPlaylists()
      .pipe(
        map(playlists => [
          { id: 0, name: 'Favorites' } as IPlaylist,
          ...playlists
        ])
      );
  }

  getCoverArt(playlist: IPlaylist) {
    if (playlist.name) {
      return this.subular.getArtWork(playlist.coverArt);
    }
    return of(null);
  }
  addToPlaylist(playlist: IPlaylist) {
    this.route.params
      .pipe(
        map(params => params['songId']),
        switchMap(songId => {
          return this.subular.addToPlaylist({ id: songId } as any, playlist.id);
        })
      )
      .subscribe(() => {
        this.nsRouter.back();
      });
  }
}
