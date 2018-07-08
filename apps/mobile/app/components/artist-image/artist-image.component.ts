import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import { of, Observable } from 'rxjs';
import { SubsonicService } from '@Subular/core';
import { tap, map, switchMap, concat, delay, catchError } from 'rxjs/operators';
import { getFile } from 'tns-core-modules/http/http';
import { knownFolders, path, File } from 'tns-core-modules/file-system';
import { CurrentConnectionService } from '~/services/currentConnection.service';
import { connectionType } from 'tns-core-modules/connectivity/connectivity';
import { fromPromise } from 'rxjs/observable/fromPromise';

export const PLACEHOLDER_IMAGE = '~/images/artist.png';

@Component({
  moduleId: module.id,
  selector: 'artist-image',
  templateUrl: './artist-image.component.html',
  styleUrls: ['./artist-image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistImageComponent implements OnInit {
  @Input() row: number;
  @Input() col: number;
  @Input() artistId: number;
  @Input() name: string;
  constructor(
    private subsonic: SubsonicService,
    private connection: CurrentConnectionService
  ) {}

  ngOnInit() {}

  getArtistImage(artistId): Observable<string> {
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
        console.log('image from cache', this.name);
        return of(coverPath);
      }
      if (fileSize <= 200) {
        knownFolders
          .documents()
          .getFolder('artist-images')
          .getFile(artistId + '.png')
          .remove()
          .then();
      }

      const downloadImage$ = smallImageUrl =>
        fromPromise(
          getFile(
            {
              url: smallImageUrl,
              method: 'GET'
            },
            coverPath
          )
        ).pipe(
          catchError(() => {
            return placeholderImage$;
          }),
          tap(() =>
            console.log('image from last.fm', 'requested artwork', this.name)
          ),
          map(value => (value != PLACEHOLDER_IMAGE ? coverPath : value))
        );

      return this.connection.connectionType$.pipe(
        switchMap(connection => {
          if (connection == connectionType.wifi) {
            return placeholderImage$.pipe(
              concat(
                this.subsonic
                  .getArtistInfo(artistId)
                  .pipe(
                    map(info => info.smallImageUrl),
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

  ngAfterViewInit() {
    // if (this.artistId) {
  }
}
