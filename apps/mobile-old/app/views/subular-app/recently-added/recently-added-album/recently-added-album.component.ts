import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { IAlbum } from '@Subular/core';
import { SubularMobileService } from '../../../../services';
import { of } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'recently-added-album',
  templateUrl: './recently-added-album.component.html',
  styleUrls: ['./recently-added-album.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentlyAddedAlbumComponent implements OnInit {
  @Input() album: IAlbum;
  @Input() width: number;
  @Input() margin: number;

  get imageHeightWidth() {
    return this.width;
  }
  get imageSideMargins() {
    return this.margin;
  }

  constructor(public subular: SubularMobileService) {}

  ngOnInit() {}

  getCoverArt(song) {
    if (song && song.name) {
      return this.subular.getArtWork(song.coverArt);
    }
    return of('');
  }
}
