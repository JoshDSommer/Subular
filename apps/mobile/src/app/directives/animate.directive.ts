/**
 * Add this to your app's SharedModule declarations
 */

import {
  Directive,
  ElementRef,
  Input,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

// nativescript
import { View } from 'tns-core-modules/ui/core/view';
import { Animation, AnimationDefinition } from 'tns-core-modules/ui/animation';

@Directive({
  selector: '[animate]'
})
export class AnimateDirective implements AfterViewInit, OnDestroy {
  private _animate: AnimationDefinition[];

  @Input()
  set animate(value: AnimationDefinition[]) {
    if (this._animate !== value) {
      this._animate = value;
      this._cancel();
      this._initAndPlay();
    }
  }

  get animate() {
    return this._animate;
  }

  private _view: View;
  private _animation: Animation;
  private _viewInit = false;

  constructor(private _el: ElementRef) {}

  ngAfterViewInit() {
    if (!this._viewInit) {
      this._viewInit = true;
      this._initAndPlay();
    }
  }

  ngOnDestroy() {
    this._cancel();
  }

  private _initAndPlay() {
    if (!this._view && this._el && this._el.nativeElement) {
      this._view = this._el.nativeElement;
    }
    if (this._view && this.animate) {
      const animateOptions = this.animate.map(animation => {
        const animateOption: AnimationDefinition = animation;
        animateOption.target = this._view;
        return animateOption;
      });

      this._animation = new Animation(animateOptions);
      this._play();
    }
  }

  private _cancel() {
    if (this._animation && this._animation.isPlaying) {
      this._animation.cancel();
    }
  }

  private _play() {
    if (this._animation && !this._animation.isPlaying) {
      this._animation.play().then(
        _ => {
          // ignore
        },
        err => {
          // ignore
          // need this here to prevent:
          // Unhandled Promise rejection: Animation cancelled. ; Zone: <root> ; Task: null ; Value: Error: Animation cancelled. _rejectAnimationFinishedPromise@file:///app/tns_modules/tns-core-modules/ui/animation/animation-common.js:98:31 [<root>]
        }
      );
    }
  }
}
