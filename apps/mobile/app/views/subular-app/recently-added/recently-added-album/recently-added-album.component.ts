import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { SubularMobileService } from '~/services';
import { IAlbum } from '@Subular/core';

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
    return this.subular.getArtWork(song.coverArt);
  }
}
