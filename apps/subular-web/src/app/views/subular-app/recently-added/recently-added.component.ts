import { Component, OnInit } from '@angular/core';
import { SubsonicService, IAlbum } from '@Subular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'recently-added',
  templateUrl: 'recently-added.component.html',
  styleUrls: ['recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {
  albums$: Observable<IAlbum[]>;

  constructor(private subsonic: SubsonicService) {}
  ngOnInit() {
    this.albums$ = this.subsonic.getRecentAdditions();
  }

  // getCoverArt(id) {
  // 	this.backgroundImage = `url(${this.subsonic.subsonicGetCoverUrl(id)})`;
  // }
}
