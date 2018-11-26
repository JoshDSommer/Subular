import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IAlbum } from '@Subular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import {
  SLIDE_RIGHT_ANIMATION,
  SPIN_ANIMATION
} from '../../../animations/animations';
import { SubularMobileService } from '../../../services/subularMobile.service';
import { screen, isIOS } from 'tns-core-modules/platform/platform';
import { Observable } from 'rxjs/Observable';
import { tap, map, switchMap, delay, combineAll } from 'rxjs/operators';
import { of, concat, zip } from 'rxjs';
import { popIn } from '../../../pipes/popin.pipe';
import { ItemEventData } from 'tns-core-modules/ui/list-view/list-view';

@Component({
  moduleId: module.id,
  selector: 'recently-added',
  templateUrl: './recently-added.component.html'
})
export class RecentlyAddedComponent implements OnInit {
  albums$: Observable<IAlbum[][]>;

  SPIN_ANIMATION = SPIN_ANIMATION;
  SLIDE_RIGHT_ANIMATION = SLIDE_RIGHT_ANIMATION;

  imageHeightWidth = (screen.mainScreen.widthDIPs / 12) * 5;
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
    this.albums$ = this.subular.getRecentAdditions().pipe(
      map(albums => smashArray<IAlbum>(albums)),
      popIn,
      tap(albums => (this.albums = albums))
    );
  }

  onItemLoading(args: ItemEventData) {
    if (isIOS) {
      const iosCell = args.ios;
      iosCell.selectionStyle = UITableViewCellSelectionStyle.None;
    }
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
