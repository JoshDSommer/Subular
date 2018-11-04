import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  HostListener,
  ViewChild,
  ElementRef
} from '@angular/core';
import { IArtist, SubsonicCachedService } from '@Subular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'artist-list',
  templateUrl: 'artist-list.component.html',
  styleUrls: ['artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  artistId$: Observable<any>;
  artists$: any;
  @Input() selectedArtistId: number;
  @Input() artists: IArtist[];

  constructor(
    private cachedData: SubsonicCachedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.artists$ = this.cachedData
      .getCachedData()
      .map(([artists, albums]) => artists);
  }
}
