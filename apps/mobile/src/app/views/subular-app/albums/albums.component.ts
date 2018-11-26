import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IAlbum, SubsonicService } from '@Subular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { SLIDE_RIGHT_ANIMATION } from '../../../animations/animations';
import { SubularMobileService } from '../../../services/subularMobile.service';
import { screen } from 'platform';
import { of, Observable } from 'rxjs';
import { tap, map, switchMap, concat, delay, catchError } from 'rxjs/operators';
import { getFile } from 'tns-core-modules/http/http';
import { knownFolders, path, File } from 'tns-core-modules/file-system';
import { connectionType } from 'tns-core-modules/connectivity/connectivity';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { PLACEHOLDER_IMAGE } from '../../../components/artist-image/artist-image.component';
import { CurrentConnectionService } from '../../../services/currentConnection.service';

@Component({
  moduleId: module.id,
  selector: 'albums',
  templateUrl: 'albums.component.html'
})
export class AlbumsComponent implements OnInit {
  albums: IAlbum[];

  animateOptions = SLIDE_RIGHT_ANIMATION;
  imageHeightWidth = (screen.mainScreen.widthDIPs / 12) * 5;
  imageSideMargins = screen.mainScreen.widthDIPs / 18;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private nsRouter: RouterExtensions,
    public subular: SubularMobileService,
    private subsonic: SubsonicService,
    private connection: CurrentConnectionService
  ) {}

  getAlbumsText(albums: IAlbum[]) {
    const songCount = albums
      .map(album => album.songCount)
      .reduce((acc, re) => acc + re);
    return `${albums.length} album${
      albums.length > 1 ? 's' : ''
    } ${songCount} song${songCount > 1 ? 's' : ''}`;
  }

  back() {
    this.nsRouter.back();
  }
  ngOnInit() {
    this.albums = this.route.snapshot.data['albums'] as IAlbum[];
    this.router.events.subscribe(() => {
      this.albums = this.route.snapshot.data['albums'] as IAlbum[];
    });
  }
  getCoverArt(song) {
    return this.subular.getArtWork(song.coverArt);
  }

  getArtistImage(artistId) {
    const placeholderImage$ = of(PLACEHOLDER_IMAGE);
    if (artistId) {
      let coverPath = path.join(
        knownFolders.documents().path + '/artist-images',
        artistId + '.png'
      );

      const exists = File.exists(coverPath);
      const fileSize = knownFolders
        .documents()
        .getFolder('artist-images')
        .getFile(artistId + '.png').size;

      if (exists && fileSize > 200) {
        return of(coverPath);
      }

      const downloadImage$ = imageUrl =>
        fromPromise(
          getFile(
            {
              url: imageUrl,
              method: 'GET'
            },
            coverPath
          )
        ).pipe(
          catchError(() => {
            return placeholderImage$;
          }),
          map(value => (value != PLACEHOLDER_IMAGE ? coverPath : value))
        );

      return this.connection.connectionType$.pipe(
        switchMap(connection => {
          if (connection == connectionType.wifi) {
            return placeholderImage$.pipe(
              concat(
                this.subsonic.getArtistInfo(artistId).pipe(
                  map(info => info.mediumImageUrl),
                  switchMap(downloadImage$)
                )
              )
            ) as Observable<string>;
          }
          return placeholderImage$;
        })
      );
    }
    return placeholderImage$;
  }
}
