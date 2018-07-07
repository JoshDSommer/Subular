import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { of } from 'rxjs';

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
  constructor() {}

  ngOnInit() {}

  getArtistImage() {
    // let coverPath = fs.path.join(
    //   fs.knownFolders.documents().path + '/images',
    //   artWorkUrl + '.png'
    // );
    return of('~/images/artist.png');
  }
}
