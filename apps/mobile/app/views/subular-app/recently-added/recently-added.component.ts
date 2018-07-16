import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IAlbum } from '@Subular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import {
  SLIDE_RIGHT_ANIMATION,
  SPIN_ANIMATION
} from '../../../animations/animations';
import { SubularMobileService } from '../../../services/subularMobile.service';
import { screen } from 'tns-core-modules/platform/platform';
import { Observable } from 'rxjs/Observable';
import { tap, map } from 'rxjs/operators';

@Component({
  moduleId: module.id,
  selector: 'recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.css']
})
export class RecentlyAddedComponent implements OnInit {
  albums$: Observable<IAlbum[][]>;

  SPIN_ANIMATION = SPIN_ANIMATION;
  SLIDE_RIGHT_ANIMATION = SLIDE_RIGHT_ANIMATION;

  imageHeightWidth = screen.mainScreen.widthDIPs / 12 * 5;
  imageSideMargins = screen.mainScreen.widthDIPs / 18;
  albums: IAlbum[][];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private nsRouter: RouterExtensions,
    public subular: SubularMobileService
  ) {}

  getAlbumsText(albums: IAlbum[]) {
    return `${albums.length} album${albums.length > 1 ? 's' : ''}`;
  }

  back() {
    this.nsRouter.back();
  }
  ngOnInit() {
    this.albums$ = this.subular
      .getRecentAdditions()
      .pipe(
        map(albums => smashArray<IAlbum>(albums)),
        tap(albums => (this.albums = albums))
      );
  }
}

export function smashArray<T>(array: T[]): T[][] {
  const arrayA = [];
  const arrayB = [];
  array.forEach((item, index) => {
    if (index % 2 === 0) {
      arrayA.push(item);
    } else {
      arrayB.push(item);
    }
  });
  const combinedArray = arrayA.map((item, index) => {
    return [item, arrayB[index]];
  });
  return combinedArray;
}
