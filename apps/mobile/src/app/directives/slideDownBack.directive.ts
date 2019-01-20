import {
  Directive,
  ElementRef,
  Input,
  NgZone,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { View } from 'tns-core-modules/ui/core/view';
import {
  PanGestureEventData,
  TouchGestureEventData,
  TouchAction,
  GestureStateTypes
} from 'tns-core-modules/ui/gestures';
import { screen } from 'tns-core-modules/platform';
import { RouterExtensions } from 'nativescript-angular/router';
import { Router } from '@angular/router';
import { ListView } from 'tns-core-modules/ui/list-view';
import { ScrollView } from 'tns-core-modules/ui/scroll-view';

@Directive({ selector: '[slideDownBack]' })
export class SlideDownBackDirective implements AfterViewInit, OnDestroy {
  @Input()
  slideBack: any[];

  @Input()
  slideBackCallBack: Function;

  startY: number;

  get view(): View {
    return this.element.nativeElement;
  }

  private currentDeltaY = 0;

  constructor(
    private element: ElementRef,
    private nsRouter: RouterExtensions,
    private zone: NgZone
  ) {}

  ngAfterViewInit() {
    this.view.on(
      'pan',
      (args: PanGestureEventData): void => {
        this.onPan(args);
      }
    );

    //used to set the starting position.
    this.view.on('touch', (args: TouchGestureEventData) => {
      if (args.action === TouchAction.down && !this.startY) {
        this.startY = args.getY();
      }
      if (
        (args.action === TouchAction.cancel ||
          args.action === TouchAction.up) &&
        this.startY
      ) {
        this.startY = null;
      }
    });
  }

  private onPan(args: PanGestureEventData) {
    // if the start position is not on the left hand side of the screen exit function
    if (this.startY > screen.mainScreen.heightDIPs / 2) {
      return;
    }
    let item = args.view;
    if (args.state === GestureStateTypes.cancelled) {
      this.currentDeltaY = 0;
      return;
    }
    /// if sliding finger from left to right.
    if (args.state === GestureStateTypes.changed && args.deltaY > 20) {
      this.disableScroll();
      item.translateY += args.deltaY - this.currentDeltaY;
      if (item.translateY < 0) {
        item.translateY = 0;
      }
      //item.opacity = ((100 - args.deltaY / 3) * 0.01) + 0.2;
      this.currentDeltaY = args.deltaY;
      //release of finger from slide.
      return;
    }

    if (args.state === GestureStateTypes.ended) {
      if (this.currentDeltaY > screen.mainScreen.widthDIPs / 3) {
        // item.animate({
        // 	opacity: 0.2,
        // 	translate: { Y: screen.mainScreen.widthDIPs, y: 0 },
        // 	duration: 100
        // }).then(() => {
        if (!this.slideBackCallBack) {
          if (this.slideBack) {
            //must wrap this in zone run for the angular component lifecycle hooks to be called.
            this.zone.run(() => {
              this.nsRouter.navigate(this.slideBack);
            });
          } else {
            this.nsRouter.back();
          }
        } else {
          this.slideBackCallBack();
        }
        // }, (err) => {
        // });
      } else {
        // snap back.
        item
          .animate({
            opacity: 1,
            translate: { x: 0, y: 0 },
            duration: 80
          })
          .then(() => {}, err => {});
        this.enableScroll();
      }
      return;
    }
  }

  private disableScroll() {
    if (this.view instanceof ScrollView || this.view instanceof ListView) {
      if (this.view.ios) {
        this.view.ios.scrollEnabled = false;
      }
    }
  }

  private enableScroll() {
    if (this.view instanceof ScrollView || this.view instanceof ListView) {
      if (this.view.ios) {
        this.view.ios.scrollEnabled = true;
      }
    }
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.view.off('pan');
    this.view.off('touch');
  }
}
